import Button from '../../components/Button';

const heroImage =
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80';
const productImages = [
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=80',
];

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="overflow-hidden rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              NU Skin Skincare
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              Clear, Confident Skin Starts Here
            </h1>
            <p className="max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              Discover everyday essentials for cleansing, hydration, and sun
              protection—simple routines that support healthy-looking skin.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Explore About
              </Button>
              <Button to="/articles" variant="secondary">
                Browse Articles
              </Button>
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-pink-200 bg-pink-50">
            <img
              src={heroImage}
              alt="NU Skin skincare"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Our Impact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Skincare by the Numbers
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Customers', value: '50K+' },
            { label: 'Essentials', value: '30+' },
            { label: 'Derm-Inspired', value: '100%' },
            { label: 'Repeat Buyers', value: '98%' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-pink-200 bg-pink-50 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Best Sellers
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Everyday skin essentials
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Hydra Balance Cleanser',
              body: 'A gentle daily cleanse that removes oil and impurities without stripping.',
              image: productImages[0],
            },
            {
              title: 'Barrier Repair Moisturizer',
              body: 'Lightweight hydration to help keep skin soft, calm, and comfortable.',
              image: productImages[1],
            },
            {
              title: 'Everyday SPF Shield',
              body: 'Daily sun protection that layers well under makeup and feels non-greasy.',
              image: productImages[2],
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-pink-200 bg-pink-50 p-5"
            >
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-pink-100">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 border-2 border-pink-200 bg-white" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {card.body}
              </p>
              <Button className="mt-5" variant="primary">
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
