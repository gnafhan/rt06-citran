"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function createPengurus(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    jabatan: String(formData.get("jabatan") ?? "").trim(),
    periode: String(formData.get("periode") ?? "").trim(),
    photo_url: String(formData.get("photo_url") ?? "").trim() || null,
    contact: String(formData.get("contact") ?? "").trim() || null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    order_index: Number(formData.get("order_index") ?? 0),
  };

  if (!payload.name || !payload.jabatan || !payload.periode) {
    throw new Error("Nama, jabatan, dan periode wajib diisi.");
  }

  const { error } = await supabase.from("pengurus").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/pengurus");
  revalidatePath("/admin/pengurus");
  redirect("/admin/pengurus");
}

export async function updatePengurus(id: string, formData: FormData) {
  if (!UUID_RE.test(id)) {
    throw new Error(
      "Pengurus ini adalah contoh yang belum tersimpan di database. " +
      "Silakan tambah pengurus baru dari tombol 'Tambah' di daftar pengurus."
    );
  }

  const supabase = await createClient();

  const updates = {
    name: String(formData.get("name") ?? "").trim(),
    jabatan: String(formData.get("jabatan") ?? "").trim(),
    periode: String(formData.get("periode") ?? "").trim(),
    photo_url: String(formData.get("photo_url") ?? "").trim() || null,
    contact: String(formData.get("contact") ?? "").trim() || null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    order_index: Number(formData.get("order_index") ?? 0),
  };

  const { error } = await supabase
    .from("pengurus")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/pengurus");
  revalidatePath("/admin/pengurus");
  redirect("/admin/pengurus");
}

export async function deletePengurus(id: string) {
  if (!UUID_RE.test(id)) throw new Error("ID tidak valid.");
  const supabase = await createClient();
  const { error } = await supabase.from("pengurus").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/pengurus");
  revalidatePath("/admin/pengurus");
}
