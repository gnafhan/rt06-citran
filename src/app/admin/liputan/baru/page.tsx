import { ArticleForm } from "../article-form";
import { createArticle } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewArticlePage() {
  return (
    <div>
      <Link
        href="/admin/liputan"
        className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>
      <p className="eyebrow text-sogan-500">Liputan baru</p>
      <h1 className="mt-4 mb-12 font-display text-4xl md:text-5xl text-sogan-900">
        Tulis liputan
      </h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}
