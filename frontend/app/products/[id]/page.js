'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { GlobeAltIcon, MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { apiFetch, currency, getImageUrl } from '@/lib/api';
import { demoProducts, findDemoProduct } from '@/lib/demoProducts';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(findDemoProduct(params.id) || demoProducts[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    apiFetch(`/products/${params.id}`)
      .then(setProduct)
      .catch(() => setProduct(findDemoProduct(params.id) || demoProducts[0]));
  }, [params.id]);

  const related = useMemo(() => demoProducts.filter((item) => item._id !== product?._id).slice(0, 3), [product]);

  const addToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  return (
    <>
      <section className="page-shell grid gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-28">
        <div className="glass-panel relative min-h-[520px] rounded-[1.8rem] p-7 sm:p-12">
          <span className="absolute right-8 top-8 rounded-full border border-[#E0A458]/25 bg-[#4B2E1F]/70 px-5 py-3 text-xs font-black uppercase tracking-[.2em] text-[#ffb77a]">Limited Batch</span>
          <div className="flex h-full min-h-[420px] items-center justify-center">
            <img src={getImageUrl(product.image)} alt={product.name} className="max-h-[310px] w-full max-w-[450px] rounded-xl object-cover shadow-[0_35px_100px_rgba(0,0,0,.5)]" />
          </div>
        </div>

        <div>
          <h1 className="font-display text-6xl font-black leading-[.98] tracking-[-.05em] text-[#FFF7ED] sm:text-7xl">{product.name}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="font-display text-5xl font-black text-[#ffb77a]">{currency(product.price)}</p>
            {product.oldPrice > 0 && <p className="text-lg font-semibold text-[#BFA890] line-through">{currency(product.oldPrice)}</p>}
            <span className="flex items-center gap-1 text-sm font-bold text-[#F5E6D3]"><StarIcon className="h-5 w-5 text-[#E0A458]" /> {Number(product.rating || 4.9).toFixed(1)}</span>
          </div>

          <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-[#D6B48C]">{product.description}</p>

          <div className="mt-8 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-black text-[#BFA890]">Roast Level</p>
              <p className="mt-2 text-base font-black text-[#F5E6D3]">{product.roast}</p>
            </div>
            <div>
              <p className="text-sm font-black text-[#BFA890]">Origin</p>
              <p className="mt-2 flex items-center gap-2 text-base font-black text-[#F5E6D3]"><GlobeAltIcon className="h-5 w-5 text-[#ffb77a]" /> {product.origin}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#BFA890]">Flavor Profile</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(product.tastingNotes || []).map((note) => <span key={note} className="rounded-full border border-white/10 bg-[#2A1811] px-5 py-2 text-sm font-black text-[#D6B48C]">{note}</span>)}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <div className="flex h-14 w-full items-center justify-between rounded-full border border-white/10 bg-[#2A1811] px-5 sm:w-40">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><MinusIcon className="h-5 w-5" /></button>
              <span className="font-black">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity"><PlusIcon className="h-5 w-5" /></button>
            </div>
            <button onClick={addToCart} className="caramel-button h-14 rounded-full px-10 text-sm font-black">Add to Cart</button>
            <Link href="/checkout" onClick={addToCart} className="outline-button grid h-14 place-items-center rounded-full px-10 text-sm font-black">Buy Now</Link>
          </div>
        </div>
      </section>

      <section className="page-shell pb-20">
        <h2 className="mb-8 text-center font-display text-5xl font-black text-[#FFF7ED]">Brewing the Perfect Cup</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {['Grind medium fine for balanced extraction.', 'Use 92–96°C filtered water for clarity.', 'Bloom first, pour slow, and enjoy fresh.'].map((step, index) => (
            <div key={step} className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-black tracking-[.28em] text-[#E0A458]">0{index + 1}</p>
              <p className="mt-4 text-lg font-bold leading-7 text-[#F5E6D3]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell pb-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-black text-[#FFF7ED]">More from CoffeeVerse</h2>
          <Link href="/products" className="text-sm font-black text-[#E0A458]">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
      </section>
    </>
  );
}
