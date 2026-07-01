import Link from "next/link";
import { FileText, Users, ArrowUpRight, Image as ImageIcon, Pencil } from "lucide-react";
import { getArticlesAdmin, getPengurusAdmin } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [articles, pengurus] = await Promise.all([
    getArticlesAdmin(),
    getPengurusAdmin(),
  ]);

  return (
    <div>
      <p className="eyebrow text-sogan-500">Dashboard</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900 leading-tight">
        Selamat datang, pengurus.
      </h1>
      <p className="mt-4 text-ink-soft max-w-2xl">
        Kelola isi situs RT 06 Citran dari sini. Semua perubahan akan langsung
        terlihat oleh warga.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/liputan"
          className="group bg-paper-soft border border-sogan/10 rounded-lg p-6 hover:bg-paper hover:border-sogan/25 hover:-translate-y-0.5 transition-all"
        >
          <FileText size={18} strokeWidth={1.4} className="text-kunyit-600" />
          <p className="eyebrow text-[10px] mt-4">Liputan &amp; Cerita</p>
          <p className="mt-2 font-display text-4xl text-sogan-900">
            {articles.length}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-sogan">
            Kelola liputan
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </Link>

        <Link
          href="/admin/pengurus"
          className="group bg-paper-soft border border-sogan/10 rounded-lg p-6 hover:bg-paper hover:border-sogan/25 hover:-translate-y-0.5 transition-all"
        >
          <Users size={18} strokeWidth={1.4} className="text-kunyit-600" />
          <p className="eyebrow text-[10px] mt-4">Pengurus RT</p>
          <p className="mt-2 font-display text-4xl text-sogan-900">
            {pengurus.length}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-sogan">
            Kelola pengurus
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </Link>
      </div>

      {/* Edit inline / tampilan */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/"
          className="group bg-paper-soft border border-sogan/10 rounded-lg p-6 hover:bg-paper hover:border-kunyit-500/40 transition-all"
        >
          <Pencil size={18} strokeWidth={1.4} className="text-kunyit-600" />
          <p className="eyebrow text-[10px] mt-4">Edit langsung</p>
          <p className="mt-2 font-display text-2xl text-sogan-900 leading-tight">
            Ubah teks di halaman publik
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Buka beranda, klik &quot;Edit halaman&quot; di kanan bawah, lalu klik teks apapun untuk ubah.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-sogan">
            Ke beranda <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link
          href="/admin/tampilan"
          className="group bg-paper-soft border border-sogan/10 rounded-lg p-6 hover:bg-paper hover:border-kunyit-500/40 transition-all"
        >
          <ImageIcon size={18} strokeWidth={1.4} className="text-kunyit-600" />
          <p className="eyebrow text-[10px] mt-4">Tampilan</p>
          <p className="mt-2 font-display text-2xl text-sogan-900 leading-tight">
            Ganti video / foto hero
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Upload video drone atau foto besar buat bagian atas beranda.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-sogan">
            Buka pengaturan <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>

      <div className="mt-16 p-6 bg-kunyit-400/10 border border-kunyit-500/30 rounded-lg">
        <p className="eyebrow text-kunyit-600 text-[10px]">Petunjuk singkat</p>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">
          Kalau Supabase belum di-setup, data yang ditampilkan masih contoh.
          Ikuti langkah setup di README supaya pengurus bisa edit konten
          langsung dari sini.
        </p>
      </div>
    </div>
  );
}
