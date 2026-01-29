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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PaperCard } from '@/components/cards/PaperCard';
import { papers } from '@/data/papers';
import { modules } from '@/data/modules';

const semesters = [...new Set(papers.map((p) => p.semester))].sort();
const assessmentTypes = ['Midterm', 'Final', 'Retake', 'Assignment'] as const;
const allTopics = [...new Set(papers.flatMap((p) => p.topics))];

export default function PapersPage() {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [hasSolutions, setHasSolutions] = useState<boolean | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const filteredPapers = useMemo(() => {
    let result = [...papers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (semesterFilter !== 'all') {
      result = result.filter((p) => p.semester === parseInt(semesterFilter));
    }

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.assessmentType === typeFilter);
    }

    if (hasSolutions !== null) {
      result = result.filter((p) => p.hasSolutions === hasSolutions);
    }

    if (selectedTopics.length > 0) {
      result = result.filter((p) =>
        selectedTopics.some((topic) => p.topics.includes(topic))
      );
    }

    // Sort by upload date
    result.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return result;
  }, [search, semesterFilter, typeFilter, hasSolutions, selectedTopics]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Past Papers</h1>
        <p className="text-muted-foreground">
          Browse and download past exam papers and assignments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search papers..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={semesterFilter} onValueChange={setSemesterFilter}>
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Types</SelectItem>
              {assessmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="with-solutions"
              checked={hasSolutions === true}
              onCheckedChange={(checked) =>
                setHasSolutions(checked ? true : null)
              }
            />
            <Label htmlFor="with-solutions" className="text-sm">
              With Solutions
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="without-solutions"
              checked={hasSolutions === false}
              onCheckedChange={(checked) =>
                setHasSolutions(checked ? false : null)
              }
            />
            <Label htmlFor="without-solutions" className="text-sm">
              Without Solutions
            </Label>
          </div>
        </div>

        {/* Topic filters */}
        <div className="flex flex-wrap gap-2">
          {allTopics.slice(0, 10).map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopics.includes(topic) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </Badge>
          ))}
          {selectedTopics.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTopics([])}
              className="text-xs"
            >
              Clear topics
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No papers found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearch('');
              setSemesterFilter('all');
              setTypeFilter('all');
              setHasSolutions(null);
              setSelectedTopics([]);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
