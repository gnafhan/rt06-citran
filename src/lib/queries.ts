import { createClient } from "./supabase/server";
import { SAMPLE_ARTICLES, SAMPLE_PENGURUS } from "./sample-data";
import type { Article, Pengurus } from "./types";

/**
 * Data layer.
 *
 * Public queries (`getArticles`, `getPengurus`, `getArticleBySlug`) fallback ke
 * sample data supaya situs publik tetap punya isi walaupun tabel Supabase
 * kosong. Ini bagus buat first impression.
 *
 * Admin queries (`*Admin`) TIDAK fallback: mereka baca real database aja,
 * karena id sample data ("1", "2", ...) bukan UUID valid dan bakal bikin
 * update/delete lempar Postgres error 22P02 (invalid input syntax for uuid).
 */

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
  );
}

// ===== ADMIN queries (strict: real DB only) =====

export async function getArticlesAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) {
    console.error("[getArticlesAdmin]", error);
    return [];
  }
  return (data ?? []) as Article[];
}

export async function getArticleByIdAdmin(id: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) return null;
  // UUID validation (v4 loose regex) — cegah 22P02 error dari Postgres
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[getArticleByIdAdmin]", error);
    return null;
  }
  return (data as Article) ?? null;
}

export async function getPengurusAdmin(): Promise<Pengurus[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .order("periode", { ascending: false })
    .order("order_index", { ascending: true });
  if (error) {
    console.error("[getPengurusAdmin]", error);
    return [];
  }
  return (data ?? []) as Pengurus[];
}

export async function getPengurusByIdAdmin(id: string): Promise<Pengurus | null> {
  if (!isSupabaseConfigured()) return null;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[getPengurusByIdAdmin]", error);
    return null;
  }
  return (data as Pengurus) ?? null;
}

// ===== PUBLIC queries (with sample-data fallback) =====

export async function getArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) return SAMPLE_ARTICLES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return SAMPLE_ARTICLES;
    return data as Article[];
  } catch {
    return SAMPLE_ARTICLES;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return SAMPLE_ARTICLES.find((a) => a.slug === slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return SAMPLE_ARTICLES.find((a) => a.slug === slug) ?? null;
    }
    return data as Article;
  } catch {
    return SAMPLE_ARTICLES.find((a) => a.slug === slug) ?? null;
  }
}

export async function getPengurus(): Promise<Pengurus[]> {
  if (!isSupabaseConfigured()) return SAMPLE_PENGURUS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pengurus")
      .select("*")
      .order("periode", { ascending: false })
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) return SAMPLE_PENGURUS;
    return data as Pengurus[];
  } catch {
    return SAMPLE_PENGURUS;
  }
}
