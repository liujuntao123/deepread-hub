import type { BookReadingDataset } from './types';
export { BOOK_CATALOG_METAS } from './metas';

/**
 * Lazy per-book dataset loader for public Web Reader (apps/web).
 * Defers full per-book reading datasets into on-demand dynamic chunks.
 */
export async function loadBookDataset(slug: string): Promise<BookReadingDataset> {
  switch (slug) {
    case 'amusing-ourselves-to-death':
      return (await import('./books/amusing-ourselves-to-death')).BOOK_DATASET;
    case 'xiangtu-zhongguo':
      return (await import('./books/xiangtu-zhongguo')).BOOK_DATASET;
    case 'public-opinion':
      return (await import('./books/public-opinion')).BOOK_DATASET;
    case 'sapiens':
      return (await import('./books/sapiens')).BOOK_DATASET;
    case 'homo-deus':
      return (await import('./books/homo-deus')).BOOK_DATASET;
    case '21-lessons-for-the-21st-century':
      return (await import('./books/21-lessons-for-the-21st-century')).BOOK_DATASET;
    default:
      throw new Error(`Unknown book slug: ${slug}`);
  }
}
