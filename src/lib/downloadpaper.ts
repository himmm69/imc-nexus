import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "question-papers" as const;

export async function downloadPaperSigned(
  supabase: SupabaseClient,
  filePath: string,
  expiresInSeconds = 60
): Promise<void> {
  if (!filePath?.trim()) throw new Error("Missing file path");

  const normalized = filePath.replace(/^\/+/, "");

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(normalized, expiresInSeconds);

  if (error) throw new Error(error.message);
  if (!data?.signedUrl) throw new Error("Failed to create signed URL");

  const opened = window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = data.signedUrl;
}