"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Article } from "@/lib/types";
import { Reveal } from "./reveal";

interface Props {
  articles: Article[];
  sectionEyebrow: string;
}

/**
 * FeaturedCarousel — teaser "Cerita Pilihan" di homepage, dark section.
 * Data-driven dari liputan yang sudah dipublish (bukan hardcode 1 cerita),
 * jadi begitu admin nambah artikel baru lewat /admin/liputan, slide baru
 * otomatis kebentuk dan bisa dijelajah lewat panah kiri/kanan.
 *
 * Kalau cuma 1 artikel, panah disembunyikan (ga ada gunanya nav 1 slide).
 */
export function FeaturedCarousel({ articles, sectionEyebrow }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  if (articles.length === 0) return null;

  const current = articles[index];
  const hasMultiple = articles.length > 1;

  const goPrev = () =>
    setIndex((i) => (i - 1 + articles.length) % articles.length);
  const goNext = () => setIndex((i) => (i + 1) % articles.length);

  return (
    <div className="grid gap-16 md:grid-cols-2 items-center">
      <Reveal>
        <div className="relative">
          <div className="aspect-[4/5] relative overflow-hidden rounded-lg border border-paper-soft/10 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduce ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(31,26,21,0.4) 100%), url('${current.cover_url || "https://picsum.photos/seed/citran-liputan/800/1000"}')`,
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="eyebrow text-kunyit-400 text-[10px]">
                    {CATEGORY_LABELS[current.category]}
                  </p>
                  <p className="font-display italic text-2xl mt-1 text-paper line-clamp-2">
                    {current.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {hasMultiple && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Cerita sebelumnya"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-md border border-paper-soft/20 text-paper-soft hover:border-paper-soft/50 hover:text-paper transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Cerita berikutnya"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-md border border-paper-soft/20 text-paper-soft hover:border-paper-soft/50 hover:text-paper transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <p
                className="font-mono text-xs text-paper-soft/50"
                aria-live="polite"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(articles.length).padStart(2, "0")}
              </p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="eyebrow text-kunyit-400">{sectionEyebrow}</p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-paper leading-[1.05]">
              {current.title}
            </h2>
            <p className="mt-8 text-paper-soft/70 leading-relaxed max-w-lg">
              {current.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/liputan/${current.slug}`}
                className="group inline-flex items-center gap-3 bg-kunyit-500 text-paper px-6 py-3 rounded-md hover:bg-kunyit-400 transition-colors text-sm font-medium"
              >
                Baca liputan
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/liputan"
                className="inline-flex items-center gap-2 border border-paper-soft/20 hover:border-paper-soft/40 text-paper-soft px-6 py-3 rounded-md transition-colors text-sm"
              >
                Semua liputan
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </div>
  );
}
