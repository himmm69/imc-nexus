import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
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
import { ModuleCard } from '@/components/cards/ModuleCard';
import { modules } from '@/data/modules';

const allTags = [...new Set(modules.flatMap((m) => m.tags))];
const semesters = [...new Set(modules.map((m) => m.semester))].sort();

type SortOption = 'popular' | 'recent' | 'difficulty-asc' | 'difficulty-desc';

export default function ModulesPage() {
  const [search, setSearch] = useState('');
  const [semester, setSemester] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('popular');

  const filteredModules = useMemo(() => {
    let result = [...modules];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.lecturers.some((l) => l.toLowerCase().includes(q)) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Semester filter
    if (semester !== 'all') {
      result = result.filter((m) => m.semester === parseInt(semester));
    }

    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter((m) =>
        selectedTags.some((tag) => m.tags.includes(tag))
      );
    }

    // Sorting
    switch (sort) {
      case 'recent':
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case 'difficulty-asc':
        result.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case 'difficulty-desc':
        result.sort((a, b) => b.difficulty - a.difficulty);
        break;
      case 'popular':
      default:
        // Keep original order for now (would use view count in real app)
        break;
    }

    return result;
  }, [search, semester, selectedTags, sort]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Modules</h1>
        <p className="text-muted-foreground">
          Browse all available modules and their resources
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="difficulty-asc">Difficulty: Low → High</SelectItem>
              <SelectItem value="difficulty-desc">Difficulty: High → Low</SelectItem>
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
        {filteredModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No modules found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearch('');
              setSemester('all');
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
