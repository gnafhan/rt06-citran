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
  if (editing) {
    return (
      <span className="relative inline-flex flex-col gap-2 w-full my-1 group">
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
            className={cn(
              "w-full bg-paper border-2 border-kunyit-500 rounded-md px-3 py-2 focus:outline-none focus:border-sogan resize-none",
              className,
            )}
            rows={3}
          />
        ) : (
          <input
            ref={(r) => {
              inputRef.current = r;
            }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            className={cn(
              "w-full bg-paper border-2 border-kunyit-500 rounded-md px-3 py-2 focus:outline-none focus:border-sogan",
              className,
            )}
          />
        )}
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-sogan-900 text-paper px-3 py-1.5 rounded text-xs hover:bg-sogan-800 disabled:opacity-50"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            Simpan
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={saving}
            className="inline-flex items-center gap-1.5 border border-sogan/25 text-sogan-700 px-3 py-1.5 rounded text-xs hover:bg-paper-soft disabled:opacity-50"
          >
            <X size={12} />
            Batal
          </button>
          <span className="text-[10px] font-mono text-ink-mute hidden sm:inline">
            {multiline ? "Ctrl+Enter simpan · Esc batal" : "Enter simpan · Esc batal"}
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
