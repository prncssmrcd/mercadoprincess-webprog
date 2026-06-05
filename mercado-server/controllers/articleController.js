const Article = require("../models/Article");

const skincareSeeds = [
  {
    name: "teen-skincare-starter-routine",
    title: "Teen Skincare: A Simple Starter Routine",
    imageUrl:
      "https://images.unsplash.com/photo-1612810436541-336d1d59f33e?auto=format&fit=crop&w=1200&q=80",
    content: [
      "If you are starting to get oily, breakouts, or dryness, keep it simple: cleanse, moisturize, and use sunscreen in the morning.",
      "Choose gentle, fragrance-light products and give your routine 2-4 weeks before switching everything again.",
      "Consistency matters more than using a lot of products; your skin barrier will thank you.",
    ],
  },
  {
    name: "acne-basics-what-helps",
    title: "Acne Basics: What Helps and What to Avoid",
    imageUrl:
      "https://images.unsplash.com/photo-1612810435805-9f1d9c2a7f1c?auto=format&fit=crop&w=1200&q=80",
    content: [
      "For acne-prone skin, look for salicylic acid or benzoyl peroxide and start slowly to avoid irritation.",
      "Avoid harsh scrubs and over-washing because too much friction can make redness and breakouts worse.",
      "If you use treatments, moisturize after to keep your skin barrier comfortable.",
    ],
  },
  {
    name: "morning-routine-cleanse-moisturize-spf",
    title: "Morning Routine: Cleanse, Moisturize, SPF",
    imageUrl:
      "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=1200&q=80",
    content: [
      "A simple morning routine keeps skin balanced and helps prevent dark marks: gentle cleanser, moisturizer, then sunscreen.",
      "Sunscreen is the most important step for protecting skin during school days and outdoor activities.",
      "If your skin feels tight, switch to a milder cleanser and add a richer moisturizer.",
    ],
  },
];

const ensureSeedArticles = async () => {
  const count = await Article.countDocuments();
  if (count === 0) {
    await Article.insertMany(skincareSeeds);
  }
};

const getArticles = async (req, res) => {
  try {
    await ensureSeedArticles();
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Skincare article not found" });
    }

    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!article) {
      return res.status(404).json({ message: "Skincare article not found" });
    }

    res.json({ message: "Skincare article deactivated successfully", article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };
