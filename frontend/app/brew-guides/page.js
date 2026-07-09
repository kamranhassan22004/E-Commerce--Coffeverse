import PageIntro from '@/components/PageIntro';

const guides = [
  ['Espresso', '/coffee/product-golden-espresso.png', 'Use a fine grind, hot water, and 25–30 second extraction for thick crema.'],
  ['Cold Brew', '/coffee/product-vanilla-coldbrew.png', 'Steep coarse grounds for 12 hours and serve over ice with milk or water.'],
  ['Pour Over', '/coffee/product-heirloom.png', 'Bloom first, pour in circles, and keep extraction smooth and clean.'],
];

export default function BrewGuidesPage() {
  return (
    <>
      <PageIntro title="Brew Guides" text="Helpful content pages to make your ecommerce website feel complete, not like only a basic product store." />
      <section className="page-shell grid gap-6 pb-20 md:grid-cols-3">
        {guides.map(([title, image, text]) => (
          <article key={title} className="product-card-3d espresso-card rounded-[2rem] p-5">
            <img src={image} alt={title} className="h-48 w-full rounded-[1.4rem] object-cover" />
            <h2 className="mt-6 font-display text-3xl font-black text-[#F5E6D3]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#BFA890]">{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
