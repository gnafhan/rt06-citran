"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Editable } from "./editable/editable";

interface Props {
  content: Record<string, string>;
}

const DEFAULTS = {
  "nav.brand": "RT 06 Citran",
  "nav.brand_sub": "Bodon \u00b7 Jagalan \u00b7 Kotagede",
  "nav.beranda": "Beranda",
  "nav.tentang": "Tentang",
  "nav.liputan": "Liputan",
  "nav.pengurus": "Pengurus",
  "nav.cta": "Kontak",
};

const NAV_ITEMS = [
  { href: "/", key: "nav.beranda" as const },
  { href: "/tentang", key: "nav.tentang" as const },
  { href: "/liputan", key: "nav.liputan" as const },
  { href: "/pengurus", key: "nav.pengurus" as const },
];

function pick(map: Record<string, string>, key: keyof typeof DEFAULTS) {
  return map[key] ?? DEFAULTS[key];
}

export function Navbar({ content }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  // Only the homepage has a full-bleed photo/video hero directly behind the
  // fixed transparent navbar. Every other route (tentang/liputan/pengurus)
  // starts on the light cream body background, where the default dark nav
  // colors already read fine. So "light nav mode" only kicks in on "/" while
  // unscrolled — once scrolled, the paper/85 backdrop takes over and dark
  // text works everywhere.
  const onDarkHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-paper/85 backdrop-blur-xl border-b border-sogan/10"
            : "bg-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="container-editorial flex h-full items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo RT 06 Citran"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full transition-transform duration-500 group-hover:rotate-12"
              priority
            />
            <div className="flex flex-col leading-none">
              <Editable
                contentKey="nav.brand"
                defaultValue={pick(content, "nav.brand")}
                as="span"
                className={cn(
                  "font-display text-lg transition-colors duration-500",
                  onDarkHero ? "text-paper" : "text-sogan-900",
                )}
              />
              <Editable
                contentKey="nav.brand_sub"
                defaultValue={pick(content, "nav.brand_sub")}
                as="span"
                className={cn(
                  "eyebrow text-[10px] mt-0.5 transition-colors duration-500",
                  onDarkHero && "text-paper-soft/70",
                )}
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm transition-colors duration-500",
                      onDarkHero
                        ? active
                          ? "text-paper"
                          : "text-paper-soft/75 hover:text-paper"
                        : active
                          ? "text-sogan-900"
                          : "text-ink-soft hover:text-sogan-900",
                    )}
                  >
                    <Editable
                      contentKey={item.key}
                      defaultValue={pick(content, item.key)}
                      as="span"
                    />
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-px transition-colors duration-500",
                          onDarkHero ? "bg-paper" : "bg-sogan",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tentang#kontak"
              className={cn(
                "text-sm px-4 py-2 rounded-md transition-all duration-500",
                onDarkHero
                  ? "border border-paper-soft/40 text-paper hover:border-paper-soft/70 hover:bg-paper/10"
                  : "border border-sogan/20 text-ink hover:border-sogan/40 hover:bg-paper-soft",
              )}
            >
              <Editable
                contentKey="nav.cta"
                defaultValue={pick(content, "nav.cta")}
                as="span"
              />
            </Link>
          </div>

          <button
            className={cn(
              "md:hidden p-2 -mr-2 transition-colors duration-500",
              onDarkHero ? "text-paper" : "text-sogan-900",
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
            style={{ paddingTop: "var(--nav-h)" }}
          >
            <ul className="container-editorial flex flex-col gap-1 pt-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-3xl text-sogan-900 border-b border-sogan/10"
                  >
                    {pick(content, item.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
