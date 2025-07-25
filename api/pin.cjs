const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    pinned: ['gh-graphify', 'HackaTime', 'Orphos', 'Friend Lee'],
    platform: 'GitHub'
  });
});

module.exports = router;