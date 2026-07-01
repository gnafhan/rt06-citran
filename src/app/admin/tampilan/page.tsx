import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllContent } from "@/lib/site-content";
import { HeroMediaForm } from "./hero-media-form";

export const revalidate = 0;

export default async function AdminTampilanPage() {
  const content = await getAllContent();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>

      <p className="eyebrow text-sogan-500">Tampilan</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900">
        Media hero
      </h1>
      <p className="mt-4 text-ink-soft max-w-2xl">
        Ganti video atau foto besar di bagian atas beranda. Foto direkomendasikan
        landscape 16:9 minimal 1920&times;1080 px. Video maksimal 20 MB (idealnya
        drone shot Kotagede/Citran, muted, autoplay-friendly).
      </p>

      <div className="mt-12 max-w-3xl">
        <HeroMediaForm
          initialVideo={content["hero.media.video"] ?? ""}
          initialImage={content["hero.media.image"] ?? ""}
        />
      </div>

      <div className="mt-12 max-w-3xl p-5 rounded-md bg-kunyit-400/10 border border-kunyit-500/20 text-sm text-sogan-800 leading-relaxed">
        <p className="eyebrow text-[10px] text-kunyit-600 mb-2">Tips</p>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Kalau upload video besar (&gt; 5 MB), pastikan koneksi stabil.</li>
          <li>
            Buat drone footage baru, kompres dulu:
            <code className="ml-1 px-1.5 py-0.5 bg-paper rounded text-xs">
              ffmpeg -i input.mp4 -crf 26 -preset slow -an -movflags +faststart hero.mp4
            </code>
          </li>
          <li>Kalau video kosong, situs otomatis tampilkan foto saja (aman).</li>
          <li>
            Perubahan bakal langsung terlihat di beranda setelah simpan. Coba
            buka <Link href="/" className="underline">beranda</Link> di tab baru.
          </li>
        </ul>
      </div>
    </div>
  );
}
