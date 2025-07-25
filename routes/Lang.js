import fetch from 'node-fetch';

export async function getLanguages(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();
  const langMap = {};

  repos.forEach(repo => {
    const lang = repo.language;
    if (lang) {
      if (!langMap[lang]) langMap[lang] = 0;
      langMap[lang] += 1;
    }
  });

  return langMap;
}
