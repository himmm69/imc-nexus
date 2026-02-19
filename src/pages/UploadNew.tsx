import React, { useMemo, useRef, useState, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Loader2, Upload as UploadIcon, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export default function UploadNew() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [topicId, setTopicId] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topics").select("*").order("name");
      if (error) throw error;
      return data as Database["public"]["Tables"]["topics"]["Row"][];
    },
  });

  const validateAndSetFile = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      return false;
    }

    const isPdfType = selectedFile.type === "application/pdf";
    const isPdfName = selectedFile.name.toLowerCase().endsWith(".pdf");
    if (!isPdfType && !isPdfName) {
      toast.error("Invalid file type", { description: "Please upload a PDF file" });
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File too large", { description: "Maximum file size is 15MB" });
      return false;
    }

    setFile(selectedFile);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    const ok = validateAndSetFile(selectedFile);
    if (!ok) e.target.value = ""; // reset input if invalid
  };

  const canSubmit = useMemo(() => {
    return !!user && !!file && !!title.trim() && !!topicId && !isUploading;
  }, [user, file, title, topicId, isUploading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to upload.");
      return;
    }
    if (!file) {
      toast.error("Please select a PDF file.");
      return;
    }
    if (!topicId) {
      toast.error("Please select a topic.");
      return;
    }

    setIsUploading(true);

    try {
      const timestamp = Date.now();
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `pending/${topicId}/${user.id}/${timestamp}-${sanitizedFilename}`;

      // 1) Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("question-papers")
        .upload(filePath, file, { contentType: "application/pdf", upsert: false });

      if (uploadError) throw uploadError;

      // 2) Insert DB row
      const { error: insertError } = await supabase.from("papers").insert({
        title: title.trim(),
        topic_id: parseInt(topicId, 10),
        year: year ? parseInt(year, 10) : null,
        uploader_id: user.id,
        file_path: filePath,
        mime_type: file.type,
        size_bytes: file.size,
        status: "pending",
      } as any);

      if (insertError) throw insertError;

      toast.success("Upload successful!", {
        description: "Your paper has been submitted for approval.",
      });

      setUploadSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Upload error:", error);

      // Supabase errors often have message + statusCode
      const msg =
        error?.message ||
        error?.error_description ||
        (typeof error === "string" ? error : "Please try again");

      toast.error("Upload failed", { description: msg });
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold text-green-900">Upload Successful!</h2>
              <p className="text-green-700">
                Your past paper has been submitted for approval. You’ll see it in your dashboard
                once it’s reviewed by an admin.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Upload Past Paper</CardTitle>
          <CardDescription>
            Share your past papers with the community. Uploads are reviewed before being published.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Paper Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Mathematics Final Exam 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Select value={topicId} onValueChange={setTopicId} disabled={isUploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topicsLoading ? (
                    <div className="p-2 text-center">
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    </div>
                  ) : (
                    topics?.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id.toString()}>
                        {topic.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                min="2000"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isUploading}
              />
            </div>

            {/* Dropzone */}
            <div className="space-y-2">
              <Label htmlFor="file">PDF File * (Max 15MB)</Label>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                  isDragging ? "border-primary bg-muted/40" : "border-border hover:bg-muted/20"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.dataTransfer.dropEffect = "copy";
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                  const dropped = e.dataTransfer?.files?.[0] ?? null;
                  validateAndSetFile(dropped);
                }}
              >
                <UploadIcon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop your PDF here, or click to choose a file
                </p>

                {file && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
                ref={fileInputRef}
              />
            </div>

            <Alert>
              <AlertDescription>
                Your upload will be reviewed by an admin before becoming publicly available. You can
                track the status in your dashboard.
              </AlertDescription>
            </Alert>
          </CardContent>

          <div className="px-6 pb-6">
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Past Paper
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
