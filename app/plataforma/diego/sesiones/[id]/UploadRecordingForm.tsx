"use client";

import { useState } from "react";
import * as tus from "tus-js-client";
import { createClient } from "@/lib/supabase/client";
import { setSessionRecording } from "../../actions";

// Las grabaciones de Zoom de una clase (varios cientos de MB) exceden lo que
// aguanta una subida normal, por eso se usa el protocolo resumible (TUS) de
// Supabase Storage en vez de supabase.storage.upload().
export default function UploadRecordingForm({ sessionId }: { sessionId: string }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    setProgress(0);

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      setError("Tu sesión expiró, vuelve a iniciar sesión.");
      setUploading(false);
      return;
    }

    const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const path = `${sessionId}/${Date.now()}-${file.name}`;

    const upload = new tus.Upload(file, {
      endpoint: `${projectUrl}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${accessToken}`,
        apikey: anonKey,
        "x-upsert": "false",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: "recordings",
        objectName: path,
        contentType: file.type || "video/mp4",
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024,
      onError: (err) => {
        setError(err.message);
        setUploading(false);
      },
      onProgress: (bytesSent, bytesTotal) => {
        setProgress(Math.round((bytesSent / bytesTotal) * 100));
      },
      onSuccess: async () => {
        await setSessionRecording(sessionId, path);
        setUploading(false);
      },
    });

    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  }

  return (
    <div>
      <label className="text-sm font-medium">Subir grabación de Zoom</label>
      <input
        type="file"
        accept="video/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="mt-1 block w-full text-sm"
      />
      {uploading && <p className="mt-2 text-sm text-muted">Subiendo... {progress}%</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
