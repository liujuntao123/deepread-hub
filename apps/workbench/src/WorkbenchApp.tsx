import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Film,
  Headphones,
  Moon,
  RefreshCw,
  Sun,
  Terminal,
} from 'lucide-react';
import { BOOKS_CATALOG } from '@content/reading/registry';
import { getPodcastEpisodeByBookSlug } from '@content/podcast/registry';
import { ArtifactMatrix } from './components/ArtifactMatrix';
import { PodcastInspector } from './components/PodcastInspector';
import { ReadingSummaryTab } from './components/ReadingSummaryTab';
import { SidebarNav } from './components/SidebarNav';
import { VideoSlotPreview } from './components/VideoSlotPreview';
import { probeBookArtifacts, type BookArtifactProbe } from './lib/artifactProbe';

type DetailTab = 'podcast' | 'reading' | 'video';

function parseInitialState(): {
  mode: 'overview' | 'book';
  slug: string;
  tab: DetailTab;
} {
  if (typeof window === 'undefined') {
    return { mode: 'book', slug: BOOKS_CATALOG[0].slug, tab: 'podcast' };
  }
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  const bookParam = params.get('book');
  const tabParam = params.get('tab');

  const validTab: DetailTab =
    tabParam === 'reading' || tabParam === 'video' || tabParam === 'podcast'
      ? tabParam
      : 'podcast';

  if (viewParam === 'overview') {
    return { mode: 'overview', slug: BOOKS_CATALOG[0].slug, tab: validTab };
  }
  if (bookParam && BOOKS_CATALOG.some((b) => b.slug === bookParam)) {
    return { mode: 'book', slug: bookParam, tab: validTab };
  }
  return { mode: 'book', slug: BOOKS_CATALOG[0].slug, tab: 'podcast' };
}

