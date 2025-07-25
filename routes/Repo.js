import fetch from 'node-fetch';

export async function getPublicRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();

  return data.map(repo => ({
    name: repo.name,
    desc: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lang: repo.language,
    updated: repo.updated_at
  }));
}
