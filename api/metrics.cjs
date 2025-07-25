const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    node: process.version
  });
});

module.exports = router;