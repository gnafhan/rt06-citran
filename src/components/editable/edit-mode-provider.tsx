"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { EditFloatingToolbar } from "./floating-toolbar";
import { EditToast } from "./toast";

interface Ctx {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  savingCount: number;
  registerSaving: () => () => void;
  showToast: (msg: string, tone?: "success" | "error") => void;
}

const EditModeCtx = createContext<Ctx | null>(null);

export function useEditMode() {
  const ctx = useContext(EditModeCtx);
  if (!ctx) throw new Error("useEditMode harus di dalam <EditModeProvider>");
  return ctx;
}

export function EditModeProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const [editMode, setEditMode] = useState(false);
  const [savingCount, setSavingCount] = useState(0);
  const [toast, setToast] = useState<{ msg: string; tone: "success" | "error"; id: number } | null>(null);

  // Persist edit mode toggle di localStorage
  useEffect(() => {
    if (!isAdmin) return;
    const stored = localStorage.getItem("rt06_edit_mode");
    if (stored === "1") setEditMode(true);
  }, [isAdmin]);

  const toggleEditMode = useCallback(() => {
    setEditMode((v) => {
      const nv = !v;
      try {
        localStorage.setItem("rt06_edit_mode", nv ? "1" : "0");
      } catch {}
      return nv;
    });
  }, []);

  const registerSaving = useCallback(() => {
    setSavingCount((n) => n + 1);
    return () => setSavingCount((n) => Math.max(0, n - 1));
  }, []);

  const showToast = useCallback((msg: string, tone: "success" | "error" = "success") => {
    setToast({ msg, tone, id: Date.now() });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ isAdmin, editMode, toggleEditMode, savingCount, registerSaving, showToast }),
    [isAdmin, editMode, toggleEditMode, savingCount, registerSaving, showToast],
  );

  return (
    <EditModeCtx.Provider value={value}>
      {children}
      {isAdmin && <EditFloatingToolbar />}
      {toast && <EditToast key={toast.id} message={toast.msg} tone={toast.tone} />}
    </EditModeCtx.Provider>
  );
}
