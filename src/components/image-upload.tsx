"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, X, Loader2, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: Error | null, result: { event?: string; info?: { secure_url?: string } }) => void,
      ) => { open: () => void };
    };
  }
}

interface Props {
  name: string;
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

/**
 * ImageUpload — Cloudinary unsigned upload widget dengan fallback URL input.
 *
 * Kalau env NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + PRESET terisi, tampilin widget
 * drag-and-drop. Kalau engga, fallback ke plain URL input.
 */
export function ImageUpload({
  name,
  value,
  onChange,
  label = "Foto",
  aspectRatio = "16/10",
}: Props) {
  const [ready, setReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const scriptLoadedRef = useRef(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryConfigured = !!(cloudName && uploadPreset);

  useEffect(() => {
    if (!cloudinaryConfigured || scriptLoadedRef.current) return;
    if (window.cloudinary) {
      setReady(true);
      return;
    }

    scriptLoadedRef.current = true;
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, [cloudinaryConfigured]);

  function openWidget() {
    if (!ready || !window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "camera", "url"],
        multiple: false,
        maxFileSize: 10_000_000, // 10MB
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        folder: "rt06-citran",
        showAdvancedOptions: false,
        cropping: false,
        styles: {
          palette: {
            window: "#F4EBD9",
            windowBorder: "#6B4423",
            tabIcon: "#6B4423",
            menuIcons: "#6B4423",
            textDark: "#1F1A15",
            textLight: "#F4EBD9",
            link: "#6B4423",
            action: "#C9A55B",
            inactiveTabIcon: "#8A7F76",
            error: "#A94438",
            inProgress: "#C9A55B",
            complete: "#5A7A5A",
            sourceBg: "#FBF5E8",
          },
        },
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          setUploading(false);
          return;
        }
        if (result.event === "upload-added") setUploading(true);
        if (result.event === "success" && result.info?.secure_url) {
          onChange(result.info.secure_url);
          setUploading(false);
        }
        if (result.event === "close") setUploading(false);
      },
    );

    widget.open();
  }

  return (
    <div>
      <label className="eyebrow text-[10px] block mb-2">{label}</label>

      {/* Preview */}
      {value && (
        <div
          className="relative rounded-lg overflow-hidden border border-sogan/15 mb-3 bg-paper-deep group"
          style={{ aspectRatio }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-sogan-900/85 text-paper p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bata"
            aria-label="Hapus foto"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      )}

      <input type="hidden" name={name} value={value} />

      {/* Upload actions */}
      <div className="flex flex-wrap gap-2">
        {cloudinaryConfigured ? (
          <button
            type="button"
            onClick={openWidget}
            disabled={!ready || uploading}
            className={cn(
              "inline-flex items-center gap-2 border border-sogan/15 bg-paper text-sogan-900 px-4 py-2.5 rounded-md hover:bg-paper-soft hover:border-sogan/30 transition-all text-sm disabled:opacity-50",
            )}
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <UploadCloud size={14} strokeWidth={1.5} />
            )}
            {value ? "Ganti foto" : "Unggah foto"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="inline-flex items-center gap-2 text-sm text-ink-mute hover:text-sogan-900 px-3 py-2.5 transition-colors"
        >
          <LinkIcon size={13} strokeWidth={1.5} />
          {showUrlInput ? "Sembunyikan URL" : "Atau tempel URL"}
        </button>
      </div>

      {(!cloudinaryConfigured || showUrlInput) && (
        <div className="mt-3">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-mono text-xs"
            placeholder="https://res.cloudinary.com/..."
          />
          {!cloudinaryConfigured && (
            <p className="mt-2 text-xs text-ink-mute">
              Cloudinary belum diaktifkan. Set <code className="font-mono text-[10px] bg-paper-soft px-1.5 py-0.5 rounded">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code>
              {" "}dan preset di <code className="font-mono text-[10px] bg-paper-soft px-1.5 py-0.5 rounded">.env.local</code> untuk mengaktifkan drag-and-drop.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
