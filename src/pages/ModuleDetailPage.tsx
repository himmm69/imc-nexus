import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, BookOpen, FileText, FolderOpen, Brain, Layers, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NoteCard } from '@/components/cards/NoteCard';
import { PaperCard } from '@/components/cards/PaperCard';
import { getModuleById } from '@/data/modules';
import { getNotesByModule } from '@/data/notes';
import { getPapersByModule } from '@/data/papers';
import { getPracticeQuestionsByModule, getQAByModule } from '@/data/practice';

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = getModuleById(moduleId || '');

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link to="/modules">
          <Button variant="link">Back to Modules</Button>
        </Link>
      </div>
    );
  }

  const notes = getNotesByModule(module.id);
  const papers = getPapersByModule(module.id);
  const questions = getPracticeQuestionsByModule(module.id);
  const qaQuestions = getQAByModule(module.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back button */}
      <Link to="/modules" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Modules
      </Link>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {module.lecturers.join(', ')}
              </span>
              <Badge variant="secondary">Semester {module.semester}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= module.difficulty
                      ? 'fill-primary text-primary'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {module.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        <p className="text-muted-foreground flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Last updated: {module.updatedAt}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
            <Badge variant="secondary" className="ml-1 text-xs">{notes.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Past Exams</span>
            <Badge variant="secondary" className="ml-1 text-xs">{papers.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Practice</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="qa" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Q&A</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Quick Links:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/notes?module=${module.id}`}>Browse Notes</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/papers?module=${module.id}`}>Past Papers</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes">
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No notes available for this module yet.
            </div>
          )}
        </TabsContent>

        <TabsContent value="exams">
          {papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No past papers available for this module yet.
            </div>
          )}
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Practice Quiz</h3>
                <p className="text-muted-foreground mb-4">
                  {questions.length} questions available for this module
                </p>
                <Button asChild>
                  <Link to={`/practice?module=${module.id}`}>Start Quiz</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Layers className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Flashcards</h3>
                <p className="text-muted-foreground mb-4">
                  Coming soon! Flashcard sets will be available here.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qa">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Questions & Answers</h3>
              <Button variant="outline">Ask a Question</Button>
            </div>
            {qaQuestions.length > 0 ? (
              <div className="space-y-4">
                {qaQuestions.map((q) => (
                  <Card key={q.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="text-center text-sm">
                          <div className="font-bold text-primary">{q.votes}</div>
                          <div className="text-muted-foreground text-xs">votes</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{q.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{q.body}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {q.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                            <span className="text-xs text-muted-foreground ml-auto">
                              by {q.author} • {q.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No questions yet. Be the first to ask!
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
