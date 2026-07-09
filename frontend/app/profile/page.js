'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch, currency } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import PageIntro from '@/components/PageIntro';

export default function ProfilePage() {
  const { user, hydrate } = useAuthStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    if (user) apiFetch('/orders/my').then(setOrders).catch(() => setOrders([]));
  }, [user]);

  if (!user) {
    return (
      <section className="page-shell py-24">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] p-9 text-center">
          <h1 className="font-display text-4xl font-black text-[#F5E6D3]">Login required</h1>
          <p className="mt-4 text-[#BFA890]">Please login to view your CoffeeVerse profile and orders.</p>
          <Link href="/login" className="caramel-button mt-7 inline-flex rounded-full px-8 py-4 text-sm font-black">Login</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageIntro title="Your Coffee Profile" text={`Welcome back, ${user.name}. Track orders and manage your coffee journey.`} />
      <section className="page-shell grid gap-8 pb-20 lg:grid-cols-[320px_1fr]">
        <aside className="glass-panel h-fit rounded-[2rem] p-7">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3]">{user.name}</h2>
          <p className="mt-2 text-sm text-[#BFA890]">{user.email}</p>
          <p className="mt-5 inline-flex rounded-full border border-[#E0A458]/25 bg-[#4B2E1F]/60 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-[#E0A458]">{user.role}</p>
          {user.role === 'admin' && <Link href="/admin" className="caramel-button mt-6 grid h-12 place-items-center rounded-full text-sm font-black">Open Admin Panel</Link>}
        </aside>

        <div className="glass-panel rounded-[2rem] p-7">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3]">Order History</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-[#BFA890]"><tr><th className="py-3">Order</th><th>Date</th><th>Total</th><th>Status</th><th>Items</th></tr></thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-white/10">
                    <td className="py-4 font-black text-[#E0A458]">#{order._id.slice(-7).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{currency(order.totalPrice)}</td>
                    <td><span className="rounded-full bg-[#2A1811] px-3 py-1 text-xs font-black text-[#D6B48C]">{order.status}</span></td>
                    <td>{order.orderItems.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <p className="py-10 text-[#BFA890]">No orders yet. Place a test order from checkout.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
