const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { user, repo } = req.query;
  if (!user || !repo) return res.status(400).json({ error: 'User and repo required' });

  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}/contributors`);
    res.json({ repo, contributors: data.map(c => ({ login: c.login, contributions: c.contributions })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;