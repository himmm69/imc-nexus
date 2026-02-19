import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FileText, Upload, Loader2 } from 'lucide-react';
import { Database } from '@/types/supabase';

type Paper = Database['public']['Tables']['papers']['Row'] & {
  topics: { name: string } | null;
};

export default function Dashboard() {
  const { user, profile } = useAuth();

  const { data: papers, isLoading } = useQuery({
    queryKey: ['my-papers', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('papers')
        .select(`
          *,
          topics (
            name
          )
        `)
        .eq('uploader_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Paper[];
    },
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'Student'}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your uploaded past papers and contribute to the community
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Past Paper
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{papers?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {papers?.filter((p) => p.status === 'approved').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {papers?.filter((p) => p.status === 'pending').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Past Papers Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Past Papers</CardTitle>
          <CardDescription>
            Track the status of your uploaded past papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : papers && papers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.topics?.name || 'N/A'}</TableCell>
                    <TableCell>{paper.year || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>
                      {new Date(paper.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No uploads yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by uploading your first past paper
              </p>
              <Button asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Past Paper
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
