import type { Article, Pengurus } from "./types";

/**
 * Sample data — dipake sebagai fallback kalau Supabase belum di-setup.
 * Nanti kalau env Supabase lengkap, query real DB dari sini di-swap.
 */

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    slug: "tim-kroncong-citran",
    title: "Suami Bu Rini, dan Senar-Senar yang Tak Pernah Putus",
    excerpt:
      "Tim Kroncong Citran bukan cuma grup musik. Ini ruang di mana generasi bertemu—dan Pak Bamuskal jadi jembatannya.",
    body: `Ini konten placeholder. Nanti diisi oleh editor via halaman admin.

## Awal Mula

Bapak Bamuskal mulai memegang biola sejak muda. Dari lorong-lorong Kotagede, ia belajar dari para pemusik senior yang kini sebagian sudah tiada.

## Grup Kroncong Citran

Grup ini terbentuk secara organik. Kumpul dulu, main lagu, baru dinamai belakangan. Di rumah Bu Rini—istri Pak Bamuskal—latihan mingguan berjalan hampir seperti pengajian: teratur, khidmat, hangat.`,
    cover_url: "https://picsum.photos/seed/kroncong-citran-cover/1600/1000",
    category: "profil",
    author: "Redaksi Citran",
    published: true,
    published_at: "2026-06-15T00:00:00.000Z",
    updated_at: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "2",
    slug: "kerja-bakti-gapura-lama",
    title: "Kerja Bakti Gapura Lama, Cat Kembali Terangnya",
    excerpt:
      "Minggu pagi, warga RT 06 turun ke gang untuk memperbaiki gapura yang sudah menua. Ini bukan cuma soal cat.",
    body: "Konten placeholder untuk artikel kerja bakti.",
    cover_url: "https://picsum.photos/seed/gapura-citran/1600/1000",
    category: "kegiatan",
    author: "Karang Taruna Citran",
    published: true,
    published_at: "2026-05-28T00:00:00.000Z",
    updated_at: "2026-05-28T00:00:00.000Z",
  },
  {
    id: "3",
    slug: "cerita-mbah-tentang-kotagede",
    title: "Cerita Mbah Tentang Kotagede yang Belum Sempat Ditulis",
    excerpt:
      "Tiga sesepuh berkumpul di serambi mushola. Yang keluar bukan cuma cerita—tapi lapisan sejarah yang belum pernah masuk buku.",
    body: "Konten placeholder untuk artikel sejarah.",
    cover_url: "https://picsum.photos/seed/mbah-kotagede/1600/1000",
    category: "sejarah",
    author: "Redaksi Citran",
    published: true,
    published_at: "2026-04-10T00:00:00.000Z",
    updated_at: "2026-04-10T00:00:00.000Z",
  },
  {
    id: "4",
    slug: "posyandu-april",
    title: "Posyandu April: Data Anak dan Ibu Hamil",
    excerpt:
      "Rekap kegiatan Posyandu bulan April. Catatan singkat untuk transparansi warga.",
    body: "Konten placeholder untuk pengumuman posyandu.",
    cover_url: "https://picsum.photos/seed/posyandu-citran/1600/1000",
    category: "pengumuman",
    author: "PKK RT 06",
    published: true,
    published_at: "2026-04-05T00:00:00.000Z",
    updated_at: "2026-04-05T00:00:00.000Z",
  },
];

export const SAMPLE_PENGURUS: Pengurus[] = [
  // Periode 2023-2026
  { id: "p1", name: "Nama Ketua RT", jabatan: "Ketua RT", periode: "2023-2026", photo_url: null, contact: "0812-xxxx-xxxx", bio: "Menjabat sebagai Ketua RT sejak 2023.", order_index: 1 },
  { id: "p2", name: "Nama Sekretaris", jabatan: "Sekretaris", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 2 },
  { id: "p3", name: "Nama Bendahara", jabatan: "Bendahara", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 3 },
  { id: "p4", name: "Nama Ketua Karang Taruna", jabatan: "Karang Taruna", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 4 },
  { id: "p5", name: "Nama Ketua PKK", jabatan: "Ketua PKK", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 5 },
  // Periode 2020-2023 (historical)
  { id: "p6", name: "Nama Ketua RT Sebelumnya", jabatan: "Ketua RT", periode: "2020-2023", photo_url: null, contact: null, bio: null, order_index: 1 },
  { id: "p7", name: "Nama Sekretaris Sebelumnya", jabatan: "Sekretaris", periode: "2020-2023", photo_url: null, contact: null, bio: null, order_index: 2 },
];

export function getPeriodes(pengurus: Pengurus[]): string[] {
  return Array.from(new Set(pengurus.map((p) => p.periode))).sort().reverse();
}
