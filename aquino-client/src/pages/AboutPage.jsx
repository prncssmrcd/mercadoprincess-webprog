import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-full border-2 border-zinc-300 bg-zinc-100">
              <div className="h-28 w-28 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A profile wireframe focused on layout, spacing, and content
              grouping.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              This page follows the same low-fidelity system as the homepage
              with a simple hero, overview blocks, and supporting sections for
              profile details.
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

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Profile Overview
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          Quick summary blocks
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Years", value: "6" },
            { label: "Projects", value: "16" },
            { label: "Clients", value: "21" },
            { label: "Focus Areas", value: "8" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
