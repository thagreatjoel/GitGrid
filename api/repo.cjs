const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { user, repo } = req.query;
  if (!user || !repo) return res.status(400).json({ error: 'User and repo required' });

  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}`);
    res.json({
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers,
      url: data.html_url
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;