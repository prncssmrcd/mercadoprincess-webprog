import Button from "../components/Button";

const ArticlePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured articles in a simple card grid
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Use these cards to practice layout basics: consistent spacing, short
          descriptions, and clear actions per card.
        </p>

        <div className="mt-6">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Featured Articles
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          Article cards
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Article One",
              body: "A simple placeholder for a featured article with image, title, and copy.",
            },
            {
              title: "Article Two",
              body: "Build clean sections and text-leading to keep layout readable.",
            },
            {
              title: "Article Three",
              body: "Using a shared pattern makes each card section easy to scan.",
            },
          ].map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Featured
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.body}
              </p>
              <Button className="mt-4" variant="primary">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
