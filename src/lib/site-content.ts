import { createClient } from "./supabase/server";

/**
 * Site content store \u2014 key-value store buat teks/heading yang bisa
 * di-edit inline dari halaman publik oleh admin.
 *
 * `getAllContent()` di-panggil sekali per page render, hasil di-cache
 * dalam React server tree via `unstable_cache` (kalau perlu nanti).
 */

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
  );
}

export type ContentMap = Record<string, string>;

/**
 * Ambil semua site_content, return sebagai flat map { key: content }.
 * Aman di server components: kalau Supabase belum di-setup atau tabel
 * kosong, return {} \u2014 komponen fallback ke default text.
 */
export async function getAllContent(): Promise<ContentMap> {
  if (!isSupabaseConfigured()) return {};
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, content");
    if (error || !data) return {};
    const map: ContentMap = {};
    for (const row of data) map[row.key] = row.content;
    return map;
  } catch {
    return {};
  }
}

/**
 * Ambil content dari map dengan fallback default \u2014 dipake di
 * server components untuk render text yang bisa di-edit.
 */
export function pick(
  map: ContentMap,
  key: string,
  defaultValue: string,
): string {
  return map[key] ?? defaultValue;
}
