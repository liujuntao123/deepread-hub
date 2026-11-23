import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { BOOK_CATALOG_METAS, loadBookDataset } from '@content/reading/catalog';
import type {
  AppRouteMode,
  BookReadingDataset,
  FontScale,
  ViewMode,
} from '@content/reading/types';
import {
  buildLocationSearch,
  calculateScrollProgress,
  getBookBySlug,
  getOutlineAnchorsForView,
  parseLocationState,
} from '@content/reading/filters';
import { ArgumentMapSection } from './components/ArgumentMapSection';
import { Key20Section } from './components/Key20Section';
import { LibraryPage } from './components/LibraryPage';
import { OutlineRail } from './components/OutlineRail';
import { OverviewSection } from './components/OverviewSection';
import { TopBar } from './components/TopBar';

export default function App() {
  const initialLocation =
    typeof window !== 'undefined'
      ? parseLocationState(window.location.search, BOOK_CATALOG_METAS)
      : { route: 'library' as AppRouteMode, bookSlug: null, view: 'map' as ViewMode };

  const [route, setRoute] = useState<AppRouteMode>(initialLocation.route);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialLocation.bookSlug);
  const [activeView, setActiveView] = useState<ViewMode>(initialLocation.view);
  const [isDark, setIsDark] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>('standard');
  const [progress, setProgress] = useState(0);
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);

  const datasetCacheRef = useRef<Map<string, BookReadingDataset>>(new Map());
  const [activeDataset, setActiveDataset] = useState<BookReadingDataset | null>(null);
  const [loadingBook, setLoadingBook] = useState(false);

  const activeBook = getBookBySlug(BOOK_CATALOG_METAS, selectedSlug) ?? BOOK_CATALOG_METAS[0];
  const activeBookIndex = Math.max(
    0,
    BOOK_CATALOG_METAS.findIndex((b) => b.slug === activeBook.slug)
  );
  const catalogNumber = String(activeBookIndex + 1).padStart(2, '0');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handlePopState = () => {
      const next = parseLocationState(window.location.search, BOOK_CATALOG_METAS);
      setRoute(next.route);
      setSelectedSlug(next.bookSlug);
      setActiveView(next.view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route === 'library') {
      document.title = '深度领读集 · DEEPREAD ARCHIVE';
    } else if (activeBook) {
      document.title = `${activeBook.title} · 深度领读集`;
    }
  }, [route, activeBook]);

  // Dynamically lazy-load the selected book's reading dataset chunk on demand
  useEffect(() => {
    if (route !== 'reader') {
      return;
    }

    const slug = activeBook.slug;
    const cached = datasetCacheRef.current.get(slug);
    if (cached) {
      setActiveDataset(cached);
      setLoadingBook(false);
      return;
    }

    let cancelled = false;
    setLoadingBook(true);
    loadBookDataset(slug)
      .then((dataset) => {
        if (cancelled) return;
        datasetCacheRef.current.set(slug, dataset);
        setActiveDataset(dataset);
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingBook(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [route, activeBook.slug]);

  useEffect(() => {
    if (route !== 'reader' || !activeDataset) {
      setProgress(0);
      setActiveAnchorId(null);
      return;
    }

    const anchors = getOutlineAnchorsForView(activeView, activeDataset);

    const updateScrollState = () => {
      const nextProgress = calculateScrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      setProgress(nextProgress);

      const threshold = Math.min(280, Math.round(window.innerHeight * 0.35));
      let currentId: string | null = anchors[0]?.id ?? null;
      for (const anchor of anchors) {
        const el = document.getElementById(anchor.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          currentId = anchor.id;
        } else {
          break;
        }
      }
      setActiveAnchorId(currentId);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [route, activeView, selectedSlug, activeDataset]);

  const syncUrl = (nextRoute: AppRouteMode, nextSlug: string | null, nextView: ViewMode) => {
    const nextSearch = buildLocationSearch(nextRoute, nextSlug, nextView);
    const nextUrl = `${window.location.pathname}${nextSearch}`;
    if (window.location.search !== nextSearch) {
      window.history.pushState(null, '', nextUrl);
    }
  };

  const handleGoLibrary = () => {
    setRoute('library');
    setSelectedSlug(null);
    syncUrl('library', null, 'map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBook = (slug: string, initialView: ViewMode = 'map') => {
    setSelectedSlug(slug);
    setActiveView(initialView);
    setRoute('reader');
    syncUrl('reader', slug, initialView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: ViewMode) => {
    setActiveView(view);
    const slug = activeBook.slug;
    syncUrl('reader', slug, view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#F4F4F0] dark:bg-[#0B0B0B] text-[#0A0A0A] dark:text-[#F4F4F0] transition-colors duration-150"
    >
      <TopBar
        route={route}
        bookTitle={route === 'reader' ? activeBook.title : undefined}
        activeView={activeView}
        onGoLibrary={handleGoLibrary}
        onSelectView={handleSelectView}
        fontScale={fontScale}
        onToggleFontScale={() =>
          setFontScale((prev) => (prev === 'standard' ? 'large' : 'standard'))
        }
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        progress={progress}
      />

      {route === 'library' ? (
        <LibraryPage books={BOOK_CATALOG_METAS} onOpenBook={handleOpenBook} />
      ) : !activeDataset || loadingBook ? (
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-[780px] mx-auto border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] p-8 space-y-4">
            <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
              LOADING VOLUME {catalogNumber}
            </div>
            <div className="h-8 w-64 bg-[#EAEAE4] dark:bg-[#1C1C1A] animate-pulse" />
            <div className="h-20 w-full bg-[#EAEAE4] dark:bg-[#1C1C1A] animate-pulse" />
            <p className="font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
              正在加载 {activeBook.title} 深度领读卷宗…
            </p>
          </div>
        </main>
      ) : (
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex gap-10 lg:gap-14">
            <OutlineRail
              bookTitle={activeBook.title}
              catalogNumber={catalogNumber}
              dataset={activeDataset}
              activeView={activeView}
              activeAnchorId={activeAnchorId}
              onGoLibrary={handleGoLibrary}
            />

            <div className="min-w-0 flex-1 max-w-[820px] space-y-14">
              {/* Swiss Monograph Header Strip */}
              <div className="border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-3 p-4 sm:p-5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex sm:flex-col justify-between items-baseline sm:items-start">
                  <span className="swiss-kicker text-[#FF2A1F] dark:text-[#E10600]">
                    VOL. {catalogNumber}
                  </span>
                  <span className="font-index text-xs opacity-80">
                    {activeBook.publicationYear}
                  </span>
                </div>
                <div className="sm:col-span-9 p-4 sm:p-5 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-lg font-black text-[#0A0A0A] dark:text-[#F4F4F0]">
                      {activeBook.title}
                    </span>
                    <span className="font-index text-[11px] font-semibold text-[#E10600] dark:text-[#FF2A1F]">
                      {activeBook.category}
                    </span>
                  </div>
                  <div className="font-index text-xs text-[#52524E] dark:text-[#A1A19A] flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span>{activeBook.author}</span>
                    {activeBook.translator && (
                      <>
                        <span aria-hidden="true">/</span>
                        <span>{activeBook.translator}</span>
                      </>
                    )}
                    <span aria-hidden="true">/</span>
                    <span>{activeBook.publisherInfo}</span>
                    <span aria-hidden="true">/</span>
                    <span>{activeBook.readingTimeLabel}</span>
                  </div>
                </div>
              </div>

              {(activeView === 'map' || activeView === 'all') && (
                <ArgumentMapSection dataset={activeDataset} fontScale={fontScale} />
              )}

              {(activeView === 'overview' || activeView === 'all') && (
                <OverviewSection
                  key={activeBook.slug}
                  dataset={activeDataset}
                  fontScale={fontScale}
                />
              )}

              {(activeView === 'key20' || activeView === 'all') && (
                <Key20Section
                  key={activeBook.slug}
                  dataset={activeDataset}
                  fontScale={fontScale}
                />
              )}

              {/* Bottom Architectural Action Bar */}
              <div className="pt-8 border-t-4 border-[#0A0A0A] dark:border-[#F4F4F0] flex flex-wrap items-center justify-between gap-4">
                {activeView !== 'all' ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {activeView === 'map' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('overview')}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] transition-colors cursor-pointer"
                      >
                        <span>02 · 继续阅读：洞见概览</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                    {activeView === 'overview' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('key20')}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] transition-colors cursor-pointer"
                      >
                        <span>03 · 继续阅读：KEY 20</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                    {activeView === 'key20' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('all')}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] transition-colors cursor-pointer"
                      >
                        <span>ALL · 切换全篇连读</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0A] dark:text-[#F4F4F0] border-2 border-[#0A0A0A] dark:border-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>回到顶部</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleGoLibrary}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0A] dark:text-[#F4F4F0] border-2 border-[#0A0A0A] dark:border-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>返回书库目录</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0] py-6 bg-[#FFFFFF] dark:bg-[#141414]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
          {route === 'library' ? (
            <>
              <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                DEEPREAD ARCHIVE · 深度领读集
              </span>
              <span>原著实证 / 问答推演 / 边界对照</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                VOL. {catalogNumber} · {activeBook.author} {activeBook.title}
              </span>
              <span>
                {[activeBook.translator, activeBook.publisherInfo]
                  .filter(Boolean)
                  .join(' / ')}
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
