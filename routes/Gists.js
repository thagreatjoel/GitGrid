// getGists.js
import fetch from 'node-fetch';

export async function getGists(req, res) {
  const { user } = req.params;
  const url = `https://api.github.com/users/${user}/gists`;

  try {
    const data = await fetch(url).then(r => r.json());

    const gists = data.map(g => ({
      id: g.id,
      description: g.description,
      files: Object.keys(g.files),
      created_at: g.created_at,
      url: g.html_url
    }));

    res.json({ user, gists });
  } catch {
    res.status(500).json({ error: 'Failed to fetch gists' });
  }
}
