import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * KawungPattern — SVG batik kawung motif.
 * Kawung = filosofi kesempurnaan, kemurnian, kebijaksanaan (Sultan Mataram).
 * Dipake sebagai accent visual, bukan wallpaper.
 *
 * Struktur asli kawung: grid lingkaran/oval besar yang disusun rapat
 * bertumpuk-tindih (bukan 4 elips kecil yang "floating" kayak simbol atom).
 * Tiap lingkaran punya isen (titik pengisi) di dalamnya, dan celah
 * berbentuk bintang-4-ujung di antara 4 lingkaran yang bersinggungan diisi
 * ornamen diamond kecil — ini yang bikin kawung terasa "seamless" & padat,
 * bukan motif yang renggang. Versi sebelumnya (2 elips overlap x4, terpisah
 * jauh satu sama lain) salah bentuk dasarnya sama sekali.
 */
export function KawungPattern({
  className,
  color = "currentColor",
  opacity = 0.35,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`kawung-${id}`}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={color} strokeWidth="0.7" opacity={opacity}>
            {/* 5 lingkaran bertumpuk (4 pojok + 1 tengah) — bersinggungan
                pas (r = setengah spacing), bukan overlap acak. */}
            <circle cx="0" cy="0" r="14" />
            <circle cx="40" cy="0" r="14" />
            <circle cx="0" cy="40" r="14" />
            <circle cx="40" cy="40" r="14" />
            <circle cx="20" cy="20" r="14" />
            {/* isen: titik pengisi di tengah tiap lingkaran */}
            <circle cx="0" cy="0" r="1.3" fill={color} stroke="none" />
            <circle cx="40" cy="0" r="1.3" fill={color} stroke="none" />
            <circle cx="0" cy="40" r="1.3" fill={color} stroke="none" />
            <circle cx="40" cy="40" r="1.3" fill={color} stroke="none" />
            <circle cx="20" cy="20" r="1.3" fill={color} stroke="none" />
            {/* diamond ornamen di celah bintang-4-ujung antar lingkaran */}
            <path
              d="M 20 6 L 22.5 8.5 L 20 11 L 17.5 8.5 Z"
              fill={color}
              stroke="none"
              opacity={opacity * 1.4}
            />
            <path
              d="M 20 29 L 22.5 31.5 L 20 34 L 17.5 31.5 Z"
              fill={color}
              stroke="none"
              opacity={opacity * 1.4}
            />
            <path
              d="M 6 20 L 8.5 22.5 L 11 20 L 8.5 17.5 Z"
              fill={color}
              stroke="none"
              opacity={opacity * 1.4}
            />
            <path
              d="M 29 20 L 31.5 22.5 L 34 20 L 31.5 17.5 Z"
              fill={color}
              stroke="none"
              opacity={opacity * 1.4}
            />
          </g>
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#kawung-${id})`} />
    </svg>
  );
}

/**
 * Single kawung motif — for accents, bullets, corner marks. Satu "rosette"
 * dari pattern yang sama dipake di KawungPattern: 5 lingkaran bersinggungan
 * (4 di sekeliling + 1 tengah) dengan isen dot di pusat.
 */
export function KawungMark({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.3">
        <circle cx="20" cy="5" r="10" />
        <circle cx="20" cy="35" r="10" />
        <circle cx="5" cy="20" r="10" />
        <circle cx="35" cy="20" r="10" />
        <circle cx="20" cy="20" r="10" />
        <circle cx="20" cy="20" r="1.6" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

/**
 * KawungDivider — horizontal ornament between sections.
 */
export function KawungDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 py-8 text-sogan-500/40",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current" />
      <KawungMark className="h-5 w-5" />
      <KawungMark className="h-6 w-6" />
      <KawungMark className="h-5 w-5" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
