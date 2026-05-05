import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content';

function ArticleListPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Skincare Guides
          </p>
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            Browse skincare articles
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            Pick a topic and build a simple routine that works for your skin.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.name}
              className="rounded-[1.25rem] border border-pink-200 bg-pink-50 p-5"
            >
              <div className="mb-4 overflow-hidden rounded-2xl border border-pink-200 bg-pink-50">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {article.content[0]}
              </p>
              <div className="mt-5">
                <Link
                  to={`/articles/${article.name}`}
                  className="inline-flex items-center justify-center rounded-full border-2 border-pink-700 bg-pink-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-pink-700"
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-5xl">
          <Button to="/">Back to Home</Button>
        </div>
      </section>
    </div>
  );
}

export default ArticleListPage;
