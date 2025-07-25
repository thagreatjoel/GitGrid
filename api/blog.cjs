const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    blog: "https://thagreatjoel.github.io/",
    author: "thagreatjoel",
    tech: ["github pages", "markdown", "html/css"]
  });
});

module.exports = router;