const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const posts = db.prepare('SELECT id, title, slug, excerpt, image_url, category, created_at FROM blog_posts ORDER BY id DESC').all();
  res.json(posts);
});

router.get('/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

module.exports = router;
