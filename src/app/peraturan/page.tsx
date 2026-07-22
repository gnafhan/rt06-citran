import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { KawungPattern } from "@/components/kawung";
import { PeraturanTabs } from "./peraturan-tabs";

export const metadata: Metadata = {
  title: "Peraturan RT",
  description:
    "Peraturan RT 06 Citran: ketertiban & norma kesusilaan, serta ketertiban pengamen, pengemis, dan aktivitas meminta sumbangan di lingkungan RT.",
};

export const revalidate = false;

export default function PeraturanPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-12 md:pt-56 md:pb-16 overflow-hidden">
        <KawungPattern
          className="absolute top-20 -left-40 h-[500px] w-[500px] text-sogan-400 animate-drift"
          opacity={0.12}
        />
        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Peraturan RT 06 Citran</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-sogan-900 leading-[1] max-w-4xl">
              Dua aturan bersama, satu tujuan:{" "}
              <em className="italic text-sogan">kampung yang rukun</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Dua peraturan berikut ditetapkan berdasarkan hasil musyawarah
              warga RT 06 Citran—pedoman bersama untuk menjaga ketertiban,
              keamanan, dan keharmonisan lingkungan. Pilih dokumen di bawah
              untuk membaca selengkapnya.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-editorial">
          <PeraturanTabs />
        </div>
      </section>
    </>
  );
}
