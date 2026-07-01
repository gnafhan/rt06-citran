import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { KawungDivider, KawungPattern } from "@/components/kawung";

export const metadata: Metadata = {
  title: "Tentang Citran",
  description:
    "Sejarah, wilayah, dan cerita panjang RT 06 Citran di Bodon, Jagalan, kawasan Cagar Budaya Kotagede.",
};

const TIMELINE = [
  {
    year: "1584",
    title: "Kotagede Berdiri",
    body:
      "Panembahan Senopati mendirikan ibu kota Kesultanan Mataram Islam di kawasan yang kini dikenal sebagai Kotagede. Bodon-Jagalan menjadi bagian ring dalam kerajaan.",
  },
  {
    year: "1587",
    title: "Masjid Gedhe Mataram",
    body:
      "Masjid tertua di Yogyakarta dibangun sebagai pusat spiritual kesultanan. Berdiri kokoh sampai hari ini, sekitar 400 meter dari batas RT 06.",
  },
  {
    year: "abad ke-19",
    title: "Kampung Perak & Kalang",
    body:
      "Kotagede tumbuh sebagai sentra kerajinan perak. Arsitektur rumah kalang (rumah saudagar) mulai menghiasi gang-gang di sekitar Citran.",
  },
  {
    year: "1980–an",
    title: "RT 06 Citran Terbentuk",
    body:
      "Pemekaran administratif memisahkan Citran sebagai satuan RT tersendiri. Aktivitas rukun tetangga—ronda, PKK, Karang Taruna—mulai terstruktur.",
  },
  {
    year: "hari ini",
    title: "Cagar Budaya Aktif",
    body:
      "Bodon-Jagalan resmi masuk Kawasan Cagar Budaya Kotagede. Warga RT 06 turut menjaga situs sejarah sekaligus menghidupkan kegiatan seperti Tim Kroncong.",
  },
];

const CONTACTS = [
  {
    icon: Phone,
    label: "WhatsApp Ketua RT",
    value: "0812-xxxx-xxxx",
    href: "https://wa.me/62812xxxxxxxx",
  },
  {
    icon: Mail,
    label: "Email Pengaduan",
    value: "rt06.citran@gmail.com",
    href: "mailto:rt06.citran@gmail.com",
  },
  {
    icon: MapPin,
    label: "Sekretariat",
    value: "Bodon, Jagalan, Banguntapan",
    href: "https://maps.google.com/?q=-7.829031,110.394556",
  },
];

export default function TentangPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden">
        <KawungPattern
          className="absolute top-20 -left-40 h-[500px] w-[500px] text-sogan-400 animate-drift"
          opacity={0.12}
        />
        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Tentang Kami</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[6rem] text-sogan-900 leading-[0.98] max-w-5xl">
              Satu RT, empat abad <em className="italic text-sogan">warisan</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Citran bukan sekadar nama lingkungan. Ia titik geografis di jantung
              Kotagede, tempat cerita Mataram Islam bertemu dengan hidup
              sehari-hari warganya. Halaman ini menjelaskan siapa kami,
              di mana kami tinggal, dan bagaimana menghubungi pengurus.
            </p>
          </Reveal>
        </div>
      </section>

      <KawungDivider />

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-sogan-500">Garis waktu</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900 max-w-3xl leading-[1.05]">
              Yang terjadi sebelum kami sampai di sini.
            </h2>
          </Reveal>

          <StaggerGroup className="mt-20 space-y-2" stagger={0.1}>
            {TIMELINE.map((item, i) => (
              <StaggerItem
                key={i}
                className="group grid grid-cols-[auto,1fr] md:grid-cols-[160px,1fr] gap-6 md:gap-12 py-8 border-t border-sogan/10 hover:bg-paper-soft/60 transition-colors px-2 -mx-2 rounded-md"
              >
                <div>
                  <p className="font-mono text-xs text-kunyit-600 tracking-widest uppercase">
                    {item.year}
                  </p>
                </div>
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl md:text-3xl text-sogan-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Peta wilayah */}
      <section className="py-24 md:py-32 bg-paper-soft border-y border-sogan/10">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-[1fr,1.4fr] items-start">
            <Reveal>
              <p className="eyebrow text-sogan-500">Wilayah</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-sogan-900 leading-[1.05]">
                Bodon, Jagalan, <em className="italic text-sogan">Kotagede</em>.
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                RT 06 Citran berada di dusun Bodon, Kalurahan Jagalan,
                Kapanewon Banguntapan, Kabupaten Bantul, Daerah Istimewa
                Yogyakarta. Cukup dekat untuk berjalan kaki ke Pasar Kotagede
                dan Masjid Gedhe Mataram.
              </p>
              <dl className="mt-10 space-y-3 font-mono text-sm">
                <div className="flex gap-4">
                  <dt className="w-24 text-ink-mute">Latitude</dt>
                  <dd className="text-sogan-900">−7.8290315°</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-24 text-ink-mute">Longitude</dt>
                  <dd className="text-sogan-900">110.394556°</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-24 text-ink-mute">Elevasi</dt>
                  <dd className="text-sogan-900">±113 mdpl</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg border border-sogan/15">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=110.388%2C-7.833%2C110.401%2C-7.825&amp;layer=mapnik&amp;marker=-7.829031%2C110.394556"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  title="Peta RT 06 Citran"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-32 md:py-40 scroll-mt-24">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-sogan-500">Hubungi Pengurus</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-sogan-900 leading-[1.05] max-w-3xl">
              Pintu selalu terbuka—<em className="italic text-sogan">dalam pengertian sebenarnya</em>.
            </h2>
          </Reveal>

          <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {CONTACTS.map(({ icon: Icon, label, value, href }) => (
              <StaggerItem key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-paper-soft border border-sogan/10 rounded-lg p-8 hover:bg-paper hover:border-sogan/25 hover:-translate-y-1 transition-all duration-500"
                >
                  <Icon size={20} strokeWidth={1.4} className="text-kunyit-600" />
                  <p className="eyebrow text-[10px] mt-6">{label}</p>
                  <p className="mt-2 font-display text-xl md:text-2xl text-sogan-900 leading-tight break-words">
                    {value}
                  </p>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
