// getFollowers.js
import fetch from 'node-fetch';

export async function getFollowers(req, res) {
  const { user } = req.params;
  const followersUrl = `https://api.github.com/users/${user}/followers`;
  const followingUrl = `https://api.github.com/users/${user}/following`;

  try {
    const [followers, following] = await Promise.all([
      fetch(followersUrl).then(r => r.json()),
      fetch(followingUrl).then(r => r.json())
    ]);

    res.json({
      user,
      followers: followers.map(f => ({ login: f.login, url: f.html_url })),
      following: following.map(f => ({ login: f.login, url: f.html_url }))
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch followers/following' });
  }
}
