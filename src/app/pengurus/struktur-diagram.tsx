"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import type { Pengurus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { KawungMark } from "@/components/kawung";

interface Props {
  pengurus: Pengurus[];
}

// ============================================================
// Auto-classify jabatan ke level hierarki.
// Fuzzy match (case-insensitive, substring) supaya toleran
// terhadap variasi ejaan yang pengurus masukin lewat admin.
// ============================================================
type Level = "ketua" | "wakil" | "staf" | "koordinator" | "anggota";

function classifyLevel(jabatan: string): Level {
  const j = jabatan.toLowerCase().trim();

  // Wakil harus dicek dulu supaya "Wakil Ketua RT" ga ke-match "Ketua RT"
  if (j.includes("wakil ketua rt") || j === "wakil rt" || j === "wakil") {
    return "wakil";
  }
  if (
    j === "ketua rt" ||
    j === "ketua" ||
    j === "rt" ||
    (j.startsWith("ketua ") && !j.includes("bidang") && !j.includes("pkk") && !j.includes("karang") && !j.includes("seksi"))
  ) {
    // "Ketua RT" masuk level 1. "Ketua PKK", "Ketua Karang Taruna" tetep koordinator (level 4).
    if (j.includes("rt") || j === "ketua") return "ketua";
  }
  if (j.includes("sekretaris") || j.includes("bendahara")) {
    return "staf";
  }
  // Koordinator bidang / seksi
  if (
    j.includes("pkk") ||
    j.includes("karang taruna") ||
    j.includes("keamanan") ||
    j.includes("ronda") ||
    j.includes("kesehatan") ||
    j.includes("humas") ||
    j.includes("sosial") ||
    j.includes("keagamaan") ||
    j.includes("pendidikan") ||
    j.includes("olahraga") ||
    j.includes("lingkungan") ||
    j.includes("koordinator") ||
    j.includes("seksi") ||
    j.startsWith("ketua ")
  ) {
    return "koordinator";
  }
  return "anggota";
}

function groupByLevel(pengurus: Pengurus[]) {
  const buckets: Record<Level, Pengurus[]> = {
    ketua: [],
    wakil: [],
    staf: [],
    koordinator: [],
    anggota: [],
  };
  for (const p of pengurus) {
    buckets[classifyLevel(p.jabatan)].push(p);
  }
  // Sort tiap bucket by order_index kalau ada, fallback nama
  for (const k of Object.keys(buckets) as Level[]) {
    buckets[k].sort(
      (a, b) => (a.order_index ?? 999) - (b.order_index ?? 999) || a.name.localeCompare(b.name),
    );
  }
  return buckets;
}

