import Button from '../../components/Button';
import heroLogo from '../../assets/hero/hero.png';
import card1 from '../../assets/cards/1.png';
import card2 from '../../assets/cards/2.png';
import card3 from '../../assets/cards/3.png';

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="overflow-hidden rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
              Modern Landing
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-orange-950 sm:text-5xl">
              Build and manage your orange-powered dashboard.
            </h1>
            <p className="max-w-lg text-sm leading-7 text-orange-800 sm:text-base">
              A polished UI starter with clear sectioning, helpful cards, and
              fast paths to account and content pages.
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

          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-orange-300 bg-orange-100">
            <img
              src={heroLogo}
              alt="Orange logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
          Snapshot
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-orange-950">
          Platform metrics
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Sections', value: '08' },
            { label: 'Screens', value: '24' },
            { label: 'Layouts', value: '04' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-orange-300 bg-orange-100/70 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-orange-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
          Feature Highlights
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-orange-950">
          What you can do quickly
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Feature Card One',
              body: 'A clean placeholder for title, short copy, and action.',
              image: card1,
            },
            {
              title: 'Feature Card Two',
              body: 'Balanced spacing keeps the card layout easy to scan.',
              image: card2,
            },
            {
              title: 'Feature Card Three',
              body: 'Repeated blocks give the page a consistent wireframe rhythm.',
              image: card3,
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-orange-300 bg-orange-100/70 p-5"
            >
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-orange-200/60">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 border-2 border-orange-200 bg-white" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-orange-950">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-orange-800">
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
