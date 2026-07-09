import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#2d1b13] bg-[#0B0503]">
      <div className="page-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_.8fr_.8fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-3xl font-black tracking-[-.04em] text-[#FFF7ED]"
            >
              CoffeeVerse
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#BFA890]">
              Freshly roasted coffee, smooth cold brews, creamy iced lattes,
              and matcha blends crafted for slow mornings and late-night coffee breaks.
            </p>

            <div className="mt-6 flex gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-[#E0A458]">
                ☕
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-[#E0A458]">
                ✦
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-[#E0A458]">
                ♨
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[.28em] text-[#E0A458]">
              Explore
            </h3>

            <div className="mt-5 grid gap-3 text-sm font-bold text-[#D6B48C]">
              <Link href="/products" className="transition hover:text-[#FFF7ED]">
                Shop Coffee
              </Link>
              <Link href="/roastery" className="transition hover:text-[#FFF7ED]">
                Roastery
              </Link>
              <Link href="/guides" className="transition hover:text-[#FFF7ED]">
                Brew Guides
              </Link>
              <Link href="/story" className="transition hover:text-[#FFF7ED]">
                Our Story
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[.28em] text-[#E0A458]">
              Café Hours
            </h3>

            <div className="mt-5 grid gap-3 text-sm text-[#BFA890]">
              <p>
                <span className="font-bold text-[#F5E6D3]">Mon - Fri:</span>
                <br />
                8:00 AM - 10:00 PM
              </p>

              <p>
                <span className="font-bold text-[#F5E6D3]">Sat - Sun:</span>
                <br />
                9:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[.28em] text-[#E0A458]">
              Stay Warm
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#BFA890]">
              Get roast drops, cold brew specials, and seasonal matcha updates.
            </p>

            <form className="mt-5 flex overflow-hidden rounded-full border border-[#4B2E1F] bg-[#160C08]">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-[#FFF7ED] outline-none placeholder:text-[#8B6F5A]"
              />

              <button
                type="button"
                className="bg-[#E0A458] px-5 text-sm font-black text-[#1B120E]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#2d1b13] pt-6 text-sm text-[#8B6F5A] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CoffeeVerse. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/products" className="hover:text-[#E0A458]">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-[#E0A458]">
              Cart
            </Link>
            <Link href="/login" className="hover:text-[#E0A458]">
              Account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}