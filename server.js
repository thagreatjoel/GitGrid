const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files if any (not mandatory here)
app.use(express.static('public'));

app.get('/:username', (req, res) => {
  const username = req.params.username;

  // Read your HTML and inject the username
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading page');

    // Inject the username into the JS code
    const htmlWithUser = data.replace('__USERNAME__', username);

    res.send(htmlWithUser);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/<username>`);
});
