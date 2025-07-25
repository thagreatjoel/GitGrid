const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { user, repo } = req.query;
  if (!user || !repo) return res.status(400).json({ error: 'User and repo required' });

  try {
    const { data } = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits`);
    const commits = data.map(c => ({ sha: c.sha, message: c.commit.message }));
    res.json({ repo, recentCommits: commits.slice(0, 5) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;