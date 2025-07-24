const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/:username', (req, res) => {
  const username = req.params.username;
  const imageUrl = `https://ghchart.rshah.org/${username}`;

  res.send(`
    <html>
      <head><title>${username}'s Contributions</title></head>
      <body style="text-align:center;font-family:sans-serif">
        <h1>GitHub Contributions for ${username}</h1>
        <img src="${imageUrl}" alt="GitHub Chart for ${username}" />
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
