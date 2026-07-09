'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { MinusIcon, PlusIcon, TrashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { currency, getImageUrl } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import PageIntro from '@/components/PageIntro';

export default function CartPage() {
  const { items, hydrate, updateQuantity, removeItem, subtotal } = useCartStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  const sub = subtotal();
  const tax = sub * 0.08;
  const total = sub + tax;

  return (
    <>
      <PageIntro title="Your Selection" text="Curated for your discerning palate." />

      <section className="page-shell grid gap-8 pb-20 lg:grid-cols-[1fr_384px]">
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="glass-panel rounded-[2rem] p-10 text-center">
              <h2 className="font-display text-4xl font-black text-[#F5E6D3]">Your cart is empty.</h2>
              <p className="mt-4 text-[#BFA890]">Add some rare coffee blends before checkout.</p>
              <Link href="/products" className="caramel-button mt-7 inline-flex rounded-full px-8 py-4 text-sm font-black">Shop Coffee</Link>
            </div>
          ) : items.map((item) => (
            <div key={item._id || item.slug} className="glass-panel grid gap-5 rounded-[1rem] p-5 sm:grid-cols-[128px_1fr_auto_auto] sm:items-center">
              <img src={getImageUrl(item.cardImage || item.image)} alt={item.name} className="h-32 w-32 rounded-xl object-cover" />
              <div>
                <h3 className="font-display text-3xl font-black leading-tight text-[#F5E6D3]">{item.name}</h3>
                <p className="mt-2 text-sm font-black uppercase tracking-[.18em] text-[#BFA890]">{item.roast} Roast · {item.weight || '250g'}</p>
              </div>
              <div className="flex h-12 w-32 items-center justify-between rounded-full border border-white/10 bg-[#2A1811] px-4">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><MinusIcon className="h-4 w-4" /></button>
                <span className="font-black">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><PlusIcon className="h-4 w-4" /></button>
              </div>
              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <p className="font-display text-3xl font-black text-[#ffb77a]">{currency(item.price * item.quantity)}</p>
                <button onClick={() => removeItem(item._id)} className="text-[#c08b86] hover:text-red-300"><TrashIcon className="h-5 w-5" /></button>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass-panel h-fit rounded-[1.4rem] p-8 lg:sticky lg:top-24">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3]">Order Summary</h2>
          <div className="mt-5 border-t border-[#4B2E1F] pt-6">
            <div className="flex justify-between py-3 font-bold text-[#D6B48C]"><span>Subtotal</span><span>{currency(sub)}</span></div>
            <div className="flex justify-between py-3 font-bold text-[#D6B48C]"><span>Shipping</span><span className="text-[#ffb77a]">Complimentary</span></div>
            <div className="flex justify-between py-3 font-bold text-[#D6B48C]"><span>Tax (Estimated)</span><span>{currency(tax)}</span></div>
          </div>
          <div className="mt-6 border-t border-[#4B2E1F] pt-6">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#BFA890]">Total Investment</p>
            <p className="mt-2 font-display text-4xl font-black text-[#F5E6D3]">{currency(total)}</p>
          </div>
          <Link href="/checkout" className={`caramel-button mt-8 grid h-14 place-items-center rounded-full text-sm font-black uppercase tracking-[.18em] ${items.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>Proceed to Checkout</Link>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-[#806a56]"><ShieldCheckIcon className="h-5 w-5" /> Secure Encrypted Checkout</p>
        </aside>
      </section>
    </>
  );
}
