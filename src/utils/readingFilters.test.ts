import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLocationSearch,
  calculateScrollProgress,
  countKeyOrigins,
  filterBooks,
  filterChapters,
  filterKeyInsights,
  getBookBySlug,
  getBookCategories,
  getChapterPartFilters,
  getOutlineAnchorsForView,
  parseLocationState,
} from './readingFilters';
import {
  ARGUMENT_MAP_STEPS,
  CHAPTER_PROPOSITIONS,
  KEY_INSIGHTS,
} from '../data/amusingData';
import { BOOKS_CATALOG } from '../data/booksRegistry';

test('filterChapters narrows by part and inference presence', () => {
  const all = filterChapters(CHAPTER_PROPOSITIONS, {
    part: 'all',
    epistemic: 'all',
  });
  assert.equal(all.length, 12);

  const part1 = filterChapters(CHAPTER_PROPOSITIONS, {
    part: 'part1',
    epistemic: 'all',
  });
  assert.equal(part1.length, 5);

  const onlyInferences = filterChapters(CHAPTER_PROPOSITIONS, {
    part: 'all',
    epistemic: 'inference',
  });
  assert.ok(onlyInferences.length > 0 && onlyInferences.length < 12);
  assert.ok(onlyInferences.every((c) => Boolean(c.extensionOrInference)));
});

test('filterKeyInsights searches bilingual text and filters by quote origin and group', () => {
  const originCounts = countKeyOrigins(KEY_INSIGHTS);
  assert.equal(originCounts.total, 20);
  assert.equal(
    originCounts.original + originCounts.backTranslation + originCounts.chineseOriginal,
    20
  );
  assert.equal(originCounts.original, 2);
  assert.equal(originCounts.chineseOriginal, 0);

  const originalsOnly = filterKeyInsights(KEY_INSIGHTS, {
    query: '',
    origin: 'original',
    group: 'all',
  });
  assert.equal(originalsOnly.length, 2);

  const aristotleMatches = filterKeyInsights(KEY_INSIGHTS, {
    query: '亚里士多德',
    origin: 'all',
    group: 'all',
  });
  assert.equal(aristotleMatches.length, 1);
  assert.equal(aristotleMatches[0].id, 6);

  const emptySearch = filterKeyInsights(KEY_INSIGHTS, {
    query: '不存在的关键词xyz',
    origin: 'all',
    group: 'all',
  });
  assert.equal(emptySearch.length, 0);
});

