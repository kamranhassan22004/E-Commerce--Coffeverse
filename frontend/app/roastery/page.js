import Link from 'next/link';
import PageIntro from '@/components/PageIntro';

export default function RoasteryPage() {
  return (
    <>
      <PageIntro title="Inside the Roastery" text="A dark, cinematic page inspired by your Stitch design for explaining how CoffeeVerse sources, roasts, and dispatches premium coffee." />
      <section className="page-shell grid gap-8 pb-20 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="glass-panel rounded-[2rem] p-5">
          <img src="/coffee/home-hero.png" alt="Roastery coffee cup" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">Small Batch Philosophy</p>
          <h2 className="mt-4 font-display text-5xl font-black tracking-[-.04em] text-[#FFF7ED]">Every roast is built around aroma, body, and finish.</h2>
          <p className="mt-6 text-lg leading-8 text-[#BFA890]">This page is intentionally made with the same premium coffee UI style: dark espresso surfaces, caramel highlights, large editorial typography, and 3D-feeling image cards.</p>
          <Link href="/products" className="caramel-button mt-8 inline-flex rounded-full px-8 py-4 text-sm font-black">Shop Roasts</Link>
        </div>
      </section>
    </>
  );
}
