'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, FireIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api';
import { demoProducts } from '@/lib/demoProducts';
import ProductCard from '@/components/ProductCard';
import CoffeeGalaxy from '@/components/reactbits/CoffeeGalaxy';
import OrbitingCoffee from '@/components/reactbits/OrbitingCoffee';
import StackedCards from '@/components/reactbits/StackedCards';
import GlareButton from '@/components/reactbits/GlareButton';

export default function HomePage() {
  const [products, setProducts] = useState(demoProducts);

  useEffect(() => {
    apiFetch('/products?featured=true')
      .then((data) => setProducts(data.length ? data : demoProducts.filter((p) => p.featured)))
      .catch(() => setProducts(demoProducts.filter((p) => p.featured)));
  }, []);

  return (
    <>
      <section className="relative min-h-[calc(100vh-68px)] overflow-hidden">
        <CoffeeGalaxy />
        <div className="absolute left-10 top-44 hidden text-[56px] text-[#3B2418]/35 lg:block">☕</div>
        <div className="absolute bottom-24 right-12 hidden text-[74px] text-[#3B2418]/30 lg:block">☕</div>

        <div className="page-shell relative grid min-h-[calc(100vh-68px)] items-center gap-12 py-14 lg:grid-cols-[1fr_.95fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[.32em] text-[#E0A458]">Artisanal Digital Roastery</p>
            <h1 className="font-display text-[44px] font-black leading-[.98] tracking-[-.055em] text-[#FFF7ED] sm:text-[70px] lg:text-[92px]">
              Freshly<br />Roasted<br />Coffee,<br />
              <span className="text-[#ffb77a]">Delivered</span> to<br />Your Door.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#BFA890]">Discover premium coffee blends crafted for rich flavor and unforgettable moments. Experience the art of roasting from the comfort of your home.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <GlareButton>
                <Link href="/products" className="caramel-button inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-black tracking-wide">Shop Coffee <ArrowRightIcon className="h-4 w-4" /></Link>
              </GlareButton>
              <Link href="/roastery" className="outline-button inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-black tracking-wide">Explore Blends</Link>
            </div>
          </div>

          <OrbitingCoffee />
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell grid gap-4 md:grid-cols-3">
          {[
            [FireIcon, 'Fresh Roast', 'Small batches roasted for aroma and body before dispatch.'],
            [TruckIcon, 'Fast Dispatch', 'Checkout flow and order status ready for ecommerce use.'],
            [ShieldCheckIcon, 'Secure Account', 'JWT auth, protected profile, and admin-only dashboard.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="glass-panel rounded-[2rem] p-6">
              <Icon className="h-8 w-8 text-[#E0A458]" />
              <h3 className="mt-5 font-display text-2xl font-black text-[#F5E6D3]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#BFA890]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">Curated Collections</p>
              <h2 className="mt-4 font-display text-5xl font-black tracking-[-.04em] text-[#FFF7ED] sm:text-6xl">Rare harvests for a<br className="hidden sm:block" /> discerning palate.</h2>
            </div>
            <Link href="/products" className="outline-button inline-flex w-fit items-center gap-3 rounded-full px-7 py-3 text-sm font-black">View All <ArrowRightIcon className="h-4 w-4" /></Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 3).map((product) => <ProductCard key={product._id || product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">Built Like A Real Store</p>
            <h2 className="mt-4 font-display text-5xl font-black tracking-[-.04em] text-[#FFF7ED] sm:text-6xl">Luxury UI with working full-stack flow.</h2>
            <p className="mt-6 text-lg leading-8 text-[#BFA890]">This frontend follows your Stitch reference: dark espresso background, Playfair headings, caramel CTAs, product cards, cart summary, and cinematic 3D-style visuals.</p>
          </div>
          <StackedCards />
        </div>
      </section>
    </>
  );
}
