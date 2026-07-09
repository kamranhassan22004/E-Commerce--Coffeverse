'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { apiFetch, currency } from '@/lib/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiFetch('/products').then(setProducts).catch(() => setProducts([]));
    apiFetch('/orders').then(setOrders).catch(() => setOrders([]));
  }, []);

  const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pending = orders.filter((order) => order.status === 'Pending').length;

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">CoffeeVerse Backend</p>
        <h1 className="mt-3 font-display text-5xl font-black text-[#F5E6D3]">Admin Dashboard</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ['Products', products.length],
          ['Orders', orders.length],
          ['Revenue', currency(revenue)],
          ['Pending Orders', pending],
          ['Low Stock', products.filter((p) => p.countInStock <= 10).length],
          ['Featured', products.filter((p) => p.featured).length],
        ].map(([label, value]) => (
          <div key={label} className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#BFA890]">{label}</p>
            <p className="mt-3 font-display text-4xl font-black text-[#E0A458]">{value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
