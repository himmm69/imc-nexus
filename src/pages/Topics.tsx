import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { Database } from '@/types/supabase';

type Topic = Database['public']['Tables']['topics']['Row'];

export default function Topics() {
  const { data: topics, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Topic[];
    },
  });

  // Count papers per topic
  const { data: paperCounts } = useQuery({
    queryKey: ['paper-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('papers')
        .select('topic_id')
        .eq('status', 'approved');

      if (error) throw error;
      
      const counts: Record<number, number> = {};
      (data || []).forEach((paper: { topic_id: number }) => {
        counts[paper.topic_id] = (counts[paper.topic_id] || 0) + 1;
      });
      return counts;
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
        <h1 className="text-3xl font-bold">Browse Topics</h1>
        <p className="text-muted-foreground mt-2">
          Select a topic to view available past papers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics?.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">{topic.name}</CardTitle>
                <CardDescription>
                  {paperCounts?.[topic.id] || 0} {paperCounts?.[topic.id] === 1 ? 'paper' : 'papers'} available
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {topics && topics.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No topics yet</h3>
            <p className="text-muted-foreground">
              Topics will appear here once they're added by administrators
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
