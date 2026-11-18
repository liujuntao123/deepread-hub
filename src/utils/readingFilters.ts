import {
  ARGUMENT_MAP_STEPS,
  BOUNDARY_COMPARISON,
  CHAPTER_PROPOSITIONS,
  KEY_GROUPS,
  KEY_INSIGHTS,
  OVERVIEW_INTRO_QA,
  ULTIMATE_THESIS,
} from '../data/amusingData';
import { getPodcastEpisodeByBookSlug } from '../data/podcastEpisodesData';
import type {
  AppRouteMode,
  BookEntry,
  BookReadingDataset,
  ChapterPart,
  ChapterProposition,
  EpistemicFilter,
  KeyGroupId,
  KeyInsightItem,
  QuoteOrigin,
  ViewMode,
} from '../types/reading';

const FALLBACK_DATASET: BookReadingDataset = {
  ultimateThesis: ULTIMATE_THESIS,
  overviewIntroQa: OVERVIEW_INTRO_QA,
  chapters: CHAPTER_PROPOSITIONS,
  argumentMapSteps: ARGUMENT_MAP_STEPS,
  boundaryComparison: BOUNDARY_COMPARISON,
  keyGroups: KEY_GROUPS,
  keyInsights: KEY_INSIGHTS,
};

export interface ChapterFilterOptions {
  part: 'all' | ChapterPart;
  epistemic: EpistemicFilter;
}

export function getChapterPartFilters(
  chapters: ChapterProposition[]
): { id: 'all' | ChapterPart; label: string }[] {
  const seen = new Map<ChapterPart, string>();
  for (const chapter of chapters) {
    if (!seen.has(chapter.part)) {
      seen.set(chapter.part, chapter.partLabel);
    }
  }
  const partEntries = Array.from(seen.entries()).map(([id, label]) => ({ id, label }));
  return [{ id: 'all', label: '全部章节' }, ...partEntries];
}

export function filterChapters(
  chapters: ChapterProposition[],
  options: ChapterFilterOptions
): ChapterProposition[] {
  return chapters.filter((chapter) => {
    if (options.part !== 'all' && chapter.part !== options.part) {
      return false;
    }
    if (options.epistemic === 'inference' && !chapter.extensionOrInference) {
      return false;
    }
    return true;
  });
}

export interface KeyFilterOptions {
  query: string;
  origin: 'all' | QuoteOrigin;
  group: 'all' | KeyGroupId;
}

