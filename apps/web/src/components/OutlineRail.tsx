import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { BookReadingDataset, ViewMode } from '@content/reading/types';
import { getOutlineAnchorsForView } from '@content/reading/filters';

interface OutlineRailProps {
  bookTitle: string;
  catalogNumber: string;
  dataset: BookReadingDataset;
  activeView: ViewMode;
  activeAnchorId: string | null;
  onGoLibrary: () => void;
}

export const OutlineRail: React.FC<OutlineRailProps> = ({
  bookTitle,
  catalogNumber,
  dataset,
  activeView,
  activeAnchorId,
  onGoLibrary,
}) => {
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
        <div className="pb-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] space-y-3">
          <button
            type="button"
            onClick={onGoLibrary}
            className="inline-flex items-center gap-1.5 swiss-kicker text-[#52524E] dark:text-[#A1A19A] hover:text-[#E10600] dark:hover:text-[#FF2A1F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ARCHIVE · 返回书库</span>
          </button>
          <div className="flex items-baseline gap-2.5">
            <span className="font-index text-xs font-bold text-[#E10600] dark:text-[#FF2A1F]">
              {catalogNumber}
            </span>
            <p className="font-display text-base font-extrabold text-[#0A0A0A] dark:text-[#F4F4F0] truncate">
              {bookTitle}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <h2 className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
            INDEX · 本页坐标
          </h2>
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
