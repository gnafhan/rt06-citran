import Link from "next/link";
import { LayoutDashboard, FileText, Users } from "lucide-react";
import { KawungMark } from "@/components/kawung";
import { SignOutButton } from "./sign-out-button";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/liputan", label: "Liputan", icon: FileText },
  { href: "/admin/pengurus", label: "Pengurus", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="w-64 border-r border-sogan/10 bg-paper-soft flex flex-col shrink-0">
        <div className="p-6 border-b border-sogan/10">
          <Link href="/admin" className="flex items-center gap-3">
            <KawungMark className="h-7 w-7 text-sogan" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-base text-sogan-900">
                RT 06 Citran
              </span>
              <span className="eyebrow text-[9px] mt-1">Admin Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink-soft hover:bg-paper hover:text-sogan-900 transition-colors"
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sogan/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-ink-mute hover:text-sogan-900 transition-colors"
          >
            Lihat situs publik
          </Link>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 md:p-12 max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
