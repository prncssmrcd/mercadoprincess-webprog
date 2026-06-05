import seedArticles from '../assets/article-content.js';
import constants from '../constants.js';

const STORAGE_KEY = 'mercado_articles';
const API_URL = constants.HOST ? `${constants.HOST}/articles` : '';

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

const request = async (path = '', options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Article request failed.');
  }

  return { data };
};

export const mapArticleFromApi = (article) => ({
  ...article,
  imageUrl: article.imageUrl || article.image || '',
  content: Array.isArray(article.content) ? [...article.content] : [],
  description: String(article.content?.[0] ?? '').trim(),
  isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
});

export const fetchArticles = () => {
  if (!API_URL) return asResponse(readArticles());
  return request('/');
};

export const createArticle = (article) => {
  if (API_URL) {
    return request('/', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }

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
  if (API_URL) {
    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  }

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
  if (API_URL) {
    return request(`/${id}`, {
      method: 'DELETE',
    });
  }

  const nextArticles = readArticles().filter(
    (item) => item._id !== id && item.id !== id && item.name !== id,
  );
  writeArticles(nextArticles);
  return Promise.resolve({ data: { success: true } });
};
