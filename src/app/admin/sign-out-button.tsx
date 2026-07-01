"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink-soft hover:bg-paper hover:text-bata transition-colors"
    >
      <LogOut size={16} strokeWidth={1.5} />
      Keluar
    </button>
  );
}
