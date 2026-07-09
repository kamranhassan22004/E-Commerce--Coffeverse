'use client';

import GlareButton from './GlareButton';

const chips = [
  { label: 'Dark Roast', image: '/coffee/product-midnight-card.png', className: 'left-0 top-8' },
  { label: 'Cold Brew', image: '/coffee/product-vanilla-coldbrew.png', className: 'right-0 top-20' },
  { label: 'Espresso', image: '/coffee/product-golden-espresso.png', className: 'bottom-10 left-10' },
];

export default function OrbitingCoffee() {
  return (
    <div className="hero-3d-perspective relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[430px] md:h-[560px]">
      <div className="hero-frame absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[1.6rem] border border-[#3B2418] bg-[#0f0805] p-3 shadow-[0_35px_100px_rgba(196,127,63,.18)] sm:w-[88%] sm:rounded-[2rem]">
        <img
          src="/coffee/home-hero.png"
          alt="Freshly roasted coffee cup"
          className="h-[210px] w-full rounded-[1.2rem] object-cover sm:h-[255px] md:h-[315px]"
        />

        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[#C47F3F]/20 blur-[60px] sm:-inset-10 sm:blur-[80px]" />

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#160c08]/80 px-4 py-3 backdrop-blur-xl sm:absolute sm:-bottom-10 sm:left-7 sm:mt-0 sm:rounded-full">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E0A458] text-[#1B120E]">☕</span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#E0A458]">Roast Live</p>
            <p className="text-sm font-bold text-[#F5E6D3]">Fresh batch dispatch</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-4 -z-10 rounded-full border border-[#D6B48C]/10 sm:inset-0" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D6B48C]/15 sm:h-[72%] sm:w-[72%]" />

      {chips.map((chip, index) => (
        <div
          key={chip.label}
          className={`float-soft ${index === 1 ? 'float-soft-delay' : ''} absolute ${chip.className} hidden w-36 rounded-[1.35rem] border border-white/10 bg-white/[.06] p-2 backdrop-blur-xl md:block`}
        >
          <img src={chip.image} alt={chip.label} className="h-20 w-full rounded-xl object-cover" />
          <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[.18em] text-[#F5E6D3]">
            {chip.label}
          </p>
        </div>
      ))}

      <GlareButton className="absolute bottom-0 right-4 hidden md:inline-flex">
        <span className="rounded-full border border-[#E0A458]/30 bg-[#2A1811]/80 px-5 py-3 text-xs font-black uppercase tracking-[.24em] text-[#E0A458] backdrop-blur-xl">
          3D Coffee Stage
        </span>
      </GlareButton>
    </div>
  );
}