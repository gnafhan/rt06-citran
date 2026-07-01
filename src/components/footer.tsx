"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { KawungPattern } from "./kawung";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-sogan-900 text-paper-soft mt-32">
      <KawungPattern
        className="absolute -right-24 -bottom-24 h-96 w-96 text-paper animate-slow-rotate"
        opacity={0.08}
      />

      <div className="container-editorial relative py-20">
        <div className="grid gap-16 md:grid-cols-[2fr,1fr,1fr]">
          <div>
            <p className="eyebrow text-kunyit-400">Rukun Tetangga</p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl">
              RT 06 Citran
            </h3>
            <p className="mt-2 font-jawa text-2xl text-kunyit-400">ꦕꦶꦠꦿꦤ꧀</p>
            <p className="mt-6 max-w-md text-paper-soft/70 leading-relaxed">
              Kampung warisan Mataram Islam di kawasan Cagar Budaya Kotagede.
              Bodon, Jagalan, Kapanewon Banguntapan, Kabupaten Bantul, Daerah
              Istimewa Yogyakarta.
            </p>
          </div>

          <div>
            <p className="eyebrow text-kunyit-400 mb-4">Navigasi</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-kunyit-400 transition">Beranda</Link></li>
              <li><Link href="/tentang" className="hover:text-kunyit-400 transition">Tentang Citran</Link></li>
              <li><Link href="/liputan" className="hover:text-kunyit-400 transition">Liputan &amp; Cerita</Link></li>
              <li><Link href="/pengurus" className="hover:text-kunyit-400 transition">Pengurus RT</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-kunyit-400 mb-4">Kontak</p>
            <ul className="space-y-2 text-sm">
              <li className="text-paper-soft/70">Sekretariat RT</li>
              <li>WhatsApp Ketua RT</li>
              <li>Email pengaduan</li>
              <li className="pt-3">
                <Link href="/admin/login" className="text-xs eyebrow text-kunyit-400/60 hover:text-kunyit-400 transition">
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper-soft/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-paper-soft/50">
          <p>
            © {new Date().getFullYear()} RT 06 Citran. Semua liputan &amp;
            foto adalah karya warga.
          </p>
          <p className="font-mono">
            −7.829°S · 110.395°E
          </p>
        </div>
      </div>
    </footer>
  );
}
