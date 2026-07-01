import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles } from "@/lib/queries";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { KawungDivider, KawungPattern } from "@/components/kawung";

export const metadata: Metadata = {
  title: "Liputan & Cerita",
  description:
    "Kumpulan cerita, kegiatan, profil warga, dan sejarah dari RT 06 Citran, Bodon.",
};

export const revalidate = 60;

export default async function LiputanPage() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24 overflow-hidden">
        <KawungPattern
          className="absolute top-32 -right-40 h-[500px] w-[500px] text-sogan-400 animate-drift"
          opacity={0.1}
        />
        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Liputan &amp; Cerita</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-sogan-900 leading-[1] max-w-5xl">
              Kampung ini <em className="italic text-sogan">didokumentasikan</em>,
              bukan cuma dilalui.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Setiap kegiatan, setiap warga yang punya cerita menarik, setiap
              lapisan sejarah—kami dokumentasikan. Halaman ini tempat semuanya
              berkumpul.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="pb-16 md:pb-24">
          <div className="container-editorial">
            <Reveal>
              <Link
                href={`/liputan/${featured.slug}`}
                className="group grid gap-8 md:gap-12 md:grid-cols-[1.3fr,1fr] items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper-deep">
                  {featured.cover_url && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] group-hover:scale-105"
                      style={{ backgroundImage: `url('${featured.cover_url}')` }}
                    />
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="eyebrow text-[10px] bg-paper/90 backdrop-blur px-3 py-1.5 rounded">
                      Cerita Pilihan
                    </span>
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-kunyit-600 text-[10px]">
                    {CATEGORY_LABELS[featured.category]} · {formatDate(featured.published_at)}
                  </p>
                  <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-sogan-900 leading-[1.02] transition-colors group-hover:text-sogan">
                    {featured.title}
                  </h2>
                  <p className="mt-6 text-lg text-ink-soft leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm eyebrow text-sogan">
                    Baca liputan
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <KawungDivider />

      {/* Grid rest */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-12">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl text-sogan-900">
                Semua liputan
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow text-sogan-500">
                {rest.length + (featured ? 1 : 0)} artikel
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {rest.map((a) => (
              <StaggerItem key={a.id}>
                <Link
                  href={`/liputan/${a.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-deep mb-5">
                    {a.cover_url && (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
                        style={{ backgroundImage: `url('${a.cover_url}')` }}
                      />
                    )}
                  </div>
                  <p className="eyebrow text-kunyit-600 text-[10px]">
                    {CATEGORY_LABELS[a.category]} · {formatDate(a.published_at)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-sogan-900 leading-tight transition-colors group-hover:text-sogan">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
                    {a.excerpt}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
