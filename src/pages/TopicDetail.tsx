import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Download, FileText, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Database } from '@/types/supabase';

type Paper = Database['public']['Tables']['papers']['Row'];

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const [yearFilter, setYearFilter] = useState('');

  const { data: topic } = useQuery({
    queryKey: ['topic', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;
      return data as Database['public']['Tables']['topics']['Row'];
    },
    enabled: !!id,
  });

  const { data: papers, isLoading } = useQuery({
    queryKey: ['approved-papers', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('papers')
        .select('*')
        .eq('topic_id', id!)
        .eq('status', 'approved')
        .order('year', { ascending: false });

      if (error) throw error;
      return data as Paper[];
    },
    enabled: !!id,
  });

  const filteredPapers = papers?.filter((paper) => {
    const yearMatch = !yearFilter || paper.year?.toString().includes(yearFilter);
    return yearMatch;
  });

  const handleDownload = async (paper: Paper) => {
    try {
      const { data, error } = await supabase.storage
        .from('question-papers')
        .createSignedUrl(paper.file_path, 60);

      if (error) throw error;

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
        toast.success('Download started');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed', {
        description: 'Please try again',
      });
    }
  };

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
        <h1 className="text-3xl font-bold">{topic ? topic.name : 'Topic'}</h1>
        <p className="text-muted-foreground mt-2">
          {filteredPapers?.length || 0} approved past papers
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter past papers by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="year-filter">Year</Label>
            <Input
              id="year-filter"
              type="number"
              placeholder="e.g., 2024"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </div>
          {yearFilter && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setYearFilter('');
              }}
            >
              Clear Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Papers List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Papers</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPapers && filteredPapers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPapers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.year || 'N/A'}</TableCell>
                    <TableCell>
                      {paper.size_bytes
                        ? `${(paper.size_bytes / 1024 / 1024).toFixed(2)} MB`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {new Date(paper.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(paper)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No papers found</h3>
              <p className="text-muted-foreground">
                {papers?.length === 0
                  ? 'No approved past papers available for this topic yet'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
