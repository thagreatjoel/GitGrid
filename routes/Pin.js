import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function getPinnedRepos(username) {
  const res = await fetch(`https://github.com/${username}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const repos = [];

  $('span:contains("Pinned")').parent().parent().find('li').each((_, el) => {
    const name = $(el).find('span.repo').text().trim();
    const desc = $(el).find('p').text().trim();
    const lang = $(el).find('[itemprop=programmingLanguage]').text().trim();
    const stars = parseInt($(el).find('a[href$="/stargazers"]').text().trim()) || 0;
    const forks = parseInt($(el).find('a[href$="/network/members"]').text().trim()) || 0;

    repos.push({ name, desc, lang, stars, forks });
  });

  return repos;
}
