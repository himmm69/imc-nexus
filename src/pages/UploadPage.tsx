import { useState } from 'react';
import { Upload, FileText, FolderOpen, Brain, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { modules } from '@/data/modules';

const semesters = [1, 2, 3, 4, 5, 6];
const assessmentTypes = ['Midterm', 'Final', 'Retake', 'Assignment'];
const noteFormats = ['markdown', 'pdf'];

export default function UploadPage() {
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [hasSolutions, setHasSolutions] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = (type: string) => {
    // Firebase integration point:
    // const docRef = await addDoc(collection(db, type), { ... });
    
    toast({
      title: 'Submitted for review',
      description: `Your ${type} has been submitted and will be reviewed shortly. (Demo)`,
    });

    // Reset form
    setTitle('');
    setTopic('');
    setTags('');
    setContent('');
    setSelectedModule('');
    setSelectedSemester('');
    setAssessmentType('');
    setHasSolutions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Content</h1>
        <p className="text-muted-foreground">
          Share your notes, past papers, or practice questions with the community
        </p>
      </div>

      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="papers" className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Past Paper</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Practice</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Flashcards</span>
          </TabsTrigger>
        </TabsList>

        {/* Upload Notes */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Upload Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="note-module">Module *</Label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger id="note-module">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {modules.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note-semester">Semester *</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="note-semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {semesters.map((s) => (
                        <SelectItem key={s} value={s.toString()}>
                          Semester {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-title">Title *</Label>
                <Input
                  id="note-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Complete React Hooks Guide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-topic">Topic</Label>
                <Input
                  id="note-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., React Fundamentals"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-tags">Tags (comma-separated)</Label>
                <Input
                  id="note-tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., React, Hooks, JavaScript"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: PDF, Markdown, Word documents
                  </p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => handleSubmit('note')}
                disabled={!selectedModule || !title}
              >
                Submit Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Past Paper */}
        <TabsContent value="papers">
          <Card>
            <CardHeader>
              <CardTitle>Upload Past Paper</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paper-module">Module *</Label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger id="paper-module">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {modules.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paper-semester">Semester *</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="paper-semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {semesters.map((s) => (
                        <SelectItem key={s} value={s.toString()}>
                          Semester {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paper-title">Title *</Label>
                <Input
                  id="paper-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Web Technologies Final 2023"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paper-type">Assessment Type *</Label>
                <Select value={assessmentType} onValueChange={setAssessmentType}>
                  <SelectTrigger id="paper-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {assessmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your exam paper here
                  </p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => handleSubmit('paper')}
                disabled={!selectedModule || !title || !assessmentType}
              >
                Submit Past Paper
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Practice Questions */}
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Add Practice Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="practice-module">Module *</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger id="practice-module">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {modules.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="practice-topic">Topic *</Label>
                <Input
                  id="practice-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., SQL Joins"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="practice-question">Question *</Label>
                <Textarea
                  id="practice-question"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your practice question..."
                  rows={4}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => handleSubmit('practice question')}
                disabled={!selectedModule || !topic || !content}
              >
                Submit Practice Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Import Flashcards */}
        <TabsContent value="flashcards">
          <Card>
            <CardHeader>
              <CardTitle>Import Flashcards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Layers className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Flashcard import functionality will be available soon.
                </p>
                <Badge variant="secondary" className="mt-4">
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
