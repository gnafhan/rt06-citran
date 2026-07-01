export type ArticleCategory =
  | "kegiatan"
  | "sejarah"
  | "profil"
  | "pengumuman"
  | "cerita";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  category: ArticleCategory;
  author: string;
  published: boolean;
  published_at: string;
  updated_at: string;
}

export interface Pengurus {
  id: string;
  name: string;
  jabatan: string;
  periode: string; // e.g. "2023-2026"
  photo_url: string | null;
  contact: string | null;
  bio: string | null;
  order_index: number;
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  kegiatan: "Kegiatan",
  sejarah: "Sejarah",
  profil: "Profil Warga",
  pengumuman: "Pengumuman",
  cerita: "Cerita",
};
