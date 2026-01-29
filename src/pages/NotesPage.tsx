import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { NoteCard } from '@/components/cards/NoteCard';
import { notes } from '@/data/notes';
import { modules } from '@/data/modules';

const allTags = [...new Set(notes.flatMap((n) => n.tags))];
const allTopics = [...new Set(notes.map((n) => n.topic))];

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.topic.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (moduleFilter !== 'all') {
      result = result.filter((n) => n.moduleId === moduleFilter);
    }

    if (formatFilter !== 'all') {
      result = result.filter((n) => n.format === formatFilter);
    }

    if (selectedTags.length > 0) {
      result = result.filter((n) =>
        selectedTags.some((tag) => n.tags.includes(tag))
      );
    }

    // Sort by upvotes
    result.sort((a, b) => b.upvotes - a.upvotes);

    return result;
  }, [search, moduleFilter, formatFilter, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Notes Library</h1>
        <p className="text-muted-foreground">
          Browse community-contributed notes and study materials
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Modules</SelectItem>
              {modules.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notes found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearch('');
              setModuleFilter('all');
              setFormatFilter('all');
              setSelectedTags([]);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
