import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

type Paper = Database['public']['Tables']['papers']['Row'] & {
  topics: { name: string } | null;
  profiles: { full_name: string | null } | null;
};

const BUCKET = 'question-papers' as const;

function normalizePath(p: string) {
  return p.replace(/^\/+/, '');
}

function pendingToApprovedPath(filePath: string) {
  const normalized = normalizePath(filePath);
  // pending/... -> approved/...
  if (normalized.startsWith('pending/')) return normalized.replace(/^pending\//, 'approved/');
  return normalized;
}

async function approvePaper(paperId: number, filePath: string) {
  const fromPath = normalizePath(filePath);
  const toPath = pendingToApprovedPath(fromPath);

  // 1) Move the file in storage
  const { error: moveError } = await supabase.storage
    .from(BUCKET)
    .move(fromPath, toPath);

  if (moveError) {
    throw new Error(`Storage move failed: ${moveError.message}`);
  }

  // 2) Update DB to approved + new file_path
  const { error: dbError } = await supabase
    .from('papers')
    .update({ status: 'approved', file_path: toPath })
    .eq('id', paperId);

  if (dbError) {
    // best-effort rollback so you don't lose the pending file path
    await supabase.storage.from(BUCKET).move(toPath, fromPath);
    throw new Error(`DB update failed: ${dbError.message}`);
  }
}

async function rejectPaper(paperId: number) {
  const { error } = await supabase
    .from('papers')
    .update({ status: 'rejected' })
    .eq('id', paperId);

  if (error) throw error;
}

export default function Admin() {
  const queryClient = useQueryClient();

  const { data: pendingPapers, isLoading } = useQuery({
    queryKey: ['pending-papers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('papers')
        .select(`
          id,
          title,
          year,
          file_path,
          status,
          topics (name),
          profiles!papers_uploader_id_fkey (full_name)
        `)
        .eq('status', 'pending');

      if (error) throw error;
      return data as Paper[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      paperId,
      status,
      filePath,
    }: {
      paperId: number;
      status: 'approved' | 'rejected';
      filePath: string | null;
    }) => {
      if (status === 'approved') {
        if (!filePath) throw new Error('Missing file_path for this paper');
        await approvePaper(paperId, filePath);
        return;
      }

      await rejectPaper(paperId);
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['pending-papers'] });
      // optional: if you have a query on the Past Papers page, keep its key consistent and invalidate it too
      queryClient.invalidateQueries({ queryKey: ['approved-papers'] });

      toast.success(status === 'approved' ? 'Paper approved' : 'Paper rejected', {
        description: `The paper has been ${status}`,
      });
    },
    onError: (error) => {
      toast.error('Action failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },
  });

  const handleApprove = (paperId: number, filePath: string | null) => {
    updateStatusMutation.mutate({ paperId, status: 'approved', filePath });
  };

  const handleReject = (paperId: number, filePath: string | null) => {
    updateStatusMutation.mutate({ paperId, status: 'rejected', filePath });
  };

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { count: totalPapers } = await supabase
        .from('papers')
        .select('*', { count: 'exact', head: true });

      const { count: approvedPapers } = await supabase
        .from('papers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      const { count: rejectedPapers } = await supabase
        .from('papers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected');

      return {
        total: totalPapers || 0,
        approved: approvedPapers || 0,
        rejected: rejectedPapers || 0,
        pending: (totalPapers || 0) - (approvedPapers || 0) - (rejectedPapers || 0),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">
          Review and moderate uploaded past papers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Papers</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.approved || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.rejected || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Papers */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            Review and approve or reject uploaded past papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingPapers && pendingPapers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Uploaded by</TableHead>
                  <TableHead className="text-right">Approve</TableHead>
                  <TableHead className="text-right">Reject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPapers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.topics?.name || 'N/A'}</TableCell>
                    <TableCell>{paper.year || 'N/A'}</TableCell>
                    <TableCell>{paper.profiles?.full_name || 'Unknown'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(paper.id, paper.file_path)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(paper.id, paper.file_path)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                No papers pending review at the moment
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}