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
} from './filters';
import { BOOK_DATASET as AMUSING_DATASET } from './books/amusing-ourselves-to-death';
import { BOOK_CATALOG_METAS, loadBookDataset } from './catalog';
import { BOOKS_CATALOG } from './registry';

test('filterChapters narrows by part and inference presence', () => {
  const chapters = AMUSING_DATASET.chapters;
  const all = filterChapters(chapters, {
    part: 'all',
    epistemic: 'all',
  });
  assert.equal(all.length, 12);

  const part1 = filterChapters(chapters, {
    part: 'part1',
    epistemic: 'all',
  });
  assert.equal(part1.length, 5);

  const onlyInferences = filterChapters(chapters, {
    part: 'all',
    epistemic: 'inference',
  });
  assert.ok(onlyInferences.length > 0 && onlyInferences.length < 12);
  assert.ok(onlyInferences.every((c) => Boolean(c.extensionOrInference)));
});

test('filterKeyInsights searches bilingual text and filters by quote origin and group', () => {
  const insights = AMUSING_DATASET.keyInsights;
  const originCounts = countKeyOrigins(insights);
  assert.equal(originCounts.total, 20);
  assert.equal(
    originCounts.original + originCounts.backTranslation + originCounts.chineseOriginal,
    20
  );
  assert.equal(originCounts.original, 2);
  assert.equal(originCounts.chineseOriginal, 0);

  const originalsOnly = filterKeyInsights(insights, {
    query: '',
    origin: 'original',
    group: 'all',
  });
  assert.equal(originalsOnly.length, 2);

  const aristotleMatches = filterKeyInsights(insights, {
    query: '亚里士多德',
    origin: 'all',
    group: 'all',
  });
  assert.equal(aristotleMatches.length, 1);
  assert.equal(aristotleMatches[0].id, 6);

  const emptySearch = filterKeyInsights(insights, {
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

test('getOutlineAnchorsForView builds dataset-aware anchors for all registered books and views', () => {
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

test('all registered books pass structural integrity, provenance, shortLabel, and part filter checks', () => {
  assert.equal(BOOKS_CATALOG.length, 6);
  const expectedSlugs = [
    'amusing-ourselves-to-death',
    'xiangtu-zhongguo',
    'public-opinion',
    'sapiens',
    'homo-deus',
    '21-lessons-for-the-21st-century',
  ];
  for (const slug of expectedSlugs) {
    assert.ok(getBookBySlug(BOOKS_CATALOG, slug), `Expected book slug "${slug}" to be registered`);
  }

  for (const book of BOOKS_CATALOG) {
    const { dataset } = book;

    // Ultimate thesis & intro
    assert.ok(dataset.ultimateThesis.thesis.trim().length > 20, `${book.slug}: thesis too short`);
    assert.ok(dataset.ultimateThesis.answerParagraphs.length >= 2, `${book.slug}: thesis paragraphs`);

    // Chapters
    const chapterIds = new Set(dataset.chapters.map((c) => c.id));
    assert.equal(chapterIds.size, dataset.chapters.length, `${book.slug}: duplicate chapter id`);
    assert.ok(getChapterPartFilters(dataset.chapters).length >= 2, `${book.slug}: parts >= 2`);
    for (const ch of dataset.chapters) {
      assert.ok(ch.shortLabel && ch.shortLabel.trim().length > 0, `${book.slug}/${ch.id}: missing shortLabel`);
      assert.ok(ch.coreProposition.trim().length > 10, `${book.slug}/${ch.id}: empty coreProposition`);
      assert.ok(ch.narrative.trim().length > 30, `${book.slug}/${ch.id}: empty narrative`);
    }

    // Argument map steps (5-7 steps per book-reading-guide.md)
    assert.ok(
      dataset.argumentMapSteps.length >= 5 && dataset.argumentMapSteps.length <= 7,
      `${book.slug}: argumentMapSteps should be 5..7`
    );
    assert.equal(dataset.argumentMapSteps[0].stepNumber, '起点', `${book.slug}: first stepNumber`);
    assert.equal(
      dataset.argumentMapSteps[dataset.argumentMapSteps.length - 1].stepNumber,
      '终点',
      `${book.slug}: last stepNumber`
    );
    for (const step of dataset.argumentMapSteps) {
      assert.ok(step.shortLabel && step.shortLabel.trim().length > 0, `${book.slug}/${step.id}: missing shortLabel`);
      assert.ok(step.paragraphs.length >= 2, `${book.slug}/${step.id}: needs >= 2 paragraphs`);
      assert.ok(step.transitionNote.trim().length > 10, `${book.slug}/${step.id}: missing transitionNote`);
    }

    // Boundary comparison
    assert.ok(dataset.boundaryComparison.authorMethodParagraphs.length >= 2);
    assert.ok(dataset.boundaryComparison.readerLookbackParagraphs.length >= 2);

    // Key20 groups & provenance discipline
    const groupIds = new Set(dataset.keyGroups.map((g) => g.id));
    assert.equal(dataset.keyGroups.length, 4, `${book.slug}: keyGroups must be 4`);
    assert.equal(dataset.keyInsights.length, 20, `${book.slug}: keyInsights must be 20`);
    for (const group of dataset.keyGroups) {
      assert.ok(group.shortLabel && group.shortLabel.trim().length > 0, `${book.slug}/${group.id}: missing shortLabel`);
      const rangeMatch = group.rangeLabel.match(/(\d+)\D+(\d+)/);
      assert.ok(rangeMatch, `${book.slug}/${group.id}: invalid rangeLabel "${group.rangeLabel}"`);
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      const memberIds = dataset.keyInsights
        .filter((item) => item.groupId === group.id)
        .map((item) => item.id);
      assert.equal(memberIds[0], start, `${book.slug}/${group.id}: range start mismatch`);
      assert.equal(memberIds[memberIds.length - 1], end, `${book.slug}/${group.id}: range end mismatch`);
    }

    dataset.keyInsights.forEach((item, idx) => {
      const expectedId = idx + 1;
      assert.equal(item.id, expectedId, `${book.slug}: Key20 id sequence mismatch`);
      assert.equal(item.indexLabel, String(expectedId).padStart(2, '0'), `${book.slug}: Key20 indexLabel`);
      assert.ok(groupIds.has(item.groupId), `${book.slug}/${item.indexLabel}: invalid groupId`);
      if (item.quoteOrigin === 'chinese-original') {
        assert.equal(item.propositionEn, undefined, `${book.slug}/${item.indexLabel}: chinese-original should omit propositionEn`);
      } else if (item.quoteOrigin === 'back-translation') {
        assert.ok(
          item.propositionEn && item.propositionEn.includes('回译'),
          `${book.slug}/${item.indexLabel}: back-translation must mark （回译） in propositionEn`
        );
      } else {
        assert.ok(
          item.propositionEn && item.propositionEn.trim().length > 0,
          `${book.slug}/${item.indexLabel}: original must provide propositionEn`
        );
      }
    });
  }
});

test('book registry filters and URL location parsing roundtrip cleanly', () => {
  const categories = getBookCategories(BOOKS_CATALOG);
  assert.ok(categories.includes('媒介与文化批评'));
  assert.ok(categories.includes('中国乡土社会学'));
  assert.ok(categories.includes('政治传播与民主理论'));
  assert.ok(categories.includes('人类史与未来议题'));

  assert.equal(
    filterBooks(BOOKS_CATALOG, { query: '波兹曼', category: 'all' }).length,
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
    filterBooks(BOOKS_CATALOG, { query: '不存在的书目', category: 'all' }).length,
    0
  );
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
    parseLocationState('?book=missing&view=overview', BOOKS_CATALOG),
    {
      route: 'library',
      bookSlug: null,
      view: 'map',
    }
  );

  assert.equal(buildLocationSearch('library', null, 'map'), '');
  assert.equal(
    buildLocationSearch('reader', 'amusing-ourselves-to-death', 'map'),
    '?book=amusing-ourselves-to-death'
  );
  assert.equal(
    buildLocationSearch('reader', 'amusing-ourselves-to-death', 'overview'),
    '?book=amusing-ourselves-to-death&view=overview'
  );

  // Unknown/legacy views such as ?view=podcast fall back cleanly to map
  assert.deepEqual(
    parseLocationState('?book=amusing-ourselves-to-death&view=podcast', BOOKS_CATALOG),
    {
      route: 'reader',
      bookSlug: 'amusing-ourselves-to-death',
      view: 'map',
    }
  );
});

test('lazy-loading catalog metadata stays strictly synchronized with full reading registry', async () => {
  assert.equal(BOOK_CATALOG_METAS.length, BOOKS_CATALOG.length);
  for (let i = 0; i < BOOKS_CATALOG.length; i++) {
    const full = BOOKS_CATALOG[i];
    const meta = BOOK_CATALOG_METAS[i];
    assert.equal(meta.slug, full.slug);
    assert.equal(meta.title, full.title);
    assert.equal(meta.author, full.author);
    assert.equal(meta.ultimateThesisText, full.dataset.ultimateThesis.thesis);
    assert.equal(meta.stats.mapStepCount, full.dataset.argumentMapSteps.length);
    assert.equal(meta.stats.chapterCount, full.dataset.chapters.length);
    assert.deepEqual(meta.stats.originCounts, countKeyOrigins(full.dataset.keyInsights));

    const lazyLoaded = await loadBookDataset(meta.slug);
    assert.deepEqual(lazyLoaded, full.dataset);
  }
});
