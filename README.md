# RT 06 Citran

Landing page + light CMS untuk Rukun Tetangga 06 Citran, Bodon, Jagalan, Banguntapan, Bantul. Kawasan Cagar Budaya Kotagede.

**Vibe:** Editorial-cultural. Kertas krem, sogan (coklat batik), kunyit accent, ornamen kawung. Bukan corporate, bukan brutalist.

## Stack

- **Framework:** Next.js 16 App Router + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (framer-motion successor)
- **CMS + Auth + DB:** Supabase (free tier)
- **Image storage:** Cloudinary (free 25 credits/bulan)
- **Deploy:** Vercel Hobby (free)
- **Fonts:** Fraunces (display serif), Plus Jakarta Sans (body), JetBrains Mono, Noto Sans Javanese

## Struktur

```
src/
├── app/
│   ├── page.tsx              # Beranda (hero drone, warisan, tim kroncong teaser)
│   ├── tentang/              # Sejarah, wilayah, kontak
│   ├── liputan/              # Blog list + [slug] detail
│   ├── pengurus/             # Tab periode
│   └── admin/                # Portal admin (protected)
│       ├── login/
│       ├── liputan/          # CRUD liputan
│       └── pengurus/         # Read-only untuk saat ini
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx              # Hero dengan parallax drone
│   ├── reveal.tsx            # Motion reveal utilities
│   └── kawung.tsx            # Batik kawung SVG components
├── lib/
│   ├── supabase/             # Supabase clients (server + browser)
│   ├── queries.ts            # Data fetchers (fallback ke sample data)
│   ├── sample-data.ts        # Data contoh (kalau Supabase belum di-setup)
│   ├── types.ts
│   └── utils.ts
└── middleware.ts             # Guard /admin/*
```

## Setup Lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Site jalan tanpa Supabase (fallback ke sample data). Untuk full CMS:

### 1. Setup Supabase (~5 menit, free)

1. Buat account di [supabase.com](https://supabase.com)
2. Create new project (region: **Singapore** untuk latency terdekat ke Indonesia)
3. Dashboard → **SQL Editor** → paste isi `supabase/schema.sql` → Run
4. Dashboard → **Authentication** → Users → **Add user** → email + password buat Ketua RT
5. Dashboard → **Settings** → **API** → copy `URL` dan `anon public key` ke `.env.local`

### 2. Setup Cloudinary (~3 menit, free)

1. Buat account di [cloudinary.com](https://cloudinary.com)
2. Dashboard → **Settings** → **Upload** → **Add upload preset** → mode: **Unsigned**, nama: `rt06_citran_unsigned`
3. Dashboard → **Account Details** → copy `Cloud Name` ke `.env.local`

Upload foto:
- Buka Cloudinary Dashboard → **Media Library** → upload
- Copy URL yang jadi (`https://res.cloudinary.com/...`)
- Tempel di field "URL foto cover" saat bikin/edit liputan

Atau setup [Cloudinary Media Library widget](https://cloudinary.com/documentation/media_library_widget) langsung di admin form (bisa ditambahkan nanti).

### 3. Login Admin

- Buka `http://localhost:3000/admin/login`
- Login dengan email/password yang tadi dibuat di Supabase
- Mulai edit liputan

## Deploy ke Vercel

```bash
git init && git add . && git commit -m "initial"
gh repo create rt06-citran --public --source=. --push
```

Lalu di [vercel.com](https://vercel.com):
1. **Import Project** → pilih repo `rt06-citran`
2. **Environment Variables** → tambahkan semua dari `.env.example` dengan value yang bener
3. Deploy

Custom domain (opsional): Vercel → Settings → Domains

## Konten yang Perlu Diganti

- [ ] Foto drone aerial (hero beranda) — sementara pake `picsum.photos` placeholder
- [ ] Foto liputan (cover artikel)
- [ ] Nama pengurus real per periode
- [ ] Nomor WhatsApp Ketua RT (`src/app/tentang/page.tsx` line ~44)
- [ ] Email pengaduan
- [ ] Aksara Jawa `ꦕꦶꦠꦿꦤ꧀` di footer — verifikasi ejaan benar

## Design System

Semua design tokens ada di `src/app/globals.css`:

- **Palette:** sogan (coklat batik), kunyit (kuning), daun (hijau), bata (merah), paper (krem)
- **Typography:** Fraunces (display), Plus Jakarta Sans (body), JetBrains Mono, Noto Sans Javanese
- **Motion:** Semua transisi via `motion/react` (framer-motion), respect `prefers-reduced-motion`
- **Motif Kawung:** SVG components di `src/components/kawung.tsx` — dipake sebagai accent, bukan wallpaper

## Prinsip Design

Skill yang dipake:
- `minimalist-ui` — editorial vibe, no gradients, warm monochrome
- `frontend-design` — production-grade components, ban Inter/Roboto/generic AI slop

Yang **dilanggar** dengan sadar:
- Kawung pattern boleh muncul (skill minimalist bilang no geometric decoration, tapi context budaya nge-override)
- Serif italic accent di headline (Fraunces italic → identitas visual)

Yang **dijaga**:
- Tidak ada emoji di UI
- Tidak ada gradient purple-pink
- Font bukan Inter/Roboto/Space Grotesk
- Shadow sangat subtle
- Animation purposeful, subtle, respect reduced-motion

## Roadmap

- [ ] Cloudinary upload widget di admin form (drag & drop)
- [ ] CRUD full untuk `/admin/pengurus`
- [ ] RSS feed di `/liputan/rss.xml`
- [ ] Sitemap otomatis
- [ ] Search sederhana di halaman liputan
- [ ] Foto galeri di halaman Tentang
- [ ] Mode gelap (opsional)
