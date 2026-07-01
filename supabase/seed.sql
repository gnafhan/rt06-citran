-- ============================================================
-- RT 06 Citran — Seed Data (isi awal)
-- ============================================================
--
-- Jalankan file ini SETELAH schema.sql sudah ke-apply.
--
-- Isi:
--   - 4 artikel contoh (bisa langsung di-edit / di-delete dari /admin)
--   - 7 pengurus contoh (2 periode: 2023-2026 aktif + 2020-2023 historis)
--
-- Idempotent: aman di-rerun. Baris duplikat dilewati.
--
-- Untuk mulai bersih (tanpa contoh) di production:
--   1. Skip file ini pas setup awal, ATAU
--   2. Setelah setup, delete dari /admin panel satu-per-satu, ATAU
--   3. Truncate tabel via SQL:
--        delete from public.articles where author in ('Redaksi Citran', 'Karang Taruna Citran', 'PKK RT 06');
--        delete from public.pengurus where name like 'Nama %';
-- ============================================================

-- ARTIKEL ---------------------------------------------------
insert into public.articles (slug, title, excerpt, body, cover_url, category, author, published, published_at, updated_at) values
  (
    'tim-kroncong-citran',
    'Suami Bu Rini, dan Senar-Senar yang Tak Pernah Putus',
    'Tim Kroncong Citran bukan cuma grup musik. Ini ruang di mana generasi bertemu—dan Pak Bamuskal jadi jembatannya.',
    E'Ini konten placeholder. Nanti diisi oleh editor via halaman admin.\n\n## Awal Mula\n\nBapak Bamuskal mulai memegang biola sejak muda. Dari lorong-lorong Kotagede, ia belajar dari para pemusik senior yang kini sebagian sudah tiada.\n\n## Grup Kroncong Citran\n\nGrup ini terbentuk secara organik. Kumpul dulu, main lagu, baru dinamai belakangan. Di rumah Bu Rini—istri Pak Bamuskal—latihan mingguan berjalan hampir seperti pengajian: teratur, khidmat, hangat.',
    'https://picsum.photos/seed/kroncong-citran-cover/1600/1000',
    'profil',
    'Redaksi Citran',
    true,
    '2026-06-15T00:00:00.000Z',
    '2026-06-15T00:00:00.000Z'
  ),
  (
    'kerja-bakti-gapura-lama',
    'Kerja Bakti Gapura Lama, Cat Kembali Terangnya',
    'Minggu pagi, warga RT 06 turun ke gang untuk memperbaiki gapura yang sudah menua. Ini bukan cuma soal cat.',
    E'Konten placeholder untuk artikel kerja bakti. Nanti tinggal di-edit dari /admin.\n\n## Persiapan\n\nWarga kumpul jam enam pagi di depan rumah Pak RT. Kuas, ember cat, dan kopi tiga termos sudah siap. Anak-anak kecil ikut menonton dari pinggir gang.\n\n## Hasil\n\nSelesai menjelang dzuhur. Gapura bata merah yang sudah lima tahun tak tersentuh, kembali terlihat segar. Warga pulang membawa lelah yang menyenangkan.',
    'https://picsum.photos/seed/gapura-citran/1600/1000',
    'kegiatan',
    'Karang Taruna Citran',
    true,
    '2026-05-28T00:00:00.000Z',
    '2026-05-28T00:00:00.000Z'
  ),
  (
    'cerita-mbah-tentang-kotagede',
    'Cerita Mbah Tentang Kotagede yang Belum Sempat Ditulis',
    'Tiga sesepuh berkumpul di serambi mushola. Yang keluar bukan cuma cerita—tapi lapisan sejarah yang belum pernah masuk buku.',
    E'Konten placeholder untuk artikel sejarah.\n\n## Sore di Serambi\n\nMbah Karto, Mbah Sastro, dan Mbah Wardi duduk melingkar setelah maghrib. Kopi masih hangat, obrolan menyusuri masa muda mereka di Kotagede.\n\n## Yang Hilang\n\nMereka bercerita tentang gang-gang yang sekarang sudah beraspal, dulunya tanah liat yang licin di musim hujan. Tentang para pengrajin perak yang sekarang sudah tinggal cerita.',
    'https://picsum.photos/seed/mbah-kotagede/1600/1000',
    'sejarah',
    'Redaksi Citran',
    true,
    '2026-04-10T00:00:00.000Z',
    '2026-04-10T00:00:00.000Z'
  ),
  (
    'posyandu-april',
    'Posyandu April: Data Anak dan Ibu Hamil',
    'Rekap kegiatan Posyandu bulan April. Catatan singkat untuk transparansi warga.',
    E'Konten placeholder untuk pengumuman posyandu.\n\n## Rekap Kunjungan\n\nBulan April tercatat 24 balita dan 3 ibu hamil aktif hadir di posyandu RT 06. Semua dalam kondisi sehat, imunisasi rutin sudah diselesaikan.\n\n## Info Bulan Depan\n\nPosyandu berikutnya diadakan Minggu pertama Mei. Info lengkap akan diumumkan lewat grup WhatsApp warga.',
    'https://picsum.photos/seed/posyandu-citran/1600/1000',
    'pengumuman',
    'PKK RT 06',
    true,
    '2026-04-05T00:00:00.000Z',
    '2026-04-05T00:00:00.000Z'
  )
on conflict (slug) do nothing;


-- PENGURUS ---------------------------------------------------
-- Bersihin dulu seed lama dari schema.sql yang ga punya order_index penuh
delete from public.pengurus
  where name in ('Nama Ketua RT', 'Nama Sekretaris', 'Nama Bendahara')
    and periode = '2023-2026'
    and jabatan in ('Ketua RT', 'Sekretaris', 'Bendahara');

insert into public.pengurus (name, jabatan, periode, photo_url, contact, bio, order_index) values
  -- Periode aktif: 2023-2026
  ('Nama Ketua RT',            'Ketua RT',      '2023-2026', null, '0812-xxxx-xxxx', 'Menjabat sebagai Ketua RT sejak 2023.', 1),
  ('Nama Sekretaris',          'Sekretaris',    '2023-2026', null, null,             null, 2),
  ('Nama Bendahara',           'Bendahara',     '2023-2026', null, null,             null, 3),
  ('Nama Ketua Karang Taruna', 'Karang Taruna', '2023-2026', null, null,             null, 4),
  ('Nama Ketua PKK',           'Ketua PKK',     '2023-2026', null, null,             null, 5),
  -- Periode sebelumnya: 2020-2023 (histori)
  ('Nama Ketua RT Sebelumnya',   'Ketua RT',   '2020-2023', null, null, null, 1),
  ('Nama Sekretaris Sebelumnya', 'Sekretaris', '2020-2023', null, null, null, 2)
on conflict do nothing;
