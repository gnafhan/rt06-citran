import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/queries";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { KawungDivider } from "@/components/kawung";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover_url ? [article.cover_url] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export const revalidate = 60;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      {/* Cover */}
      {article.cover_url && (
        <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(31,26,21,0.2) 0%, rgba(31,26,21,0.7) 100%), url('${article.cover_url}')`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 pb-16">
            <div className="container-editorial">
              <Reveal>
                <Link
                  href="/liputan"
                  className="inline-flex items-center gap-2 text-paper-soft/80 hover:text-paper text-sm eyebrow mb-6 transition-colors"
                >
                  <ArrowLeft size={14} /> Kembali ke liputan
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow text-kunyit-400">
                  {CATEGORY_LABELS[article.category]} · {formatDate(article.published_at)}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl text-paper leading-[1] max-w-4xl">
                  {article.title}
                </h1>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-6 text-paper-soft/70 eyebrow text-xs">
                  Oleh {article.author}
                </p>
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
              {article.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 prose-editorial text-lg text-ink-soft leading-[1.8] space-y-6">
              {article.body.split(/\n{2,}/).map((para, i) => {
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

          <KawungDivider />

          <Reveal>
            <Link
              href="/liputan"
              className="inline-flex items-center gap-2 text-sm eyebrow text-sogan hover:text-sogan-900 transition-colors"
            >
              <ArrowLeft size={14} /> Lihat semua liputan
            </Link>
          </Reveal>
        </div>
      </article>
    </>
  );
}
