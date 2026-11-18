import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ArgumentMapSection } from './components/ArgumentMapSection';
import { Key20Section } from './components/Key20Section';
import { LibraryPage } from './components/LibraryPage';
import { OutlineRail } from './components/OutlineRail';
import { OverviewSection } from './components/OverviewSection';
import { TopBar } from './components/TopBar';
import { BOOKS_CATALOG } from './data/booksRegistry';
import type { AppRouteMode, FontScale, ViewMode } from './types/reading';
import {
  buildLocationSearch,
  calculateScrollProgress,
  getBookBySlug,
  getOutlineAnchorsForView,
  parseLocationState,
} from './utils/readingFilters';

export default function App() {
  const initialLocation =
    typeof window !== 'undefined'
      ? parseLocationState(window.location.search, BOOKS_CATALOG)
      : { route: 'library' as AppRouteMode, bookSlug: null, view: 'map' as ViewMode };

  const [route, setRoute] = useState<AppRouteMode>(initialLocation.route);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialLocation.bookSlug);
  const [activeView, setActiveView] = useState<ViewMode>(initialLocation.view);
  const [isDark, setIsDark] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>('standard');
  const [progress, setProgress] = useState(0);
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);

  const activeBook = getBookBySlug(BOOKS_CATALOG, selectedSlug) ?? BOOKS_CATALOG[0];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handlePopState = () => {
      const next = parseLocationState(window.location.search, BOOKS_CATALOG);
      setRoute(next.route);
      setSelectedSlug(next.bookSlug);
      setActiveView(next.view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route === 'library') {
      document.title = '深度领读集 · 图书聚合书库';
    } else if (activeBook) {
      document.title = `${activeBook.title}领读`;
    }
  }, [route, activeBook]);

  useEffect(() => {
    if (route !== 'reader') {
      setProgress(0);
      setActiveAnchorId(null);
      return;
    }

    const anchors = getOutlineAnchorsForView(activeView, activeBook.dataset);

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
  }, [route, activeView, selectedSlug, activeBook.dataset]);

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
      className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#141311] text-stone-900 dark:text-stone-100 transition-colors duration-200"
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
        <LibraryPage books={BOOKS_CATALOG} onOpenBook={handleOpenBook} />
      ) : (
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex gap-12 lg:gap-16">
            <OutlineRail
              bookTitle={activeBook.title}
              dataset={activeBook.dataset}
              activeView={activeView}
              activeAnchorId={activeAnchorId}
              onGoLibrary={handleGoLibrary}
            />

            <div className="min-w-0 flex-1 max-w-[720px] space-y-16">
              <div className="pb-5 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2 text-xs font-ui text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {activeBook.title}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeBook.author}</span>
                {activeBook.translator && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{activeBook.translator}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{activeBook.publisherInfo}</span>
              </div>

              {(activeView === 'map' || activeView === 'all') && (
                <ArgumentMapSection
                  dataset={activeBook.dataset}
                  fontScale={fontScale}
                />
              )}

              {(activeView === 'overview' || activeView === 'all') && (
                <OverviewSection
                  key={activeBook.slug}
                  dataset={activeBook.dataset}
                  fontScale={fontScale}
                />
              )}

              {(activeView === 'key20' || activeView === 'all') && (
                <Key20Section
                  key={activeBook.slug}
                  dataset={activeBook.dataset}
                  fontScale={fontScale}
                />
              )}

              <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
                {activeView !== 'all' ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {activeView === 'map' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('overview')}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        继续阅读：洞见概览
                      </button>
                    )}
                    {activeView === 'overview' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('key20')}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        继续阅读：Key20
                      </button>
                    )}
                    {activeView === 'key20' && (
                      <button
                        type="button"
                        onClick={() => handleSelectView('all')}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        切换全篇连读
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    回到顶部
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleGoLibrary}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>返回书库目录</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="border-t border-stone-200 dark:border-stone-800 py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
          {route === 'library' ? (
            <>
              <span>深度领读集</span>
              <span>原著实证 · 问答推演 · 边界对照</span>
            </>
          ) : (
            <>
              <span>
                {activeBook.author} {activeBook.title}
              </span>
              <span>
                {[activeBook.translator, activeBook.publisherInfo]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
