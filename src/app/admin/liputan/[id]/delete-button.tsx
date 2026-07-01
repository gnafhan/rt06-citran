"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ action }: { action: () => Promise<void> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Yakin hapus liputan ini? Aksi ini tidak bisa dibatalkan.")) return;
    setLoading(true);
    try {
      await action();
      router.push("/admin/liputan");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 text-sm text-bata hover:bg-bata/10 px-4 py-2 rounded-md transition-colors disabled:opacity-50"
    >
      <Trash2 size={14} strokeWidth={1.5} />
      Hapus
    </button>
  );
}
