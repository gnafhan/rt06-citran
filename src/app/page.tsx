import Link from "next/link";
import { ArrowUpRight, MapPin, Users, Calendar, Camera } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { KawungDivider, KawungMark, KawungPattern } from "@/components/kawung";

const HERITAGE_SITES = [
  {
    number: "01",
    title: "Masjid Gedhe Mataram",
    year: "1587",
    description:
      "Masjid tertua di Yogyakarta, dibangun era Panembahan Senopati sebagai pusat spiritual Mataram Islam. Jaraknya cuma beberapa langkah dari gapura Citran.",
    tag: "Cagar Budaya",
  },
  {
    number: "02",
    title: "Makam Raja-Raja Mataram",
    year: "abad ke-16",
    description:
      "Kompleks pemakaman Panembahan Senopati, Sri Sultan Hamengkurat I, dan raja-raja awal Mataram. Ziarah tetap dijaga hingga hari ini.",
    tag: "Situs Sejarah",
  },
  {
    number: "03",
    title: "Kampung Kotagede",
    year: "sejak 1584",
    description:
      "Ibu kota pertama Kesultanan Mataram Islam. Gang-gang sempit, rumah kalang, dan bengkel perak yang masih berdenyut sampai sekarang.",
    tag: "Warisan Hidup",
  },
];

const HIGHLIGHTS = [
  { icon: MapPin, label: "Wilayah", value: "Bodon RT 06" },
  { icon: Users, label: "Kepala Keluarga", value: "±80 KK" },
  { icon: Calendar, label: "Berdiri", value: "sebelum 1950" },
  { icon: Camera, label: "Cagar Budaya", value: "Kotagede" },
];

