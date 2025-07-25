const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const { data } = await axios.get('https://api.github.com/licenses');
    res.json({ licenses: data.map(lic => ({ key: lic.key, name: lic.name })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;