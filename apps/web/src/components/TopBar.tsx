import React from 'react';
import { Moon, Sun, Type } from 'lucide-react';
import type { AppRouteMode, FontScale, ViewMode } from '@content/reading/types';

interface TopBarProps {
  route: AppRouteMode;
  bookTitle?: string;
  activeView: ViewMode;
  onGoLibrary: () => void;
  onSelectView: (view: ViewMode) => void;
  fontScale: FontScale;
  onToggleFontScale: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  progress: number;
}

const READER_NAV_ITEMS: { id: ViewMode; code: string; label: string }[] = [
  { id: 'map', code: '01', label: '论证地图' },
  { id: 'overview', code: '02', label: '洞见概览' },
  { id: 'key20', code: '03', label: 'Key20' },
  { id: 'all', code: 'ALL', label: '全篇连读' },
];

export const TopBar: React.FC<TopBarProps> = ({
  route,
  bookTitle,
  activeView,
  onGoLibrary,
  onSelectView,
  fontScale,
  onToggleFontScale,
  isDark,
  onToggleTheme,
  progress,
}) => {
  const scrollToLibraryAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F4F0] dark:bg-[#0B0B0B] border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-stretch justify-between gap-4">
        <a
          href="?"
          onClick={(e) => {
            e.preventDefault();
            onGoLibrary();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-3 pr-5 border-r border-[#D0D0C8] dark:border-[#2A2A27] whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600]"
        >
          <span
            aria-hidden="true"
            className="w-3.5 h-3.5 bg-[#E10600] dark:bg-[#FF2A1F] shrink-0 transition-transform duration-150 group-hover:scale-110"
          />
          <span className="font-display text-base font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0]">
            深度领读集
          </span>
          <span className="hidden sm:inline font-index text-[10px] font-semibold tracking-[0.16em] uppercase text-[#52524E] dark:text-[#A1A19A]">
            DEEPREAD
          </span>
        </a>

        {route === 'library' ? (
          <nav aria-label="书库导航" className="hidden md:flex items-stretch">
            <button
              type="button"
              onClick={() => scrollToLibraryAnchor('library-catalog')}
              className="px-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0A0A0A] dark:text-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] border-r border-[#D0D0C8] dark:border-[#2A2A27] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              <span className="font-index text-[10px] text-[#E10600] dark:text-[#FF2A1F]">01</span>
              <span>全部书目</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToLibraryAnchor('library-method')}
              className="px-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#52524E] dark:text-[#A1A19A] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] border-r border-[#D0D0C8] dark:border-[#2A2A27] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              <span className="font-index text-[10px]">02</span>
              <span>领读体例</span>
            </button>
          </nav>
        ) : (
          <nav
            aria-label={bookTitle ? `${bookTitle} 章节视图` : '章节视图'}
            className="hidden md:flex items-stretch"
          >
            <button
              type="button"
              onClick={onGoLibrary}
              className="px-4 inline-flex items-center text-xs font-semibold tracking-wider text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0] border-r border-[#D0D0C8] dark:border-[#2A2A27] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              ← 书库
            </button>
            {READER_NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide border-r border-[#D0D0C8] dark:border-[#2A2A27] whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E10600] ${
                    isActive
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A]'
                  }`}
                >
                  <span
                    className={`font-index text-[10px] ${
                      isActive ? 'text-[#FF2A1F] dark:text-[#E10600]' : 'text-[#73736C] dark:text-[#73736C]'
                    }`}
                  >
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-[#E10600] dark:bg-[#FF2A1F]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2 shrink-0 ml-auto">
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
              className="inline-flex items-center gap-1.5 px-2.5 h-8 text-xs font-index font-medium text-[#0A0A0A] dark:text-[#F4F4F0] border border-[#0A0A0A] dark:border-[#44443F] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600]"
            >
              <Type className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{fontScale === 'standard' ? 'A' : 'A+'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold tracking-wider text-[#0A0A0A] dark:text-[#F4F4F0] border border-[#0A0A0A] dark:border-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10600]"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span>白昼</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>暗室</span>
              </>
            )}
          </button>
        </div>
      </div>

      {route === 'reader' && (
        <>
          <nav
            aria-label="移动视图切换"
            className="grid md:hidden grid-cols-5 border-t border-[#D0D0C8] dark:border-[#2A2A27] divide-x divide-[#D0D0C8] dark:divide-[#2A2A27]"
          >
            <button
              type="button"
              onClick={onGoLibrary}
              className="py-2.5 text-[11px] font-semibold text-[#52524E] dark:text-[#A1A19A] text-center cursor-pointer"
            >
              书库
            </button>
            {READER_NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-2.5 text-[11px] font-semibold text-center transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A]'
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
            className="h-[3px] w-full bg-[#D0D0C8] dark:bg-[#2A2A27] overflow-hidden"
          >
            <div
              className="h-full bg-[#E10600] dark:bg-[#FF2A1F] transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </>
      )}
    </header>
  );
};
