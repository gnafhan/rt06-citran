"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { useEditMode } from "./edit-mode-provider";
import { cn } from "@/lib/utils";

interface Props {
  contentKey: string;
  defaultValue: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  /** kalau true, tampil sebagai italic emphasize (buat inline <em>) */
  emphasize?: boolean;
}

/**
 * Editable inline text. Kalau isAdmin=false, render biasa aja (span/div/p).
 * Kalau isAdmin=true & editMode=true, klik untuk edit inline.
 */
export function Editable({
  contentKey,
  defaultValue,
  as = "span",
  multiline = false,
  className,
  placeholder = "(kosong)",
  emphasize = false,
}: Props) {
  const { isAdmin, editMode, registerSaving, showToast } = useEditMode();
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(defaultValue);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  // Sync from server on re-render (kalau server pass value baru setelah revalidate)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Auto-resize textarea
      if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      }
    }
  }, [editing, multiline]);

  const startEdit = useCallback(() => {
    if (!isAdmin || !editMode || saving) return;
    setDraft(value);
    setEditing(true);
  }, [isAdmin, editMode, saving, value]);

  const cancel = useCallback(() => {
    setDraft(value);
    setEditing(false);
  }, [value]);

  const save = useCallback(async () => {
    const trimmed = draft.trim();
    if (trimmed === value.trim()) {
      setEditing(false);
      return;
    }
    setSaving(true);
    const done = registerSaving();
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: contentKey, content: trimmed }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      setValue(trimmed);
      setEditing(false);
      showToast("Tersimpan");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal simpan";
      showToast(msg, "error");
    } finally {
      setSaving(false);
      done();
    }
  }, [draft, value, contentKey, registerSaving, showToast]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      } else if (
        e.key === "Enter" &&
        (!multiline || (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        save();
      }
    },
    [cancel, save, multiline],
  );

  // ---------- VIEWER MODE (public / edit mode off) ----------
  if (!isAdmin || !editMode) {
    const Tag = as;
    if (emphasize) {
      return (
        <em className={cn("italic", className)}>{value || placeholder}</em>
      );
    }
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  // ---------- EDITING MODE ----------
  //
  // PENTING: kita SENGAJA ga inherit className parent ke input/textarea.
  // Alasan: parent className sering bawa warna teks/font-size dari section
  // (misal 'text-paper-soft/70' di footer gelap, atau 'text-[10px] eyebrow').
  // Kalau di-inherit, input jadi krem-di-krem (invisible) atau size aneh.
  // Kita reset ke style neutral editor: bg krem terang, teks sogan gelap,
  // font body, size normal, always readable regardless of parent context.
  //
  // Layout tombol pake stack vertikal (block) supaya Simpan/Batal ga nempel
  // input meski parent-nya inline (<p>, <h3>, <Link>) — kita wrap dgn
  // display:block via `!block` biar force di semua konteks.
  if (editing) {
    return (
      <span
        className="editable-editing relative w-full my-2 not-italic"
        style={{
          display: "block",
          fontStyle: "normal",
          letterSpacing: "normal",
          textTransform: "none",
        }}
      >
        {multiline ? (
          <textarea
            ref={(r) => {
              inputRef.current = r;
            }}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={onKeyDown}
            className="block w-full bg-paper text-sogan-900 placeholder:text-ink-mute border-2 border-kunyit-500 rounded-md px-3 py-2 text-base leading-snug font-sans focus:outline-none focus:border-sogan focus:ring-2 focus:ring-kunyit-500/25 resize-none shadow-sm"
            rows={3}
          />
        ) : (
          <input
            type="text"
            ref={(r) => {
              inputRef.current = r;
            }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            className="block w-full bg-paper text-sogan-900 placeholder:text-ink-mute border-2 border-kunyit-500 rounded-md px-3 py-2 text-base leading-snug font-sans focus:outline-none focus:border-sogan focus:ring-2 focus:ring-kunyit-500/25 shadow-sm"
          />
        )}
        <span
          className="mt-2 flex flex-wrap items-center gap-2"
          style={{ display: "flex" }}
        >
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-sogan-900 text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-sogan-800 disabled:opacity-50 shadow-sm not-italic"
            style={{ fontStyle: "normal", letterSpacing: "normal" }}
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            Simpan
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-paper border border-sogan/30 text-sogan-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-paper-soft hover:border-sogan/60 disabled:opacity-50 not-italic"
            style={{ fontStyle: "normal", letterSpacing: "normal" }}
          >
            <X size={14} />
            Batal
          </button>
          <span
            className="text-[11px] font-mono text-ink-mute hidden sm:inline ml-1 not-italic"
            style={{ fontStyle: "normal", letterSpacing: "normal", textTransform: "none" }}
          >
            {multiline
              ? "Ctrl+Enter simpan · Esc batal"
              : "Enter simpan · Esc batal"}
          </span>
        </span>
      </span>
    );
  }

  // ---------- ADMIN HOVER STATE ----------
  const Tag = as;
  const inner = emphasize ? (
    <em className="italic">{value || placeholder}</em>
  ) : (
    (value || placeholder)
  );

  return (
    <Tag
      className={cn(
        "relative inline group cursor-pointer transition-colors",
        "outline outline-1 outline-dashed outline-kunyit-500/30 outline-offset-4 rounded-sm",
        "hover:outline-kunyit-500/70 hover:bg-kunyit-500/5",
        !value && "text-ink-mute italic",
        className,
      )}
      onClick={startEdit}
      title="Klik untuk edit"
    >
      {inner}
      <Pencil
        size={11}
        strokeWidth={2}
        className="inline-block ml-1.5 opacity-30 group-hover:opacity-100 text-kunyit-600 align-middle transition-opacity"
      />
    </Tag>
  );
}
