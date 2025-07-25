// server.cjs
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes directory
const routesDir = path.join(__dirname, 'routes');

// List of routes to import
const routeFiles = [
  'activity',
  'followers',
  'licenses',
  'sizes',
  'blog',
  'forkratio',
  'metrics',
  'stats',
  'commits',
  'gists',
  'pin',
  'topics',
  'contrib',
  'lang',
  'repo'
];

// Import and use each route
routeFiles.forEach(file => {
  const route = require(path.join(routesDir, `${file}.cjs`));
  app.use(`/api/${file}`, route);
});

// Default route
app.get('/', (req, res) => {
  const links = routeFiles.map(file => `<li><a href="/api/${file}">/api/${file}</a></li>`).join('');
  res.send(`<h1>Available GitHub APIs</h1><ul>${links}</ul>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});