test('calculateScrollProgress clamps cleanly between 0 and 100', () => {
  assert.equal(calculateScrollProgress(0, 1000, 1000), 0);
  assert.equal(calculateScrollProgress(-50, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(500, 2000, 1000), 50);
  assert.equal(calculateScrollProgress(1500, 2000, 1000), 100);
});

test('getOutlineAnchorsForView builds dataset-aware anchors for all books and views', () => {
  assert.equal(ARGUMENT_MAP_STEPS.length, 6);
  assert.equal(getOutlineAnchorsForView('map').length, 7);
  assert.equal(getOutlineAnchorsForView('key20').length, 4);
  assert.equal(getOutlineAnchorsForView('all').length, 7);
  assert.equal(getOutlineAnchorsForView('all')[0].id, 'section-map');

  for (const book of BOOKS_CATALOG) {
    const mapAnchors = getOutlineAnchorsForView('map', book.dataset);
    assert.equal(mapAnchors.length, book.dataset.argumentMapSteps.length + 1);
    assert.equal(mapAnchors[0].index, '起');
    assert.equal(mapAnchors[mapAnchors.length - 1].index, '界');

    const overviewAnchors = getOutlineAnchorsForView('overview', book.dataset);
    assert.ok(overviewAnchors.length >= 4);
    assert.equal(overviewAnchors[0].id, 'overview-thesis');

    const key20Anchors = getOutlineAnchorsForView('key20', book.dataset);
    assert.equal(key20Anchors.length, 4);
    assert.ok(key20Anchors.every((anchor) => !anchor.label.startsWith(`${anchor.index} `)));

    const allAnchors = getOutlineAnchorsForView('all', book.dataset);
    assert.equal(allAnchors[0].id, 'section-map');
    assert.equal(allAnchors[allAnchors.length - 1].id, 'section-key20');
  }
});

test('all six books pass structural integrity, provenance, and part filter checks', () => {
  assert.equal(BOOKS_CATALOG.length, 6);
  assert.deepEqual(
    BOOKS_CATALOG.map((b) => b.slug),
    [
      'amusing-ourselves-to-death',
      'xiangtu-zhongguo',
      'public-opinion',
      'sapiens',
      'homo-deus',
      '21-lessons-for-the-21st-century',
    ]
  );

  const xiangtu = getBookBySlug(BOOKS_CATALOG, 'xiangtu-zhongguo');
  assert.ok(xiangtu);
  assert.equal(xiangtu.dataset.chapters.length, 16);
  assert.equal(xiangtu.dataset.keyInsights.length, 20);
  assert.equal(countKeyOrigins(xiangtu.dataset.keyInsights).chineseOriginal, 20);
  assert.equal(getChapterPartFilters(xiangtu.dataset.chapters).length, 5);
  assert.ok(
    filterKeyInsights(xiangtu.dataset.keyInsights, {
      query: 'Ideal Type',
      origin: 'all',
      group: 'all',
    }).length >= 1
  );

  const publicOpinion = getBookBySlug(BOOKS_CATALOG, 'public-opinion');
  assert.ok(publicOpinion);
  assert.equal(publicOpinion.dataset.chapters.length, 28);
  assert.equal(publicOpinion.dataset.keyInsights.length, 20);
  assert.equal(countKeyOrigins(publicOpinion.dataset.keyInsights).backTranslation, 20);
  assert.equal(getChapterPartFilters(publicOpinion.dataset.chapters).length, 9);

  const sapiens = getBookBySlug(BOOKS_CATALOG, 'sapiens');
  assert.ok(sapiens);
  assert.equal(sapiens.dataset.chapters.length, 21);
  assert.equal(sapiens.dataset.keyInsights.length, 20);
  assert.equal(countKeyOrigins(sapiens.dataset.keyInsights).backTranslation, 20);
  assert.equal(getChapterPartFilters(sapiens.dataset.chapters).length, 5);
  assert.ok(
    filterChapters(sapiens.dataset.chapters, { part: 'all', epistemic: 'inference' }).length >= 3
  );
  assert.ok(
    filterKeyInsights(sapiens.dataset.keyInsights, {
      query: '29086',
      origin: 'all',
      group: 'all',
    }).length === 1
  );

  const homoDeus = getBookBySlug(BOOKS_CATALOG, 'homo-deus');
  assert.ok(homoDeus);
  assert.equal(homoDeus.dataset.chapters.length, 11);
  assert.equal(homoDeus.dataset.keyInsights.length, 20);
  assert.equal(countKeyOrigins(homoDeus.dataset.keyInsights).backTranslation, 20);
  assert.equal(getChapterPartFilters(homoDeus.dataset.chapters).length, 5);
  assert.ok(
    filterChapters(homoDeus.dataset.chapters, { part: 'all', epistemic: 'inference' }).length >= 2
  );
  assert.ok(
    filterKeyInsights(homoDeus.dataset.keyInsights, {
      query: 'Dataism',
      origin: 'all',
      group: 'all',
    }).length >= 1
  );

  const twentyOneLessons = getBookBySlug(BOOKS_CATALOG, '21-lessons-for-the-21st-century');
  assert.ok(twentyOneLessons);
  assert.equal(twentyOneLessons.dataset.chapters.length, 22);
  assert.equal(twentyOneLessons.dataset.keyInsights.length, 20);
  assert.equal(countKeyOrigins(twentyOneLessons.dataset.keyInsights).backTranslation, 20);
  assert.equal(getChapterPartFilters(twentyOneLessons.dataset.chapters).length, 7);
  assert.ok(
    filterChapters(twentyOneLessons.dataset.chapters, { part: 'all', epistemic: 'inference' })
      .length >= 2
  );
  assert.ok(
    filterKeyInsights(twentyOneLessons.dataset.keyInsights, {
      query: 'AlphaZero',
      origin: 'all',
      group: 'all',
    }).length === 1
  );

  for (const book of BOOKS_CATALOG) {
    const chapterIds = new Set(book.dataset.chapters.map((c) => c.id));
    assert.equal(chapterIds.size, book.dataset.chapters.length);

    const groupIds = new Set(book.dataset.keyGroups.map((g) => g.id));
    assert.equal(book.dataset.keyGroups.length, 4);
    assert.ok(book.dataset.keyInsights.every((item) => groupIds.has(item.groupId)));
    assert.equal(book.dataset.argumentMapSteps.length, 6);
    assert.ok(book.dataset.boundaryComparison.authorMethodParagraphs.length >= 2);
    assert.ok(book.dataset.boundaryComparison.readerLookbackParagraphs.length >= 2);
  }
});

test('multi-book registry filters and URL location parsing roundtrip cleanly', () => {
  const categories = getBookCategories(BOOKS_CATALOG);
  assert.deepEqual(categories, [
    '媒介与文化批评',
    '中国乡土社会学',
    '政治传播与民主理论',
    '人类史与未来议题',
  ]);

  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '波兹曼', category: 'all' }).length,
    1
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '费孝通', category: 'all' }).length,
    1
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '李普曼', category: 'all' }).length,
    1
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '赫拉利', category: 'all' }).length,
    3
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '', category: '人类史与未来议题' }).length,
    3
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '', category: '政治传播与民主理论' }).length,
    1
  );
  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '不存在的书目', category: 'all' }).length,
    0
  );
  assert.ok(getBookBySlug(BOOKS_CATALOG, 'amusing-ourselves-to-death'));
  assert.ok(getBookBySlug(BOOKS_CATALOG, 'sapiens'));
  assert.ok(getBookBySlug(BOOKS_CATALOG, 'homo-deus'));
  assert.ok(getBookBySlug(BOOKS_CATALOG, '21-lessons-for-the-21st-century'));
  assert.equal(getBookBySlug(BOOKS_CATALOG, 'unknown-slug'), undefined);

  assert.deepEqual(parseLocationState('', BOOKS_CATALOG), {
    route: 'library',
    bookSlug: null,
    view: 'map',
  });

  assert.deepEqual(
    parseLocationState('?book=xiangtu-zhongguo&view=overview', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: 'xiangtu-zhongguo',
      view: 'overview',
    }
  );

  assert.deepEqual(
    parseLocationState('?book=sapiens&view=key20', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: 'sapiens',
      view: 'key20',
    }
  );

  assert.deepEqual(
    parseLocationState('?book=homo-deus&view=overview', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: 'homo-deus',
      view: 'overview',
    }
  );

  assert.deepEqual(
    parseLocationState('?book=21-lessons-for-the-21st-century&view=all', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: '21-lessons-for-the-21st-century',
      view: 'all',
    }
  );

  assert.deepEqual(
    parseLocationState('?book=missing&view=overview', BOOKS_CATALOG),
    {
      route: 'library',
      bookSlug: null,
      view: 'map',
    }
  );

  assert.equal(buildLocationSearch('library', null, 'map'), '');
  assert.equal(
    buildLocationSearch('reader', 'xiangtu-zhongguo', 'map'),
    '?book=xiangtu-zhongguo'
  );
  assert.equal(
    buildLocationSearch('reader', 'sapiens', 'overview'),
    '?book=sapiens&view=overview'
  );
  assert.equal(
    buildLocationSearch('reader', 'amusing-ourselves-to-death', 'podcast'),
    '?book=amusing-ourselves-to-death&view=podcast'
  );
  assert.deepEqual(
    parseLocationState('?book=amusing-ourselves-to-death&view=podcast', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: 'amusing-ourselves-to-death',
      view: 'podcast',
    }
  );

  const amusing = getBookBySlug(BOOKS_CATALOG, 'amusing-ourselves-to-death');
  assert.ok(amusing);
  const podcastAnchors = getOutlineAnchorsForView('podcast', amusing.dataset, amusing.slug);
  assert.equal(podcastAnchors.length, 9);
  assert.equal(podcastAnchors[0].id, 'podcast-player');
  assert.equal(podcastAnchors[2].id, 'podcast-act-1');
});
