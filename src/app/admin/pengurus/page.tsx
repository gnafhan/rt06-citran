import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getPengurus } from "@/lib/queries";
import { getPeriodes } from "@/lib/sample-data";

export const revalidate = 0;

export default async function AdminPengurusPage() {
  const pengurus = await getPengurus();
  const periodes = getPeriodes(pengurus);

  return (
    <div>
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="eyebrow text-sogan-500">Pengurus RT</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900">
            Kelola pengurus
          </h1>
          <p className="mt-4 text-ink-soft max-w-2xl">
            Daftar pengurus dari setiap periode. Tambahkan pengurus baru saat
            terjadi pergantian, arsipkan periode lama supaya rekam jejak
            tersimpan.
          </p>
        </div>
        <Link
          href="/admin/pengurus/baru"
          className="inline-flex items-center gap-2 bg-sogan-900 text-paper px-5 py-3 rounded-md hover:bg-sogan-800 transition-colors text-sm shrink-0"
        >
          <Plus size={16} strokeWidth={1.6} />
          Tambah
        </Link>
      </div>

      <div className="space-y-12">
        {periodes.map((periode) => {
          const items = pengurus.filter((p) => p.periode === periode);
          return (
            <div key={periode}>
              <p className="eyebrow text-kunyit-600 mb-4">Periode {periode}</p>
              <div className="border border-sogan/10 rounded-lg divide-y divide-sogan/10 overflow-hidden">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 hover:bg-paper-soft transition-colors"
                  >
                    <div
                      className="h-11 w-11 rounded-full bg-paper-deep border border-sogan/10 shrink-0 bg-cover bg-center"
                      style={
                        p.photo_url
                          ? { backgroundImage: `url('${p.photo_url}')` }
                          : {}
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-sogan-900 truncate">
                        {p.name}
                      </p>
                      <p className="eyebrow text-[10px] text-kunyit-600 mt-0.5">
                        {p.jabatan}
                        {p.contact && ` · ${p.contact}`}
                      </p>
                    </div>
                    <Link
                      href={`/admin/pengurus/${p.id}`}
                      className="inline-flex items-center gap-2 text-sm text-sogan hover:text-sogan-900 px-3 py-2 rounded-md hover:bg-paper transition-colors"
                    >
                      <Pencil size={14} strokeWidth={1.5} />
                      Edit
                    </Link>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="p-8 text-center text-ink-mute text-sm">
                    Belum ada pengurus di periode ini.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
