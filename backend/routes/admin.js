const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { db } = require('../db/database');

const SECRET = process.env.JWT_SECRET || 'tradao_jwt_secret_2024';

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
}

// ── Auth ─────────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || admin.password !== password) {
    return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
  }
  const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET, { expiresIn: '7d' });
  res.json({ token, username: admin.username });
});

// ── Products ─────────────────────────────────────────────────
// All products grouped
router.get('/products', auth, (req, res) => {
  const groups = db.prepare('SELECT * FROM groups ORDER BY sort_order').all();
  res.json(groups.map(g => ({
    ...g,
    sections: db.prepare('SELECT * FROM sections WHERE group_id=? ORDER BY sort_order').all(g.id)
      .map(s => ({
        ...s,
        products: db.prepare('SELECT * FROM products WHERE section_id=? ORDER BY id').all(s.id),
      })),
  })));
});

// Create product
router.post('/products', auth, (req, res) => {
  const { name, section_id, price, original_price, image_url, description, is_featured } = req.body;
  if (!name || !section_id || !price) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  const result = db.prepare(
    'INSERT INTO products (name, section_id, price, original_price, image_url, description, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(name, section_id, price, original_price || null, image_url || null, description || null, is_featured ? 1 : 0);
  res.json(db.prepare('SELECT * FROM products WHERE id=?').get(result.lastInsertRowid));
});

// Update product
router.put('/products/:id', auth, (req, res) => {
  const { name, section_id, price, original_price, image_url, description, is_featured } = req.body;
  db.prepare(
    'UPDATE products SET name=?, section_id=?, price=?, original_price=?, image_url=?, description=?, is_featured=? WHERE id=?'
  ).run(name, section_id, price, original_price || null, image_url || null, description || null, is_featured ? 1 : 0, req.params.id);
  res.json(db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id));
});

// Delete product
router.delete('/products/:id', auth, (req, res) => {
  db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── Sections ─────────────────────────────────────────────────
router.get('/sections', auth, (req, res) => {
  res.json(
    db.prepare(`
      SELECT s.*, g.name as group_name, g.slug as group_slug
      FROM sections s
      JOIN groups g ON s.group_id = g.id
      ORDER BY g.sort_order, s.sort_order
    `).all()
  );
});

router.post('/sections', auth, (req, res) => {
  const { name, slug, group_id, sort_order } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO sections (name, slug, group_id, sort_order) VALUES (?, ?, ?, ?)'
    ).run(name, slug, group_id, sort_order || 0);
    res.json(db.prepare('SELECT * FROM sections WHERE id=?').get(result.lastInsertRowid));
  } catch (e) {
    res.status(400).json({ error: 'Slug đã tồn tại' });
  }
});

router.put('/sections/:id', auth, (req, res) => {
  const { name, sort_order } = req.body;
  db.prepare('UPDATE sections SET name=?, sort_order=? WHERE id=?').run(name, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM sections WHERE id=?').get(req.params.id));
});

router.delete('/sections/:id', auth, (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as c FROM products WHERE section_id=?').get(req.params.id);
  if (count.c > 0) return res.status(400).json({ error: `Không thể xóa: còn ${count.c} sản phẩm trong nhóm này` });
  db.prepare('DELETE FROM sections WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── Contacts ─────────────────────────────────────────────────
router.get('/contacts', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

router.delete('/contacts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── Stats ─────────────────────────────────────────────────────
router.get('/stats', auth, (req, res) => {
  res.json({
    products: db.prepare('SELECT COUNT(*) as c FROM products').get().c,
    sections: db.prepare('SELECT COUNT(*) as c FROM sections').get().c,
    contacts: db.prepare('SELECT COUNT(*) as c FROM contacts').get().c,
    blog: db.prepare('SELECT COUNT(*) as c FROM blog_posts').get().c,
  });
});

module.exports = router;
