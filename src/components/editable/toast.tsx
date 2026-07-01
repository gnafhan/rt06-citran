"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  message: string;
  tone: "success" | "error";
  durationMs?: number;
}

export function EditToast({ message, tone, durationMs = 2500 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 right-5 z-[70] print:hidden"
        >
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2.5 shadow-lg text-sm",
              tone === "success"
                ? "bg-daun/95 text-paper border border-daun-800/30"
                : "bg-bata/95 text-paper border border-bata/50",
            )}
          >
            {tone === "success" ? (
              <Check size={14} strokeWidth={2.2} />
            ) : (
              <AlertCircle size={14} strokeWidth={2} />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
