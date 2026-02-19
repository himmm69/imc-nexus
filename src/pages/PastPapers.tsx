import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText } from "lucide-react";
import { toast } from "sonner";

type Paper = Database["public"]["Tables"]["papers"]["Row"] & {
  topics: { name: string } | null;
};

export default function PastPapers() {
  const { data: papers, isLoading } = useQuery({
    queryKey: ["past-papers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("papers")
        .select(
          `
          id,
          title,
          year,
          file_path,
          topics (name)
        `
        )
        .eq("status", "approved")
        .order("year", { ascending: false });

      if (error) throw error;
      return data as Paper[];
    },
  });

  const handleDownload = (filePath: string) => {
    const { data } = supabase.storage.from("question-papers").getPublicUrl(filePath);

    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank");
    } else {
      toast.error("Download failed", { description: "No public URL available." });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Past Papers</h1>
        <p className="text-muted-foreground mt-2">
          Browse approved past papers available for download
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Past Papers</CardTitle>
          <CardDescription>
            Only approved past papers are shown here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {papers && papers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.topics?.name || "N/A"}</TableCell>
                    <TableCell>{paper.year || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(paper.file_path)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No past papers yet</h3>
              <p className="text-muted-foreground">
                Approved past papers will appear here once available
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
