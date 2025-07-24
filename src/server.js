const express = require('express');
const cors = require('cors');
const path = require('path');
const fetchGraph = require('./fetchGraph');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/graph/:username', async (req, res) => {
  const { username } = req.params;
  const { format = 'png' } = req.query;

  try {
    const imageBuffer = await fetchGraph(username, format);
    res.set('Content-Type', format === 'svg' ? 'image/svg+xml' : 'image/png');
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not generate image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`gh-graphify running at http://localhost:${PORT}`);
});
