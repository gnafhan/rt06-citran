import type { Metadata } from "next";
import {
  Target,
  Ban,
  Users2,
  MessageCircle,
  AlertTriangle,
  Scale,
  ShieldCheck,
  Handshake,
  HeartHandshake,
  Home,
  Users,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { KawungDivider, KawungPattern } from "@/components/kawung";

export const metadata: Metadata = {
  title: "Peraturan Kampung / RT",
  description:
    "Peraturan Kampung / RT 06 Citran tentang ketertiban, norma kesusilaan, dan kehidupan bermasyarakat.",
};

interface Pasal {
  nomor: number;
  judul: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  intro?: string;
  poin: { text: string; sub?: string[] }[];
}

const PASAL: Pasal[] = [
  {
    nomor: 1,
    judul: "Tujuan",
    icon: Target,
    poin: [
      { text: "Menjaga ketertiban, keamanan, dan kenyamanan lingkungan." },
      { text: "Menjaga norma kesusilaan dan etika hidup bermasyarakat." },
      {
        text: "Mencegah terjadinya konflik yang dapat mengganggu kerukunan warga.",
      },
    ],
  },
  {
    nomor: 2,
    judul: "Larangan",
    icon: Ban,
    intro: "Setiap warga dan tamu dilarang:",
    poin: [
      {
        text: "Melakukan perbuatan yang melanggar norma kesusilaan dan ketertiban umum di lingkungan kampung.",
      },
      {
        text: "Membawa atau menerima tamu lawan jenis yang bukan pasangan suami istri atau bukan anggota keluarga inti untuk menginap atau berada di dalam rumah dalam kondisi yang menimbulkan dugaan pelanggaran norma kesusilaan, sehingga mengganggu ketenteraman warga.",
      },
      {
        text: "Menggunakan rumah sebagai tempat melakukan perbuatan yang bertentangan dengan norma hukum maupun norma masyarakat.",
      },
    ],
  },
  {
    nomor: 3,
    judul: "Tamu Lawan Jenis",
    icon: Users2,
    poin: [
      {
        text: "Tamu lawan jenis diperbolehkan berkunjung untuk kepentingan yang wajar, seperti urusan keluarga, pekerjaan, pendidikan, atau sosial.",
      },
      {
        text: "Kunjungan hendaknya dilakukan secara terbuka dan tetap menghormati norma yang berlaku di lingkungan.",
      },
      {
        text: "Apabila tamu menginap, pemilik rumah wajib melaporkan kepada Ketua RT sesuai ketentuan administrasi tamu yang berlaku.",
      },
    ],
  },
  {
    nomor: 4,
    judul: "Penanganan Dugaan Pelanggaran",
    icon: MessageCircle,
    poin: [
      {
        text: "Apabila terdapat dugaan pelanggaran, warga diimbau untuk tidak melakukan tindakan main hakim sendiri, persekusi, atau menyebarkan informasi yang belum terbukti.",
      },
      {
        text: "Laporan disampaikan kepada Ketua RT atau pengurus lingkungan untuk dilakukan klarifikasi secara bijaksana dan menjaga kerahasiaan pihak-pihak yang terlibat.",
      },
      {
        text: "Pengurus RT dapat mengundang pihak terkait untuk melakukan musyawarah dan pembinaan.",
      },
    ],
  },
  {
    nomor: 5,
    judul: "Sanksi Sosial dan Administratif",
    icon: AlertTriangle,
    intro:
      "Apabila setelah dilakukan klarifikasi dan musyawarah terbukti terjadi pelanggaran terhadap peraturan lingkungan, maka dapat dikenakan sanksi secara bertahap:",
    poin: [
      { text: "Teguran lisan." },
      { text: "Teguran tertulis." },
      {
        text: "Pernyataan permohonan maaf kepada pengurus dan/atau warga apabila pelanggaran menimbulkan keresahan.",
      },
      {
        text: "Kewajiban mengikuti kegiatan sosial atau kerja bakti sebagai bentuk pembinaan.",
      },
      {
        text: "Apabila pelanggaran berulang, pengurus RT dapat melaporkan kepada Pemerintah Desa/Kelurahan atau pihak berwenang sesuai ketentuan hukum yang berlaku.",
      },
    ],
  },
  {
    nomor: 6,
    judul: "Ketentuan Penting",
    icon: Scale,
    poin: [
      {
        text: "Pengurus RT tidak berwenang menetapkan seseorang telah melakukan perselingkuhan hanya berdasarkan dugaan atau gosip.",
      },
      {
        text: "Penanganan difokuskan pada perilaku yang mengganggu ketertiban lingkungan atau melanggar aturan pribadi seseorang tanpa dasar yang jelas.",
      },
      {
        text: "Apabila ditemukan dugaan tindak pidana atau pelanggaran hukum, penyelesaiannya diserahkan kepada aparat yang berwenang.",
      },
    ],
  },
  {
    nomor: 7,
    judul: "Penutup",
    icon: ShieldCheck,
    poin: [
      {
        text: "Peraturan ini berlaku sejak tanggal ditetapkan berdasarkan hasil musyawarah warga dan menjadi pedoman bagi seluruh warga Kampung/RT dalam menjaga ketertiban, keamanan, dan keharmonisan lingkungan.",
      },
    ],
  },
];

const PILAR = [
  { icon: Handshake, label: "Saling Menghormati" },
  { icon: HeartHandshake, label: "Jaga Toleransi" },
  { icon: Home, label: "Patuhi Aturan Lingkungan" },
  { icon: Users, label: "Utamakan Musyawarah" },
];

export const revalidate = false;

export default function PeraturanPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24 overflow-hidden">
        <KawungPattern
          className="absolute top-20 -left-40 h-[500px] w-[500px] text-sogan-400 animate-drift"
          opacity={0.12}
        />
        <div className="container-editorial relative">
          <Reveal>
            <p className="eyebrow text-sogan-500">Peraturan Kampung / RT</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-sogan-900 leading-[1] max-w-4xl">
              Ketertiban, norma kesusilaan, dan{" "}
              <em className="italic text-sogan">kehidupan bermasyarakat</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Bersama kita ciptakan lingkungan yang aman, nyaman, tertib, dan
              harmonis sesuai nilai-nilai luhur masyarakat. Peraturan ini
              ditetapkan berdasarkan hasil musyawarah warga RT 06 Citran dan
              menjadi pedoman bersama—bukan alat untuk menghakimi, melainkan
              acuan untuk menjaga kerukunan.
            </p>
          </Reveal>
        </div>
      </section>

      <KawungDivider />

      {/* Pasal-pasal */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <StaggerGroup className="space-y-16 md:space-y-20" stagger={0.08}>
            {PASAL.map((pasal) => {
              const Icon = pasal.icon;
              return (
                <StaggerItem key={pasal.nomor}>
                  <div className="grid gap-6 md:grid-cols-[160px,1fr] md:gap-12">
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <span className="font-mono text-xs text-kunyit-600 tracking-widest uppercase">
                        Pasal {pasal.nomor}
                      </span>
                      <Icon
                        size={28}
                        strokeWidth={1.4}
                        className="text-sogan-500 md:mt-2"
                      />
                    </div>
                    <div className="max-w-2xl border-t border-sogan/10 pt-6 md:border-t-0 md:pt-0">
                      <h2 className="font-display text-2xl md:text-3xl text-sogan-900 leading-tight">
                        {pasal.judul}
                      </h2>
                      {pasal.intro && (
                        <p className="mt-4 text-ink-soft leading-relaxed">
                          {pasal.intro}
                        </p>
                      )}
                      <ol className="mt-4 space-y-3 text-ink-soft leading-relaxed">
                        {pasal.poin.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="font-mono text-xs text-kunyit-600 mt-1 shrink-0">
                              {i + 1}.
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <KawungDivider />

      {/* Mari kita jaga kampung kita */}
      <section className="py-24 md:py-32 bg-paper-soft border-y border-sogan/10">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-sogan-500 text-center">
              Mari Kita Jaga Kampung Kita
            </p>
            <p className="mt-4 max-w-xl mx-auto text-center text-ink-soft leading-relaxed">
              Dengan saling menghormati, menjaga norma, dan mengedepankan
              musyawarah untuk mewujudkan lingkungan yang rukun dan damai.
            </p>
          </Reveal>

          <StaggerGroup
            className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-4"
            stagger={0.08}
          >
            {PILAR.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <div className="flex flex-col items-center gap-4 text-center bg-paper border border-sogan/10 rounded-lg p-8 h-full">
                  <Icon size={22} strokeWidth={1.4} className="text-kunyit-600" />
                  <p className="font-display text-lg text-sogan-900 leading-tight">
                    {label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2}>
            <p className="mt-16 text-center text-sm text-ink-mute">
              Hormat kami,
              <br />
              <span className="font-display text-lg text-sogan-900">
                Pengurus RT 06 Citran
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
