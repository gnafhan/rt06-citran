"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { KawungPattern } from "./kawung";

interface HeroProps {
  /**
   * Video sources buat drone aerial. Support multiple format (webm > mp4).
   * Kalau kosong, fallback ke `imageSrc`.
   */
  videoSources?: { src: string; type: string }[];
  /**
   * Poster image (tampil sebelum video load, atau kalau video gagal / user
   * pake `prefers-reduced-motion`). Wajib diisi.
   */
  imageSrc?: string;
}

const DEFAULT_IMAGE = "https://picsum.photos/seed/kotagede-aerial-v3/2000/1400";

export function Hero({
  videoSources,
  imageSrc = DEFAULT_IMAGE,
}: HeroProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Video only shown when: sources provided, not failed, and reduced-motion off
  const showVideo = videoSources && videoSources.length > 0 && !videoFailed && !reduce;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-sogan-950"
    >
      {/* Aerial media layer (parallax) */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={imageSrc}
            onError={() => setVideoFailed(true)}
            onStalled={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            {videoSources!.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${imageSrc}')` }}
          />
        )}
        {/* Darkening scrim on top biar text kebaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-sogan-950/25 via-sogan-950/30 to-sogan-950/70" />
      </motion.div>

      {/* Kawung ornament layers */}
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
          {/* Meta line — coordinates + jawa */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 md:mb-10"
          >
            <span className="eyebrow text-paper-soft/80">
              Rukun Tetangga 06
            </span>
            <span className="hidden md:inline text-paper-soft/40">·</span>
            <span className="eyebrow text-paper-soft/60">
              Bodon · Jagalan · Kotagede
            </span>
            <span className="hidden md:inline text-paper-soft/40">·</span>
            <span className="font-mono text-xs text-paper-soft/50">
              −7.829°S 110.395°E
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-5xl">
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
              {["Nyawiji", "ing", "Warisan", "Mataram."].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-4 md:mr-6"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {i === 2 ? <em className="italic text-kunyit-400">{word}</em> : word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl text-paper-soft/85 leading-relaxed"
            >
              Kampung Citran bertengger di sudut Kotagede—kawasan cagar budaya
              yang menyimpan denyut Mataram Islam. Gapura tua, gang beringkas,
              dan warga yang guyub. Ini rumah kami.
            </motion.p>
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
