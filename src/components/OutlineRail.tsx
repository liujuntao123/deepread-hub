import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { BookReadingDataset, ViewMode } from '../types/reading';
import { getOutlineAnchorsForView } from '../utils/readingFilters';

interface OutlineRailProps {
  bookTitle: string;
  bookSlug?: string;
  dataset: BookReadingDataset;
  activeView: ViewMode;
  activeAnchorId: string | null;
  onGoLibrary: () => void;
}

export const OutlineRail: React.FC<OutlineRailProps> = ({
  bookTitle,
  bookSlug,
  dataset,
  activeView,
  activeAnchorId,
  onGoLibrary,
}) => {
  const anchors = getOutlineAnchorsForView(activeView, dataset, bookSlug);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="阅读路标"
      className="hidden lg:block w-56 shrink-0 lg:sticky lg:top-20 lg:self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1"
    >
      <div className="space-y-6">
        <div className="pb-4 border-b border-stone-200 dark:border-stone-800 space-y-2.5">
          <button
            type="button"
            onClick={onGoLibrary}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-[#1E3A8A] dark:hover:text-sky-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>返回书库</span>
          </button>
          <p className="font-editorial text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
            {bookTitle}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wider text-stone-500 dark:text-stone-400 pb-2.5">
            本页目录
          </h2>
          <ol className="space-y-1">
            {anchors.map((anchor) => {
              const isActive = activeAnchorId === anchor.id;
              return (
                <li key={anchor.id}>
                  <button
                    type="button"
                    onClick={() => handleJump(anchor.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`w-full text-left flex items-baseline gap-2.5 py-1.5 px-2.5 -mx-2.5 rounded-md text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                      isActive
                        ? 'bg-[#EFEAE0] dark:bg-stone-800/90 text-[#1E3A8A] dark:text-sky-400 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <span
                      className={`font-index text-xs shrink-0 w-9 ${
                        isActive
                          ? 'text-[#1E3A8A] dark:text-sky-400'
                          : 'text-stone-400 dark:text-stone-500'
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
