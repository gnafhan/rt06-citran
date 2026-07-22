"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Target,
  Ban,
  Users2,
  MessageCircle,
  AlertTriangle,
  Scale,
  ShieldCheck,
  Home,
  ShieldOff,
  Handshake,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

interface Pasal {
  nomor: number;
  judul: string;
  icon: LucideIcon;
  intro?: string;
  poin: string[];
}

interface Dokumen {
  key: string;
  tabLabel: string;
  eyebrow: string;
  judulHtml: React.ReactNode;
  pengantar: string;
  pasal: Pasal[];
  imbauanEyebrow: string;
  imbauanBody: string;
  pilar: { icon: LucideIcon; label: string }[];
  penandaTangan: string;
}

const DOKUMEN: Dokumen[] = [
  {
    key: "kesusilaan",
    tabLabel: "Ketertiban & Norma Kesusilaan",
    eyebrow: "Peraturan Kampung / RT",
    judulHtml: (
      <>
        Ketertiban, norma kesusilaan, dan{" "}
        <em className="italic text-sogan">kehidupan bermasyarakat</em>.
      </>
    ),
    pengantar:
      "Bersama kita ciptakan lingkungan yang aman, nyaman, tertib, dan harmonis sesuai nilai-nilai luhur masyarakat. Peraturan ini ditetapkan berdasarkan hasil musyawarah warga RT 06 Citran dan menjadi pedoman bersama—bukan alat untuk menghakimi, melainkan acuan untuk menjaga kerukunan.",
    pasal: [
      {
        nomor: 1,
        judul: "Tujuan",
        icon: Target,
        poin: [
          "Menjaga ketertiban, keamanan, dan kenyamanan lingkungan.",
          "Menjaga norma kesusilaan dan etika hidup bermasyarakat.",
          "Mencegah terjadinya konflik yang dapat mengganggu kerukunan warga.",
        ],
      },
      {
        nomor: 2,
        judul: "Larangan",
        icon: Ban,
        intro: "Setiap warga dan tamu dilarang:",
        poin: [
          "Melakukan perbuatan yang melanggar norma kesusilaan dan ketertiban umum di lingkungan kampung.",
          "Membawa atau menerima tamu lawan jenis yang bukan pasangan suami istri atau bukan anggota keluarga inti untuk menginap atau berada di dalam rumah dalam kondisi yang menimbulkan dugaan pelanggaran norma kesusilaan, sehingga mengganggu ketenteraman warga.",
          "Menggunakan rumah sebagai tempat melakukan perbuatan yang bertentangan dengan norma hukum maupun norma masyarakat.",
        ],
      },
      {
        nomor: 3,
        judul: "Tamu Lawan Jenis",
        icon: Users2,
        poin: [
          "Tamu lawan jenis diperbolehkan berkunjung untuk kepentingan yang wajar, seperti urusan keluarga, pekerjaan, pendidikan, atau sosial.",
          "Kunjungan hendaknya dilakukan secara terbuka dan tetap menghormati norma yang berlaku di lingkungan.",
          "Apabila tamu menginap, pemilik rumah wajib melaporkan kepada Ketua RT sesuai ketentuan administrasi tamu yang berlaku.",
        ],
      },
      {
        nomor: 4,
        judul: "Penanganan Dugaan Pelanggaran",
        icon: MessageCircle,
        poin: [
          "Apabila terdapat dugaan pelanggaran, warga diimbau untuk tidak melakukan tindakan main hakim sendiri, persekusi, atau menyebarkan informasi yang belum terbukti.",
          "Laporan disampaikan kepada Ketua RT atau pengurus lingkungan untuk dilakukan klarifikasi secara bijaksana dan menjaga kerahasiaan pihak-pihak yang terlibat.",
          "Pengurus RT dapat mengundang pihak terkait untuk melakukan musyawarah dan pembinaan.",
        ],
      },
      {
        nomor: 5,
        judul: "Sanksi Sosial dan Administratif",
        icon: AlertTriangle,
        intro:
          "Apabila setelah dilakukan klarifikasi dan musyawarah terbukti terjadi pelanggaran terhadap peraturan lingkungan, maka dapat dikenakan sanksi secara bertahap:",
        poin: [
          "Teguran lisan.",
          "Teguran tertulis.",
          "Pernyataan permohonan maaf kepada pengurus dan/atau warga apabila pelanggaran menimbulkan keresahan.",
          "Kewajiban mengikuti kegiatan sosial atau kerja bakti sebagai bentuk pembinaan.",
          "Apabila pelanggaran berulang, pengurus RT dapat melaporkan kepada Pemerintah Desa/Kelurahan atau pihak berwenang sesuai ketentuan hukum yang berlaku.",
        ],
      },
      {
        nomor: 6,
        judul: "Ketentuan Penting",
        icon: Scale,
        poin: [
          "Pengurus RT tidak berwenang menetapkan seseorang telah melakukan perselingkuhan hanya berdasarkan dugaan atau gosip.",
          "Penanganan difokuskan pada perilaku yang mengganggu ketertiban lingkungan, bukan menghakimi kehidupan pribadi seseorang tanpa dasar yang jelas.",
          "Apabila ditemukan dugaan tindak pidana atau pelanggaran hukum, penyelesaiannya diserahkan kepada aparat yang berwenang.",
        ],
      },
      {
        nomor: 7,
        judul: "Penutup",
        icon: ShieldCheck,
        poin: [
          "Peraturan ini berlaku sejak tanggal ditetapkan berdasarkan hasil musyawarah warga dan menjadi pedoman bagi seluruh warga Kampung/RT dalam menjaga ketertiban, keamanan, dan keharmonisan lingkungan.",
        ],
      },
    ],
    imbauanEyebrow: "Mari Kita Jaga Kampung Kita",
    imbauanBody:
      "Dengan saling menghormati, menjaga norma, dan mengedepankan musyawarah untuk mewujudkan lingkungan yang rukun dan damai.",
    pilar: [
      { icon: Handshake, label: "Saling Menghormati" },
      { icon: HeartHandshake, label: "Jaga Toleransi" },
      { icon: Home, label: "Patuhi Aturan Lingkungan" },
      { icon: Users2, label: "Utamakan Musyawarah" },
    ],
    penandaTangan: "Pengurus RT 06 Citran",
  },
  {
    key: "pengamen",
    tabLabel: "Pengamen, Pengemis & Sumbangan",
    eyebrow: "Peraturan RT 06 Citran Bodon Jagalan",
    judulHtml: (
      <>
        Ketertiban pengamen, pengemis, dan aktivitas{" "}
        <em className="italic text-sogan">meminta sumbangan</em>.
      </>
    ),
    pengantar:
      "Peraturan ini dibuat untuk menjaga keamanan, kenyamanan, dan ketertiban lingkungan RT 06 Citran Bodon Jagalan—ditetapkan berdasarkan hasil musyawarah warga.",
    pasal: [
      {
        nomor: 1,
        judul: "Tujuan",
        icon: Target,
        poin: [
          "Menjaga keamanan, kenyamanan, dan ketertiban lingkungan RT.",
          "Mencegah gangguan terhadap aktivitas dan privasi warga.",
          "Mengatur keluar masuk orang yang melakukan aktivitas meminta sumbangan, mengamen, atau mengemis di lingkungan RT.",
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
    ],
    imbauanEyebrow: "Imbauan kepada Warga",
    imbauanBody:
      "Mari kita ciptakan lingkungan yang aman, tertib, dan nyaman. Peduli kepada sesama dapat dilakukan melalui cara yang bijaksana, tanpa mengganggu ketertiban lingkungan.",
    pilar: [
      { icon: ShieldCheck, label: "Aman" },
      { icon: Home, label: "Nyaman" },
      { icon: Handshake, label: "Tertib" },
      { icon: HeartHandshake, label: "Saling Menghargai" },
    ],
    penandaTangan: "Pengurus RT 06 Citran Bodon Jagalan",
  },
];

export function PeraturanTabs() {
  const [active, setActive] = useState(DOKUMEN[0].key);
  const dokumen = DOKUMEN.find((d) => d.key === active) ?? DOKUMEN[0];

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Dokumen peraturan"
        className="flex flex-wrap gap-2 pb-2 border-b border-sogan/10 mb-4"
      >
        {DOKUMEN.map((d) => {
          const isActive = d.key === active;
          return (
            <button
              key={d.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(d.key)}
              className={cn(
                "relative px-5 py-3 text-sm font-mono tracking-wide transition-colors text-left",
                isActive
                  ? "text-sogan-900"
                  : "text-ink-mute hover:text-sogan-700",
              )}
            >
              <span className="relative z-10">{d.tabLabel}</span>
              {isActive && (
                <motion.span
                  layoutId="peraturan-underline"
                  className="absolute inset-x-3 -bottom-[9px] h-[2px] bg-sogan"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={dokumen.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header dokumen */}
          <div className="pt-12 pb-4">
            <p className="eyebrow text-sogan-500">{dokumen.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl text-sogan-900 leading-[1.05] max-w-3xl">
              {dokumen.judulHtml}
            </h2>
            <p className="mt-6 max-w-2xl text-ink-soft leading-relaxed">
              {dokumen.pengantar}
            </p>
          </div>

          {/* Pasal-pasal */}
          <div className="py-8 md:py-12">
            <StaggerGroup className="space-y-14 md:space-y-16" stagger={0.06}>
              {dokumen.pasal.map((pasal) => {
                const Icon = pasal.icon;
                return (
                  <StaggerItem key={pasal.nomor}>
                    <div className="grid gap-5 md:grid-cols-[160px,1fr] md:gap-12">
                      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                        <span className="font-mono text-xs text-kunyit-600 tracking-widest uppercase">
                          Pasal {pasal.nomor}
                        </span>
                        <Icon
                          size={26}
                          strokeWidth={1.4}
                          className="text-sogan-500 md:mt-2"
                        />
                      </div>
                      <div className="max-w-2xl border-t border-sogan/10 pt-5 md:border-t-0 md:pt-0">
                        <h3 className="font-display text-xl md:text-2xl text-sogan-900 leading-tight">
                          {pasal.judul}
                        </h3>
                        {pasal.intro && (
                          <p className="mt-3 text-ink-soft leading-relaxed">
                            {pasal.intro}
                          </p>
                        )}
                        <ol className="mt-3 space-y-2.5 text-ink-soft leading-relaxed">
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

          {/* Imbauan / pilar */}
          <div className="mt-8 py-16 md:py-20 bg-paper-soft border-y border-sogan/10 rounded-lg">
            <div className="px-6 md:px-12">
              <p className="eyebrow text-sogan-500 text-center">
                {dokumen.imbauanEyebrow}
              </p>
              <p className="mt-4 max-w-xl mx-auto text-center text-ink-soft leading-relaxed">
                {dokumen.imbauanBody}
              </p>

              <StaggerGroup
                className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4"
                stagger={0.06}
              >
                {dokumen.pilar.map(({ icon: Icon, label }) => (
                  <StaggerItem key={label}>
                    <div className="flex flex-col items-center gap-3 text-center bg-paper border border-sogan/10 rounded-lg p-6 h-full">
                      <Icon size={20} strokeWidth={1.4} className="text-kunyit-600" />
                      <p className="font-display text-base text-sogan-900 leading-tight">
                        {label}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <p className="mt-14 text-center text-sm text-ink-mute">
                Hormat kami,
                <br />
                <span className="font-display text-lg text-sogan-900">
                  {dokumen.penandaTangan}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
