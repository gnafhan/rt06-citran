import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleByIdAdmin } from "@/lib/queries";
import { ArticleForm } from "../article-form";
import { updateArticle, deleteArticle } from "../actions";
import { DeleteButton } from "./delete-button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleByIdAdmin(id);
  if (!article) notFound();

  const boundUpdate = updateArticle.bind(null, id);
  const boundDelete = deleteArticle.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/liputan"
        className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="eyebrow text-sogan-500">Edit liputan</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900">
            {article.title}
          </h1>
        </div>
        <DeleteButton action={boundDelete} />
      </div>
      <ArticleForm article={article} action={boundUpdate} />
    </div>
  );
}
