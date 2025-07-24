const axios = require('axios');

module.exports = async function fetchGraph(username, options = {}) {
  const { format = 'svg', theme, color, bg } = options;
  const url = `https://github.com/users/${username}/contributions`;

  const { data: svg } = await axios.get(url, {
    headers: { 'User-Agent': 'gh-graphify' }
  });

  let styledSvg = svg;

  if (color || bg) {
    styledSvg = styledSvg
      .replace(/fill="#[0-9a-fA-F]+"/g, match => {
        if (match.includes('#ebedf0')) return bg ? `fill="${bg}"` : match;
        return color ? `fill="${color}"` : match;
      });
  }

  return Buffer.from(styledSvg);
};
