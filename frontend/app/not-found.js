import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
      <div className="glass-panel rounded-[2rem] p-10">
        <p className="font-display text-8xl font-black text-[#E0A458]">404</p>
        <h1 className="mt-4 font-display text-4xl font-black text-[#F5E6D3]">Page not found</h1>
        <p className="mt-3 text-[#BFA890]">This coffee route does not exist.</p>
        <Link href="/" className="caramel-button mt-7 inline-flex rounded-full px-8 py-4 text-sm font-black">Back Home</Link>
      </div>
    </section>
  );
}
