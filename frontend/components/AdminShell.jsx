'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminGuard from './AdminGuard';

const items = [
  ['Dashboard', '/admin'],
  ['Products', '/admin/products'],
  ['Orders', '/admin/orders'],
  ['Storefront', '/products'],
];

export default function AdminShell({ children }) {
  const pathname = usePathname();

  return (
    <AdminGuard>
      <section className="page-shell py-10 sm:py-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="glass-panel h-fit rounded-[2rem] p-5 lg:sticky lg:top-24">
            <p className="px-3 text-xs font-black uppercase tracking-[.26em] text-[#E0A458]">
              Admin Roastery
            </p>
            <h1 className="mt-3 px-3 font-display text-3xl font-black text-[#F5E6D3]">
              Control Panel
            </h1>

            <nav className="mt-7 grid gap-2">
              {items.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                    pathname === href
                      ? 'bg-[#E0A458] text-[#1B120E]'
                      : 'text-[#D6B48C] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </section>
    </AdminGuard>
  );
}