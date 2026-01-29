import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, MessageCircle, FileText, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getPaperById } from '@/data/papers';
import { getModuleById } from '@/data/modules';
import { getNotesByModule } from '@/data/notes';
import { useAttemptedPapers } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { NoteCard } from '@/components/cards/NoteCard';

export default function PaperDetailPage() {
  const { paperId } = useParams<{ paperId: string }>();
  const paper = getPaperById(paperId || '');
  const module = paper ? getModuleById(paper.moduleId) : undefined;

  const [attemptedPapers, setAttemptedPapers] = useAttemptedPapers();
  const isAttempted = paper ? attemptedPapers.includes(paper.id) : false;

  if (!paper || !module) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Paper not found</h1>
        <Link to="/papers">
          <Button variant="link">Back to Papers</Button>
        </Link>
      </div>
    );
  }

  const relatedNotes = getNotesByModule(paper.moduleId).slice(0, 3);

  const toggleAttempted = () => {
    if (isAttempted) {
      setAttemptedPapers(attemptedPapers.filter((id) => id !== paper.id));
      toast({ title: 'Unmarked' });
    } else {
      setAttemptedPapers([...attemptedPapers, paper.id]);
      toast({ title: 'Marked as Attempted', description: 'Track your progress!' });
    }
  };

  const handleDownload = () => {
    toast({ title: 'Download started', description: 'Paper download initiated (demo)' });
  };

  const handleDiscuss = () => {
    toast({ title: 'Discussion', description: 'Discussion feature coming soon!' });
  };

  const assessmentTypeColor = {
    Final: 'bg-primary/10 text-primary',
    Midterm: 'bg-accent/10 text-accent',
    Retake: 'bg-warning/10 text-warning',
    Assignment: 'bg-success/10 text-success',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link to="/papers" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Papers
      </Link>

      <Card className="mb-6">
        <CardContent className="pt-6">
          {/* Paper Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{paper.title}</h1>
                <Link to={`/modules/${module.id}`} className="text-primary hover:underline">
                  {module.title}
                </Link>
              </div>
              <Badge className={assessmentTypeColor[paper.assessmentType]}>
                {paper.assessmentType}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Semester {paper.semester}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Uploaded {paper.uploadedAt}
              </span>
              {paper.hasSolutions && (
                <Badge variant="secondary">✓ Solutions Available</Badge>
              )}
              {isAttempted && (
                <Badge variant="outline" className="text-success border-success">
                  ✓ Attempted
                </Badge>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Topics Covered */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Topics Covered</h3>
            <div className="flex flex-wrap gap-2">
              {paper.topics.map((topic) => (
                <Badge key={topic} variant="outline">{topic}</Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Paper
            </Button>
            {paper.hasSolutions && (
              <Button variant="outline" onClick={handleDownload}>
                <FileText className="h-4 w-4 mr-2" />
                Download Solutions
              </Button>
            )}
            <Button
              variant={isAttempted ? 'default' : 'outline'}
              onClick={toggleAttempted}
              className="flex items-center gap-2"
            >
              <CheckCircle className={`h-4 w-4 ${isAttempted ? 'fill-current' : ''}`} />
              {isAttempted ? 'Attempted' : 'Mark as Attempted'}
            </Button>
            <Button variant="outline" onClick={handleDiscuss}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Discuss
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Notes */}
      {relatedNotes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
