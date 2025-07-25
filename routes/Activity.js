import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'Username required' });

  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}/events/public`);
    const events = data.map(ev => ({
      type: ev.type,
      repo: ev.repo.name,
      created_at: ev.created_at
    }));
    res.json({ user, recentActivity: events.slice(0, 10) });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

export default router;
