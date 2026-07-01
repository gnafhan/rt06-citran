"use client";

import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import type { Article, ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { ImageUpload } from "@/components/image-upload";

interface Props {
  article?: Article;
  action: (formData: FormData) => Promise<void>;
}

export function ArticleForm({ article, action }: Props) {
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState(article?.cover_url ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      await action(formData);
      // redirect() dari server action lempar NEXT_REDIRECT — ketangkep
      // di bawah, tapi itu bukan error. Kita ga sampai sini kalau sukses
      // karena Next.js langsung navigate.
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // NEXT_REDIRECT is Next.js internal redirect signal, not a real error
      if (msg.includes("NEXT_REDIRECT")) return;
      setError(msg || "Gagal menyimpan. Coba lagi ya.");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="eyebrow text-[10px] block mb-2">Judul</label>
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-display text-2xl text-sogan-900"
          placeholder="Judul liputan..."
        />
      </div>

      <div>
        <label className="eyebrow text-[10px] block mb-2">Ringkasan</label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={article?.excerpt}
          className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all"
          placeholder="Satu-dua kalimat yang muncul di kartu artikel."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="eyebrow text-[10px] block mb-2">Kategori</label>
          <select
            name="category"
            defaultValue={article?.category ?? "cerita"}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all text-sogan-900"
          >
            {(Object.keys(CATEGORY_LABELS) as ArticleCategory[]).map((k) => (
              <option key={k} value={k}>
                {CATEGORY_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow text-[10px] block mb-2">Penulis</label>
          <input
            name="author"
            defaultValue={article?.author ?? "Redaksi Citran"}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all"
          />
        </div>
      </div>

      <ImageUpload
        name="cover_url"
        value={coverUrl}
        onChange={setCoverUrl}
        label="Foto cover artikel"
        aspectRatio="16/10"
      />

      <div>
        <label className="eyebrow text-[10px] block mb-2">
          Isi liputan (mendukung ## untuk sub-judul, baris kosong untuk paragraf baru)
        </label>
        <textarea
          name="body"
          required
          rows={16}
          defaultValue={article?.body}
          className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-mono text-sm leading-relaxed"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={article?.published ?? true}
          className="h-4 w-4 accent-sogan"
        />
        <label htmlFor="published" className="text-sm text-ink-soft">
          Terbitkan (uncheck untuk simpan sebagai draft)
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-4 bg-bata/10 border border-bata/20 rounded-md text-sm text-bata">
          <AlertCircle size={16} strokeWidth={1.8} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Gagal menyimpan</p>
            <p className="opacity-90">{error}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t border-sogan/10">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-sogan-900 text-paper px-6 py-3 rounded-md hover:bg-sogan-800 transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Simpan
        </button>
      </div>
    </form>
  );
}
