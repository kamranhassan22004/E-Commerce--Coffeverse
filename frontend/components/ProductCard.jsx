'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { currency, getImageUrl } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const id = product._id || product.slug;
  const image = product.cardImage || product.image;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link href={`/products/${id}`} className="product-card-3d espresso-card group flex min-h-[440px] flex-col rounded-[22px] p-6">
      <div className="relative overflow-hidden rounded-[18px] bg-[#120B08]">
        <img src={getImageUrl(image)} alt={product.name} className="h-[120px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120B08]/40 to-transparent" />
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[#ffb77a] px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#ffb77a]">{product.category}</span>
        <span className="flex items-center gap-1 text-xs font-bold text-[#F5E6D3]"><StarIcon className="h-4 w-4 text-[#E0A458]" /> {Number(product.rating || 4.8).toFixed(1)}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-black leading-tight text-[#F5E6D3] line-clamp-2">{product.name}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#BFA890]">{product.description}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <div>
          <p className="font-display text-[27px] font-black text-[#F5E6D3]">{currency(product.price)}</p>
          {product.oldPrice > 0 && <p className="text-xs font-bold text-[#806a56] line-through">{currency(product.oldPrice)}</p>}
        </div>
        <button onClick={handleAdd} className="grid h-12 w-12 place-items-center rounded-full bg-[#E0A458] text-[#1B120E] transition hover:scale-105" aria-label={`Add ${product.name} to cart`}>
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>
    </Link>
  );
}
