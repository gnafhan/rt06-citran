import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPengurusAdmin, getPengurusByIdAdmin } from "@/lib/queries";
import { getPeriodes } from "@/lib/sample-data";
import { PengurusForm } from "../pengurus-form";
import { updatePengurus, deletePengurus } from "../actions";
import { DeletePengurusButton } from "./delete-button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPengurusPage({ params }: Props) {
  const { id } = await params;
  const pengurus = await getPengurusByIdAdmin(id);
  if (!pengurus) notFound();
  const all = await getPengurusAdmin();

  const boundUpdate = updatePengurus.bind(null, id);
  const boundDelete = deletePengurus.bind(null, id);
  const periodes = getPeriodes(all);

  return (
    <div>
      <Link
        href="/admin/pengurus"
        className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="eyebrow text-sogan-500">Edit pengurus</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900">
            {pengurus.name}
          </h1>
          <p className="eyebrow text-[10px] text-kunyit-600 mt-2">
            {pengurus.jabatan} · Periode {pengurus.periode}
          </p>
        </div>
        <DeletePengurusButton action={boundDelete} />
      </div>
      <PengurusForm
        pengurus={pengurus}
        action={boundUpdate}
        existingPeriodes={periodes}
      />
    </div>
  );
}
