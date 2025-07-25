import { getContributions } from './getContributions.js';
import { getStats } from './getStats.js';
import { getActivity } from './getActivity.js';
import { getPinnedRepos } from './getPinned.js';
import { getLanguages } from './getLanguages.js';
import { getPublicRepos } from './getRepos.js';

export async function getMetrics(username) {
  const [contrib, stats, activity, pinned, langs, repos] = await Promise.all([
    getContributions(username),
    getStats(username),
    getActivity(username),
    getPinnedRepos(username),
    getLanguages(username),
    getPublicRepos(username)
  ]);

  return {
    username,
    contributions: contrib,
    stats,
    activity,
    pinned,
    languages: langs,
    repos
  };
}
