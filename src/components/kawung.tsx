import { cn } from "@/lib/utils";

/**
 * KawungPattern — SVG batik kawung motif.
 * Kawung = filosofi kesempurnaan, kemurnian, kebijaksanaan (Sultan Mataram).
 * Dipake sebagai accent visual, bukan wallpaper.
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
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none", className)}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="0.7" opacity={opacity}>
        <ellipse cx="30" cy="30" rx="16" ry="22" />
        <ellipse cx="30" cy="30" rx="22" ry="16" />
        <ellipse cx="90" cy="30" rx="16" ry="22" />
        <ellipse cx="90" cy="30" rx="22" ry="16" />
        <ellipse cx="30" cy="90" rx="16" ry="22" />
        <ellipse cx="30" cy="90" rx="22" ry="16" />
        <ellipse cx="90" cy="90" rx="16" ry="22" />
        <ellipse cx="90" cy="90" rx="22" ry="16" />
        <circle cx="30" cy="30" r="2.5" fill={color} opacity={opacity * 1.5} />
        <circle cx="90" cy="30" r="2.5" fill={color} opacity={opacity * 1.5} />
        <circle cx="30" cy="90" r="2.5" fill={color} opacity={opacity * 1.5} />
        <circle cx="90" cy="90" r="2.5" fill={color} opacity={opacity * 1.5} />
      </g>
    </svg>
  );
}

/**
 * Single kawung motif — for accents, bullets, corner marks.
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
      <g fill="none" stroke={color} strokeWidth="1.2">
        <ellipse cx="20" cy="20" rx="10" ry="15" />
        <ellipse cx="20" cy="20" rx="15" ry="10" />
        <circle cx="20" cy="20" r="2" fill={color} />
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
