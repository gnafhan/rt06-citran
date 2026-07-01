import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPengurusAdmin } from "@/lib/queries";
import { getPeriodes } from "@/lib/sample-data";
import { PengurusForm } from "../pengurus-form";
import { createPengurus } from "../actions";

export default async function NewPengurusPage() {
  const existing = await getPengurusAdmin();
  const periodes = getPeriodes(existing);

  return (
    <div>
      <Link
        href="/admin/pengurus"
        className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>
      <p className="eyebrow text-sogan-500">Pengurus baru</p>
      <h1 className="mt-4 mb-12 font-display text-4xl md:text-5xl text-sogan-900">
        Tambah pengurus
      </h1>
      <PengurusForm action={createPengurus} existingPeriodes={periodes} />
    </div>
  );
}
