'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function SignupPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      login(data);
      toast.success('Account created');
      router.push('/profile');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell grid min-h-[calc(100vh-68px)] items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:py-12">
      <div className="hidden min-w-0 lg:block">
        <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">Join CoffeeVerse</p>
        <h1 className="mt-5 font-display text-6xl font-black leading-[.95] tracking-[-.05em] text-[#FFF7ED] xl:text-7xl">
          Start your<br />coffee ritual.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-[#BFA890]">
          Create an account to checkout faster, track your orders, and keep your premium coffee selections saved.
        </p>
      </div>

      <form onSubmit={submit} className="glass-panel mx-auto w-full max-w-[440px] rounded-[2rem] p-6 sm:p-8">
        <h2 className="font-display text-4xl font-black text-[#F5E6D3]">Create Account</h2>
        <p className="mt-3 text-sm leading-6 text-[#BFA890]">
          Join the roastery and start ordering your favorite blends.
        </p>

        <div className="mt-7 space-y-5">
          <label>
            <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-coffee mb-3"
              placeholder="Your name"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-coffee mb-3"
              placeholder="Enter your email"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-black uppercase tracking-[.14em] text-[#BFA890]">Password</span>
            <input
              type="password"
              required
              minLength="6"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-coffee"
              placeholder="Minimum 6 characters"
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="caramel-button mt-8 h-14 w-full rounded-full text-sm font-black uppercase tracking-[.18em] disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <p className="mt-6 text-center text-sm text-[#BFA890]">
          Already have an account?{' '}
          <Link href="/login" className="font-black text-[#E0A458]">Login</Link>
        </p>
      </form>
    </section>
  );
}