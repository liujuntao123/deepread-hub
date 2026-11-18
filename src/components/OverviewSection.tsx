import React, { useState } from 'react';
import type { BookReadingDataset, ChapterPart, EpistemicFilter, FontScale } from '../types/reading';
import { filterChapters, getChapterPartFilters } from '../utils/readingFilters';
import { QaBlock } from './QaBlock';

interface OverviewSectionProps {
  dataset: BookReadingDataset;
  fontScale: FontScale;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  dataset,
  fontScale,
}) => {
  const { chapters, overviewIntroQa, ultimateThesis } = dataset;
  const [partFilter, setPartFilter] = useState<'all' | ChapterPart>('all');
  const [epistemicFilter, setEpistemicFilter] = useState<EpistemicFilter>('all');

  const partFilters = getChapterPartFilters(chapters);
  const visibleChapters = filterChapters(chapters, {
    part: partFilter,
    epistemic: epistemicFilter,
  });

  const proseSizeClass =
    fontScale === 'large' ? 'text-[17px] leading-[1.85]' : 'text-[15.5px] leading-[1.8]';

  return (
    <section id="section-overview" aria-labelledby="heading-overview" className="space-y-14">
      <div className="pb-4 border-b border-stone-300 dark:border-stone-700 flex items-baseline justify-between gap-4">
        <h1
          id="heading-overview"
          className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance-title"
        >
          洞见概览
        </h1>
        <span className="font-ui tabular-nums text-xs text-stone-500 dark:text-stone-400 shrink-0">
          1 句总领 · {chapters.length} 个章节单元
        </span>
      </div>

      <article id="overview-thesis" className="scroll-mt-24 space-y-6">
        <h2 className="text-sm font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400">
          终极核心命题
        </h2>
        <QaBlock question={ultimateThesis.question} fontScale={fontScale}>
          <blockquote className="py-6 px-5 my-2 border-y-2 border-stone-300 dark:border-stone-700 bg-[#F4F0E8]/60 dark:bg-stone-900/50 font-editorial text-xl sm:text-[23px] font-semibold leading-[1.65] text-stone-950 dark:text-stone-50 text-balance-title">
            {ultimateThesis.thesis}
          </blockquote>
          {ultimateThesis.answerParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </QaBlock>
      </article>

      <article
        id="overview-chapters"
        className="scroll-mt-24 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-8"
      >
        <h2 className="text-sm font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400">
          章节核心命题
        </h2>

        <QaBlock
          question={overviewIntroQa.question}
          paragraphs={[overviewIntroQa.answerLead]}
          fontScale={fontScale}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="按篇幅筛选"
              className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800"
            >
              {partFilters.map((item) => {
                const active = partFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPartFilter(item.id)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="按论证来源筛选"
              className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800"
            >
              <button
                type="button"
                onClick={() => setEpistemicFilter('all')}
                aria-pressed={epistemicFilter === 'all'}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  epistemicFilter === 'all'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                全部标注
              </button>
              <button
                type="button"
                onClick={() => setEpistemicFilter('inference')}
                aria-pressed={epistemicFilter === 'inference'}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  epistemicFilter === 'inference'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                含引申与推断
              </button>
            </div>
          </div>

          <span className="font-index text-xs text-stone-500 dark:text-stone-400">
            显示 {visibleChapters.length} / {chapters.length} 章
          </span>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {visibleChapters.map((chapter) => (
            <div
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-24 py-8 first:pt-2 space-y-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100">
                  {chapter.chapterTitle}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-ui">
                  <span className="font-index">{chapter.indexLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{chapter.partLabel}</span>
                  {chapter.extensionOrInference && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#1E3A8A] dark:text-sky-400 font-medium">
                        含{chapter.extensionOrInference.kind}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="font-editorial text-[18px] font-semibold leading-[1.65] text-stone-950 dark:text-stone-50">
                {chapter.coreProposition}
              </p>

              <p className={`font-editorial text-stone-700 dark:text-stone-300 ${proseSizeClass}`}>
                {chapter.narrative}
              </p>

              {chapter.extensionOrInference && (
                <div
                  className={`bg-[#F3EFE6]/85 dark:bg-stone-900/75 border border-stone-200/80 dark:border-stone-800 rounded-md px-4 py-3 font-editorial text-stone-700 dark:text-stone-300 ${proseSizeClass}`}
                >
                  <span className="font-ui text-xs font-semibold text-[#1E3A8A] dark:text-sky-400 mr-2.5">
                    {chapter.extensionOrInference.kind}
                  </span>
                  <span>{chapter.extensionOrInference.text}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};
