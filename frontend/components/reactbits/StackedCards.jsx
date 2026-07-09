'use client';

const cards = [
  ['01', 'Source', 'Single-origin lots selected for aroma, crema, and roast profile.'],
  ['02', 'Roast', 'Fresh batches styled around dark espresso, cold brew, and filter rituals.'],
  ['03', 'Deliver', 'Cart, checkout, order tracking, and admin status control are built in.'],
];

export default function StackedCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {cards.map(([number, title, text], index) => (
        <div key={title} className="reactbits-card glass-panel rounded-[2rem] p-6" style={{ '--tilt': `${(index - 1) * 3}deg` }}>
          <p className="text-sm font-black tracking-[0.35em] text-[#E0A458]">{number}</p>
          <h3 className="mt-6 font-display text-3xl font-black text-[#F5E6D3]">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#BFA890]">{text}</p>
        </div>
      ))}
    </div>
  );
}
