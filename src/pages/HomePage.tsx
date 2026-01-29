import { Link } from 'react-router-dom';
import { Search, TrendingUp, Clock, Calendar, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NoteCard } from '@/components/cards/NoteCard';
import { PaperCard } from '@/components/cards/PaperCard';
import { getTrendingNotes, getLatestNotes } from '@/data/notes';
import { getLatestPapers } from '@/data/papers';
import { getUpcomingAssessments, getTopPracticeSets } from '@/data/practice';
import { modules } from '@/data/modules';

const quickFilters = [
  { label: 'WebTech', moduleId: 'web-tech' },
  { label: 'Databases', moduleId: 'databases' },
  { label: 'R Programming', moduleId: 'r-programming' },
  { label: 'Marketing', moduleId: 'marketing' },
  { label: 'Statistics', moduleId: 'statistics' },
  { label: 'Exam Prep', moduleId: null },
];

export default function HomePage() {
  const trendingNotes = getTrendingNotes(5);
  const latestNotes = getLatestNotes(5);
  const upcomingAssessments = getUpcomingAssessments();
  const topPracticeSets = getTopPracticeSets(5);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          IMC Study Hub
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your central resource for modules, notes, past papers, and practice materials
        </p>

        {/* Large Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search module, topic, lecturer, exam type…"
            className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-primary"
          />
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {quickFilters.map((filter) => (
            <Link
              key={filter.label}
              to={filter.moduleId ? `/modules/${filter.moduleId}` : '/papers'}
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {filter.label}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Four Panel Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trending Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {trendingNotes.map((note) => (
                <NoteCard key={note.id} note={note} compact />
              ))}
            </div>
            <Link to="/notes">
              <Button variant="ghost" className="w-full mt-4">
                View All Notes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Latest Uploads */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-accent" />
              Latest Uploads
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {latestNotes.map((note) => (
                <NoteCard key={note.id} note={note} compact />
              ))}
            </div>
            <Link to="/notes">
              <Button variant="ghost" className="w-full mt-4">
                View All Uploads
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-destructive" />
              Upcoming Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {upcomingAssessments.slice(0, 5).map((assessment) => {
                const module = modules.find((m) => m.id === assessment.moduleId);
                return (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div>
                      <p className="font-medium text-sm">{assessment.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {module?.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {assessment.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(assessment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Practice Sets */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-success" />
              Top Practice Sets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {topPracticeSets.map((set) => {
                const module = modules.find((m) => m.id === set.moduleId);
                return (
                  <Link key={set.id} to="/practice">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">{set.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {module?.title} • {set.questionCount} questions
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {set.popularity} plays
                      </Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link to="/practice">
              <Button variant="ghost" className="w-full mt-4">
                Start Practice
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
