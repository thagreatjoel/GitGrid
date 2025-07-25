import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'Username required' });

  try {
    const url = `https://github.com/users/${user}/contributions`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const contributions = [];

    $('rect.ContributionCalendar-day').each((_, el) => {
      contributions.push({
        date: $(el).attr('data-date'),
        count: parseInt($(el).attr('data-count') || 0)
      });
    });

    const total = contributions.reduce((sum, d) => sum + d.count, 0);
    res.json({ user, totalContributions: total, daily: contributions });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
});

export default router;
