const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { user, repo } = req.query;
  if (!user || !repo) return res.status(400).json({ error: 'User and repo required' });

  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}`);
    const ratio = data.forks_count / (data.stargazers_count || 1);
    res.json({ repo, forkRatio: ratio.toFixed(2) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;