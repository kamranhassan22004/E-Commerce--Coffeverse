'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import AdminShell from '@/components/AdminShell';
import { apiFetch, currency, getImageUrl } from '@/lib/api';

const categoryOptions = [
  'Special Reserve',
  'Whole Bean',
  'Ground Coffee',
  'Cold Brew',
  'Iced Coffee',
  'Matcha',
  'Espresso',
  'Hardware',
];

const roastOptions = ['Light', 'Medium', 'Dark', 'Cold Brew', 'Ceremonial', 'Gear'];

const emptyForm = {
  name: '',
  description: '',
  price: '',
  oldPrice: '',
  category: 'Special Reserve',
  roast: 'Dark',
  origin: '',
  tastingNotes: '',
  image: '/coffee/product-midnight-card.png',
  countInStock: '',
  featured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => apiFetch('/products').then(setProducts).catch(() => setProducts([]));

  useEffect(() => {
    load();
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append('image', file);

    setUploading(true);

    try {
      const data = await apiFetch('/upload', { method: 'POST', body });
      updateField('image', data.image || data.imageUrl || data.path || data.url);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        oldPrice: Number(form.oldPrice || 0),
        countInStock: Number(form.countInStock || 0),
        tastingNotes: form.tastingNotes
          .split(',')
          .map((note) => note.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await apiFetch(`/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      toast.success(editingId ? 'Product updated' : 'Product added');
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (error) {
      toast.error(error.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const edit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      category: product.category || 'Special Reserve',
      roast: product.roast || 'Dark',
      origin: product.origin || '',
      tastingNotes: (product.tastingNotes || []).join(', '),
      image: product.image || '',
      countInStock: product.countInStock || '',
      featured: !!product.featured,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;

    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      toast.success('Product deleted');
      load();
    } catch (error) {
      toast.error(error.message || 'Delete failed');
    }
  };

  return (
    <AdminShell>
      <div className="mx-auto grid w-full max-w-6xl gap-8 xl:grid-cols-[390px_minmax(0,1fr)]">
        <form onSubmit={submit} className="glass-panel h-fit min-w-0 rounded-[2rem] p-5 sm:p-6 xl:sticky xl:top-24">
          <h2 className="font-display text-3xl font-black text-[#F5E6D3] sm:text-4xl">
            {editingId ? 'Edit Product' : 'Add Product'}
          </h2>

          <div className="mt-6 space-y-4">
            <input
              required
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="input-coffee"
              placeholder="Product name"
            />

            <textarea
              required
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="input-coffee min-h-28"
              placeholder="Description"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                className="input-coffee"
                placeholder="Price"
              />

              <input
                type="number"
                step="0.01"
                value={form.oldPrice}
                onChange={(e) => updateField('oldPrice', e.target.value)}
                className="input-coffee"
                placeholder="Old price"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="input-coffee"
              >
                {categoryOptions.map((item) => <option key={item}>{item}</option>)}
              </select>

              <select
                value={form.roast}
                onChange={(e) => updateField('roast', e.target.value)}
                className="input-coffee"
              >
                {roastOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <input
              value={form.origin}
              onChange={(e) => updateField('origin', e.target.value)}
              className="input-coffee"
              placeholder="Origin"
            />

            <input
              value={form.tastingNotes}
              onChange={(e) => updateField('tastingNotes', e.target.value)}
              className="input-coffee"
              placeholder="Notes comma separated"
            />

            <input
              value={form.image}
              onChange={(e) => updateField('image', e.target.value)}
              className="input-coffee"
              placeholder="Image path / URL"
            />

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="block w-full overflow-hidden text-sm text-[#BFA890] file:mr-4 file:rounded-full file:border-0 file:bg-[#E0A458] file:px-5 file:py-3 file:text-sm file:font-black file:text-[#1B120E]"
            />

            {uploading && <p className="text-sm text-[#E0A458]">Uploading image...</p>}

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                type="number"
                value={form.countInStock}
                onChange={(e) => updateField('countInStock', e.target.value)}
                className="input-coffee"
                placeholder="Stock"
              />

              <label className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-white/10 bg-[#2A1811]/70 px-4 text-sm font-bold text-[#D6B48C]">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="checkbox-coffee"
                />
                Featured
              </label>
            </div>
          </div>

          <button
            disabled={loading}
            className="caramel-button mt-6 h-14 w-full rounded-full px-5 py-4 text-sm font-black disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="outline-button mt-3 h-12 w-full rounded-full text-sm font-black"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="glass-panel min-w-0 rounded-[2rem] p-5 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.26em] text-[#E0A458]">
                Product Library
              </p>
              <h2 className="mt-2 font-display text-3xl font-black text-[#F5E6D3] sm:text-4xl">
                Products
              </h2>
            </div>
            <p className="text-sm font-bold text-[#BFA890]">{products.length} items</p>
          </div>

          <div className="mt-6 grid gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#120B08]/65 p-4 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-center"
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="h-24 w-full rounded-2xl object-cover sm:h-20 sm:w-[92px]"
                />

                <div className="min-w-0">
                  <p className="font-display text-xl font-black text-[#F5E6D3]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm text-[#BFA890]">
                    {product.category} · {product.origin || 'House Blend'}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[#D6B48C]">
                    <span className="rounded-full bg-white/5 px-3 py-1">{currency(product.price)}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Stock {product.countInStock}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{product.featured ? 'Featured' : 'Regular'}</span>
                  </div>
                </div>

                <div className="flex gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => edit(product)}
                    className="rounded-full border border-white/10 p-3 text-[#E0A458] hover:bg-white/5"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(product._id)}
                    className="rounded-full border border-white/10 p-3 text-red-300 hover:bg-white/5"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-[#120B08]/65 p-6 text-[#BFA890]">
                No products found. Run backend seed first.
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}