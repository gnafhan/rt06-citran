import type { Metadata } from "next";
import { getPengurus } from "@/lib/queries";
import { getPeriodes } from "@/lib/sample-data";
import { Reveal } from "@/components/reveal";
import { KawungPattern } from "@/components/kawung";
import { PeriodeTabs } from "./periode-tabs";

export const metadata: Metadata = {
  title: "Struktur Pengurus",
  description: "Struktur pengurus RT 06 Citran dari periode ke periode.",
};

export const revalidate = 60;

export default async function PengurusPage() {
  const pengurus = await getPengurus();
  const periodes = getPeriodes(pengurus);

  return (
    <>
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24 overflow-hidden">
        <KawungPattern
          className="absolute top-20 -right-40 h-[500px] w-[500px] text-sogan-400 animate-drift"
          opacity={0.12}
        />
        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Struktur Organisasi</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-sogan-900 leading-[1] max-w-4xl">
              Orang-orang di balik <em className="italic text-sogan">RT 06</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Kepengurusan RT berganti tiap tiga tahun. Halaman ini menyimpan
              rekam jejak setiap periode—supaya tidak ada nama yang hilang
              begitu masa jabatan berakhir.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-editorial">
          <PeriodeTabs pengurus={pengurus} periodes={periodes} />
        </div>
      </section>
    </>
  );
}
