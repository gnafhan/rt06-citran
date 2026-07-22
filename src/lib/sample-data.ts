import type { Article, Pengurus } from "./types";

/**
 * Sample data — dipake sebagai fallback kalau Supabase belum di-setup.
 * Nanti kalau env Supabase lengkap, query real DB dari sini di-swap.
 */

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    slug: "tim-kroncong-citran",
    title: "Suami Bu Rini, dan Senar-Senar yang Tak Pernah Putus",
    excerpt:
      "Tim Kroncong Citran bukan cuma grup musik. Ini ruang di mana generasi bertemu—dan Pak Bamuskal jadi jembatannya.",
    body: `Ini konten placeholder. Nanti diisi oleh editor via halaman admin.

## Awal Mula

Bapak Bamuskal mulai memegang biola sejak muda. Dari lorong-lorong Kotagede, ia belajar dari para pemusik senior yang kini sebagian sudah tiada.

## Grup Kroncong Citran

Grup ini terbentuk secara organik. Kumpul dulu, main lagu, baru dinamai belakangan. Di rumah Bu Rini—istri Pak Bamuskal—latihan mingguan berjalan hampir seperti pengajian: teratur, khidmat, hangat.`,
    cover_url: "https://picsum.photos/seed/kroncong-citran-cover/1600/1000",
    category: "profil",
    author: "Redaksi Citran",
    published: true,
    published_at: "2026-06-15T00:00:00.000Z",
    updated_at: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "2",
    slug: "kerja-bakti-gapura-lama",
    title: "Kerja Bakti Gapura Lama, Cat Kembali Terangnya",
    excerpt:
      "Minggu pagi, warga RT 06 turun ke gang untuk memperbaiki gapura yang sudah menua. Ini bukan cuma soal cat.",
    body: "Konten placeholder untuk artikel kerja bakti.",
    cover_url: "https://picsum.photos/seed/gapura-citran/1600/1000",
    category: "kegiatan",
    author: "Karang Taruna Citran",
    published: true,
    published_at: "2026-05-28T00:00:00.000Z",
    updated_at: "2026-05-28T00:00:00.000Z",
  },
  {
    id: "3",
    slug: "cerita-mbah-tentang-kotagede",
    title: "Cerita Mbah Tentang Kotagede yang Belum Sempat Ditulis",
    excerpt:
      "Tiga sesepuh berkumpul di serambi mushola. Yang keluar bukan cuma cerita—tapi lapisan sejarah yang belum pernah masuk buku.",
    body: "Konten placeholder untuk artikel sejarah.",
    cover_url: "https://picsum.photos/seed/mbah-kotagede/1600/1000",
    category: "sejarah",
    author: "Redaksi Citran",
    published: true,
    published_at: "2026-04-10T00:00:00.000Z",
    updated_at: "2026-04-10T00:00:00.000Z",
  },
  {
    id: "4",
    slug: "posyandu-april",
    title: "Posyandu April: Data Anak dan Ibu Hamil",
    excerpt:
      "Rekap kegiatan Posyandu bulan April. Catatan singkat untuk transparansi warga.",
    body: "Konten placeholder untuk pengumuman posyandu.",
    cover_url: "https://picsum.photos/seed/posyandu-citran/1600/1000",
    category: "pengumuman",
    author: "PKK RT 06",
    published: true,
    published_at: "2026-04-05T00:00:00.000Z",
    updated_at: "2026-04-05T00:00:00.000Z",
  },
  {
    id: "5",
    slug: "kerja-bakti-jalan-tebing-paranet",
    title: "Gotong Royong di Pinggir Tebing: Bersih-Bersih dan Pasang Paranet",
    excerpt:
      "Sabtu pagi, warga turun ke jalan pinggir tebing—membabat semak, membakar ranting, mengangkut pasir, sampai memasang paranet pengaman. Semua demi satu jalan yang lebih aman untuk dilewati.",
    body: `Jalan kecil di pinggir tebing itu sudah lama jadi langganan komplain warga. Semak yang tumbuh liar, ranting yang menjorok ke jalan, tanah lereng yang longsor kecil-kecilan setiap musim hujan—dan yang paling menyebalkan, jadi tempat favorit orang buang sampah sembarangan karena gelap dan jarang dilewati.

Sabtu pagi itu, RT 06 Citran turun tangan. Bukan cuma pengurus, tapi warga dari berbagai RT ikut gotong royong membersihkan jalur sepanjang tebing sampai ke bantaran sungai.

## Naik Turun Tebing dengan Tangga Bambu

Kerja bakti dimulai dari titik paling curam. Tangga bambu didirikan menempel ke lereng, dan satu-persatu warga bergantian naik untuk membersihkan tanaman liar yang akarnya mulai menggerus tanah. Ini bukan kerjaan ringan—posisi miring, tanah labil, dan matahari pagi yang mulai menyengat.

![Warga bergantian naik tangga bambu untuk membersihkan tebing yang mulai ditumbuhi semak liar.](/liputan/kerja-bakti-tebing/01-tangga-tebing.jpg)

Sambil menunggu giliran, warga lain menyiapkan konsumsi sederhana di gubuk kecil pinggir jalan—gorengan dan teh hangat, cukup untuk mengganjal perut sebelum lanjut kerja.

## Babat Semak, Sapu Jalan

Begitu bagian atas tebing selesai dirapikan, giliran bagian bawah dibersihkan. Semak dan ilalang yang selama ini menutupi bahu jalan dibabat habis, lalu disapu bersih dari aspal.

![Membersihkan semak dan dedaunan liar di sepanjang lereng tebing sebelum dirapikan.](/liputan/kerja-bakti-tebing/02-bersih-lereng.jpg)

![Ibu-ibu ikut menyapu jalan yang tertutup daun dan ranting kering.](/liputan/kerja-bakti-tebing/03-sapu-jalan.jpg)

Ini bukan kerja bapak-bapak saja. Ibu-ibu turun tangan menyapu jalan pinggir tebing sambil diselimuti asap dari pembakaran ranting tak jauh dari lokasi—sapu lidi dan pengki jadi senjata utama membersihkan dedaunan yang berjatuhan dari tebing.

![Ibu-ibu berkerudung menyapu jalan pinggir tebing yang berdebu dan berasap akibat pembakaran ranting di dekatnya.](/liputan/kerja-bakti-tebing/10-ibu-ibu-sapu.jpg)

Ranting dan sampah organik yang terkumpul langsung dibakar di titik yang aman, jauh dari rumah warga—cara paling praktis untuk daerah yang belum terjangkau layanan pengangkutan sampah rutin.

![Pembakaran ranting dan sisa semak hasil bersih-bersih tebing.](/liputan/kerja-bakti-tebing/04-bakar-ranting.jpg)

![Membabat rumpun dan dahan yang menjorok ke jalur jalan.](/liputan/kerja-bakti-tebing/05-babat-semak.jpg)

## Angkut Pasir untuk Perkuat Bantaran

Di bagian bawah, dekat bendungan kecil sungai, tim lain sibuk mengangkut pasir dan material menggunakan gerobak dorong. Material ini dipakai untuk memperkuat titik-titik bantaran yang mulai terkikis air, sekaligus menimbun bagian jalan yang berlubang.

![Warga bergotong royong mengangkut pasir memakai gerobak dorong dari bantaran sungai.](/liputan/kerja-bakti-tebing/06-angkut-pasir-1.jpg)

Anak-anak pun ikut meramaikan lokasi, bermain di sekitar sungai sambil menyaksikan bapak-bapaknya bekerja—pemandangan yang bikin kerja bakti terasa lebih seperti acara kampung daripada sekadar proyek infrastruktur.

![Proses pengangkutan material berlanjut, disaksikan anak-anak yang bermain di sekitar sungai.](/liputan/kerja-bakti-tebing/07-angkut-pasir-2.jpg)

## Paranet: Jaring Pengaman Terakhir

Bagian penutup kerja bakti ini yang paling penting: pemasangan paranet di lereng tebing yang paling rawan. Jaring hitam ini berfungsi menahan tanah dan material lepas agar tidak langsung jatuh ke jalan atau ke sungai, terutama saat hujan deras.

![Dua warga memasang paranet di antara rumpun pisang untuk menahan longsoran kecil dari tebing.](/liputan/kerja-bakti-tebing/08-pasang-paranet-1.jpg)

Paranet dibentangkan menutupi bagian lereng yang tanahnya paling gembur, diikat kuat ke tiang-tiang penyangga yang sudah ditancapkan sebelumnya. Persis di sebelah titik ini, papan peringatan "Dilarang Buang..." sudah lama berdiri—sayangnya belum cukup ampuh menghentikan kebiasaan buruk sebagian orang.

![Pemasangan paranet hampir rampung, di sebelah papan peringatan larangan membuang sampah sembarangan.](/liputan/kerja-bakti-tebing/09-pasang-paranet-2.jpg)

## Bukan Kerja Sekali Jadi

Kerja bakti ini bukan yang pertama dan mungkin bukan yang terakhir. Tapi hasilnya langsung terasa: jalan yang lebih terang karena semak sudah rapi, tebing yang lebih aman karena ada paranet, dan bantaran sungai yang lebih kuat karena sudah ditimbun ulang.

Ada satu masalah yang masih tersisa dan belum bisa diselesaikan lewat gotong royong biasa—kebiasaan sebagian orang buang sampah sembarangan di titik yang sama. Untuk itu, warga menyiapkan langkah lanjutan: pemasangan CCTV pemantau di titik rawan. Ceritanya ada di liputan berikutnya.`,
    cover_url: "/liputan/kerja-bakti-tebing/01-tangga-tebing.jpg",
    category: "kegiatan",
    author: "Karang Taruna Citran",
    published: true,
    published_at: "2026-07-22T00:00:00.000Z",
    updated_at: "2026-07-22T00:00:00.000Z",
  },
  {
    id: "6",
    slug: "pemasangan-cctv-jalan-tebing",
    title: "Pasang CCTV di Jalan Tebing, Awasi yang Masih Buang Sampah Sembarangan",
    excerpt:
      "Setelah gotong royong bersihkan tebing dan pasang paranet, warga melangkah lebih jauh: memasang kamera pemantau di titik rawan buang sampah sembarangan.",
    body: `Jalan pinggir tebing yang baru saja dibersihkan dan diperkuat dengan paranet ternyata masih punya satu musuh: kebiasaan sebagian orang buang sampah sembarangan di titik yang sama, seringnya di jam-jam sepi ketika tidak ada yang melihat.

Papan peringatan sudah dipasang lama. Sudah ditulis jelas "Dilarang Buang..."—tapi seperti kebanyakan larangan tanpa pengawasan, efeknya terbatas. Sampah tetap muncul lagi beberapa hari kemudian, menumpuk di titik yang sama, persis di sisi tebing yang sudah susah-susah dirapikan warga.

## Solusinya: Kamera Pemantau

Setelah berdiskusi, pengurus sepakat langkah paling realistis adalah memasang CCTV di titik rawan tersebut. Bukan untuk menghukum, tapi untuk efek jera dan bukti kalau memang diperlukan tindakan lebih lanjut. Pemasangannya dibantu oleh tim mahasiswa KKN Universitas Gadjah Mada yang sedang bertugas di wilayah Citran—kebetulan momennya pas dengan kebutuhan warga akan pengawasan tambahan di titik rawan ini.

![Tim memasang kamera CCTV di tiang dekat rumpun pisang, tepat di jalur yang sering jadi lokasi pembuangan sampah sembarangan.](/liputan/cctv-tebing/01-pasang-cctv.jpg)

Kamera dipasang di tiang yang sudah ada di lokasi, mengarah langsung ke titik jalan yang paling sering jadi sasaran buang sampah. Posisinya dipilih supaya jangkauannya mencakup jalur masuk-keluar, bukan cuma satu sudut sempit.

![Tim mahasiswa KKN UGM berfoto bersama warga usai instalasi CCTV selesai—kamera sudah terpasang di tiang, tepat di antara rumpun pisang.](/liputan/cctv-tebing/02-tim-kkn-cctv.jpg)

## Bagian dari Rangkaian yang Sama

Pemasangan CCTV ini bukan proyek berdiri sendiri—ini kelanjutan langsung dari kerja bakti bersih-bersih tebing dan pemasangan paranet yang dilakukan beberapa waktu sebelumnya. Setelah tebing dirapikan dan diperkuat, langkah menjaga kebersihannya jadi prioritas berikutnya.

Warga berharap dengan adanya pemantauan ini, jalan yang sudah bersih dan aman bisa tetap terjaga—dan pelan-pelan mengubah kebiasaan buruk sebagian orang yang selama ini menganggap tebing sepi sebagai tempat buang sampah gratis.

Kalau ke depan ditemukan pelanggaran berulang lewat rekaman kamera, pengurus RT akan menindaklanjuti sesuai dengan Peraturan RT yang berlaku—mulai dari teguran, sampai koordinasi dengan pihak kelurahan bila diperlukan.`,
    cover_url: "/liputan/cctv-tebing/01-pasang-cctv.jpg",
    category: "kegiatan",
    author: "Karang Taruna Citran",
    published: true,
    published_at: "2026-07-23T00:00:00.000Z",
    updated_at: "2026-07-23T00:00:00.000Z",
  },
];

