import Button from '../../components/Button';
import about from '../../assets/about/about.png';
import card1 from '../../assets/cards/1.png';
import card2 from '../../assets/cards/2.png';
import card3 from '../../assets/cards/3.png';

const AboutPage = () => {
  const gridImages = [card1, card2, card3, card1];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-orange-300 bg-orange-100">
            <img
              src={about}
              alt="Orange logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
              About Us
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-orange-950 sm:text-4xl">
              Designed for clarity, speed, and a memorable brand tone.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-orange-800 sm:text-base">
              We build focused interfaces where each section has clear purpose,
              approachable visuals, and straightforward navigation.
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

      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
          Snapshot
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-orange-950">
          Team and delivery metrics
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Years', value: '6' },
            { label: 'Projects', value: '16' },
            { label: 'Clients', value: '21' },
            { label: 'Focus Areas', value: '8' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-orange-300 bg-orange-100/70 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-orange-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Content Blocks */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-orange-950">
              Stacked content wireframe
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Intro Block',
                  desc: 'A simple opening area for biography, role, or supporting information.',
                },
                {
                  title: 'Experience Block',
                  desc: 'Repeated section styling keeps the page readable and easy to extend.',
                },
                {
                  title: 'Details Block',
                  desc: 'Another placeholder area for skills, notes, or references.',
                },
              ].map((item, index) => (
                <article
                  key={index}
                  className="rounded-3xl border border-orange-300 bg-orange-100/70 p-5 transition-colors hover:bg-orange-100"
                >
                  <h3 className="text-lg font-semibold text-orange-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-orange-800">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Grid Container */}
          <div className="flex flex-col justify-between rounded-3xl border border-orange-300 bg-orange-100/70 p-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
                Visual Grid
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {gridImages.map((image, index) => (
                  <div
                    key={`grid-image-${index}`}
                    className="flex aspect-square items-center justify-center rounded-[1.25rem] border border-orange-300 bg-orange-50"
                  >
                    <img
                      src={image}
                      alt={`Grid preview ${index + 1}`}
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
