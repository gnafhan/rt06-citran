# Email Templates Bahasa Indonesia

Template email untuk Supabase Auth, sudah disesuaikan dengan branding RT 06 Citran.

## Cara Setup

1. Login ke [Supabase Dashboard](https://supabase.com)
2. Pilih project RT 06 Citran
3. Menu kiri → **Authentication** → **Email Templates**
4. Untuk setiap template, klik tab yang sesuai lalu:
   - Copy isi file `.html` yang ada di folder ini
   - Paste ke editor Supabase
   - Ubah **Subject** heading sesuai yang tertera di masing-masing file
   - Klik **Save**

## Template yang tersedia

| File | Kapan dikirim | Subject |
|---|---|---|
| `confirm-signup.html` | Saat pengurus baru dibuat via Dashboard (butuh konfirmasi email) | Konfirmasi akun admin RT 06 Citran |
| `invite-user.html` | Saat admin invite pengurus baru | Undangan sebagai pengurus RT 06 Citran |
| `magic-link.html` | Login tanpa password (kalau diaktifkan) | Tautan masuk portal RT 06 Citran |
| `recovery.html` | Reset password | Atur ulang kata sandi admin RT 06 Citran |
| `email-change.html` | Konfirmasi ganti email | Konfirmasi perubahan email admin |

## Auth Settings Rekomendasi

Menu **Authentication** → **Providers** → **Email**:

- **Confirm email:** ON (biar akun ga bisa dipake sebelum verifikasi)
- **Secure email change:** ON (butuh konfirmasi dari email lama & baru)
- **Secure password change:** ON (butuh session valid)
- **Minimum password length:** 8

Menu **Authentication** → **URL Configuration**:

- **Site URL:** `https://rt06-citran.vercel.app` (atau domain custom)
- **Redirect URLs:** tambahkan `https://rt06-citran.vercel.app/**`

## Menonaktifkan Signup Publik

Karena portal ini admin-only, matikan self-signup:

**Authentication** → **Providers** → **Email** → matikan **Enable Sign Ups**.

Pengurus baru hanya bisa ditambahkan lewat:
1. Dashboard → **Authentication** → **Users** → **Add user** (email + password langsung)
2. Atau kirim invitation via **Add user** → **Send invitation email** (pake template `invite-user.html`)
