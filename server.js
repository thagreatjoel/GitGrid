import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // ✅ Important fix

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static('./'));

app.get('/contributions', async (req, res) => {
  const username = req.query.user;
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
  
  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
  }

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
