"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Pengurus } from "@/lib/types";
import { ImageUpload } from "@/components/image-upload";

interface Props {
  pengurus?: Pengurus;
  action: (formData: FormData) => Promise<void>;
  existingPeriodes: string[];
}

const JABATAN_PRESETS = [
  "Ketua RT",
  "Wakil Ketua RT",
  "Sekretaris",
  "Bendahara",
  "Ketua PKK",
  "Karang Taruna",
  "Keamanan / Ronda",
  "Kesehatan",
  "Humas",
];

export function PengurusForm({ pengurus, action, existingPeriodes }: Props) {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(pengurus?.photo_url ?? "");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await action(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="eyebrow text-[10px] block mb-2">Nama lengkap</label>
        <input
          name="name"
          required
          defaultValue={pengurus?.name}
          className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-display text-2xl text-sogan-900"
          placeholder="Nama lengkap..."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="eyebrow text-[10px] block mb-2">Jabatan</label>
          <input
            name="jabatan"
            required
            list="jabatan-list"
            defaultValue={pengurus?.jabatan}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all"
            placeholder="Ketua RT"
          />
          <datalist id="jabatan-list">
            {JABATAN_PRESETS.map((j) => (
              <option key={j} value={j} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="eyebrow text-[10px] block mb-2">Periode</label>
          <input
            name="periode"
            required
            list="periode-list"
            defaultValue={pengurus?.periode ?? existingPeriodes[0] ?? "2023-2026"}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-mono"
            placeholder="2023-2026"
            pattern="[0-9]{4}-[0-9]{4}"
          />
          <datalist id="periode-list">
            {existingPeriodes.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="eyebrow text-[10px] block mb-2">Kontak (WhatsApp)</label>
          <input
            name="contact"
            defaultValue={pengurus?.contact ?? ""}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-mono"
            placeholder="0812-xxxx-xxxx"
          />
        </div>
        <div>
          <label className="eyebrow text-[10px] block mb-2">Urutan tampil</label>
          <input
            name="order_index"
            type="number"
            defaultValue={pengurus?.order_index ?? 0}
            className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all font-mono"
          />
          <p className="mt-2 text-xs text-ink-mute">
            Angka kecil tampil duluan. Ketua RT biasanya 1.
          </p>
        </div>
      </div>

      <ImageUpload
        name="photo_url"
        value={photoUrl}
        onChange={setPhotoUrl}
        label="Foto pengurus"
        aspectRatio="1/1"
      />

      <div>
        <label className="eyebrow text-[10px] block mb-2">
          Bio singkat (opsional)
        </label>
        <textarea
          name="bio"
          rows={3}
          defaultValue={pengurus?.bio ?? ""}
          className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all"
          placeholder="Menjabat sejak..."
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-sogan/10">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-sogan-900 text-paper px-6 py-3 rounded-md hover:bg-sogan-800 transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Simpan
        </button>
      </div>
    </form>
  );
}
