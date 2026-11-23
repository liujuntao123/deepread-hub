import React, { useState } from 'react';
import { Check, Copy, RotateCcw, Search, X } from 'lucide-react';
import type { BookReadingDataset, FontScale, KeyGroupId, QuoteOrigin } from '@content/reading/types';
import { countKeyOrigins, filterKeyInsights } from '@content/reading/filters';
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
    fontScale === 'large' ? 'text-[17px] leading-[1.88]' : 'text-[15.5px] leading-[1.82]';

  return (
    <section id="section-key20" aria-labelledby="heading-key20" className="space-y-12">
      {/* Section Masthead */}
      <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] py-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl sm:text-5xl font-black leading-none tabular-nums text-[#E10600] dark:text-[#FF2A1F]">
            03
          </span>
          <h1
            id="heading-key20"
            className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
          >
            KEY 20 原典句库
          </h1>
        </div>
        <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
          SHOW {String(filteredItems.length).padStart(2, '0')} / {String(originCounts.total).padStart(2, '0')}
        </span>
      </div>

      {/* Swiss Filter Control Box */}
      <div className="border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] divide-y divide-[#0A0A0A] dark:divide-[#44443F]">
        <div className="flex flex-col sm:flex-row sm:items-stretch justify-between">
          <div className="relative flex-1 flex items-center border-b sm:border-b-0 sm:border-r border-[#0A0A0A] dark:border-[#44443F]">
            <label htmlFor="key20-search" className="sr-only">
              检索命题或案例
            </label>
            <Search
              className="w-4 h-4 text-[#52524E] dark:text-[#A1A19A] absolute left-3.5 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="key20-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="检索原句、人物或案例..."
              className="w-full pl-10 pr-9 py-3 text-sm bg-transparent text-[#0A0A0A] dark:text-[#F4F4F0] placeholder:text-[#73736C] focus:outline-none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="清空检索"
                className="absolute right-2.5 p-1 text-[#52524E] hover:text-[#E10600] dark:text-[#A1A19A] dark:hover:text-[#FF2A1F] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {hasMixedTranslatedOrigins && (
            <div
              role="group"
              aria-label="按出处对照筛选"
              className="flex items-stretch divide-x divide-[#D0D0C8] dark:divide-[#2A2A27]"
            >
              {(
                [
                  { id: 'all', label: `全部 (${originCounts.total})` },
                  { id: 'original', label: `原书原句 (${originCounts.original})` },
                  { id: 'back-translation', label: `英文回译 (${originCounts.backTranslation})` },
                ] as const
              ).map((tab) => {
                const active = originFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setOriginFilter(tab.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                        : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          role="group"
          aria-label="按主题分组筛选"
          className="flex flex-wrap items-stretch divide-x divide-[#D0D0C8] dark:divide-[#2A2A27] bg-[#F4F4F0] dark:bg-[#101010]"
        >
          <button
            type="button"
            onClick={() => setGroupFilter('all')}
            aria-pressed={groupFilter === 'all'}
            className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              groupFilter === 'all'
                ? 'bg-[#E10600] text-[#FFFFFF] dark:bg-[#FF2A1F]'
                : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
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
                className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#E10600] text-[#FFFFFF] dark:bg-[#FF2A1F]'
                    : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                }`}
              >
                {groupLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Key20 Groups & Specimens */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center space-y-4 border-2 border-dashed border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]">
          <p className="font-display text-lg font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
            未找到匹配的原句或案例
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>重置筛选</span>
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {keyGroups.map((group) => {
            const groupItems = filteredItems.filter((item) => item.groupId === group.id);
            if (groupItems.length === 0) {
              return null;
            }

            return (
              <div
                key={group.id}
                id={`key-group-${group.id}`}
                className="scroll-mt-24 space-y-8"
              >
                <div className="space-y-5">
                  <div className="px-4 py-2.5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold">{group.title}</span>
                    <span className="font-index text-xs font-bold text-[#FF2A1F] dark:text-[#E10600]">
                      {group.rangeLabel}
                    </span>
                  </div>

                  <QaBlock
                    question={group.question}
                    paragraphs={[group.answerLead]}
                    fontScale={fontScale}
                  />
                </div>

                <div className="divide-y-2 divide-[#0A0A0A] dark:divide-[#44443F] border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0]">
                  {groupItems.map((item) => {
                    const isCopied = copiedId === item.id;
                    const isDirectOriginal =
                      item.quoteOrigin === 'original' || item.quoteOrigin === 'chinese-original';
                    const originLabel =
                      item.quoteOrigin === 'chinese-original'
                        ? '原著原句'
                        : item.quoteOrigin === 'original'
                          ? '原书原句'
                          : '译本原句 · 英文回译';

                    return (
                      <article
                        key={item.id}
                        className="py-7 grid grid-cols-1 sm:grid-cols-[4.5rem_1fr] gap-4 sm:gap-6"
                      >
                        <div className="flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-2">
                          <span className="font-display text-3xl sm:text-4xl font-black tabular-nums leading-none text-[#0A0A0A] dark:text-[#F4F4F0]">
                            {item.indexLabel}
                          </span>
                          <span className="font-index text-[11px] text-[#52524E] dark:text-[#A1A19A]">
                            {item.chapterRef}
                          </span>
                        </div>

                        <div className="space-y-4 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span
                              className={`px-2 py-0.5 font-index text-[11px] font-bold ${
                                isDirectOriginal
                                  ? 'bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF]'
                                  : 'bg-[#EAEAE4] dark:bg-[#1C1C1A] text-[#0A0A0A] dark:text-[#F4F4F0] border border-[#0A0A0A] dark:border-[#44443F]'
                              }`}
                            >
                              {originLabel}
                            </span>

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
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] border border-[#0A0A0A] dark:border-[#44443F] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <Check
                                    className="w-3.5 h-3.5 text-[#E10600] dark:text-[#FF2A1F]"
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

                          <div
                            className={`bg-[#FFFFFF] dark:bg-[#141414] border-l-4 px-5 py-4 space-y-2.5 ${
                              isDirectOriginal
                                ? 'border-[#E10600] dark:border-[#FF2A1F]'
                                : 'border-[#0A0A0A] dark:border-[#F4F4F0]'
                            }`}
                          >
                            <p className="font-display text-[18px] sm:text-[19px] font-bold leading-[1.62] text-[#0A0A0A] dark:text-[#F4F4F0]">
                              “{item.propositionZh}”
                            </p>
                            {item.propositionEn && (
                              <p className="font-index text-xs sm:text-[13px] leading-relaxed text-[#52524E] dark:text-[#A1A19A]">
                                {item.propositionEn}
                              </p>
                            )}
                            {item.conceptNote && (
                              <p className="font-index text-xs font-medium text-[#E10600] dark:text-[#FF2A1F] pt-0.5">
                                {item.conceptNote}
                              </p>
                            )}
                          </div>

                          <p className={`font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${bodySizeClass}`}>
                            {item.analysis}
                          </p>
                        </div>
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
