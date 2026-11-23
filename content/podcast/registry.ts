import type { PodcastEpisode } from './types';
import { AMUSING_FULL_PODCAST } from './episodes/amusing';

export { AMUSING_FULL_PODCAST };

export const PODCAST_EPISODES: PodcastEpisode[] = [AMUSING_FULL_PODCAST];

export const PODCAST_EPISODES_BY_BOOK: Record<string, PodcastEpisode> = Object.fromEntries(
  PODCAST_EPISODES.map((ep) => [ep.bookSlug, ep])
);

export function getPodcastEpisodeByBookSlug(
  bookSlug: string | null | undefined
): PodcastEpisode | undefined {
  if (!bookSlug) return undefined;
  return PODCAST_EPISODES_BY_BOOK[bookSlug];
}
