"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { KawungPattern, KawungMark } from "@/components/kawung";
import { Loader2, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden">
      <KawungPattern
        className="absolute -top-32 -left-32 h-[500px] w-[500px] text-sogan-400 animate-slow-rotate"
        opacity={0.08}
      />
      <KawungPattern
        className="absolute -bottom-32 -right-32 h-[500px] w-[500px] text-sogan-400 animate-drift"
        opacity={0.08}
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm eyebrow text-sogan-500 hover:text-sogan-900 mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke situs
        </Link>

        <div className="bg-paper-soft border border-sogan/10 rounded-lg p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <KawungMark className="h-8 w-8 text-sogan" />
            <div>
              <p className="eyebrow text-[10px] text-sogan-500">
                Portal Admin
              </p>
              <h1 className="font-display text-2xl text-sogan-900">
                RT 06 Citran
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="eyebrow text-[10px] block mb-2">
                Email pengurus
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all text-sogan-900"
                placeholder="ketua.rt@citran.id"
              />
            </div>

            <div>
              <label htmlFor="password" className="eyebrow text-[10px] block mb-2">
                Kata sandi
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-paper border border-sogan/15 rounded-md focus:outline-none focus:border-sogan focus:ring-2 focus:ring-sogan/10 transition-all text-sogan-900"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-bata bg-bata/5 border border-bata/20 px-4 py-3 rounded-md">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sogan-900 text-paper py-3 rounded-md hover:bg-sogan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Masuk
            </button>
          </form>

          <p className="mt-8 pt-6 border-t border-sogan/10 text-xs text-ink-mute leading-relaxed">
            Portal ini hanya untuk pengurus RT 06 Citran. Kalau lupa kata
            sandi, hubungi Ketua RT langsung.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <LoginForm />
    </Suspense>
  );
}
