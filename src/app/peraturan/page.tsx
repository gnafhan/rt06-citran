import type { Metadata } from "next";
import {
  Target,
  Users2,
  Ban,
  Home,
  ShieldCheck,
  AlertTriangle,
  ShieldOff,
  HeartHandshake,
  ShieldCheck as ShieldIcon,
  Handshake,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { KawungDivider, KawungPattern } from "@/components/kawung";

export const metadata: Metadata = {
  title: "Peraturan RT",
  description:
    "Peraturan RT 06 Citran Bodon Jagalan tentang ketertiban pengamen, pengemis, dan aktivitas meminta sumbangan di lingkungan RT.",
};

interface Pasal {
  nomor: number;
  judul: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  intro?: string;
  poin: string[];
}

const PASAL: Pasal[] = [
  {
    nomor: 1,
    judul: "Tujuan",
    icon: Target,
    poin: [
      "Menjaga keamanan, kenyamanan, dan ketertiban lingkungan RT.",
      "Mencegah gangguan terhadap aktivitas dan privasi warga.",
      "Mengatur keluar masuk orang yang melakukan aktivitas meminta sumbangan, pengamen, atau pengemis di lingkungan RT.",
    ],
  },
  {
    nomor: 2,
    judul: "Ruang Lingkup",
    icon: Users2,
    intro: "Peraturan ini berlaku bagi:",
    poin: [
      "Pengamen.",
      "Pengemis.",
      "Pengumpul sumbangan dari luar lingkungan RT.",
      "Penjual keliling atau pihak lain yang melakukan aktivitas dari rumah ke rumah yang berpotensi mengganggu ketertiban.",
    ],
  },
  {
    nomor: 3,
    judul: "Ketentuan Pengamen dan Pengemis",
    icon: Ban,
    poin: [
      "Pengamen dan pengemis tidak diperkenankan berkeliling dari rumah ke rumah di lingkungan RT 06 Citran tanpa izin dari pengurus RT.",
      "Dilarang memaksa warga untuk memberikan uang, makanan, atau bentuk bantuan lainnya.",
      "Dilarang memasuki halaman atau teras rumah tanpa izin pemilik rumah.",
      "Dilarang mengganggu kenyamanan warga dengan menggunakan pengeras suara, alat musik, atau tindakan lain yang menimbulkan kebisingan berlebihan.",
      "Pengamen dan pengemis wajib meninggalkan lingkungan RT apabila telah diingatkan oleh pengurus atau petugas keamanan lingkungan.",
    ],
  },
  {
    nomor: 4,
    judul: "Peran Warga",
    icon: Home,
    poin: [
      "Warga diimbau memberikan bantuan kepada pihak yang membutuhkan melalui lembaga sosial, rumah ibadah, atau program bantuan resmi.",
      "Apabila warga ingin memberikan bantuan secara pribadi, hal tersebut merupakan hak masing-masing dan tidak menjadi kewajiban.",
      "Warga yang mengetahui adanya aktivitas yang mengganggu ketertiban agar melaporkannya kepada Ketua RT atau petugas ronda.",
    ],
  },
  {
    nomor: 5,
    judul: "Peran Pengurus RT",
    icon: ShieldCheck,
    poin: [
      "Pengurus RT berhak memberikan teguran secara santun kepada pengamen atau pengemis yang melanggar ketentuan.",
      "Apabila pengamen atau pengemis tidak mengindahkan teguran, pengurus RT dapat berkoordinasi dengan Pemerintah Kelurahan, Satpol PP, atau aparat keamanan sesuai kewenangannya.",
      "Setiap tindakan dilakukan secara humanis, tanpa kekerasan, penghinaan, maupun perampasan barang milik yang bersangkutan.",
    ],
  },
  {
    nomor: 6,
    judul: "Larangan bagi Warga",
    icon: ShieldOff,
    poin: [
      "Dilarang melakukan tindakan main hakim sendiri terhadap pengamen atau pengemis.",
      "Dilarang melakukan kekerasan fisik maupun verbal.",
      "Dilarang menyebarkan informasi yang bersifat menghina atau mempermalukan seseorang melalui media sosial.",
    ],
  },
  {
    nomor: 7,
    judul: "Penutup",
    icon: AlertTriangle,
    poin: [
      "Peraturan ini berlaku sejak tanggal ditetapkan berdasarkan hasil musyawarah warga RT 06 Citran Bodon Jagalan dan menjadi pedoman bersama dalam menjaga keamanan, kenyamanan, serta ketertiban lingkungan.",
    ],
  },
];

const PILAR = [
  { icon: ShieldIcon, label: "Aman" },
  { icon: Home, label: "Nyaman" },
  { icon: Handshake, label: "Tertib" },
  { icon: HeartHandshake, label: "Saling Menghargai" },
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
            <p className="eyebrow text-sogan-500">Peraturan RT 06 Citran Bodon Jagalan</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-sogan-900 leading-[1] max-w-4xl">
              Ketertiban pengamen, pengemis, dan aktivitas{" "}
              <em className="italic text-sogan">meminta sumbangan</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Peraturan ini dibuat untuk menjaga keamanan, kenyamanan, dan
              ketertiban lingkungan RT 06 Citran Bodon Jagalan—ditetapkan
              berdasarkan hasil musyawarah warga.
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
                        {pasal.poin.map((text, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="font-mono text-xs text-kunyit-600 mt-1 shrink-0">
                              {i + 1}.
                            </span>
                            <span>{text}</span>
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

      {/* Imbauan */}
      <section className="py-24 md:py-32 bg-paper-soft border-y border-sogan/10">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-sogan-500 text-center">
              Imbauan kepada Semua Warga
            </p>
            <p className="mt-4 max-w-xl mx-auto text-center text-ink-soft leading-relaxed">
              Mari kita ciptakan lingkungan yang aman, tertib, dan nyaman.
              Peduli kepada sesama dapat dilakukan melalui cara yang
              bijaksana, tanpa mengganggu ketertiban lingkungan.
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
                Pengurus RT 06 Citran Bodon Jagalan
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
