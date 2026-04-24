import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content';

function ArticleListPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
            Learning Articles
          </p>
          <h1 className="text-3xl font-bold leading-tight text-orange-950 sm:text-4xl">
            Browse all articles
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-800">
            Pick a topic to read the full content and examples.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-orange-900 bg-orange-50 px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.name}
              className="rounded-[1.25rem] border border-orange-300 bg-orange-100/70 p-5"
            >
              <h2 className="text-xl font-semibold text-orange-950">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-orange-800">
                {article.content[0]}
              </p>
              <div className="mt-5">
                <Link
                  to={`/articles/${article.name}`}
                  className="inline-flex items-center justify-center rounded-full border-2 border-orange-800 bg-orange-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-50 transition hover:bg-orange-600"
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
