import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono, Noto_Sans_Javanese } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EditModeProvider } from "@/components/editable/edit-mode-provider";
import { createClient } from "@/lib/supabase/server";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const notoJawa = Noto_Sans_Javanese({
  variable: "--font-noto-jawa",
  subsets: ["javanese", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RT 06 Citran — Nyawiji ing Warisan Mataram",
    template: "%s · RT 06 Citran",
  },
  description:
    "Rukun Tetangga 06 Citran, Bodon, Jagalan, Banguntapan, Bantul. Kampung warisan Mataram Islam di kawasan Cagar Budaya Kotagede.",
  keywords: [
    "RT 06 Citran",
    "Bodon Jagalan",
    "Kotagede",
    "Kawasan Cagar Budaya",
    "Mataram Islam",
    "Banguntapan Bantul",
  ],
  openGraph: {
    title: "RT 06 Citran — Nyawiji ing Warisan Mataram",
    description:
      "Kampung warisan Mataram Islam di Bodon, Jagalan, Banguntapan, Bantul.",
    locale: "id_ID",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect admin: kalau user login via Supabase, treat as admin.
  // Public signup disabled, jadi cuma admin yang bisa login.
  let isAdmin = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isAdmin = !!user;
  } catch {
    // If Supabase not configured, isAdmin stays false
  }

  return (
    <html lang="id">
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} ${notoJawa.variable}`}
      >
        <EditModeProvider isAdmin={isAdmin}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </EditModeProvider>
      </body>
    </html>
  );
}
