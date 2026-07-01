import { createClient } from "./supabase/server";
import { SAMPLE_ARTICLES, SAMPLE_PENGURUS } from "./sample-data";
import type { Article, Pengurus } from "./types";

/**
 * Data layer — otomatis fallback ke sample data kalau Supabase belum di-setup.
 */

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
  );
}

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
