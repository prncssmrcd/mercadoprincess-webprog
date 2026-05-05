import Button from "../components/Button";
import heroLogo from "../assets/hero/hero.png";
import card1 from "../assets/cards/1.png";
import card2 from "../assets/cards/2.png";
import card3 from "../assets/cards/3.png";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Premium Skincare
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Radiant Skin Starts Here
            </h1>
            <p className="max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              Discover premium skincare products and expert beauty routines designed to help you achieve your most radiant skin. Our collection features natural ingredients and scientifically-proven formulas.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50">
            <img
              src={heroLogo}
              alt="Orange logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Our Impact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Beauty by the Numbers
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Customers", value: "50K" },
            { label: "Products", value: "120" },
            { label: "Formulas", value: "85" },
            { label: "5-Star Reviews", value: "98%" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-5"
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

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Featured Collection
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Our Best-Sellers
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Hydra-Boost Serum",
              body: "Intensive hydration serum with hyaluronic acid and vitamin E for plump, radiant skin.",
              image: card1,
            },
            {
              title: "Crystal Clear Cleanser",
              body: "Gentle gel cleanser that removes impurities while maintaining skin's natural pH balance.",
              image: card2,
            },
            {
              title: "Renewal Night Cream",
              body: "Luxurious anti-aging cream with retinol complex for overnight skin restoration.",
              image: card3,
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-5"
            >
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-orange-100">
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
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {card.body}
              </p>
              <Button className="mt-4" variant="primary">
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
