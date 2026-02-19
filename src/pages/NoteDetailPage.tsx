import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Bookmark, Download, Flag, Clock, Eye, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getNoteById } from '@/data/notes';
import { getModuleById } from '@/data/modules';
import { useUpvotes, useBookmarks } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

export default function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const note = getNoteById(noteId || '');
  const module = note ? getModuleById(note.moduleId) : undefined;

  const [upvotes, setUpvotes] = useUpvotes();
  const [bookmarks, setBookmarks] = useBookmarks();

  const isUpvoted = note ? upvotes.includes(note.id) : false;
  const isBookmarked = note ? bookmarks.includes(note.id) : false;

  const buyLinks = [
    { label: "Amazon", href: "https://www.amazon.com/Career-Heist-Control-Professional-Journey/dp/9360456268" },
    { label: "Flipkart", href: "https://www.flipkart.com/career-heist-navigate-your/p/itm7b0b458b89df4" },
    { label: "Thalia", href: "https://www.thalia.at/shop/home/artikeldetails/A1074399871" },
  ];

  if (!note) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <Link to="/notes">
          <Button variant="link">Back to Notes</Button>
        </Link>
      </div>
    );
  }

  const toggleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes.filter((id) => id !== note.id));
    } else {
      setUpvotes([...upvotes, note.id]);
      toast({ title: 'Upvoted!', description: 'Thanks for your feedback.' });
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((id) => id !== note.id));
      toast({ title: 'Removed from bookmarks' });
    } else {
      setBookmarks([...bookmarks, note.id]);
      toast({ title: 'Bookmarked!', description: 'Added to your saved notes.' });
    }
  };

  // Parse markdown headings for TOC
  const headings = note.markdownContent
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      return { level, text, id };
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back button */}
      <Link to="/notes" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Notes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Table of Contents */}
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20">
            <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">Contents</h3>
            <nav className="space-y-1">
              {headings.map((h, idx) => (
                <a
                  key={idx}
                  href={`#${h.id}`}
                  className={`block text-sm hover:text-primary transition-colors ${
                    h.level === 1
                      ? 'font-medium'
                      : h.level === 2
                      ? 'pl-3 text-muted-foreground'
                      : 'pl-6 text-muted-foreground text-xs'
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Center: Note Content */}
        <main className="lg:col-span-7">
          <Card>
            <CardContent className="pt-6">
              {/* Note Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">{note.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Link to={`/modules/${note.moduleId}`} className="hover:text-primary">
                    {module?.title}
                  </Link>
                  <span>•</span>
                  <span>{note.topic}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Markdown Content - Simple renderer */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {note.markdownContent.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    const text = line.slice(2);
                    const id = text.toLowerCase().replace(/\s+/g, '-');
                    return <h1 key={idx} id={id} className="text-2xl font-bold mt-8 mb-4">{text}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    const text = line.slice(3);
                    const id = text.toLowerCase().replace(/\s+/g, '-');
                    return <h2 key={idx} id={id} className="text-xl font-semibold mt-6 mb-3">{text}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    const text = line.slice(4);
                    const id = text.toLowerCase().replace(/\s+/g, '-');
                    return <h3 key={idx} id={id} className="text-lg font-medium mt-4 mb-2">{text}</h3>;
                  }
                  if (line.startsWith('```')) {
                    return null; // Skip code fence markers
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4">{line.slice(2)}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={idx} />;
                  }
                  // Check for inline code
                  if (line.includes('`')) {
                    const parts = line.split(/`([^`]+)`/);
                    return (
                      <p key={idx} className="mb-2">
                        {parts.map((part, i) =>
                          i % 2 === 1 ? (
                            <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                              {part}
                            </code>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  }
                  return <p key={idx} className="mb-2">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Right: Actions Panel */}
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Button
                  variant={isUpvoted ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={toggleUpvote}
                >
                  <ThumbsUp className={`h-4 w-4 mr-2 ${isUpvoted ? 'fill-current' : ''}`} />
                  Upvote ({note.upvotes + (isUpvoted ? 1 : 0)})
                </Button>
                <Button
                  variant={isBookmarked ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={toggleBookmark}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Note Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>by {note.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{note.views} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Updated {note.updatedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Buy the Book</h3>
                <div className="space-y-2">
                  {buyLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