export default function HomePage() {
  return (
    <>
      <Hero
        // Sample drone footage buat placeholder. Ganti dengan drone shot
        // Citran/Kotagede beneran nanti (upload ke Supabase Storage bucket
        // "foto/hero/" atau host di CDN video), lalu update src di sini.
        videoSources={[
          {
            src: "https://videos.pexels.com/video-files/2882090/2882090-uhd_3840_2160_30fps.mp4",
            type: "video/mp4",
          },
        ]}
        imageSrc="https://images.pexels.com/videos/2882090/free-video-2882090.jpg?auto=compress&cs=tinysrgb&w=2000"
      />

      {/* ================================
          INTRO EDITORIAL
          ================================ */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <KawungPattern
          className="absolute top-20 -right-32 h-[400px] w-[400px] text-sogan-400 animate-drift"
          opacity={0.12}
        />

        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Selamat datang</p>
          </Reveal>

          <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr,1fr] md:gap-24 items-start">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-sogan-900 leading-[1.05]">
                Kampung yang dijaga <em className="italic text-sogan">kolektif</em>,
                bukan cuma diwarisi.
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="space-y-6 text-ink-soft leading-relaxed md:pt-4">
                <p>
                  RT 06 Citran berdiri di Bodon, Kalurahan Jagalan, Kapanewon
                  Banguntapan, Bantul. Wilayah ini tidak bisa dipisahkan dari
                  Kotagede—titik nol Kerajaan Mataram Islam yang berdiri pada
                  1584.
                </p>
                <p>
                  Setiap gang punya cerita. Setiap gapura punya nama. Warga
                  kami merawat kampung ini bukan sekadar sebagai tempat
                  tinggal, tapi sebagai bagian dari napas panjang sejarah
                  Yogyakarta.
                </p>
                <p className="font-jawa text-2xl text-sogan-600 pt-2">
                  ꦱꦸꦒꦼꦁ​ꦫꦮꦸꦃ
                </p>
              </div>
            </Reveal>
          </div>

          {/* Stats strip */}
          <StaggerGroup className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-sogan/10 border border-sogan/10 rounded-lg overflow-hidden">
            {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
              <StaggerItem
                key={label}
                className="bg-paper-soft p-6 md:p-8 hover:bg-paper transition-colors"
              >
                <Icon size={18} strokeWidth={1.4} className="text-kunyit-600 mb-4" />
                <p className="eyebrow text-[10px]">{label}</p>
                <p className="mt-2 font-display text-2xl md:text-3xl text-sogan-900">
                  {value}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <KawungDivider />

      {/* ================================
          HERITAGE SITES — Editorial cards
          ================================ */}
      <section className="relative py-32 md:py-40">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
            <Reveal>
              <div>
                <p className="eyebrow text-sogan-500">Warisan Sekitar Kami</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-sogan-900 max-w-2xl leading-[1.05]">
                  Berjalan tiga menit, empat abad terlewati.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/tentang"
                className="group inline-flex items-center gap-2 text-sm eyebrow text-sogan hover:text-sogan-900 transition-colors self-start md:self-end"
              >
                Pelajari lebih dalam
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="grid gap-6 md:grid-cols-3" stagger={0.15}>
            {HERITAGE_SITES.map((site) => (
              <StaggerItem
                key={site.number}
                className="group relative bg-paper-soft border border-sogan/10 rounded-lg p-8 md:p-10 hover:bg-paper hover:border-sogan/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs text-sogan-500 tracking-widest">
                    {site.number}
                  </span>
                  <KawungMark className="h-6 w-6 text-kunyit-500 opacity-40 transition-all duration-700 group-hover:opacity-90 group-hover:rotate-45" />
                </div>

                <p className="eyebrow text-[10px] text-kunyit-600 mb-2">
                  {site.tag}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-sogan-900 leading-tight">
                  {site.title}
                </h3>
                <p className="font-mono text-xs text-ink-mute mt-1 mb-6">
                  {site.year}
                </p>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {site.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ================================
          FEATURED STORY — Tim Kroncong teaser
          ================================ */}
      <section className="relative py-32 md:py-40 bg-sogan-900 text-paper-soft overflow-hidden">
        <KawungPattern
          className="absolute -top-32 -left-32 h-[600px] w-[600px] text-kunyit-400 animate-slow-rotate"
          opacity={0.06}
        />

        <div className="container-editorial relative">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <Reveal>
              <div className="aspect-[4/5] relative overflow-hidden rounded-lg border border-paper-soft/10 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, transparent 40%, rgba(31,26,21,0.4) 100%), url('https://picsum.photos/seed/kroncong-citran/800/1000')",
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="eyebrow text-kunyit-400 text-[10px]">
                    Sedang diliput
                  </p>
                  <p className="font-display italic text-2xl mt-1 text-paper">
                    Tim Kroncong Citran
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="eyebrow text-kunyit-400">Cerita Pilihan</p>
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-paper leading-[1.05]">
                  Suami Bu Rini, dan senar-senar yang <em className="italic text-kunyit-400">tak pernah putus</em>.
                </h2>
                <p className="mt-8 text-paper-soft/70 leading-relaxed max-w-lg">
                  Tim Kroncong Citran bukan cuma grup musik. Ini ruang di mana
                  generasi bertemu, di mana lagu lama dijaga oleh tangan yang
                  masih mau belajar. Kami sedang meliput Pak Bamuskal—
                  penggerak grup, suami Bu Rini, dan pengingat bahwa kampung
                  ini punya suara.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/liputan/tim-kroncong-citran"
                    className="group inline-flex items-center gap-3 bg-kunyit-500 text-sogan-900 px-6 py-3 rounded-md hover:bg-kunyit-400 transition-colors text-sm font-medium"
                  >
                    Baca liputan
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    href="/liputan"
                    className="inline-flex items-center gap-2 border border-paper-soft/20 hover:border-paper-soft/40 text-paper-soft px-6 py-3 rounded-md transition-colors text-sm"
                  >
                    Semua liputan
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================
          CTA — Bergabung / Kontak
          ================================ */}
      <section className="relative py-32 md:py-48">
        <div className="container-editorial">
          <Reveal>
            <div className="max-w-4xl">
              <p className="eyebrow text-sogan-500">Bergabung dalam cerita</p>
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-sogan-900 leading-[1.05]">
                Punya cerita, foto lama, atau usulan kegiatan?
                <em className="italic text-sogan"> Kirim ke kami.</em>
              </h2>
              <p className="mt-8 max-w-2xl text-ink-soft leading-relaxed text-lg">
                Website ini dibangun oleh warga, untuk warga. Setiap
                dokumentasi—entah cerita mbah tentang gapura tua, foto
                pernikahan tahun 80-an, atau resep bakmi tetangga—punya tempat
                di sini.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/tentang#kontak"
                  className="group inline-flex items-center gap-3 bg-sogan-900 text-paper px-8 py-4 rounded-md hover:bg-sogan-800 transition-colors"
                >
                  Kontak Pengurus
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  href="/liputan"
                  className="inline-flex items-center gap-2 border border-sogan/20 hover:border-sogan/40 hover:bg-paper-soft text-sogan-900 px-8 py-4 rounded-md transition-all"
                >
                  Lihat liputan warga
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
