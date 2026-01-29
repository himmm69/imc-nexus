import { Link } from 'react-router-dom';
import { ThumbsUp, Eye, Clock, FileText, File } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/types';
import { modules } from '@/data/modules';

interface NoteCardProps {
  note: Note;
  compact?: boolean;
}

export function NoteCard({ note, compact = false }: NoteCardProps) {
  const module = modules.find((m) => m.id === note.moduleId);

  if (compact) {
    return (
      <Link to={`/notes/${note.id}`}>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          {note.format === 'markdown' ? (
            <FileText className="h-5 w-5 text-primary shrink-0" />
          ) : (
            <File className="h-5 w-5 text-destructive shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{note.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {module?.title} • {note.author}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {note.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {note.views}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/notes/${note.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border hover:border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {note.format === 'markdown' ? (
                <FileText className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <File className="h-5 w-5 text-destructive shrink-0" />
              )}
              <CardTitle className="text-base font-semibold text-foreground line-clamp-1">
                {note.title}
              </CardTitle>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {module?.title} • {note.topic}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>by {note.author}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {note.upvotes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {note.views}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {note.updatedAt}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
