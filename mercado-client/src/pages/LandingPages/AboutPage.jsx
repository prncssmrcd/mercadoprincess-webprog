import Button from '../../components/Button';
const aboutImage =
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80';
const gridImages = [
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
];

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-pink-200 bg-pink-50">
            <img
              src={aboutImage}
              alt="NU Skin skincare"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              About NU Skin
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Skincare made simple, gentle, and consistent.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              NU Skin focuses on practical routines built around cleansing,
              hydration, and sun protection. Our goal is a calm, supportive
              approach that helps you feel confident in your skin every day.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          What We Believe
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Skin first, always
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Gentle Basics', value: 'Cleanse' },
            { label: 'Daily Hydration', value: 'Moisturize' },
            { label: 'Sun Care', value: 'SPF' },
            { label: 'Consistency', value: 'Routine' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-pink-200 bg-pink-50 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Content Blocks */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Routine Guide
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
              A simple daily flow
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Cleanse',
                  desc: 'Use a gentle cleanser morning and night to remove oil, sweat, and sunscreen.',
                },
                {
                  title: 'Moisturize',
                  desc: 'Hydrate to support your skin barrier and reduce that tight, dry feeling.',
                },
                {
                  title: 'Protect',
                  desc: 'Finish your morning routine with sunscreen—your best anti-dark-spot step.',
                },
              ].map((item, index) => (
                <article
                  key={index}
                  className="rounded-3xl border border-pink-200 bg-pink-50 p-5 transition-colors hover:bg-pink-100"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Grid Container */}
          <div className="flex flex-col justify-between rounded-3xl border border-pink-200 bg-pink-50 p-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Quick Tips
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {gridImages.map((image, index) => (
                  <div
                    key={`grid-image-${index}`}
                    className="flex aspect-square items-center justify-center rounded-[1.25rem] border border-pink-200 bg-white"
                  >
                    <img
                      src={image}
                      alt={`Skincare preview ${index + 1}`}
                      className="h-full w-full rounded-[1.1rem] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Using your custom Button component for consistency */}
            <div className="mt-6">
              <Button
                to="/articles"
                variant="primary"
                className="w-full lg:w-auto"
              >
                View Articles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