export function filterKeyInsights(
  items: KeyInsightItem[],
  options: KeyFilterOptions
): KeyInsightItem[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  return items.filter((item) => {
    if (options.origin !== 'all' && item.quoteOrigin !== options.origin) {
      return false;
    }
    if (options.group !== 'all' && item.groupId !== options.group) {
      return false;
    }
    if (normalizedQuery.length === 0) {
      return true;
    }

    const haystack = [
      item.indexLabel,
      item.chapterRef,
      item.propositionZh,
      item.propositionEn ?? '',
      item.conceptNote ?? '',
      item.analysis,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function countKeyOrigins(items: KeyInsightItem[]): {
  total: number;
  original: number;
  backTranslation: number;
  chineseOriginal: number;
} {
  let original = 0;
  let backTranslation = 0;
  let chineseOriginal = 0;
  for (const item of items) {
    if (item.quoteOrigin === 'original') {
      original += 1;
    } else if (item.quoteOrigin === 'chinese-original') {
      chineseOriginal += 1;
    } else {
      backTranslation += 1;
    }
  }
  return {
    total: items.length,
    original,
    backTranslation,
    chineseOriginal,
  };
}

export function calculateScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) {
    return 0;
  }
  const ratio = scrollTop / scrollable;
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

export interface OutlineAnchor {
  id: string;
  index: string;
  label: string;
}

function buildOverviewChapterAnchors(chapters: ChapterProposition[]): OutlineAnchor[] {
  if (chapters.length === 0) {
    return [];
  }

  const byPart = new Map<ChapterPart, ChapterProposition[]>();
  for (const ch of chapters) {
    const list = byPart.get(ch.part);
    if (list) {
      list.push(ch);
    } else {
      byPart.set(ch.part, [ch]);
    }
  }

  const picked: ChapterProposition[] = [];
  const seenIds = new Set<string>();
  const addChapter = (ch: ChapterProposition | undefined) => {
    if (ch && !seenIds.has(ch.id)) {
      seenIds.add(ch.id);
      picked.push(ch);
    }
  };

  const partsList = Array.from(byPart.values());
  for (const group of partsList) {
    addChapter(group[0]);
    if (partsList.length <= 4 && group.length >= 5) {
      addChapter(group[Math.floor(group.length / 2)]);
    }
  }

  addChapter(chapters[chapters.length - 1]);

  return picked.map((ch) => ({
    id: ch.id,
    index: ch.indexLabel,
    label: ch.shortLabel ?? ch.chapterTitle,
  }));
}

export function getOutlineAnchorsForView(
  view: ViewMode,
  dataset: BookReadingDataset = FALLBACK_DATASET,
  bookSlug?: string | null
): OutlineAnchor[] {
  if (view === 'map') {
    const stepAnchors: OutlineAnchor[] = dataset.argumentMapSteps.map((step, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === dataset.argumentMapSteps.length - 1;
      const index = isFirst ? '起' : isLast ? '终' : String(idx).padStart(2, '0');
      return {
        id: step.id,
        index,
        label: step.shortLabel ?? step.title,
      };
    });
    return [
      ...stepAnchors,
      {
        id: dataset.boundaryComparison.id,
        index: '界',
        label: '方法与边界',
      },
    ];
  }

  if (view === 'overview') {
    return [
      { id: 'overview-thesis', index: '00', label: '终极核心命题' },
      { id: 'overview-chapters', index: '章', label: '章节核心命题' },
      ...buildOverviewChapterAnchors(dataset.chapters),
    ];
  }

  if (view === 'key20') {
    return dataset.keyGroups.map((group) => ({
      id: `key-group-${group.id}`,
      index: group.rangeLabel,
      label: group.shortLabel ?? group.title,
    }));
  }

  if (view === 'podcast') {
    const episode = getPodcastEpisodeByBookSlug(bookSlug ?? 'amusing-ourselves-to-death');
    const actAnchors: OutlineAnchor[] = episode
      ? episode.acts.map((act) => ({
          id: `podcast-${act.id}`,
          index: act.indexLabel,
          label: act.title,
        }))
      : [];
    return [
      { id: 'podcast-player', index: '收听', label: '双引擎播客播放器' },
      { id: 'podcast-design', index: '配置', label: '声线与制作准则' },
      ...actAnchors,
    ];
  }

  const steps = dataset.argumentMapSteps;
  const midStep = steps[Math.floor(steps.length / 3)] ?? steps[0];
  const lateStep = steps[Math.max(0, steps.length - 2)] ?? steps[steps.length - 1];

  const allAnchors: OutlineAnchor[] = [{ id: 'section-map', index: '一', label: '论证地图' }];
  if (midStep) {
    allAnchors.push({
      id: midStep.id,
      index: '·',
      label: midStep.shortLabel ?? midStep.title,
    });
  }
  if (lateStep && lateStep.id !== midStep?.id) {
    allAnchors.push({
      id: lateStep.id,
      index: '·',
      label: lateStep.shortLabel ?? lateStep.title,
    });
  }
  allAnchors.push(
    { id: dataset.boundaryComparison.id, index: '·', label: '方法与边界' },
    { id: 'section-overview', index: '二', label: '洞见概览' },
    {
      id: 'overview-chapters',
      index: '·',
      label: `${dataset.chapters.length} 个章节单元`,
    },
    { id: 'section-key20', index: '三', label: 'Key20' }
  );

  return allAnchors;
}

export function getBookCategories(books: BookEntry[]): string[] {
  const seen = new Set<string>();
  for (const book of books) {
    seen.add(book.category);
  }
  return Array.from(seen);
}

export function filterBooks(
  books: BookEntry[],
  options: { query: string; category: string }
): BookEntry[] {
  const q = options.query.trim().toLowerCase();
  return books.filter((book) => {
    if (options.category !== 'all' && book.category !== options.category) {
      return false;
    }
    if (!q) {
      return true;
    }
    const haystack = [
      book.title,
      book.originalTitle,
      book.author,
      book.category,
      book.premiseHook,
      book.dataset.ultimateThesis.thesis,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getBookBySlug(
  books: BookEntry[],
  slug: string | null | undefined
): BookEntry | undefined {
  if (!slug) {
    return undefined;
  }
  return books.find((b) => b.slug === slug);
}

const VALID_VIEWS: ReadonlySet<string> = new Set(['map', 'overview', 'key20', 'all', 'podcast']);

export function parseLocationState(
  search: string,
  books: BookEntry[]
): { route: AppRouteMode; bookSlug: string | null; view: ViewMode } {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const rawBook = params.get('book');
  const rawView = params.get('view');
  const view: ViewMode = rawView && VALID_VIEWS.has(rawView) ? (rawView as ViewMode) : 'map';

  const matched = getBookBySlug(books, rawBook);
  if (matched) {
    return {
      route: 'reader',
      bookSlug: matched.slug,
      view,
    };
  }

  return {
    route: 'library',
    bookSlug: null,
    view: 'map',
  };
}

export function buildLocationSearch(
  route: AppRouteMode,
  bookSlug: string | null,
  view: ViewMode
): string {
  if (route === 'library' || !bookSlug) {
    return '';
  }
  const params = new URLSearchParams();
  params.set('book', bookSlug);
  if (view !== 'map') {
    params.set('view', view);
  }
  return `?${params.toString()}`;
}
