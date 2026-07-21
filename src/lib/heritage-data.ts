/**
 * Warisan Sekitar Kami — data situs cagar budaya/sejarah di sekitar Citran.
 * Dipakai di homepage (kartu ringkas) dan /warisan/[slug] (halaman detail
 * dengan narasi panjang + galeri foto).
 *
 * Foto masih placeholder (picsum seeded) mengikuti pola yang sudah dipakai
 * di hero & teaser Tim Kroncong — ganti ke foto asli lewat storage Supabase
 * begitu warga/pengurus punya dokumentasi lapangan.
 */

export interface HeritagePhoto {
  url: string;
  caption: string;
}

export interface HeritageSite {
  number: string;
  slug: string;
  title: string;
  year: string;
  tag: string;
  description: string;
  intro: string;
  body: string; // paragraf dipisah "\n\n", subjudul pakai prefix "## "
  photos: HeritagePhoto[];
}

export const HERITAGE_SITES: HeritageSite[] = [
  {
    number: "01",
    slug: "masjid-gedhe-mataram",
    title: "Masjid Gedhe Mataram",
    year: "1587",
    tag: "Cagar Budaya",
    description:
      "Masjid tertua di Yogyakarta, dibangun era Panembahan Senopati sebagai pusat spiritual Mataram Islam. Jaraknya cuma beberapa langkah dari gapura Citran.",
    intro:
      "Cuma beberapa langkah dari gapura Citran, Masjid Gedhe Mataram masih berdiri seperti empat abad lalu—atap tajug bersusun, halaman batu berumput, dan suara azan yang menembus gang-gang kampung setiap waktu shalat.",
    body: `Masjid ini dibangun sekitar tahun 1587, tak lama setelah Panembahan Senopati mendirikan ibu kota Kesultanan Mataram Islam di Kotagede. Ia jadi pusat spiritual kerajaan sekaligus salah satu masjid tertua yang masih aktif digunakan di Yogyakarta hingga hari ini.

## Arsitektur yang Bertahan

Atap tajug tiga susun, tanpa kubah, adalah ciri masjid Jawa kuno—perpaduan Islam dengan bentuk bangunan pra-Islam yang sudah ada di Nusantara. Kayu jati tua menopang struktur utama, sementara halamannya yang luas dinaungi pohon-pohon besar yang usianya diyakini sama tuanya dengan masjid.

## Bagian dari Hidup Warga Citran

Bagi warga RT 06 Citran, masjid ini bukan sekadar situs sejarah yang dikunjungi wisatawan. Ini tempat shalat Jumat, tempat anak-anak belajar mengaji, dan titik kumpul saat Ramadan. Warisan dan kehidupan sehari-hari berjalan berdampingan di sini, tanpa jarak.

## Berkunjung

Masjid tetap terbuka untuk umum di luar jam ibadah, dengan tetap menjaga kesopanan berpakaian dan ketenangan area. Kompleks makam Panembahan Senopati ada tepat di sebelahnya—satu paket ziarah yang lazim dilakukan pengunjung.`,
    photos: [
      {
        url: "https://picsum.photos/seed/masjid-gedhe-mataram-1/1200/900",
        caption: "Gapura utama Masjid Gedhe Mataram, gerbang menuju halaman masjid.",
      },
      {
        url: "https://picsum.photos/seed/masjid-gedhe-mataram-2/1200/900",
        caption: "Atap tajug tiga susun, ciri khas arsitektur masjid Jawa kuno.",
      },
      {
        url: "https://picsum.photos/seed/masjid-gedhe-mataram-3/1200/900",
        caption: "Halaman masjid yang dinaungi pohon-pohon tua.",
      },
      {
        url: "https://picsum.photos/seed/masjid-gedhe-mataram-4/1200/900",
        caption: "Serambi masjid, tempat warga berkumpul sebelum waktu shalat.",
      },
    ],
  },
  {
    number: "02",
    slug: "makam-raja-raja-mataram",
    title: "Makam Raja-Raja Mataram",
    year: "abad ke-16",
    tag: "Situs Sejarah",
    description:
      "Kompleks pemakaman Panembahan Senopati, Sri Sultan Hamengkurat I, dan raja-raja awal Mataram. Ziarah tetap dijaga hingga hari ini.",
    intro:
      "Di balik tembok bata merah yang berlumut, kompleks makam ini menyimpan peristirahatan pendiri Mataram Islam—tempat sejarah dan ziarah bertemu setiap hari, bukan hanya saat malam Jumat Kliwon.",
    body: `Kompleks makam ini menjadi tempat peristirahatan Panembahan Senopati, pendiri Kesultanan Mataram Islam, bersama sejumlah raja dan kerabat kerajaan generasi awal—termasuk Sri Sultan Hamengkurat I. Dibangun berdekatan dengan Masjid Gedhe Mataram, kompleks ini adalah bagian tak terpisahkan dari inti kota lama Kotagede.

## Aturan dan Tata Cara Ziarah

Untuk masuk ke area makam utama, pengunjung mengenakan pakaian adat Jawa yang disediakan di lokasi—biasanya kain jarik dan beskap untuk pria. Ini bukan formalitas kosong, tapi bagian dari penghormatan yang terus dijaga juru kunci turun-temurun.

## Ramai di Malam Tertentu

Malam Jumat Kliwon dan Selasa Kliwon adalah waktu paling ramai—banyak peziarah datang dari luar kota, sebagian meyakini malam-malam itu punya makna spiritual khusus. Di luar malam-malam itu, kompleks tetap tenang dan terjaga.

## Warga Citran sebagai Penjaga

Sebagian warga RT 06 Citran turut ambil bagian menjaga kompleks ini—baik sebagai juru kunci, maupun sekadar menjaga kebersihan dan ketenangan kawasan yang jadi bagian dari identitas kampung mereka.`,
    photos: [
      {
        url: "https://picsum.photos/seed/makam-raja-mataram-1/1200/900",
        caption: "Gerbang bata merah menuju kompleks makam raja-raja Mataram.",
      },
      {
        url: "https://picsum.photos/seed/makam-raja-mataram-2/1200/900",
        caption: "Jalan setapak berbatu menuju area makam utama.",
      },
      {
        url: "https://picsum.photos/seed/makam-raja-mataram-3/1200/900",
        caption: "Tembok kuno yang mengelilingi kompleks pemakaman.",
      },
      {
        url: "https://picsum.photos/seed/makam-raja-mataram-4/1200/900",
        caption: "Suasana tenang kompleks makam di luar hari ziarah ramai.",
      },
    ],
  },
  {
    number: "03",
    slug: "kampung-kotagede",
    title: "Kampung Kotagede",
    year: "sejak 1584",
    tag: "Warisan Hidup",
    description:
      "Ibu kota pertama Kesultanan Mataram Islam. Gang-gang sempit, rumah kalang, dan bengkel perak yang masih berdenyut sampai sekarang.",
    intro:
      "Kotagede bukan museum terbuka—ia kampung yang masih hidup. Gang-gang sempit tempat Citran berada dulunya adalah jalur ibu kota Mataram, dan denyut itu belum berhenti.",
    body: `Kotagede berdiri sejak 1584 sebagai ibu kota pertama Kesultanan Mataram Islam, sebelum kerajaan berpindah ke Kartasura dan kemudian Surakarta. RT 06 Citran berada tepat di jantung kawasan bersejarah ini, di antara Bodon dan Jagalan.

## Rumah Kalang, Jejak Kejayaan Dagang

Salah satu ciri paling khas Kotagede adalah rumah kalang—rumah besar bergaya campuran Jawa-Eropa milik para saudagar perak dan pedagang kaya di era kolonial. Beberapa masih berdiri di gang-gang sekitar Citran, meski banyak yang sudah beralih fungsi atau butuh perawatan.

## Perak yang Masih Ditempa

Kerajinan perak Kotagede tumbuh sejak abad ke-19 dan sempat menjadikan kawasan ini pusat kerajinan perak nasional. Sejumlah bengkel kecil masih beroperasi hari ini, menempa perak dengan teknik yang diwariskan lintas generasi.

## Gang Sempit, Cerita Padat

Struktur gang yang sempit dan berliku bukan kebetulan—ini pola permukiman lama yang bertahan karena warga terus merawatnya. Berjalan di gang-gang ini, dari Citran menuju Masjid Gedhe atau Pasar Kotagede, sama dengan menyusuri denah kota yang sudah ada sejak abad ke-16.`,
    photos: [
      {
        url: "https://picsum.photos/seed/kampung-kotagede-1/1200/900",
        caption: "Gang sempit khas Kotagede, mengikuti pola permukiman lama.",
      },
      {
        url: "https://picsum.photos/seed/kampung-kotagede-2/1200/900",
        caption: "Rumah kalang, arsitektur saudagar perak era kolonial.",
      },
      {
        url: "https://picsum.photos/seed/kampung-kotagede-3/1200/900",
        caption: "Bengkel kerajinan perak yang masih beroperasi hingga kini.",
      },
      {
        url: "https://picsum.photos/seed/kampung-kotagede-4/1200/900",
        caption: "Suasana kampung Kotagede di sekitar Citran.",
      },
    ],
  },
];

export function getHeritageSite(slug: string): HeritageSite | undefined {
  return HERITAGE_SITES.find((s) => s.slug === slug);
}
