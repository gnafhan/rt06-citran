"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { KawungMark } from "./kawung";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/liputan", label: "Liputan" },
  { href: "/pengurus", label: "Pengurus" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Admin routes ga pake public navbar
  if (pathname?.startsWith("/admin")) return null;

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
            <KawungMark className="h-8 w-8 text-sogan transition-transform duration-500 group-hover:rotate-45" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg text-sogan-900">
                RT 06 Citran
              </span>
              <span className="eyebrow text-[10px] mt-0.5">
                Bodon · Jagalan · Kotagede
              </span>
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
                      "relative px-4 py-2 text-sm transition-colors",
                      active
                        ? "text-sogan-900"
                        : "text-ink-soft hover:text-sogan-900",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-sogan"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
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
              className="text-sm border border-sogan/20 hover:border-sogan/40 hover:bg-paper-soft px-4 py-2 rounded-md transition-all"
            >
              Kontak
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-sogan-900"
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
                    {item.label}
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
