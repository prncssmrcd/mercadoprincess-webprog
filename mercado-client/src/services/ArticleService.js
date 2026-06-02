import seedArticles from '../assets/article-content.js';

const STORAGE_KEY = 'mercado_articles';

const clone = (value) => JSON.parse(JSON.stringify(value));

const withIds = (articles) =>
  articles.map((article, index) => ({
    ...article,
    _id: article._id || article.id || article.name || String(index + 1),
    isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
  }));

const readArticles = () => {
  if (typeof window === 'undefined') {
    return withIds(seedArticles);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = withIds(seedArticles);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return withIds(JSON.parse(stored));
  } catch {
    return withIds(seedArticles);
  }
};

const writeArticles = (articles) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }
};

const asResponse = (articles) =>
  Promise.resolve({
    data: {
      articles: clone(articles),
    },
  });

export const mapArticleFromApi = (article) => ({
  ...article,
  imageUrl: article.imageUrl || article.image || '',
  content: Array.isArray(article.content) ? [...article.content] : [],
  description: String(article.content?.[0] ?? '').trim(),
  isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
});

export const fetchArticles = () => asResponse(readArticles());

export const createArticle = (article) => {
  const articles = readArticles();
  const nextArticle = {
    ...article,
    _id: article._id || article.name || String(Date.now()),
    isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
  };
  const nextArticles = [...articles, nextArticle];
  writeArticles(nextArticles);
  return Promise.resolve({ data: { article: clone(nextArticle) } });
};

export const updateArticle = (id, article) => {
  const articles = readArticles();
  const nextArticles = articles.map((item) =>
    item._id === id || item.id === id || item.name === id
      ? { ...item, ...article, _id: item._id || id }
      : item,
  );
  writeArticles(nextArticles);
  return Promise.resolve({
    data: {
      article: clone(
        nextArticles.find((item) => item._id === id || item.id === id || item.name === id),
      ),
    },
  });
};

export const deleteArticle = (id) => {
  const nextArticles = readArticles().filter(
    (item) => item._id !== id && item.id !== id && item.name !== id,
  );
  writeArticles(nextArticles);
  return Promise.resolve({ data: { success: true } });
};
