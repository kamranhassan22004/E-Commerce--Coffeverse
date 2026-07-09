'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminShell from '@/components/AdminShell';
import { apiFetch, currency } from '@/lib/api';

const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const load = () => apiFetch('/orders').then(setOrders).catch(() => setOrders([]));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
      toast.success('Order updated');
      load();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminShell>
      <div className="glass-panel rounded-[2rem] p-5 sm:p-7">
        <h2 className="font-display text-4xl font-black text-[#F5E6D3]">Orders</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-[#BFA890]"><tr><th className="py-3">Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Items</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-white/10">
                  <td className="py-4 font-bold text-[#E0A458]">#{order._id.slice(-7).toUpperCase()}</td>
                  <td>{order.user?.name}<br /><span className="text-xs text-[#806a56]">{order.user?.email}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{currency(order.totalPrice)}</td>
                  <td>{order.orderItems.length}</td>
                  <td>
                    <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="input-coffee max-w-[160px]">
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="py-8 text-[#BFA890]">No orders yet.</p>}
        </div>
      </div>
    </AdminShell>
  );
}
