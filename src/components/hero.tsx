"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { KawungPattern } from "./kawung";
import { Editable } from "./editable/editable";
import { useEditMode } from "./editable/edit-mode-provider";

interface HeroProps {
  videoSources?: { src: string; type: string }[];
  imageSrc?: string;
  /**
   * Content dari site_content \u2014 di-pass dari server component parent.
   * Kalau ga ada, fallback ke default string.
   */
  content?: {
    eyebrow1?: string;
    eyebrow2?: string;
    coord?: string;
    headline?: string;
    subheadline?: string;
  };
}

const DEFAULT_IMAGE = "https://picsum.photos/seed/kotagede-aerial-v3/2000/1400";

const DEFAULTS = {
  eyebrow1: "Rukun Tetangga 06",
  eyebrow2: "Bodon \u00b7 Jagalan \u00b7 Kotagede",
  coord: "\u22127.829\u00b0S 110.395\u00b0E",
  headline: "Nyawiji ing Warisan Mataram.",
  subheadline:
    "Kampung Citran bertengger di sudut Kotagede\u2014kawasan cagar budaya yang menyimpan denyut Mataram Islam. Gapura tua, gang beringkas, dan warga yang guyub. Ini rumah kami.",
};

export function Hero({
  videoSources,
  imageSrc = DEFAULT_IMAGE,
  content = {},
}: HeroProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const { editMode } = useEditMode();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Kalau lagi edit mode, disable parallax + fade-out biar ga ganggu klik
  const y = useTransform(scrollYProgress, [0, 1], ["0%", editMode || reduce ? "0%" : "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, editMode || reduce ? 1 : 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, editMode ? 1 : 0]);

  const showVideo = videoSources && videoSources.length > 0 && !videoFailed && !reduce;
  const showLoadingPulse = showVideo && !videoReady;

  const headline = content.headline ?? DEFAULTS.headline;

  // Split headline jadi kata-kata untuk animation. Kata ke-3 (index 2)
  // di-emphasize italic + kunyit \u2014 tapi kalau headline pendek, cari kata
  // yang ada 'warisan/mataram/citran' atau default index 2.
  const words = useMemo(() => headline.split(/\s+/), [headline]);
  const emphasizeIndex = useMemo(() => {
    const keywordIdx = words.findIndex((w) =>
      /warisan|mataram|citran|kotagede/i.test(w),
    );
    return keywordIdx >= 0 ? keywordIdx : Math.min(2, words.length - 1);
  }, [words]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-sogan-950"
    >
      {/* Aerial media layer (parallax) */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* Base layer: foto selalu ke-render duluan (LCP cepat, ga nunggu video).
            Video (kalau ada) nge-fade di atasnya begitu udah beneran mulai main,
            jadi ga ada "loncatan" kaku dari poster ke frame video. */}
        <div
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[3000ms] ease-out ${
            showLoadingPulse ? "scale-[1.03]" : "scale-100"
          }`}
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        {/* Subtle shimmer sweep while video is buffering — signals "masih memuat"
            tanpa nutupin foto poster (yang sekarang = frame pertama video asli,
            jadi transisi ke video mulus, ga ada loncatan). */}
        {showLoadingPulse && (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full animate-hero-shimmer bg-gradient-to-r from-transparent via-paper/10 to-transparent" />
          </div>
        )}
        {showVideo && (
          <video
            key={videoSources![0]?.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            onStalled={() => setVideoFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            {videoSources!.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
        {/* Darkening scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-sogan-950/25 via-sogan-950/30 to-sogan-950/70" />
      </motion.div>

      <KawungPattern
        className="absolute -top-32 -left-32 h-[500px] w-[500px] text-kunyit-400 animate-slow-rotate mix-blend-soft-light"
        opacity={0.4}
      />
      <KawungPattern
        className="absolute -bottom-24 -right-24 h-[400px] w-[400px] text-kunyit-400 mix-blend-soft-light"
        opacity={0.3}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32"
      >
        <div className="container-editorial">
          {/* Meta line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 md:mb-10"
          >
            <Editable
              contentKey="hero.eyebrow1"
              defaultValue={content.eyebrow1 ?? DEFAULTS.eyebrow1}
              as="span"
              className="eyebrow text-paper-soft/80"
            />
            <span className="hidden md:inline text-paper-soft/40">·</span>
            <Editable
              contentKey="hero.eyebrow2"
              defaultValue={content.eyebrow2 ?? DEFAULTS.eyebrow2}
              as="span"
              className="eyebrow text-paper-soft/60"
            />
            <span className="hidden md:inline text-paper-soft/40">·</span>
            <Editable
              contentKey="hero.coord"
              defaultValue={content.coord ?? DEFAULTS.coord}
              as="span"
              className="font-mono text-xs text-paper-soft/50"
            />
          </motion.div>

          {/* Headline \u2014 editable jadi 1 field, animation split per-kata */}
          <div className="max-w-5xl">
            {editMode ? (
              // Edit mode: render sebagai satu <Editable> multiline biar gampang di-edit,
              // ga pake per-word animation supaya ga bingung admin
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-paper leading-[0.95] tracking-tight">
                <Editable
                  contentKey="hero.headline"
                  defaultValue={headline}
                  multiline
                  as="span"
                  className="text-paper"
                />
              </h1>
            ) : (
              <motion.h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-paper leading-[0.95] tracking-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
                  },
                }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block mr-4 md:mr-6"
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {i === emphasizeIndex ? (
                      <em className="italic text-kunyit-400 not-italic-safe">
                        {word}
                      </em>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.h1>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 max-w-2xl"
            >
              <Editable
                contentKey="hero.subheadline"
                defaultValue={content.subheadline ?? DEFAULTS.subheadline}
                multiline
                as="p"
                className="text-lg md:text-xl text-paper-soft/85 leading-relaxed"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper-soft/60"
        >
          <span className="eyebrow text-[10px]">Gulir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
