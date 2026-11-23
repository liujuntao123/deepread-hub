import React, { useState } from 'react';
import type { BookReadingDataset, ChapterPart, EpistemicFilter, FontScale } from '@content/reading/types';
import { filterChapters, getChapterPartFilters } from '@content/reading/filters';
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
    fontScale === 'large' ? 'text-[17px] leading-[1.88]' : 'text-[15.5px] leading-[1.82]';

  return (
    <section id="section-overview" aria-labelledby="heading-overview" className="space-y-14">
      {/* Section Masthead */}
      <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] py-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl sm:text-5xl font-black leading-none tabular-nums text-[#E10600] dark:text-[#FF2A1F]">
            02
          </span>
          <h1
            id="heading-overview"
            className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
          >
            洞见概览
          </h1>
        </div>
        <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
          1 THESIS · {chapters.length} CHAPTER UNITS
        </span>
      </div>

      {/* Ultimate Thesis */}
      <article id="overview-thesis" className="scroll-mt-24 space-y-6">
        <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
          00 · ULTIMATE THESIS · 终极核心命题
        </div>
        <QaBlock question={ultimateThesis.question} fontScale={fontScale}>
          <blockquote className="py-6 px-6 my-2 border-y-2 border-[#0A0A0A] dark:border-[#F4F4F0] border-l-4 border-l-[#E10600] dark:border-l-[#FF2A1F] bg-[#FFFFFF] dark:bg-[#141414] font-display text-xl sm:text-[22px] font-bold leading-[1.6] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title">
            {ultimateThesis.thesis}
          </blockquote>
          {ultimateThesis.answerParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </QaBlock>
      </article>

      {/* Chapter Propositions */}
      <article
        id="overview-chapters"
        className="scroll-mt-24 pt-10 border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0] space-y-8"
      >
        <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
          CHAPTER MATRIX · 章节核心命题
        </div>

        <QaBlock
          question={overviewIntroQa.question}
          paragraphs={[overviewIntroQa.answerLead]}
          fontScale={fontScale}
        />

        {/* Swiss Filter Matrix */}
        <div className="border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] divide-y divide-[#0A0A0A] dark:divide-[#44443F]">
          <div
            role="group"
            aria-label="按篇幅筛选"
            className="flex flex-wrap items-stretch divide-x divide-[#D0D0C8] dark:divide-[#2A2A27]"
          >
            {partFilters.map((item) => {
              const active = partFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPartFilter(item.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 bg-[#F4F4F0] dark:bg-[#101010]">
            <div role="group" aria-label="按论证来源筛选" className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEpistemicFilter('all')}
                aria-pressed={epistemicFilter === 'all'}
                className={`px-3 py-1 text-xs font-semibold border transition-colors cursor-pointer ${
                  epistemicFilter === 'all'
                    ? 'bg-[#0A0A0A] text-[#F4F4F0] border-[#0A0A0A] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:border-[#F4F4F0]'
                    : 'bg-[#FFFFFF] dark:bg-[#141414] text-[#52524E] dark:text-[#A1A19A] border-[#D0D0C8] dark:border-[#2A2A27] hover:border-[#0A0A0A] dark:hover:border-[#F4F4F0]'
                }`}
              >
                全部标注
              </button>
              <button
                type="button"
                onClick={() => setEpistemicFilter('inference')}
                aria-pressed={epistemicFilter === 'inference'}
                className={`px-3 py-1 text-xs font-semibold border transition-colors cursor-pointer ${
                  epistemicFilter === 'inference'
                    ? 'bg-[#E10600] text-[#FFFFFF] border-[#E10600] dark:bg-[#FF2A1F] dark:border-[#FF2A1F]'
                    : 'bg-[#FFFFFF] dark:bg-[#141414] text-[#52524E] dark:text-[#A1A19A] border-[#D0D0C8] dark:border-[#2A2A27] hover:border-[#E10600] dark:hover:border-[#FF2A1F]'
                }`}
              >
                仅看含引申与推断
              </button>
            </div>

            <span className="font-index text-xs font-semibold text-[#52524E] dark:text-[#A1A19A]">
              SHOW {String(visibleChapters.length).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Chapter Catalogue Rows */}
        <div className="divide-y-2 divide-[#0A0A0A] dark:divide-[#44443F] border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0]">
          {visibleChapters.map((chapter) => (
            <div
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-24 py-8 grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-4 sm:gap-6"
            >
              {/* Left Index Column */}
              <div className="flex sm:flex-col items-baseline sm:items-start gap-2.5">
                <span className="font-display text-2xl sm:text-3xl font-black tabular-nums leading-none text-[#0A0A0A] dark:text-[#F4F4F0]">
                  {chapter.indexLabel}
                </span>
                <span className="font-index text-[11px] text-[#52524E] dark:text-[#A1A19A] leading-snug">
                  {chapter.partLabel}
                </span>
                {chapter.extensionOrInference && (
                  <span className="px-1.5 py-0.5 bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF] font-index text-[10px] font-bold">
                    含{chapter.extensionOrInference.kind}
                  </span>
                )}
              </div>

              {/* Right Content Column */}
              <div className="space-y-4 min-w-0">
                <h3 className="font-display text-xl font-black text-[#0A0A0A] dark:text-[#F4F4F0]">
                  {chapter.chapterTitle}
                </h3>

                <p className="font-display text-[17.5px] font-bold leading-[1.62] text-[#0A0A0A] dark:text-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] border-l-4 border-[#0A0A0A] dark:border-[#F4F4F0] px-4 py-3">
                  {chapter.coreProposition}
                </p>

                <p className={`font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${proseSizeClass}`}>
                  {chapter.narrative}
                </p>

                {chapter.extensionOrInference && (
                  <div
                    className={`bg-[#EAEAE4] dark:bg-[#1C1C1A] border-l-4 border-[#E10600] dark:border-[#FF2A1F] px-4 py-3.5 font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${proseSizeClass}`}
                  >
                    <span className="inline-block px-1.5 py-0.5 mr-2.5 bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF] font-index text-[11px] font-bold align-baseline">
                      {chapter.extensionOrInference.kind}
                    </span>
                    <span>{chapter.extensionOrInference.text}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};
