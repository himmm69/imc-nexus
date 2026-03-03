import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET_NAME = "question-papers" as const;

export type DownloadablePaper = {
  file_path: string | null;
};

export async function handleDownload(
  supabase: SupabaseClient,
  filePath: string
): Promise<void> {
  if (!filePath || !filePath.trim()) {
    throw new Error("Missing file path");
  }

  // filePath should be like: approved/6/1772....pdf (NO bucket name)
  const normalizedPath = filePath.replace(/^\/+/, "");

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(normalizedPath, 60);

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.signedUrl) {
    throw new Error("Failed to create signed URL");
  }

  const opened = window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  if (!opened) {
    // Popup blockers
    window.location.href = data.signedUrl;
  }
}
