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

  const { error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/liputan");
  revalidatePath(`/liputan/${updates.title}`);
  revalidatePath("/admin/liputan");
  redirect("/admin/liputan");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/liputan");
  revalidatePath("/admin/liputan");
}
