import { Link } from 'react-router-dom';
import { Download, CheckCircle, MessageCircle, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Paper } from '@/types';
import { modules } from '@/data/modules';
import { useAttemptedPapers } from '@/hooks/useLocalStorage';

interface PaperCardProps {
  paper: Paper;
  compact?: boolean;
}

export function PaperCard({ paper, compact = false }: PaperCardProps) {
  const module = modules.find((m) => m.id === paper.moduleId);
  const [attemptedPapers, setAttemptedPapers] = useAttemptedPapers();
  const isAttempted = attemptedPapers.includes(paper.id);

  const toggleAttempted = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAttempted) {
      setAttemptedPapers(attemptedPapers.filter((id) => id !== paper.id));
    } else {
      setAttemptedPapers([...attemptedPapers, paper.id]);
    }
  };

  const assessmentTypeColor = {
    Final: 'bg-primary/10 text-primary',
    Midterm: 'bg-accent/10 text-accent',
    Retake: 'bg-warning/10 text-warning',
    Assignment: 'bg-success/10 text-success',
  };

  if (compact) {
    return (
      <Link to={`/papers/${paper.id}`}>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <FileQuestion className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{paper.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {module?.title} • {paper.assessmentType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {paper.hasSolutions && (
              <Badge variant="secondary" className="text-xs">
                Solutions
              </Badge>
            )}
            {isAttempted && (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/papers/${paper.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border hover:border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold text-foreground line-clamp-2">
              {paper.title}
            </CardTitle>
            <Badge className={`shrink-0 ${assessmentTypeColor[paper.assessmentType]}`}>
              {paper.assessmentType}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {module?.title} • Semester {paper.semester}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {paper.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {paper.hasSolutions && (
                <Badge variant="secondary" className="text-xs">
                  ✓ Solutions
                </Badge>
              )}
              {isAttempted && (
                <Badge variant="outline" className="text-xs text-success border-success">
                  Attempted
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleAttempted}
              >
                <CheckCircle
                  className={`h-4 w-4 ${isAttempted ? 'text-success fill-success' : 'text-muted-foreground'}`}
                />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
