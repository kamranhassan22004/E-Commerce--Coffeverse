'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { href: '/products', label: 'Shop' },
  { href: '/roastery', label: 'Roastery' },
  { href: '/brew-guides', label: 'Brew Guides' },
  { href: '/story', label: 'Our Story' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { hydrate, totalItems } = useCartStore();
  const { hydrate: hydrateAuth, user, logout } = useAuthStore();

  useEffect(() => {
    hydrate();
    hydrateAuth();
  }, [hydrate, hydrateAuth]);

  const active = (href) => pathname === href || (href === '/products' && pathname?.startsWith('/products'));

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A1811]/80 bg-[#120B08]/92 backdrop-blur-2xl">
      <div className="page-shell flex h-[68px] items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="hidden h-8 w-8 place-items-center rounded-full text-[#ffb77a] sm:grid">
            <SparklesIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-[28px] font-black tracking-[-0.03em] text-[#F5E6D3]">CoffeeVerse</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`relative text-sm font-extrabold transition ${active(item.href) ? 'text-[#ffb77a]' : 'text-[#D6B48C] hover:text-[#FFF7ED]'}`}>
              {item.label}
              {active(item.href) && <span className="absolute -bottom-3 left-0 h-[2px] w-full rounded-full bg-[#ffb77a]" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/cart" className="relative rounded-full p-2 text-[#f4c99d] transition hover:bg-white/5 hover:text-[#ffb77a]" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems() > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ffb77a] px-1 text-[10px] font-black text-[#1b120e]">{totalItems()}</span>}
          </Link>
          {user ? (
            <div className="group relative">
              <button className="rounded-full p-2 text-[#f4c99d] transition hover:bg-white/5 hover:text-[#ffb77a]" aria-label="Account">
                <UserIcon className="h-6 w-6" />
              </button>
              <div className="invisible absolute right-0 top-11 w-56 rounded-2xl border border-white/10 bg-[#1b100b] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                <p className="px-3 py-2 text-xs text-[#BFA890]">Signed in as<br /><span className="font-bold text-[#F5E6D3]">{user.name}</span></p>
                <Link href="/profile" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#D6B48C] hover:bg-white/5 hover:text-white">Profile</Link>
                {user.role === 'admin' && <Link href="/admin" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#D6B48C] hover:bg-white/5 hover:text-white">Admin Panel</Link>}
                <button onClick={logout} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#D6B48C] hover:bg-white/5 hover:text-white">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="rounded-full p-2 text-[#f4c99d] transition hover:bg-white/5 hover:text-[#ffb77a]" aria-label="Login">
              <UserIcon className="h-6 w-6" />
            </Link>
          )}
        </div>

        <button onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 p-2 text-[#f4c99d] lg:hidden" aria-label="Toggle menu">
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#120B08] px-5 py-5 lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`block rounded-2xl px-4 py-3 text-sm font-extrabold ${active(item.href) ? 'bg-[#ffb77a] text-[#1b120e]' : 'text-[#D6B48C] hover:bg-white/5'}`}>{item.label}</Link>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link href="/cart" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-extrabold text-[#F5E6D3]">Cart ({totalItems()})</Link>
              <Link href={user ? '/profile' : '/login'} onClick={() => setOpen(false)} className="rounded-2xl bg-[#ffb77a] px-4 py-3 text-center text-sm font-extrabold text-[#1b120e]">{user ? 'Profile' : 'Login'}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
