'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AdminGuard({ children }) {
  const { user, hydrate, hydrated } = useAuthStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  if (!hydrated) return <div className="page-shell py-24 text-[#BFA890]">Checking admin access...</div>;

  if (!user || user.role !== 'admin') {
    return (
      <section className="page-shell py-24">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] p-9 text-center">
          <h1 className="font-display text-4xl font-black text-[#F5E6D3]">Admin access only</h1>
          <p className="mt-4 text-[#BFA890]">Login using the seeded admin account to manage products and orders.</p>
          <Link href="/login" className="caramel-button mt-7 inline-flex rounded-full px-8 py-4 text-sm font-black">Login as Admin</Link>
        </div>
      </section>
    );
  }

  return children;
}
