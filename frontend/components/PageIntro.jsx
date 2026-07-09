'use client';

export default function PageIntro({ eyebrow = 'CoffeeVerse', title, text, children }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#2A1811]/70 to-transparent blur-2xl" />
      <div className="page-shell relative">
        <p className="text-sm font-black uppercase tracking-[.28em] text-[#E0A458]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-[.95] tracking-[-.04em] text-[#FFF7ED] sm:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-8 text-[#BFA890]">{text}</p>}
        {children}
      </div>
    </section>
  );
}
