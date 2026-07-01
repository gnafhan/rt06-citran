"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  aspectRatio?: string;
  bucket?: string;
  folder?: string;
}

const MAX_MB = 10;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ACCEPT_ATTR = "image/jpeg,image/png,image/webp,image/gif,image/jpg";

/**
 * ImageUpload — file upload native buat admin RT.
 *
 * Design goal: dipake bapak-bapak pengurus RT, jadi:
 * - Tombol GEDE, ikon jelas
 * - Kalimat instruksi ramah, bukan jargon teknis
 * - Drag & drop DAN klik-pilih, dua-duanya jalan
 * - Preview langsung setelah upload
 * - Progress bar biar tau lagi loading
 * - Error message plain Indonesian
 * - Mobile: `capture` attribute biar bisa langsung buka kamera HP
 */
export function ImageUpload({
  name,
  value = "",
  onChange,
  label = "Foto",
  aspectRatio = "16/10",
  bucket = "foto",
  folder = "uploads",
}: Props) {
  const [url, setUrl] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy init: bikin client hanya kalau env ada, di client-side.
  // Kalau env kosong, `isConfigured` = false dan komponen fallback ke
  // mode terbatas (upload disabled, no crash).
  const supabase = useMemo<SupabaseClient | null>(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  }, []);

  const isConfigured = supabase !== null;

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setJustUploaded(false);

      if (!supabase) {
        setError(
          "Supabase belum di-setup. Hubungi pengurus IT untuk mengaktifkan fitur upload."
        );
        return;
      }

      // Validate type
      if (!ACCEPTED.includes(file.type)) {
        setError(
          "File yang dipilih bukan foto. Silakan pilih file JPG, PNG, WEBP, atau GIF."
        );
        return;
      }

      // Validate size
      const sizeMB = file.size / 1024 / 1024;
      if (sizeMB > MAX_MB) {
        setError(
          `Ukuran foto terlalu besar (${sizeMB.toFixed(
            1
          )} MB). Maksimal ${MAX_MB} MB. Coba kompres dulu atau pilih foto lain.`
        );
        return;
      }

      setUploading(true);
      setProgress(10);

      try {
        // Fake progress (Supabase JS ga expose upload progress via fetch)
        const progressTimer = setInterval(() => {
          setProgress((p) => (p < 85 ? p + Math.random() * 15 : p));
        }, 300);

        // Generate safe filename
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const safeBase = file.name
          .replace(/\.[^.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 40);
        const timestamp = Date.now();
        const path = `${folder}/${timestamp}-${safeBase || "foto"}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(path, file, {
            cacheControl: "31536000",
            upsert: false,
            contentType: file.type,
          });

        clearInterval(progressTimer);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);

        setProgress(100);
        setUrl(data.publicUrl);
        onChange?.(data.publicUrl);
        setJustUploaded(true);
        setTimeout(() => setJustUploaded(false), 3000);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        // Translate common errors
        if (msg.includes("row-level security") || msg.includes("policy")) {
          setError("Silakan login ulang, sesi Anda mungkin sudah habis.");
        } else if (msg.includes("Bucket not found")) {
          setError("Bucket foto belum dibuat. Hubungi pengurus IT.");
        } else if (msg.includes("Payload too large")) {
          setError(`Ukuran foto melebihi batas ${MAX_MB} MB.`);
        } else {
          setError(`Upload gagal: ${msg}. Coba lagi ya.`);
        }
        setProgress(0);
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 1200);
      }
    },
    [bucket, folder, onChange, supabase]
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const clearImage = () => {
    setUrl("");
    onChange?.("");
    setError(null);
    setJustUploaded(false);
  };

  return (
    <div className="space-y-3">
      <label className="eyebrow text-[10px] block">{label}</label>

      {/* Hidden input yang di-submit ke server action */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        // === PREVIEW MODE ===
        <div className="relative group">
          <div
            className="w-full rounded-lg overflow-hidden bg-paper-deep border border-sogan/15 bg-cover bg-center"
            style={{ aspectRatio, backgroundImage: `url('${url}')` }}
          />
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className="flex items-center gap-2 text-sm text-daun min-w-0 flex-1">
              {justUploaded ? (
                <>
                  <CheckCircle2 size={16} strokeWidth={1.8} className="shrink-0" />
                  <span>Foto berhasil di-upload!</span>
                </>
              ) : (
                <>
                  <ImageIcon size={16} strokeWidth={1.5} className="shrink-0 text-sogan-500" />
                  <span className="text-ink-mute truncate">
                    Foto sudah terpasang
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-sm text-sogan hover:text-sogan-900 px-3 py-2 rounded-md hover:bg-paper transition-colors"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="inline-flex items-center gap-1.5 text-sm text-bata hover:bg-bata/10 px-3 py-2 rounded-md transition-colors"
              >
                <X size={14} strokeWidth={1.8} />
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
        // === UPLOAD ZONE ===
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!uploading) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "relative w-full rounded-lg border-2 border-dashed transition-all cursor-pointer group",
            "flex flex-col items-center justify-center text-center p-8 md:p-12",
            uploading && "cursor-wait pointer-events-none",
            dragOver
              ? "border-sogan bg-paper-soft"
              : "border-sogan/25 bg-paper-soft/40 hover:border-sogan/50 hover:bg-paper-soft"
          )}
          style={{ aspectRatio }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !uploading) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          {uploading ? (
            <>
              <Loader2
                size={48}
                strokeWidth={1.5}
                className="text-sogan animate-spin mb-4"
              />
              <p className="font-display text-xl text-sogan-900 mb-2">
                Sedang mengunggah…
              </p>
              <p className="text-sm text-ink-mute mb-4">
                Mohon ditunggu sebentar
              </p>
              <div className="w-full max-w-xs h-2 bg-paper-deep rounded-full overflow-hidden">
                <div
                  className="h-full bg-sogan transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-mono text-sogan-500">
                {Math.round(progress)}%
              </p>
            </>
          ) : (
            <>
              <div
                className={cn(
                  "w-16 h-16 rounded-full bg-sogan/10 flex items-center justify-center mb-4 transition-colors",
                  dragOver && "bg-sogan/20"
                )}
              >
                <Upload
                  size={28}
                  strokeWidth={1.5}
                  className="text-sogan-800"
                />
              </div>
              <p className="font-display text-xl md:text-2xl text-sogan-900 mb-2">
                {dragOver ? "Lepaskan di sini" : "Pilih foto atau seret ke sini"}
              </p>
              <p className="text-sm text-ink-soft max-w-sm">
                Klik area ini untuk memilih foto dari komputer atau HP.
                <br className="hidden sm:block" />
                Format JPG, PNG, atau WEBP. Maksimal {MAX_MB} MB.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-sogan-900 text-paper px-5 py-3 rounded-md group-hover:bg-sogan-800 transition-colors text-sm">
                <Upload size={16} strokeWidth={1.6} />
                Pilih foto
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={onFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <div className="flex items-start gap-2 p-3 bg-bata/10 border border-bata/20 rounded-md text-sm text-bata">
          <AlertCircle size={16} strokeWidth={1.8} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!isConfigured && (
        <p className="text-xs text-ink-mute italic">
          Supabase belum di-setup. Set NEXT_PUBLIC_SUPABASE_URL &amp;
          NEXT_PUBLIC_SUPABASE_ANON_KEY di env.
        </p>
      )}
    </div>
  );
}
