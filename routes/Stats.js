import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'Username required' });

  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    res.json({
      user: data.login,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      profileUrl: data.html_url
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
