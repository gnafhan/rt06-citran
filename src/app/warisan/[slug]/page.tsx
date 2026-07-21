import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { HERITAGE_SITES, getHeritageSite } from "@/lib/heritage-data";
import { Reveal } from "@/components/reveal";
import { KawungDivider, KawungMark } from "@/components/kawung";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getHeritageSite(slug);
  if (!site) return { title: "Warisan tidak ditemukan" };
  return {
    title: site.title,
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      images: site.photos[0] ? [site.photos[0].url] : [],
    },
  };
}

export async function generateStaticParams() {
  return HERITAGE_SITES.map((s) => ({ slug: s.slug }));
}

export const revalidate = 0;

export default async function WarisanDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = getHeritageSite(slug);
  if (!site) notFound();

  const others = HERITAGE_SITES.filter((s) => s.slug !== site.slug);
  const cover = site.photos[0];
  const gallery = site.photos.slice(1);

  return (
    <>
      {/* Cover */}
      {cover && (
        <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(31,26,21,0.2) 0%, rgba(31,26,21,0.75) 100%), url('${cover.url}')`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 pb-16">
            <div className="container-editorial">
              <Reveal>
                <Link
                  href="/#warisan"
                  className="inline-flex items-center gap-2 text-paper-soft/80 hover:text-paper text-sm eyebrow mb-6 transition-colors"
                >
                  <ArrowLeft size={14} /> Kembali ke beranda
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow text-kunyit-400">
                  {site.tag} &middot; {site.year}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl text-paper leading-[1] max-w-4xl">
                  {site.title}
                </h1>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <article className="py-16 md:py-24">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <p className="font-display italic text-2xl md:text-3xl text-sogan leading-snug border-l-2 border-kunyit-500 pl-6">
              {site.intro}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 prose-editorial text-lg text-ink-soft leading-[1.8] space-y-6">
              {site.body.split(/\n{2,}/).map((para, i) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="font-display text-3xl md:text-4xl text-sogan-900 mt-16 mb-6 leading-tight"
                    >
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                return <p key={i}>{para}</p>;
              })}
            </div>
          </Reveal>

          {/* Galeri foto ikonik */}
          {gallery.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-16">
                <p className="eyebrow text-sogan-500 mb-6">Foto Ikonik</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {gallery.map((photo, i) => (
                    <figure
                      key={i}
                      className="group overflow-hidden rounded-lg border border-sogan/10"
                    >
                      <div
                        className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${photo.url}')` }}
                      />
                      <figcaption className="p-3 text-xs text-ink-mute font-mono leading-relaxed">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <KawungDivider />

          <Reveal>
            <Link
              href="/#warisan"
              className="inline-flex items-center gap-2 text-sm eyebrow text-sogan hover:text-sogan-900 transition-colors"
            >
              <ArrowLeft size={14} /> Lihat semua warisan
            </Link>
          </Reveal>
        </div>
      </article>

      {/* Warisan lainnya */}
      {others.length > 0 && (
        <section className="py-24 md:py-32 bg-paper-soft border-t border-sogan/10">
          <div className="container-editorial">
            <Reveal>
              <p className="eyebrow text-sogan-500">Warisan Lainnya</p>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/warisan/${other.slug}`}
                  className="group relative bg-paper border border-sogan/10 rounded-lg p-8 hover:border-sogan/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-xs text-sogan-500 tracking-widest">
                      {other.number}
                    </span>
                    <KawungMark className="h-5 w-5 text-kunyit-500 opacity-40 transition-all duration-700 group-hover:opacity-90 group-hover:rotate-45" />
                  </div>
                  <p className="eyebrow text-[10px] text-kunyit-600 mb-2">
                    {other.tag}
                  </p>
                  <h3 className="font-display text-2xl text-sogan-900 leading-tight">
                    {other.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {other.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm eyebrow text-sogan group-hover:text-sogan-900 transition-colors">
                    Baca selengkapnya
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