// ============================================================
// Kartu person kecil (dipake berulang di semua level).
// ============================================================
function PersonCard({
  p,
  variant = "default",
  delay = 0,
}: {
  p: Pengurus;
  variant?: "default" | "top" | "wakil";
  delay?: number;
}) {
  const isTop = variant === "top";
  const isWakil = variant === "wakil";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative group",
        "bg-paper-soft border rounded-lg transition-all duration-500",
        "hover:bg-paper hover:-translate-y-0.5",
        isTop
          ? "border-sogan/40 bg-paper shadow-[0_2px_20px_-8px_rgba(107,68,35,0.25)] p-6 w-full"
          : isWakil
            ? "border-sogan/25 p-5"
            : "border-sogan/10 p-5 hover:border-sogan/25",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "shrink-0 rounded-full bg-paper-deep border border-sogan/10 overflow-hidden relative",
            isTop ? "h-14 w-14" : "h-11 w-11",
          )}
        >
          {p.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.photo_url}
              alt={p.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <User
                size={isTop ? 20 : 16}
                strokeWidth={1.4}
                className="text-sogan-500/50"
              />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "eyebrow text-[9px] leading-tight",
              isTop ? "text-sogan-700" : "text-kunyit-600",
            )}
          >
            {p.jabatan}
          </p>
          <p
            className={cn(
              "font-display leading-tight mt-1 text-sogan-900 truncate",
              isTop ? "text-xl md:text-2xl" : "text-base",
            )}
            title={p.name}
          >
            {p.name}
          </p>
        </div>

        {isTop && (
          <KawungMark className="hidden sm:block shrink-0 h-4 w-4 text-kunyit-500/50" />
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// Main component
// ============================================================
export function StrukturDiagram({ pengurus }: Props) {
  const groups = groupByLevel(pengurus);
  const ketua = groups.ketua[0];
  const wakil = groups.wakil[0];
  const staf = groups.staf;
  const koord = groups.koordinator;
  const anggota = groups.anggota;

  // Kalau kosong sama sekali
  if (pengurus.length === 0) {
    return (
      <div className="text-center py-16 text-ink-mute">
        Belum ada data pengurus untuk periode ini.
      </div>
    );
  }

  // Kalau ga ada ketua sama sekali, fallback ke grid biasa (data ga cukup buat hierarki)
  if (!ketua && !wakil && staf.length === 0 && koord.length === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {anggota.map((p, i) => (
          <PersonCard key={p.id} p={p} delay={i * 0.05} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ============ MOBILE / STACK VIEW (< md) ============ */}
      <div className="md:hidden space-y-4">
        {ketua && (
          <div className="relative">
            <PersonCard p={ketua} variant="top" delay={0} />
            {(wakil || staf.length + koord.length > 0) && (
              <div
                aria-hidden
                className="absolute left-6 top-full h-4 w-px bg-sogan/30"
              />
            )}
          </div>
        )}
        {wakil && (
          <div className="relative pl-6 border-l border-sogan/20">
            <div
              aria-hidden
              className="absolute -left-px top-6 h-px w-6 bg-sogan/30"
            />
            <PersonCard p={wakil} variant="wakil" delay={0.1} />
          </div>
        )}
        {staf.length > 0 && (
          <div className="pl-6 border-l border-sogan/20 space-y-3">
            <p className="eyebrow text-[10px] text-sogan-500 pt-2">Staf Inti</p>
            {staf.map((p, i) => (
              <PersonCard key={p.id} p={p} delay={0.2 + i * 0.05} />
            ))}
          </div>
        )}
        {koord.length > 0 && (
          <div className="pl-6 border-l border-sogan/20 space-y-3">
            <p className="eyebrow text-[10px] text-sogan-500 pt-2">
              Koordinator Bidang
            </p>
            {koord.map((p, i) => (
              <PersonCard key={p.id} p={p} delay={0.35 + i * 0.05} />
            ))}
          </div>
        )}
        {anggota.length > 0 && (
          <div className="pl-6 border-l border-sogan/20 space-y-3">
            <p className="eyebrow text-[10px] text-sogan-500 pt-2">Anggota</p>
            {anggota.map((p, i) => (
              <PersonCard key={p.id} p={p} delay={0.5 + i * 0.05} />
            ))}
          </div>
        )}
      </div>

      {/* ============ DESKTOP / DIAGRAM VIEW (>= md) ============ */}
      <div className="hidden md:block">
        {/* Level 1: Ketua RT (centered) */}
        {ketua && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <PersonCard p={ketua} variant="top" delay={0} />
            </div>
          </div>
        )}

        {/* Connector Level 1 → Level 2/3 */}
        {ketua && (wakil || staf.length + koord.length > 0) && (
          <Connector delay={0.15} />
        )}

        {/* Level 2: Wakil (kalau ada) — offset kanan, spawn dari Ketua */}
        {wakil && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <PersonCard p={wakil} variant="wakil" delay={0.2} />
            </div>
          </div>
        )}

        {/* Connector Wakil → Level 3 (kalau ada wakil dan ada level di bawahnya) */}
        {wakil && (staf.length + koord.length > 0) && <Connector delay={0.3} />}

        {/* Level 3: Staf Inti (Sekretaris, Bendahara) */}
        {staf.length > 0 && (
          <div className="mt-2">
            <p className="eyebrow text-[10px] text-sogan-500 text-center mb-6">
              Staf Inti
            </p>
            <BranchGrid items={staf} delay={0.35} />
          </div>
        )}

        {/* Connector Staf → Koordinator */}
        {staf.length > 0 && koord.length > 0 && <Connector delay={0.5} />}

        {/* Level 4: Koordinator Bidang */}
        {koord.length > 0 && (
          <div className="mt-2">
            <p className="eyebrow text-[10px] text-sogan-500 text-center mb-6">
              Koordinator Bidang
            </p>
            <BranchGrid items={koord} delay={0.55} />
          </div>
        )}

        {/* Anggota (kalau ada yang ga ke-classify) */}
        {anggota.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow text-[10px] text-sogan-500 text-center mb-6">
              Anggota
            </p>
            <BranchGrid items={anggota} delay={0.7} />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Vertical connector line dengan fade-in dari atas ke bawah
// ============================================================
function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex justify-center py-4" aria-hidden>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
        className="h-8 w-px bg-gradient-to-b from-sogan/40 to-sogan/10"
      />
    </div>
  );
}

// ============================================================
// Grid horizontal untuk 1 branch, dengan garis penghubung ke atas
// ============================================================
function BranchGrid({
  items,
  delay = 0,
}: {
  items: Pengurus[];
  delay?: number;
}) {
  const count = items.length;
  const cols =
    count === 1 ? "grid-cols-1 max-w-md mx-auto" :
    count === 2 ? "grid-cols-2 max-w-2xl mx-auto" :
    count === 3 ? "grid-cols-3 max-w-4xl mx-auto" :
    count === 4 ? "grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto" :
    "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto";

  return (
    <div className="relative">
      {/* Horizontal connector di atas grid (kalau > 1) */}
      {count > 1 && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[10%] right-[10%] -top-4 h-px bg-sogan/25"
          style={{ transformOrigin: "center" }}
        />
      )}
      <div className={cn("grid gap-4", cols)}>
        {items.map((p, i) => (
          <div key={p.id} className="relative">
            {/* Vertical connector dari garis horizontal ke kartu */}
            {count > 1 && (
              <motion.div
                aria-hidden
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  delay: delay + 0.15 + i * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: "top" }}
                className="absolute left-1/2 -top-4 h-4 w-px bg-sogan/25 -translate-x-1/2"
              />
            )}
            <PersonCard p={p} delay={delay + 0.2 + i * 0.06} />
          </div>
        ))}
      </div>
    </div>
  );
}
