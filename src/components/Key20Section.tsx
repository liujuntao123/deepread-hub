import React, { useState } from 'react';
import { Check, Copy, RotateCcw, Search, X } from 'lucide-react';
import type { BookReadingDataset, FontScale, KeyGroupId, QuoteOrigin } from '../types/reading';
import { countKeyOrigins, filterKeyInsights } from '../utils/readingFilters';
import { QaBlock } from './QaBlock';

interface Key20SectionProps {
  dataset: BookReadingDataset;
  fontScale: FontScale;
}

export const Key20Section: React.FC<Key20SectionProps> = ({
  dataset,
  fontScale,
}) => {
  const { keyGroups, keyInsights } = dataset;
  const [query, setQuery] = useState('');
  const [originFilter, setOriginFilter] = useState<'all' | QuoteOrigin>('all');
  const [groupFilter, setGroupFilter] = useState<'all' | KeyGroupId>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const originCounts = countKeyOrigins(keyInsights);
  const hasMixedTranslatedOrigins =
    originCounts.original > 0 && originCounts.backTranslation > 0;

  const filteredItems = filterKeyInsights(keyInsights, {
    query,
    origin: originFilter,
    group: groupFilter,
  });

  const handleCopy = async (
    id: number,
    zh: string,
    en?: string,
    conceptNote?: string
  ) => {
    const text = [zh, en, conceptNote].filter(Boolean).join('\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Clipboard API may be unavailable in restricted contexts; visual confirmation still updates cleanly.
    }
    setCopiedId(id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 1800);
  };

  const resetFilters = () => {
    setQuery('');
    setOriginFilter('all');
    setGroupFilter('all');
  };

  const bodySizeClass =
    fontScale === 'large' ? 'text-[17px] leading-[1.85]' : 'text-[15.5px] leading-[1.8]';

  return (
    <section id="section-key20" aria-labelledby="heading-key20" className="space-y-10">
      <div className="pb-4 border-b border-stone-300 dark:border-stone-700 flex flex-wrap items-baseline justify-between gap-4">
        <h1
          id="heading-key20"
          className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance-title"
        >
          Key20
        </h1>
        <span className="font-ui tabular-nums text-xs text-stone-500 dark:text-stone-400">
          显示 {filteredItems.length} / {originCounts.total} 条
        </span>
      </div>

      <div className="space-y-3 py-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <label htmlFor="key20-search" className="sr-only">
              检索命题或案例
            </label>
            <Search
              className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="key20-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="检索命题、人物或案例"
              className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:border-[#1E3A8A] dark:focus:border-sky-400"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="清空检索"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {hasMixedTranslatedOrigins && (
            <div
              role="group"
              aria-label="按出处对照筛选"
              className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800 self-start"
            >
              <button
                type="button"
                onClick={() => setOriginFilter('all')}
                aria-pressed={originFilter === 'all'}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  originFilter === 'all'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                全部 ({originCounts.total})
              </button>
              <button
                type="button"
                onClick={() => setOriginFilter('original')}
                aria-pressed={originFilter === 'original'}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  originFilter === 'original'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                原书原句 ({originCounts.original})
              </button>
              <button
                type="button"
                onClick={() => setOriginFilter('back-translation')}
                aria-pressed={originFilter === 'back-translation'}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  originFilter === 'back-translation'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                英文回译 ({originCounts.backTranslation})
              </button>
            </div>
          )}
        </div>

        <div
          role="group"
          aria-label="按主题分组筛选"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap"
        >
          <button
            type="button"
            onClick={() => setGroupFilter('all')}
            aria-pressed={groupFilter === 'all'}
            className={`px-2.5 py-1.5 text-xs font-medium rounded border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              groupFilter === 'all'
                ? 'border-[#1E3A8A] dark:border-sky-400 text-[#1E3A8A] dark:text-sky-400 bg-white dark:bg-stone-900'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            全部分组
          </button>
          {keyGroups.map((group) => {
            const active = groupFilter === group.id;
            const groupLabel = group.shortLabel ?? `${group.rangeLabel} ${group.title}`;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setGroupFilter(group.id)}
                aria-pressed={active}
                className={`px-2.5 py-1.5 text-xs font-medium rounded border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'border-[#1E3A8A] dark:border-sky-400 text-[#1E3A8A] dark:text-sky-400 bg-white dark:bg-stone-900'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {groupLabel}
              </button>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-16 text-center space-y-4 border border-dashed border-stone-300 dark:border-stone-700 rounded-md">
          <p className="font-editorial text-lg text-stone-700 dark:text-stone-300">
            未找到匹配的命题或案例
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>重置筛选</span>
          </button>
        </div>
      ) : (
        <div className="space-y-14">
          {keyGroups.map((group) => {
            const groupItems = filteredItems.filter((item) => item.groupId === group.id);
            if (groupItems.length === 0) {
              return null;
            }

            return (
              <div
                key={group.id}
                id={`key-group-${group.id}`}
                className="scroll-mt-24 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-ui text-stone-500 dark:text-stone-400">
                    <span className="font-index font-semibold text-[#1E3A8A] dark:text-sky-400">
                      {group.rangeLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      {group.title}
                    </span>
                  </div>

                  <QaBlock
                    question={group.question}
                    paragraphs={[group.answerLead]}
                    fontScale={fontScale}
                  />
                </div>

                <div className="divide-y divide-stone-200 dark:divide-stone-800 border-t border-stone-200 dark:border-stone-800">
                  {groupItems.map((item) => {
                    const isCopied = copiedId === item.id;
                    const isDirectOriginal =
                      item.quoteOrigin === 'original' || item.quoteOrigin === 'chinese-original';
                    const originLabel =
                      item.quoteOrigin === 'original' || item.quoteOrigin === 'chinese-original'
                        ? '原书原句'
                        : '英文回译';

                    return (
                      <article key={item.id} className="py-7 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-ui">
                            <span className="font-index font-semibold text-stone-900 dark:text-stone-100">
                              {item.indexLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{item.chapterRef}</span>
                            <span aria-hidden="true">·</span>
                            <span
                              className={
                                isDirectOriginal
                                  ? 'text-[#1E3A8A] dark:text-sky-400 font-medium'
                                  : undefined
                              }
                            >
                              {originLabel}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                item.id,
                                item.propositionZh,
                                item.propositionEn,
                                item.conceptNote
                              )
                            }
                            aria-label={`复制命题 ${item.indexLabel}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check
                                  className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400"
                                  aria-hidden="true"
                                />
                                <span>已复制</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>复制</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="bg-[#F6F2EA]/75 dark:bg-stone-900/60 rounded-md px-5 py-4 space-y-2">
                          <p className="font-editorial text-[18px] sm:text-[19px] font-semibold leading-[1.65] text-stone-950 dark:text-stone-50">
                            {item.propositionZh}
                          </p>
                          {item.propositionEn && (
                            <p className="font-editorial italic text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                              {item.propositionEn}
                            </p>
                          )}
                          {item.conceptNote && (
                            <p className="font-ui text-xs text-stone-500 dark:text-stone-400 pt-0.5">
                              {item.conceptNote}
                            </p>
                          )}
                        </div>

                        <p className={`font-editorial text-stone-700 dark:text-stone-300 ${bodySizeClass}`}>
                          {item.analysis}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
