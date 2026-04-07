const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.post('/', (req, res) => {
  const { name, phone, email, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  const result = db.prepare(
    'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)'
  ).run(name, phone, email || null, message || null);
  res.json({ success: true, id: result.lastInsertRowid });
});

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

module.exports = router;
