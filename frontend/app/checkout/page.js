'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiFetch, currency, getImageUrl } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import PageIntro from '@/components/PageIntro';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, hydrate: hydrateAuth } = useAuthStore();
  const { items, hydrate, subtotal, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
  });

  useEffect(() => {
    hydrate();
    hydrateAuth();
  }, [hydrate, hydrateAuth]);

  useEffect(() => {
    if (user?.name && !shipping.fullName) {
      setShipping((prev) => ({ ...prev, fullName: user.name }));
    }
  }, [user, shipping.fullName]);

  const sub = subtotal();
  const tax = Number((sub * 0.08).toFixed(2));
  const total = Number((sub + tax).toFixed(2));

  const submit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error('Please login before checkout');
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const cleanShipping = {
      fullName: shipping.fullName.trim(),
      phone: shipping.phone.trim(),
      address: shipping.address.trim(),
      city: shipping.city.trim(),
      postalCode: shipping.postalCode.trim(),
    };

    if (!cleanShipping.fullName || !cleanShipping.phone || !cleanShipping.address || !cleanShipping.city) {
      toast.error('Please complete your shipping details');
      return;
    }

    setLoading(true);

    try {
      await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          orderItems: items.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          shippingAddress: cleanShipping,
          paymentMethod: 'Cash on Delivery',
        }),
      });

      clearCart();
      toast.success('Order placed successfully');
      router.push('/profile');
    } catch (error) {
  if (error.message?.includes('Product not found')) {
    clearCart();
    toast.error('Cart was outdated. Please add products again.');
    router.push('/products');
    return;
  }

  toast.error(error.message || 'Order failed. Is backend running?');
}
  };

  return (
    <>
      <PageIntro
        title="Secure Checkout"
        text="Add your delivery details and place your order. This version uses Cash on Delivery, so you can test the complete ecommerce flow without payment keys."
      />

      <section className="page-shell grid gap-8 pb-20 lg:grid-cols-[minmax(0,1fr)_420px]">
        <form onSubmit={submit} className="glass-panel min-w-0 rounded-[2rem] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3]">Shipping Details</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Full Name</span>
              <input
                required
                value={shipping.fullName}
                onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                className="input-coffee"
                placeholder="Your full name"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Phone</span>
              <input
                required
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                className="input-coffee"
                placeholder="+92 300 0000000"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Address</span>
              <input
                required
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="input-coffee"
                placeholder="House / street / area"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">City</span>
              <input
                required
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                className="input-coffee"
                placeholder="Karachi"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Postal Code</span>
              <input
                value={shipping.postalCode}
                onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                className="input-coffee"
                placeholder="74000"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Country</span>
              <input
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                className="input-coffee"
              />
            </label>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-[#120B08]/65 p-5">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#E0A458]">Payment Method</p>
            <p className="mt-3 text-lg font-bold text-[#F5E6D3]">Cash on Delivery</p>
            <p className="mt-2 text-sm text-[#BFA890]">
              Payment gateway can be connected later when you add real Stripe keys.
            </p>
          </div>

          <button
            disabled={loading || items.length === 0}
            className="caramel-button mt-8 h-14 w-full rounded-full text-sm font-black uppercase tracking-[.18em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <aside className="glass-panel h-fit min-w-0 rounded-[2rem] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3]">Order Review</h2>

          <div className="mt-6 max-h-[360px] space-y-4 overflow-auto pr-2 hide-scrollbar">
            {items.map((item) => (
              <div key={item._id || item.slug} className="flex gap-4 rounded-2xl border border-white/10 bg-[#120B08]/60 p-3">
                <img
                  src={getImageUrl(item.cardImage || item.image)}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-black text-[#F5E6D3]">{item.name}</p>
                  <p className="text-xs uppercase tracking-[.16em] text-[#BFA890]">Qty {item.quantity}</p>
                  <p className="mt-1 font-bold text-[#ffb77a]">{currency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}

            {items.length === 0 && <p className="text-[#BFA890]">No items in cart.</p>}
          </div>

          <div className="mt-6 border-t border-[#4B2E1F] pt-5 text-[#D6B48C]">
            <div className="flex justify-between py-2"><span>Subtotal</span><span>{currency(sub)}</span></div>
            <div className="flex justify-between py-2"><span>Shipping</span><span className="text-[#ffb77a]">Free</span></div>
            <div className="flex justify-between py-2"><span>Tax</span><span>{currency(tax)}</span></div>
            <div className="mt-3 flex justify-between border-t border-[#4B2E1F] pt-4 font-display text-2xl font-black text-[#F5E6D3]">
              <span>Total</span>
              <span>{currency(total)}</span>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}