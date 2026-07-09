import PageIntro from '@/components/PageIntro';

export default function StoryPage() {
  return (
    <>
      <PageIntro
        title="Our Story"
        text="CoffeeVerse is built around the feeling of a small specialty coffee shop — warm lighting, deep espresso tones, fresh roasts, and coffee made for people who care about taste."
      />

      <section className="page-shell pb-20">
        <div className="glass-panel grid gap-8 rounded-[2.4rem] p-6 lg:grid-cols-[.85fr_1fr] lg:p-10">
          <img
            src="/coffee/reference-home.png"
            alt="CoffeeVerse coffee shop interior"
            className="h-full min-h-[320px] rounded-[1.8rem] object-cover object-left sm:min-h-[380px]"
          />

          <div className="self-center">
            <p className="text-sm font-black uppercase tracking-[.3em] text-[#E0A458]">
              Specialty Coffee, Freshly Served
            </p>

            <h2 className="mt-4 font-display text-4xl font-black tracking-[-.04em] text-[#FFF7ED] sm:text-5xl">
              Crafted for slow mornings, late nights, and every coffee break between.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#BFA890]">
              We focus on bold espresso blends, smooth cold brews, creamy iced coffees,
              and carefully selected roasts that feel premium without being complicated.
              Every product on CoffeeVerse is presented like a real café shelf: clean,
              warm, and ready to order.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}