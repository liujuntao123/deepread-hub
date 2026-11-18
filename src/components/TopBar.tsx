import React from 'react';
import { Moon, Sun, Type } from 'lucide-react';
import type { AppRouteMode, FontScale, ViewMode } from '../types/reading';

interface TopBarProps {
  route: AppRouteMode;
  bookTitle?: string;
  hasPodcast?: boolean;
  activeView: ViewMode;
  onGoLibrary: () => void;
  onSelectView: (view: ViewMode) => void;
  fontScale: FontScale;
  onToggleFontScale: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  progress: number;
}

const READER_NAV_ITEMS: { id: ViewMode; label: string }[] = [
  { id: 'map', label: '论证地图' },
  { id: 'overview', label: '洞见概览' },
  { id: 'key20', label: 'Key20' },
  { id: 'all', label: '全篇连读' },
  { id: 'podcast', label: '双人播客' },
];

export const TopBar: React.FC<TopBarProps> = ({
  route,
  bookTitle,
  hasPodcast = false,
  activeView,
  onGoLibrary,
  onSelectView,
  fontScale,
  onToggleFontScale,
  isDark,
  onToggleTheme,
  progress,
}) => {
  const visibleReaderNavItems = hasPodcast
    ? READER_NAV_ITEMS
    : READER_NAV_ITEMS.filter((item) => item.id !== 'podcast');
  const scrollToLibraryAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#141311]/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="?"
          onClick={(e) => {
            e.preventDefault();
            onGoLibrary();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          深度领读集
        </a>

        {route === 'library' ? (
          <nav aria-label="书库导航" className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToLibraryAnchor('library-catalog')}
              className="py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              全部书目
            </button>
            <button
              type="button"
              onClick={() => scrollToLibraryAnchor('library-method')}
              className="py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              领读体例
            </button>
          </nav>
        ) : (
          <nav
            aria-label={bookTitle ? `${bookTitle} 章节视图` : '章节视图'}
            className="hidden md:flex items-center gap-6"
          >
            <button
              type="button"
              onClick={onGoLibrary}
              className="py-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 whitespace-nowrap shrink-0 border-b-2 border-transparent transition-colors duration-150 cursor-pointer"
            >
              书库
            </button>
            {visibleReaderNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-2 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                    isActive
                      ? 'border-[#1E3A8A] dark:border-sky-400 text-stone-900 dark:text-stone-100'
                      : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {route === 'reader' && (
            <button
              type="button"
              onClick={onToggleFontScale}
              aria-label={
                fontScale === 'standard'
                  ? '切换正文字号，当前标准'
                  : '切换正文字号，当前放大'
              }
              title={fontScale === 'standard' ? '正文字号：标准（点击放大）' : '正文字号：放大（点击恢复）'}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[34px] text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <Type className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{fontScale === 'standard' ? '标准字' : '大字'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] text-xs font-medium text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span>纸面阅读</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>夜间阅读</span>
              </>
            )}
          </button>
        </div>
      </div>

      {route === 'reader' && (
        <>
          <nav
            aria-label="移动视图切换"
            className="flex md:hidden items-center justify-around border-t border-stone-200 dark:border-stone-800 px-2"
          >
            <button
              type="button"
              onClick={onGoLibrary}
              className="px-2 py-2 text-xs font-medium whitespace-nowrap shrink-0 text-stone-500 dark:text-stone-400 cursor-pointer"
            >
              书库
            </button>
            {visibleReaderNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2 py-2 text-xs font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'border-[#1E3A8A] dark:border-sky-400 text-stone-900 dark:text-stone-100'
                      : 'border-transparent text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div
            role="progressbar"
            aria-label="阅读进度"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-[2px] w-full bg-transparent overflow-hidden"
          >
            <div
              className="h-full bg-[#1E3A8A] dark:bg-sky-400 transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </>
      )}
    </header>
  );
};
