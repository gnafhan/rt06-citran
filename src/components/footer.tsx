"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { KawungPattern } from "./kawung";
import { Editable } from "./editable/editable";

interface Props {
  content: Record<string, string>;
}

const DEFAULTS = {
  "footer.eyebrow": "Rukun Tetangga",
  "footer.title": "RT 06 Citran",
  "footer.aksara": "\uA98B\uA9B6\uA9A0\uA9BF\uA9A4\uA9C0",
  "footer.description":
    "Kampung warisan Mataram Islam di kawasan Cagar Budaya Kotagede. Bodon, Jagalan, Kapanewon Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta.",
  "footer.nav_eyebrow": "Navigasi",
  "footer.contact_eyebrow": "Kontak",
  "footer.contact_1": "Sekretariat RT",
  "footer.contact_2": "WhatsApp Ketua RT",
  "footer.contact_3": "Email pengaduan",
  "footer.copyright_suffix":
    "RT 06 Citran. Semua liputan & foto adalah karya warga.",
  "footer.coord": "\u22127.829\u00b0S \u00b7 110.395\u00b0E",
  "nav.beranda": "Beranda",
  "nav.tentang": "Tentang Citran",
  "nav.liputan": "Liputan & Cerita",
  "nav.pengurus": "Pengurus RT",
};

function pick(map: Record<string, string>, key: keyof typeof DEFAULTS) {
  return map[key] ?? DEFAULTS[key];
}

export function Footer({ content }: Props) {
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
            <Editable
              contentKey="footer.eyebrow"
              defaultValue={pick(content, "footer.eyebrow")}
              as="p"
              className="eyebrow text-kunyit-400"
            />
            <h3 className="mt-3 font-display text-4xl md:text-5xl">
              <Editable
                contentKey="footer.title"
                defaultValue={pick(content, "footer.title")}
                as="span"
              />
            </h3>
            <Editable
              contentKey="footer.aksara"
              defaultValue={pick(content, "footer.aksara")}
              as="p"
              className="mt-2 font-jawa text-2xl text-kunyit-400"
            />
            <Editable
              contentKey="footer.description"
              defaultValue={pick(content, "footer.description")}
              multiline
              as="p"
              className="mt-6 max-w-md text-paper-soft/70 leading-relaxed"
            />
          </div>

          <div>
            <Editable
              contentKey="footer.nav_eyebrow"
              defaultValue={pick(content, "footer.nav_eyebrow")}
              as="p"
              className="eyebrow text-kunyit-400 mb-4"
            />
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-kunyit-400 transition">
                  <Editable
                    contentKey="nav.beranda"
                    defaultValue={pick(content, "nav.beranda")}
                    as="span"
                  />
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-kunyit-400 transition">
                  <Editable
                    contentKey="nav.tentang"
                    defaultValue={pick(content, "nav.tentang")}
                    as="span"
                  />
                </Link>
              </li>
              <li>
                <Link href="/liputan" className="hover:text-kunyit-400 transition">
                  <Editable
                    contentKey="nav.liputan"
                    defaultValue={pick(content, "nav.liputan")}
                    as="span"
                  />
                </Link>
              </li>
              <li>
                <Link href="/pengurus" className="hover:text-kunyit-400 transition">
                  <Editable
                    contentKey="nav.pengurus"
                    defaultValue={pick(content, "nav.pengurus")}
                    as="span"
                  />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Editable
              contentKey="footer.contact_eyebrow"
              defaultValue={pick(content, "footer.contact_eyebrow")}
              as="p"
              className="eyebrow text-kunyit-400 mb-4"
            />
            <ul className="space-y-2 text-sm">
              <li className="text-paper-soft/70">
                <Editable
                  contentKey="footer.contact_1"
                  defaultValue={pick(content, "footer.contact_1")}
                  as="span"
                />
              </li>
              <li>
                <Editable
                  contentKey="footer.contact_2"
                  defaultValue={pick(content, "footer.contact_2")}
                  as="span"
                />
              </li>
              <li>
                <Editable
                  contentKey="footer.contact_3"
                  defaultValue={pick(content, "footer.contact_3")}
                  as="span"
                />
              </li>
              <li className="pt-3">
                <Link
                  href="/admin/login"
                  className="text-xs eyebrow text-kunyit-400/60 hover:text-kunyit-400 transition"
                >
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper-soft/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-paper-soft/50">
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
            <Editable
              contentKey="footer.copyright_suffix"
              defaultValue={pick(content, "footer.copyright_suffix")}
              as="span"
            />
          </p>
          <Editable
            contentKey="footer.coord"
            defaultValue={pick(content, "footer.coord")}
            as="p"
            className="font-mono"
          />
        </div>

        <div className="mt-4 text-center md:text-left text-xs text-paper-soft/40">
          <p>
            Dibuat oleh{" "}
            <a
              href="https://nafhan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kunyit-400/70 hover:text-kunyit-400 transition"
            >
              Ghifari Nafhan
            </a>
            , Tim KKN PPM UGM
          </p>
        </div>
      </div>
    </footer>
  );
}
