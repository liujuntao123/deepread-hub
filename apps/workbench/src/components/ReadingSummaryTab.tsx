import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Compass, KeyRound, ListOrdered } from 'lucide-react';
import type { BookEntry } from '@content/reading/types';
import { countKeyOrigins } from '@content/reading/filters';

interface ReadingSummaryTabProps {
  book: BookEntry;
}

export const ReadingSummaryTab: React.FC<ReadingSummaryTabProps> = ({ book }) => {
  const { dataset } = book;
  const origins = countKeyOrigins(dataset.keyInsights);

  const [openSection, setOpenSection] = useState<'map' | 'chapters' | 'key20' | null>('map');

  const toggle = (key: 'map' | 'chapters' | 'key20') => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-5">
      {/* Ultimate Thesis Card */}
      <div className="p-5 rounded-md bg-[#F6F2EA] dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400">
            产物 1 · 终极核心命题（公开站底本速查）
          </span>
          <span className="font-index text-xs text-stone-500 dark:text-stone-400">
            {book.readingTimeLabel} · {book.publisherInfo}
          </span>
        </div>
        <p className="font-editorial text-base font-semibold leading-relaxed text-stone-900 dark:text-stone-100">
          {dataset.ultimateThesis.thesis}
        </p>
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          {book.premiseHook}
        </p>
      </div>

      {/* Collapsible Accordion: Argument Map */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-md overflow-hidden bg-white dark:bg-stone-900/50">
        <button
          type="button"
          onClick={() => toggle('map')}
          aria-expanded={openSection === 'map'}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 font-medium text-sm text-stone-900 dark:text-stone-100">
            <Compass className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>论证地图（{dataset.argumentMapSteps.length} 步递进 + 边界对照）</span>
          </span>
          {openSection === 'map' ? (
            <ChevronDown className="w-4 h-4 text-stone-400" aria-hidden="true" />
          ) : (
            <ChevronRight className="w-4 h-4 text-stone-400" aria-hidden="true" />
          )}
        </button>

        {openSection === 'map' && (
          <div className="px-4 pb-4 pt-1 border-t border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/80">
            {dataset.argumentMapSteps.map((step) => (
              <div key={step.id} className="py-3 space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-editorial text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {step.stepNumber} · {step.title}
                  </span>
                  <span className="font-index text-[11px] text-stone-500 dark:text-stone-400">
                    {step.chaptersRange}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.leadJudgment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Accordion: Chapters */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-md overflow-hidden bg-white dark:bg-stone-900/50">
        <button
          type="button"
          onClick={() => toggle('chapters')}
          aria-expanded={openSection === 'chapters'}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 font-medium text-sm text-stone-900 dark:text-stone-100">
            <ListOrdered className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>洞见概览（{dataset.chapters.length} 个章节单元）</span>
          </span>
          {openSection === 'chapters' ? (
            <ChevronDown className="w-4 h-4 text-stone-400" aria-hidden="true" />
          ) : (
            <ChevronRight className="w-4 h-4 text-stone-400" aria-hidden="true" />
          )}
        </button>

        {openSection === 'chapters' && (
          <div className="px-4 pb-4 pt-1 border-t border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/80 max-h-[420px] overflow-y-auto">
            {dataset.chapters.map((ch) => (
              <div key={ch.id} className="py-2.5 flex items-baseline gap-3 text-xs">
                <span className="font-index text-stone-400 shrink-0 w-12">{ch.indexLabel}</span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    {ch.chapterTitle}
                    {ch.extensionOrInference && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                        含{ch.extensionOrInference.kind}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {ch.coreProposition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Accordion: Key20 */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-md overflow-hidden bg-white dark:bg-stone-900/50">
        <button
          type="button"
          onClick={() => toggle('key20')}
          aria-expanded={openSection === 'key20'}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 font-medium text-sm text-stone-900 dark:text-stone-100">
            <KeyRound className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>
              Key20 原典句库（{origins.total} 条 · 原句 {origins.original + origins.chineseOriginal} · 回译 {origins.backTranslation}）
            </span>
          </span>
          {openSection === 'key20' ? (
            <ChevronDown className="w-4 h-4 text-stone-400" aria-hidden="true" />
          ) : (
            <ChevronRight className="w-4 h-4 text-stone-400" aria-hidden="true" />
          )}
        </button>

        {openSection === 'key20' && (
          <div className="px-4 pb-4 pt-1 border-t border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/80 max-h-[420px] overflow-y-auto">
            {dataset.keyInsights.map((item) => (
              <div key={item.id} className="py-2.5 flex items-baseline gap-3 text-xs">
                <span className="font-index text-[#1E3A8A] dark:text-sky-400 shrink-0 w-7">
                  {item.indexLabel}
                </span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-editorial text-sm text-stone-900 dark:text-stone-100">
                    {item.propositionZh}
                  </p>
                  <div className="font-index text-[11px] text-stone-500 dark:text-stone-400">
                    {item.chapterRef}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
