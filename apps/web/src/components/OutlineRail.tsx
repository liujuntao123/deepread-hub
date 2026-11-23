import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import type { BookCatalogMeta, BookReadingDataset, ViewMode } from '@content/reading/types';
import { getOutlineAnchorsForView } from '@content/reading/filters';

interface OutlineRailProps {
  books: BookCatalogMeta[];
  activeBookSlug: string;
  bookTitle: string;
  catalogNumber: string;
  dataset: BookReadingDataset;
  activeView: ViewMode;
  activeAnchorId: string | null;
  progress: number;
  onGoLibrary: () => void;
  onSelectBook: (slug: string) => void;
}

export const OutlineRail: React.FC<OutlineRailProps> = ({
  books,
  activeBookSlug,
  bookTitle,
  catalogNumber,
  dataset,
  activeView,
  activeAnchorId,
  progress,
  onGoLibrary,
  onSelectBook,
}) => {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const anchors = getOutlineAnchorsForView(activeView, dataset);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="阅读路标"
      className="hidden lg:block w-64 shrink-0 lg:sticky lg:top-20 lg:self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-5 border-r border-[#D0D0C8] dark:border-[#2A2A27]"
    >
      <div className="space-y-6">
        {/* Book Header + Inline 6-Book Switcher */}
        <div className="pb-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onGoLibrary}
              className="inline-flex items-center gap-1.5 swiss-kicker text-[#52524E] dark:text-[#A1A19A] hover:text-[#E10600] dark:hover:text-[#FF2A1F] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>返回书库</span>
            </button>
            <span className="font-index text-[11px] font-semibold text-[#E10600] dark:text-[#FF2A1F]">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSwitcherOpen((prev) => !prev)}
            aria-expanded={switcherOpen}
            className="w-full flex items-center justify-between gap-2 py-1.5 px-2 -mx-2 hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] transition-colors cursor-pointer text-left"
            title="点击快速切换其他书目"
          >
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-index text-xs font-bold text-[#E10600] dark:text-[#FF2A1F] shrink-0">
                {catalogNumber}
              </span>
              <span className="font-display text-base font-extrabold text-[#0A0A0A] dark:text-[#F4F4F0] truncate">
                {bookTitle}
              </span>
            </div>
            {switcherOpen ? (
              <ChevronUp className="w-4 h-4 text-[#52524E] dark:text-[#A1A19A] shrink-0" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#52524E] dark:text-[#A1A19A] shrink-0" aria-hidden="true" />
            )}
          </button>

          {switcherOpen && (
            <div className="border border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414] divide-y divide-[#D0D0C8] dark:divide-[#2A2A27]">
              {books.map((b, idx) => {
                const isCurrent = b.slug === activeBookSlug;
                return (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => {
                      setSwitcherOpen(false);
                      if (!isCurrent) onSelectBook(b.slug);
                    }}
                    className={`w-full px-2.5 py-2 text-left flex items-baseline gap-2 text-xs transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] font-bold'
                        : 'text-[#2A2A27] dark:text-[#D4D4D0] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A]'
                    }`}
                  >
                    <span
                      className={`font-index text-[10px] shrink-0 ${
                        isCurrent ? 'text-[#FF2A1F] dark:text-[#E10600]' : 'text-[#73736C]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{b.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Slim Reading Progress Bar */}
          <div className="h-[2px] w-full bg-[#D0D0C8] dark:bg-[#2A2A27] overflow-hidden">
            <div
              className="h-full bg-[#E10600] dark:bg-[#FF2A1F] transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>

        {/* Page Coordinate Anchors */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
              INDEX · 本页坐标
            </h2>
            <span className="font-index text-[10px] text-[#73736C]">
              1–4 切视图
            </span>
          </div>
          <ol className="divide-y divide-[#D0D0C8]/70 dark:divide-[#2A2A27]">
            {anchors.map((anchor) => {
              const isActive = activeAnchorId === anchor.id;
              return (
                <li key={anchor.id}>
                  <button
                    type="button"
                    onClick={() => handleJump(anchor.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`w-full text-left flex items-baseline gap-3 py-2.5 pl-3 pr-2 border-l-[3px] text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600] ${
                      isActive
                        ? 'border-[#E10600] dark:border-[#FF2A1F] bg-[#FFFFFF] dark:bg-[#141414] text-[#0A0A0A] dark:text-[#F4F4F0] font-bold'
                        : 'border-transparent text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0] hover:border-[#0A0A0A] dark:hover:border-[#F4F4F0]'
                    }`}
                  >
                    <span
                      className={`font-index text-[11px] shrink-0 w-10 ${
                        isActive
                          ? 'text-[#E10600] dark:text-[#FF2A1F] font-semibold'
                          : 'text-[#73736C] dark:text-[#73736C]'
                      }`}
                    >
                      {anchor.index}
                    </span>
                    <span className="truncate">{anchor.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </aside>
  );
};
