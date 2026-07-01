import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/content
 * Body: { key: string, content: string }
 *
 * Save 1 content item. Auth guard via Supabase server client \u2014 kalau
 * ga login, RLS bakal reject write. Path yang perlu di-revalidate
 * di-derive dari key prefix ("home." -> revalidate "/", etc.).
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Body validate
  let body: { key?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const key = String(body.key ?? "").trim();
  const content = String(body.content ?? "");

  if (!key || key.length > 200) {
    return NextResponse.json({ error: "invalid_key" }, { status: 400 });
  }
  // Whitelist key format: alnum + dot + dash + underscore. Cegah injeksi
  if (!/^[a-z0-9._-]+$/.test(key)) {
    return NextResponse.json({ error: "invalid_key_format" }, { status: 400 });
  }
  if (content.length > 20_000) {
    return NextResponse.json({ error: "content_too_long" }, { status: 400 });
  }

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, content }, { onConflict: "key" });

  if (error) {
    console.error("[api/content] upsert error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate path sesuai prefix key. nav.* / footer.* / hero.* muncul di
  // semua halaman (via root layout), jadi harus revalidate layout root.
  if (
    key.startsWith("nav.") ||
    key.startsWith("footer.") ||
    key.startsWith("hero.")
  ) {
    revalidatePath("/", "layout");
  } else if (key.startsWith("home.")) {
    revalidatePath("/");
  } else if (key.startsWith("tentang.")) {
    revalidatePath("/tentang");
  } else if (key.startsWith("liputan.")) {
    revalidatePath("/liputan");
  } else if (key.startsWith("pengurus.")) {
    revalidatePath("/pengurus");
  }

  return NextResponse.json({ ok: true });
}
