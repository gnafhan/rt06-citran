-- ============================================================
-- RT 06 Citran — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ARTICLES ---------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null,
  cover_url text,
  category text not null default 'cerita'
    check (category in ('kegiatan', 'sejarah', 'profil', 'pengumuman', 'cerita')),
  author text not null default 'Redaksi Citran',
  published boolean not null default false,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_published_at_idx
  on public.articles (published, published_at desc);

alter table public.articles enable row level security;

-- Public can read published articles
create policy "articles_public_read"
  on public.articles for select
  using (published = true);

-- Authenticated users (admin) can read all
create policy "articles_authenticated_read_all"
  on public.articles for select
  to authenticated
  using (true);

-- Authenticated users can insert/update/delete
create policy "articles_authenticated_write"
  on public.articles for all
  to authenticated
  using (true)
  with check (true);


-- PENGURUS ---------------------------------------------------
create table if not exists public.pengurus (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  jabatan text not null,
  periode text not null,
  photo_url text,
  contact text,
  bio text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists pengurus_periode_idx
  on public.pengurus (periode, order_index);

alter table public.pengurus enable row level security;

create policy "pengurus_public_read"
  on public.pengurus for select
  using (true);

create policy "pengurus_authenticated_write"
  on public.pengurus for all
  to authenticated
  using (true)
  with check (true);


-- ============================================================
-- SEED DATA (opsional, hapus kalau ga butuh)
-- ============================================================
insert into public.pengurus (name, jabatan, periode, order_index) values
  ('Nama Ketua RT', 'Ketua RT', '2023-2026', 1),
  ('Nama Sekretaris', 'Sekretaris', '2023-2026', 2),
  ('Nama Bendahara', 'Bendahara', '2023-2026', 3)
on conflict do nothing;
