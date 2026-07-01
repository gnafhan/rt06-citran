"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { ArticleCategory } from "@/lib/types";

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const category = String(formData.get("category") ?? "cerita") as ArticleCategory;
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null;
  const author = String(formData.get("author") ?? "Redaksi Citran").trim();
  const published = formData.get("published") === "on";

  if (!title || !excerpt || !body) {
    throw new Error("Judul, ringkasan, dan isi wajib diisi.");
  }

  const slug = slugify(title);

  const { error } = await supabase.from("articles").insert({
    slug,
    title,
    excerpt,
    body,
    category,
    cover_url,
    author,
    published,
    published_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/liputan");
  revalidatePath("/admin/liputan");
  redirect("/admin/liputan");
}

export async function updateArticle(id: string, formData: FormData) {
  // Guard: id harus UUID valid. Kalau engga, kasih pesan jelas ke user
  // bukan lempar Postgres 22P02 error yang bikin generic "server error".
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error(
      "Artikel ini adalah contoh yang belum tersimpan di database. " +
      "Silakan buat liputan baru dari tombol 'Tulis baru' di dashboard admin."
    );
  }

  const supabase = await createClient();

  const updates = {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    category: String(formData.get("category") ?? "cerita"),
    cover_url: String(formData.get("cover_url") ?? "").trim() || null,
    author: String(formData.get("author") ?? "Redaksi Citran").trim(),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  // Fetch existing slug supaya kita bisa revalidate path yang tepat
  const { data: existing } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/liputan");
  if (existing?.slug) revalidatePath(`/liputan/${existing.slug}`);
  revalidatePath("/admin/liputan");
  redirect("/admin/liputan");
}

export async function deleteArticle(id: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error("ID tidak valid.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/liputan");
  revalidatePath("/admin/liputan");
}
