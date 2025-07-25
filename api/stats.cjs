const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'Username required' });

  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    res.json({
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;