import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, FileText, FolderOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { modules } from '@/data/modules';
import { notes } from '@/data/notes';
import { papers } from '@/data/papers';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return { modules: [], notes: [], papers: [] };

    const q = query.toLowerCase();

    return {
      modules: modules.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.lecturers.some(l => l.toLowerCase().includes(q))
      ).slice(0, 3),
      notes: notes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3),
      papers: papers.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.topics.some(t => t.toLowerCase().includes(q)) ||
        p.assessmentType.toLowerCase().includes(q)
      ).slice(0, 3)
    };
  }, [query]);

  const hasResults = results.modules.length > 0 || results.notes.length > 0 || results.papers.length > 0;

  const handleSelect = (type: 'module' | 'note' | 'paper', id: string) => {
    setOpen(false);
    setQuery('');
    switch (type) {
      case 'module':
        navigate(`/modules/${id}`);
        break;
      case 'note':
        navigate(`/notes/${id}`);
        break;
      case 'paper':
        navigate(`/papers/${id}`);
        break;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search modules, notes, papers..."
            className="pl-9 w-full"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-popover" align="start">
        <Command>
          <CommandList>
            {!hasResults && query && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {!query && (
              <div className="p-4 text-sm text-muted-foreground">
                Start typing to search across modules, notes, and papers...
              </div>
            )}
            {results.modules.length > 0 && (
              <CommandGroup heading="Modules">
                {results.modules.map((module) => (
                  <CommandItem
                    key={module.id}
                    onSelect={() => handleSelect('module', module.id)}
                    className="cursor-pointer"
                  >
                    <BookOpen className="mr-2 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{module.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Semester {module.semester} • {module.lecturers[0]}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.notes.length > 0 && (
              <CommandGroup heading="Notes">
                {results.notes.map((note) => (
                  <CommandItem
                    key={note.id}
                    onSelect={() => handleSelect('note', note.id)}
                    className="cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4 text-accent" />
                    <div>
                      <p className="font-medium">{note.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {note.topic} • by {note.author}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.papers.length > 0 && (
              <CommandGroup heading="Past Papers">
                {results.papers.map((paper) => (
                  <CommandItem
                    key={paper.id}
                    onSelect={() => handleSelect('paper', paper.id)}
                    className="cursor-pointer"
                  >
                    <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{paper.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {paper.assessmentType} • Semester {paper.semester}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
