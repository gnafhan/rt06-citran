"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Eye, LayoutDashboard, Loader2 } from "lucide-react";
import { useEditMode } from "./edit-mode-provider";
import { cn } from "@/lib/utils";

export function EditFloatingToolbar() {
  const { editMode, toggleEditMode, savingCount } = useEditMode();
  const saving = savingCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed bottom-5 right-5 z-[60] print:hidden"
      role="toolbar"
      aria-label="Admin toolbar"
    >
      <div className="flex items-center gap-1.5 rounded-full bg-sogan-950 text-paper-soft border border-sogan-800/50 px-1.5 py-1.5 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)] backdrop-blur">
        <button
          type="button"
          onClick={toggleEditMode}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono tracking-wider transition-colors",
            editMode
              ? "bg-kunyit-500 text-sogan-950 hover:bg-kunyit-400"
              : "hover:bg-sogan-800 text-paper-soft",
          )}
          aria-pressed={editMode}
          title={editMode ? "Keluar dari mode edit" : "Masuk mode edit"}
        >
          {editMode ? (
            <>
              <Eye size={13} strokeWidth={1.8} />
              Selesai edit
            </>
          ) : (
            <>
              <Pencil size={13} strokeWidth={1.8} />
              Edit halaman
            </>
          )}
        </button>

        <AnimatePresence>
          {saving && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="inline-flex items-center gap-1.5 px-2 text-[10px] font-mono tracking-wider text-kunyit-400 overflow-hidden whitespace-nowrap"
            >
              <Loader2 size={11} className="animate-spin" />
              menyimpan
            </motion.span>
          )}
        </AnimatePresence>

        <div className="h-5 w-px bg-sogan-800/60 mx-0.5" />

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full text-xs text-paper-soft/80 hover:bg-sogan-800 hover:text-paper transition-colors"
          title="Buka dashboard admin"
        >
          <LayoutDashboard size={12} strokeWidth={1.6} />
          <span className="hidden sm:inline">Admin</span>
        </Link>
      </div>
    </motion.div>
  );
}
