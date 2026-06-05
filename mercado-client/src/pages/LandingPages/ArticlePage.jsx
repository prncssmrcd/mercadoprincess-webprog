import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import {
  fetchArticles,
  mapArticleFromApi,
} from '../../services/ArticleService.js';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await fetchArticles();
        const list = data?.articles ?? [];
        const match = list
          .map(mapArticleFromApi)
          .find((item) => item.name === name && item.isActive);
        setArticle(match || null);
      } catch (loadError) {
        console.error('Error loading skincare article:', loadError);
        setError('Unable to load this skincare article. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-neutral-600">Loading skincare article...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-neutral-900">
              Article unavailable
            </h1>
            <p className="mt-3 text-sm text-neutral-600">{error}</p>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-neutral-900">
              Article not found
            </h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Skincare Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {article.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-neutral-900 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 overflow-hidden rounded-[1.25rem] border border-pink-200 bg-pink-50">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-neutral-800">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-7 text-neutral-800"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-pink-200 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
