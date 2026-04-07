const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// Products grouped by group → sections → 10 products each
router.get('/by-group', (req, res) => {
  const groups = db.prepare('SELECT * FROM groups ORDER BY sort_order').all();
  res.json(groups.map(g => ({
    ...g,
    sections: db.prepare('SELECT * FROM sections WHERE group_id=? ORDER BY sort_order').all(g.id)
      .map(s => ({
        ...s,
        products: db.prepare('SELECT * FROM products WHERE section_id=? ORDER BY id LIMIT 10').all(s.id),
      })),
  })));
});

// Latest N products (for sidebar)
router.get('/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  res.json(db.prepare('SELECT * FROM products ORDER BY id DESC LIMIT ?').all(limit));
});

// All products in one section (view-all page)
router.get('/section/:slug', (req, res) => {
  const section = db.prepare('SELECT * FROM sections WHERE slug=?').get(req.params.slug);
  if (!section) return res.status(404).json({ error: 'Not found' });
  res.json({
    section,
    products: db.prepare('SELECT * FROM products WHERE section_id=? ORDER BY id').all(section.id),
  });
});

// Single product + related + section info
router.get('/:id', (req, res) => {
  const product = db.prepare(`
    SELECT p.*, s.name as section_name, s.slug as section_slug,
           g.name as group_name, g.slug as group_slug
    FROM products p
    LEFT JOIN sections s ON p.section_id = s.id
    LEFT JOIN groups g ON s.group_id = g.id
    WHERE p.id = ?
  `).get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });

  const related = db.prepare(
    'SELECT * FROM products WHERE section_id=? AND id!=? ORDER BY RANDOM() LIMIT 6'
  ).all(product.section_id, product.id);

  res.json({ product, related });
});

// List all
router.get('/', (req, res) => {
  const { limit = 50, offset = 0 } = req.query;
  res.json(db.prepare('SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?').all(+limit, +offset));
});

module.exports = router;
