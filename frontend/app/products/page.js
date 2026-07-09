'use client';

import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api';
import { demoProducts } from '@/lib/demoProducts';
import ProductCard from '@/components/ProductCard';
import PageIntro from '@/components/PageIntro';

const categories = [
  'Whole Bean',
  'Ground Coffee',
  'Special Reserve',
  'Cold Brew',
  'Iced Coffee',
  'Matcha',
  'Espresso',
  'Hardware',
];

const roasts = ['Light', 'Medium', 'Dark', 'Cold Brew', 'Ceremonial'];

export default function ProductsPage() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [roast, setRoast] = useState('');
  const [maxPrice, setMaxPrice] = useState(150);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/products')
      .then((data) => setProducts(data.length ? data : demoProducts))
      .catch(() => setProducts(demoProducts))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => products.filter((product) => {
    const s = search.toLowerCase();
    const matchesSearch = !s || product.name.toLowerCase().includes(s) || product.description.toLowerCase().includes(s);
    const matchesCategory = !category || product.category === category;
    const matchesRoast = !roast || product.roast === roast;
    const matchesPrice = Number(product.price) <= Number(maxPrice);
    return matchesSearch && matchesCategory && matchesRoast && matchesPrice;
  }), [products, search, category, roast, maxPrice]);

  const clear = () => {
    setSearch('');
    setCategory('');
    setRoast('');
    setMaxPrice(150);
  };

  return (
    <>
      <PageIntro title="Curated Collections" text="Discover rare harvests, espresso blends, cold brew concentrates, and premium brewing gear crafted for a discerning palate." />

      <section className="page-shell grid gap-8 pb-20 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[1.6rem] border border-white/10 bg-[#120B08]/70 p-5 backdrop-blur-xl lg:sticky lg:top-24">
          <label className="text-sm font-black uppercase tracking-[.16em] text-[#F5E6D3]">Search</label>
          <div className="relative mt-3">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#806a56]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search beans..." className="input-coffee pl-12" />
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#F5E6D3]">Category</p>
            <div className="mt-4 grid gap-3">
              {categories.map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-3 text-sm text-[#D6B48C]">
                  <input type="checkbox" checked={category === item} onChange={() => setCategory(category === item ? '' : item)} className="checkbox-coffee" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#F5E6D3]">Roast Level</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {roasts.map((item) => (
                <button key={item} onClick={() => setRoast(roast === item ? '' : item)} className={`rounded-lg border px-4 py-3 text-sm font-bold transition ${roast === item ? 'border-[#E0A458] bg-[#E0A458] text-[#1B120E]' : 'border-white/10 bg-[#2A1811] text-[#F5E6D3]'}`}>{item}</button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#F5E6D3]">Price Range</p>
            <input type="range" min="15" max="150" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="mt-4 w-full accent-[#ffb77a]" />
            <div className="mt-2 flex justify-between text-xs font-semibold text-[#BFA890]"><span>$15</span><span>${maxPrice}</span></div>
          </div>

          <button onClick={clear} className="outline-button mt-8 w-full rounded-full px-5 py-3 text-sm font-black">Clear All Filters</button>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-[#BFA890]">{loading ? 'Loading roasts...' : `${filtered.length} products found`}</p>
            <select className="input-coffee max-w-[190px]" defaultValue="featured">
              <option value="featured">Featured</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => <ProductCard key={product._id || product.slug} product={product} />)}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="glass-panel rounded-[2rem] p-10 text-center">
              <h3 className="font-display text-3xl font-black text-[#F5E6D3]">No coffee matched.</h3>
              <p className="mt-3 text-[#BFA890]">Try clearing filters or searching another blend.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
