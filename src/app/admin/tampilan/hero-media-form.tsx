"use client";

import { useState, useMemo, useRef } from "react";
import { Loader2, Upload, ExternalLink, AlertCircle, Check } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { cn } from "@/lib/utils";

interface Props {
  initialVideo: string;
  initialImage: string;
}

export function HeroMediaForm({ initialVideo, initialImage }: Props) {
  const [video, setVideo] = useState(initialVideo);
  const [image, setImage] = useState(initialImage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  }, []);

  async function saveKey(key: string, content: string) {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, content }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await Promise.all([
        saveKey("hero.media.video", video),
        saveKey("hero.media.image", image),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal simpan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <UploadField
        label="Foto hero (poster)"
        hint="JPG/PNG/WEBP, landscape 16:9. Muncul di semua device. WAJIB diisi."
        value={image}
        onChange={setImage}
        acceptTypes="image/jpeg,image/png,image/webp"
        folder="hero"
        supabase={supabase}
        previewMode="image"
      />

      <UploadField
        label="Video hero (opsional)"
        hint="MP4 atau WebM. Muncul di atas foto sebagai animasi latar (autoplay muted). Kosongin kalau mau foto aja."
        value={video}
        onChange={setVideo}
        acceptTypes="video/mp4,video/webm"
        folder="hero"
        supabase={supabase}
        previewMode="video"
        maxSizeMB={25}
      />

      {error && (
        <div className="flex items-start gap-2 p-4 bg-bata/10 border border-bata/20 rounded-md text-sm text-bata">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Gagal simpan</p>
            <p className="opacity-90">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-daun/10 border border-daun/25 rounded-md text-sm text-daun-800">
          <Check size={16} className="shrink-0" />
          <p>Tersimpan. Buka beranda untuk lihat hasilnya.</p>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t border-sogan/10">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-sogan-900 text-paper px-6 py-3 rounded-md hover:bg-sogan-800 transition-colors disabled:opacity-50"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Simpan
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Upload field \u2014 upload ke Supabase Storage bucket 'foto' folder 'hero/'
// atau paste URL manual (case: hosted CDN)
// ============================================================
interface UFProps {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  acceptTypes: string;
  folder: string;
  supabase: ReturnType<typeof createBrowserClient> | null;
  previewMode: "image" | "video";
  maxSizeMB?: number;
}

function UploadField({
  label,
  hint,
  value,
  onChange,
  acceptTypes,
  folder,
  supabase,
  previewMode,
  maxSizeMB = 10,
}: UFProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploadError(null);
    if (!supabase) {
      setUploadError("Supabase belum di-setup.");
      return;
    }
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setUploadError(`File terlalu besar. Maksimal ${maxSizeMB} MB.`);
      return;
    }

    setUploading(true);
    setProgress(15);

    // Sanitize filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    try {
      setProgress(30);
      const { error } = await supabase.storage
        .from("foto")
        .upload(safeName, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });
      if (error) throw error;
      setProgress(90);

      const { data: pub } = supabase.storage.from("foto").getPublicUrl(safeName);
      setProgress(100);
      onChange(pub.publicUrl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setUploadError(`Upload gagal: ${msg}`);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 500);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="eyebrow text-[10px] block mb-2">{label}</label>

      {/* Preview */}
      {value && (
        <div className="relative mb-3 rounded-lg overflow-hidden border border-sogan/15 bg-paper-deep aspect-video max-w-md">
          {previewMode === "video" ? (
            /\.(mp4|webm|mov)(\?|$)/i.test(value) ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={value}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-ink-mute p-4 text-center">
                URL bukan video. Kosongin kalau ga pake video.
              </div>
            )
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {/* Upload button + URL field */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={acceptTypes}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={cn(
            "inline-flex items-center gap-2 border-2 border-dashed border-sogan/25 hover:border-kunyit-500 hover:bg-kunyit-500/5 rounded-md px-4 py-3 text-sm text-sogan-800 transition-colors disabled:opacity-50",
          )}
        >
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Mengunggah... {progress}%
            </>
          ) : (
            <>
              <Upload size={14} />
              Pilih file dari komputer
            </>
          )}
        </button>

        <input
          type="url"
          placeholder="atau tempel URL lengkap"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={uploading}
          className="flex-1 px-3 py-2 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 text-sm font-mono"
        />

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 px-3 py-2 text-xs text-ink-mute hover:text-sogan-900 transition-colors"
            title="Buka URL di tab baru"
          >
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <p className="mt-2 text-xs text-ink-mute">{hint}</p>

      {uploadError && (
        <p className="mt-2 text-sm text-bata flex items-start gap-1.5">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          {uploadError}
        </p>
      )}
    </div>
  );
}