export default function WorkbenchApp() {
  const initial = useMemo(() => parseInitialState(), []);
  const [mode, setMode] = useState<'overview' | 'book'>(initial.mode);
  const [selectedSlug, setSelectedSlug] = useState<string>(initial.slug);
  const [activeTab, setActiveTab] = useState<DetailTab>(initial.tab);
  const [isDark, setIsDark] = useState(false);
  const [probes, setProbes] = useState<Record<string, BookArtifactProbe>>({});
  const [loadingProbes, setLoadingProbes] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const syncUrl = (nextMode: 'overview' | 'book', nextSlug: string, nextTab: DetailTab) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (nextMode === 'overview') {
      params.set('view', 'overview');
    } else {
      params.set('book', nextSlug);
      if (nextTab !== 'podcast') {
        params.set('tab', nextTab);
      }
    }
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', nextUrl);
  };

  const scanAllArtifacts = useCallback(async () => {
    setLoadingProbes(true);
    try {
      const results = await Promise.all(
        BOOKS_CATALOG.map((book) => probeBookArtifacts(book.slug))
      );
      const next: Record<string, BookArtifactProbe> = {};
      for (const item of results) {
        next[item.bookSlug] = item;
      }
      setProbes(next);
    } finally {
      setLoadingProbes(false);
    }
  }, []);

  useEffect(() => {
    void scanAllArtifacts();
  }, [scanAllArtifacts]);

  const handleSelectOverview = () => {
    setMode('overview');
    syncUrl('overview', selectedSlug, activeTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (slug: string) => {
    setMode('book');
    setSelectedSlug(slug);
    syncUrl('book', slug, activeTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: DetailTab) => {
    setActiveTab(tab);
    syncUrl('book', selectedSlug, tab);
  };

  const activeBook = useMemo(
    () => BOOKS_CATALOG.find((b) => b.slug === selectedSlug) ?? BOOKS_CATALOG[0],
    [selectedSlug]
  );
  const activeEpisode = useMemo(
    () => getPodcastEpisodeByBookSlug(activeBook.slug),
    [activeBook.slug]
  );
  const activeProbe = probes[activeBook.slug];

  const audioReadyCount =
    (activeProbe?.edge.available ? 1 : 0) + (activeProbe?.fish.available ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#141311] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Slim Sticky Top Bar */}
      <header className="sticky top-0 z-40 h-12 bg-[#FBF9F5]/95 dark:bg-[#141311]/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Headphones className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400 shrink-0" aria-hidden="true" />
          <span className="font-editorial text-sm sm:text-base font-bold tracking-tight truncate">
            deepread-hub · 本地制作工作台
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-index rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
            LOCAL ONLY
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => void scanAllArtifacts()}
            disabled={loadingProbes}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loadingProbes ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">刷新产物</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">亮色</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">暗色</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Master-Detail Left/Right Split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <SidebarNav
          books={BOOKS_CATALOG}
          probes={probes}
          mode={mode}
          selectedSlug={activeBook.slug}
          onSelectOverview={handleSelectOverview}
          onSelectBook={handleSelectBook}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-[960px] mx-auto">
            {mode === 'overview' ? (
              <ArtifactMatrix
                books={BOOKS_CATALOG}
                probes={probes}
                onSelectBook={handleSelectBook}
              />
            ) : (
              <div className="space-y-6">
                {/* Book Header + Artifact Tab Switcher */}
                <div className="space-y-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-medium text-[#1E3A8A] dark:text-sky-400">
                          {activeBook.category}
                        </span>
                        <span>·</span>
                        <span>{activeBook.author}</span>
                        <span>·</span>
                        <code className="font-index text-[11px] px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800">
                          {activeBook.slug}
                        </code>
                      </div>
                      <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                        {activeBook.title}
                      </h1>
                    </div>
                  </div>

                  {/* Primary Detail Tabs */}
                  <div role="tablist" aria-label="产物视图切换" className="flex items-center gap-1 -mb-px overflow-x-auto">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'podcast'}
                      onClick={() => handleSelectTab('podcast')}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                        activeTab === 'podcast'
                          ? 'border-[#1E3A8A] dark:border-sky-400 text-[#1E3A8A] dark:text-sky-400'
                          : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>播客文稿与音频</span>
                      <span className="font-index text-[11px] px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {activeEpisode ? `音 ${audioReadyCount}/2` : '待创作'}
                      </span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'reading'}
                      onClick={() => handleSelectTab('reading')}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                        activeTab === 'reading'
                          ? 'border-[#1E3A8A] dark:border-sky-400 text-[#1E3A8A] dark:text-sky-400'
                          : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>领读底本速查</span>
                      <span className="font-index text-[11px] px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {activeBook.dataset.chapters.length} 章
                      </span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'video'}
                      onClick={() => handleSelectTab('video')}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                        activeTab === 'video'
                          ? 'border-[#1E3A8A] dark:border-sky-400 text-[#1E3A8A] dark:text-sky-400'
                          : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>播客视频</span>
                      <span className="font-index text-[11px] px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {activeProbe?.video.finalVideoAvailable
                          ? '成片'
                          : activeProbe?.video.storyboardAvailable
                            ? '分镜'
                            : '预留'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Active Tab Content */}
                {activeTab === 'podcast' && (
                  activeEpisode ? (
                    <PodcastInspector key={activeEpisode.bookSlug} episode={activeEpisode} />
                  ) : (
                    <div className="p-6 rounded-md border border-dashed border-stone-300 dark:border-stone-700 bg-[#F6F2EA]/60 dark:bg-stone-900/50 space-y-4">
                      <div className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100">
                        {activeBook.title} 尚未制作产物 2（播客文稿）与产物 3（双引擎音频）
                      </div>
                      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        产物 1（共 {activeBook.dataset.chapters.length} 个章节单元与 {activeBook.dataset.keyInsights.length} 条 Key20）已齐备，可切至「领读底本速查」Tab 核对内容，然后使用{' '}
                        <code className="font-index text-xs px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800">
                          produce-podcast-script
                        </code>{' '}
                        与{' '}
                        <code className="font-index text-xs px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800">
                          produce-podcast-audio
                        </code>{' '}
                        完成制作：
                      </p>
                      <div className="p-3.5 rounded bg-stone-900 text-stone-100 font-index text-xs flex items-center gap-2 overflow-x-auto">
                        <Terminal className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
                        <code>
                          npm run podcast:export -- --book {activeBook.slug} &amp;&amp; npm run podcast:generate -- --book {activeBook.slug} --provider both
                        </code>
                      </div>
                    </div>
                  )
                )}

                {activeTab === 'reading' && <ReadingSummaryTab book={activeBook} />}

                {activeTab === 'video' && (
                  <VideoSlotPreview book={activeBook} video={activeProbe?.video} />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
