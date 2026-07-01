"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, LayoutGrid, Network } from "lucide-react";
import type { Pengurus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { KawungMark } from "@/components/kawung";
import { StrukturDiagram } from "./struktur-diagram";

interface Props {
  pengurus: Pengurus[];
  periodes: string[];
}

type ViewMode = "diagram" | "grid";

export function PeriodeTabs({ pengurus, periodes }: Props) {
  const [active, setActive] = useState(periodes[0]);
  const [view, setView] = useState<ViewMode>("diagram");
  const currentPengurus = pengurus.filter((p) => p.periode === active);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-2 border-b border-sogan/10">
        <div
          role="tablist"
          aria-label="Periode kepengurusan"
          className="flex flex-wrap items-center gap-2"
        >
          {periodes.map((periode) => {
            const isActive = periode === active;
            return (
              <button
                key={periode}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(periode)}
                className={cn(
                  "relative px-5 py-3 text-sm font-mono tracking-widest transition-colors",
                  isActive
                    ? "text-sogan-900"
                    : "text-ink-mute hover:text-sogan-700",
                )}
              >
                <span className="relative z-10">Periode {periode}</span>
                {isActive && (
                  <motion.span
                    layoutId="periode-underline"
                    className="absolute inset-x-3 -bottom-[9px] h-[2px] bg-sogan"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* View mode toggle */}
        <div
          role="group"
          aria-label="Tampilan"
          className="inline-flex items-center gap-1 p-1 rounded-md border border-sogan/15 bg-paper-soft"
        >
          <button
            type="button"
            aria-label="Tampilan bagan struktur"
            aria-pressed={view === "diagram"}
            onClick={() => setView("diagram")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-colors",
              view === "diagram"
                ? "bg-sogan-900 text-paper"
                : "text-ink-mute hover:text-sogan-900",
            )}
          >
            <Network size={13} strokeWidth={1.6} />
            Bagan
          </button>
          <button
            type="button"
            aria-label="Tampilan grid"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-colors",
              view === "grid"
                ? "bg-sogan-900 text-paper"
                : "text-ink-mute hover:text-sogan-900",
            )}
          >
            <LayoutGrid size={13} strokeWidth={1.6} />
            Grid
          </button>
        </div>
      </div>

      {/* Content: Diagram or Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${view}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {view === "diagram" ? (
            <StrukturDiagram pengurus={currentPengurus} />
          ) : (
            <GridView pengurus={currentPengurus} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Extracted grid view supaya struktur code lebih clean
function GridView({ pengurus }: { pengurus: Pengurus[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pengurus.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-paper-soft border border-sogan/10 rounded-lg p-8 hover:bg-paper hover:border-sogan/25 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative h-16 w-16 rounded-full bg-paper-deep border border-sogan/10 flex items-center justify-center overflow-hidden">
                  {p.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.photo_url}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <User size={22} strokeWidth={1.4} className="text-sogan-500/50" />
                  )}
                </div>
                <KawungMark className="h-5 w-5 text-kunyit-500/40 transition-all duration-700 group-hover:opacity-100 group-hover:rotate-45" />
              </div>

              <p className="eyebrow text-kunyit-600 text-[10px]">
                {p.jabatan}
              </p>
              <h3 className="mt-2 font-display text-2xl text-sogan-900 leading-tight">
                {p.name}
              </h3>

              {p.bio && (
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                  {p.bio}
                </p>
              )}

              {p.contact && (
                <div className="mt-6 pt-6 border-t border-sogan/10">
                  <a
                    href={
                      p.contact.startsWith("0")
                        ? `https://wa.me/62${p.contact.replace(/^0/, "").replace(/\D/g, "")}`
                        : `tel:${p.contact}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sogan hover:text-sogan-900 transition-colors"
                  >
                    <Phone size={13} strokeWidth={1.5} />
                    {p.contact}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
    </div>
  );
}
