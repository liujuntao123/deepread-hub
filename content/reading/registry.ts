import type { BookEntry, BookReadingDataset } from './types';
import { BOOK_CATALOG_METAS } from './metas';
import { BOOK_DATASET as AMUSING_DATASET } from './books/amusing-ourselves-to-death';
import { BOOK_DATASET as XIANGTU_DATASET } from './books/xiangtu-zhongguo';
import { BOOK_DATASET as PUBLIC_OPINION_DATASET } from './books/public-opinion';
import { BOOK_DATASET as SAPIENS_DATASET } from './books/sapiens';
import { BOOK_DATASET as HOMO_DEUS_DATASET } from './books/homo-deus';
import { BOOK_DATASET as TWENTY_ONE_LESSONS_DATASET } from './books/21-lessons-for-the-21st-century';

const BOOK_DATASETS_BY_SLUG: Record<string, BookReadingDataset> = {
  'amusing-ourselves-to-death': AMUSING_DATASET,
  'xiangtu-zhongguo': XIANGTU_DATASET,
  'public-opinion': PUBLIC_OPINION_DATASET,
  sapiens: SAPIENS_DATASET,
  'homo-deus': HOMO_DEUS_DATASET,
  '21-lessons-for-the-21st-century': TWENTY_ONE_LESSONS_DATASET,
};

/**
 * Full reading registry derived from the single metadata source in `catalog.ts`.
 * Used by local workbench, pipelines, and automated test verification.
 */
export const BOOKS_CATALOG: BookEntry[] = BOOK_CATALOG_METAS.map(
  ({ ultimateThesisText: _thesis, stats: _stats, ...meta }) => {
    const dataset = BOOK_DATASETS_BY_SLUG[meta.slug];
    if (!dataset) {
      throw new Error(`Missing reading dataset for registered book slug: ${meta.slug}`);
    }
    return { ...meta, dataset };
  }
);
