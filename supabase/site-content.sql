-- ============================================================
-- RT 06 Citran — Site Content (inline-editable content store)
-- ============================================================
-- Key-value store buat teks/heading/paragraf yang bisa di-edit
-- langsung dari halaman publik (WordPress-style) oleh admin.
--
-- Contoh key:
--   home.intro.eyebrow    -> "Selamat datang"
--   home.intro.title      -> "Kampung yang dijaga kolektif..."
--   home.intro.p1         -> "RT 06 Citran berdiri di Bodon..."
--   home.cta.title        -> "Punya cerita, foto lama..."
--
-- Ga ada default value \u2014 kalau row ga ada, front-end pakai
-- fallback text hard-coded di komponen (progressive enhancement).
-- ============================================================

create table if not exists public.site_content (
  key text primary key,
  content text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create index if not exists site_content_updated_at_idx
  on public.site_content (updated_at desc);

alter table public.site_content enable row level security;

-- Publik boleh baca semua (buat render halaman)
create policy "site_content_public_read"
  on public.site_content for select
  using (true);

-- Authenticated user (admin) boleh write
create policy "site_content_authenticated_write"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

-- Auto-update updated_at + updated_by trigger
create or replace function public.set_site_content_updated()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists site_content_before_upsert on public.site_content;
create trigger site_content_before_upsert
  before insert or update on public.site_content
  for each row execute function public.set_site_content_updated();
