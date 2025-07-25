// getCommits.js
import fetch from 'node-fetch';

export async function getCommits(req, res) {
  const { user, repo } = req.params;
  const url = `https://api.github.com/repos/${user}/${repo}/commits`;

  try {
    const data = await fetch(url).then(r => r.json());

    const commits = data.map(commit => ({
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url
    }));

    res.json({ user, repo, commits });
  } catch {
    res.status(500).json({ error: 'Failed to fetch commits' });
  }
}
