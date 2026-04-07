const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const groups = db.prepare('SELECT * FROM groups ORDER BY sort_order').all();
  const result = groups.map(g => ({
    ...g,
    sections: db.prepare('SELECT * FROM sections WHERE group_id = ? ORDER BY sort_order').all(g.id),
  }));
  res.json(result);
});

module.exports = router;