export const SAMPLE_PENGURUS: Pengurus[] = [
  // Periode 2023-2026
  { id: "p1", name: "Nama Ketua RT", jabatan: "Ketua RT", periode: "2023-2026", photo_url: null, contact: "0812-xxxx-xxxx", bio: "Menjabat sebagai Ketua RT sejak 2023.", order_index: 1 },
  { id: "p2", name: "Nama Sekretaris", jabatan: "Sekretaris", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 2 },
  { id: "p3", name: "Nama Bendahara", jabatan: "Bendahara", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 3 },
  { id: "p4", name: "Nama Ketua Karang Taruna", jabatan: "Karang Taruna", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 4 },
  { id: "p5", name: "Nama Ketua PKK", jabatan: "Ketua PKK", periode: "2023-2026", photo_url: null, contact: null, bio: null, order_index: 5 },
  // Periode 2020-2023 (historical)
  { id: "p6", name: "Nama Ketua RT Sebelumnya", jabatan: "Ketua RT", periode: "2020-2023", photo_url: null, contact: null, bio: null, order_index: 1 },
  { id: "p7", name: "Nama Sekretaris Sebelumnya", jabatan: "Sekretaris", periode: "2020-2023", photo_url: null, contact: null, bio: null, order_index: 2 },
];

export function getPeriodes(pengurus: Pengurus[]): string[] {
  return Array.from(new Set(pengurus.map((p) => p.periode))).sort().reverse();
}
