import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getArticles } from "@/lib/queries";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminLiputanPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="eyebrow text-sogan-500">Liputan &amp; Cerita</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900">
            Kelola liputan
          </h1>
        </div>
        <Link
          href="/admin/liputan/baru"
          className="inline-flex items-center gap-2 bg-sogan-900 text-paper px-5 py-3 rounded-md hover:bg-sogan-800 transition-colors text-sm"
        >
          <Plus size={16} strokeWidth={1.6} />
          Tulis baru
        </Link>
      </div>

      <div className="border border-sogan/10 rounded-lg divide-y divide-sogan/10 overflow-hidden">
        {articles.length === 0 && (
          <div className="p-12 text-center text-ink-mute">
            Belum ada liputan.
          </div>
        )}
        {articles.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 p-4 hover:bg-paper-soft transition-colors"
          >
            <div className="h-14 w-20 rounded bg-paper-deep bg-cover bg-center shrink-0"
              style={a.cover_url ? { backgroundImage: `url('${a.cover_url}')` } : {}}
            />
            <div className="flex-1 min-w-0">
              <p className="eyebrow text-[10px] text-kunyit-600">
                {CATEGORY_LABELS[a.category]} · {formatDate(a.published_at)}
                {!a.published && " · DRAFT"}
              </p>
              <p className="mt-1 font-display text-lg text-sogan-900 truncate">
                {a.title}
              </p>
            </div>
            <Link
              href={`/admin/liputan/${a.id}`}
              className="inline-flex items-center gap-2 text-sm text-sogan hover:text-sogan-900 px-3 py-2 rounded-md hover:bg-paper transition-colors"
            >
              <Pencil size={14} strokeWidth={1.5} />
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
