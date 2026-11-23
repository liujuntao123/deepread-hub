import React from 'react';
import { ArrowRight, CornerDownRight } from 'lucide-react';
import type { BookReadingDataset, FontScale } from '@content/reading/types';
import { QaBlock } from './QaBlock';

interface ArgumentMapSectionProps {
  dataset: BookReadingDataset;
  fontScale: FontScale;
}

export const ArgumentMapSection: React.FC<ArgumentMapSectionProps> = ({
  dataset,
  fontScale,
}) => {
  const { argumentMapSteps, boundaryComparison, ultimateThesis } = dataset;

  const jumpToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const detailSizeClass =
    fontScale === 'large' ? 'text-[16px] leading-[1.86]' : 'text-[14.5px] leading-[1.82]';

  return (
    <section id="section-map" aria-labelledby="heading-map" className="space-y-12">
      {/* Section Masthead */}
      <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] py-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl sm:text-5xl font-black leading-none tabular-nums text-[#E10600] dark:text-[#FF2A1F]">
            01
          </span>
          <h1
            id="heading-map"
            className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
          >
            论证地图
          </h1>
        </div>
        <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
          {argumentMapSteps.length} STEPS · BOUNDARY MATRIX
        </span>
      </div>

      {/* Destination & Route Coordinate Box */}
      <div className="bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#0A0A0A] dark:border-[#F4F4F0]">
        <div className="px-6 py-3 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex flex-wrap items-center justify-between gap-2">
          <span className="swiss-kicker">DESTINATION &amp; ROUTE · 目的地与推演图例</span>
          <span className="font-index text-xs font-semibold">
            {argumentMapSteps.length} 段递进路径
          </span>
        </div>

        <div className="p-6 space-y-6">
          <p className="font-editorial text-base sm:text-[17px] font-semibold leading-[1.78] text-[#0A0A0A] dark:text-[#F4F4F0] border-l-4 border-[#E10600] dark:border-[#FF2A1F] pl-4">
            {ultimateThesis.thesis}
          </p>

          <div className="pt-4 border-t border-[#D0D0C8] dark:border-[#2A2A27] flex flex-wrap items-center gap-2">
            {argumentMapSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => jumpToStep(step.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] bg-[#F4F4F0] dark:bg-[#0B0B0B] border border-[#0A0A0A] dark:border-[#44443F] hover:bg-[#E10600] hover:border-[#E10600] hover:text-[#FFFFFF] dark:hover:bg-[#FF2A1F] dark:hover:border-[#FF2A1F] dark:hover:text-[#FFFFFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span className="font-index mr-1.5 opacity-65">
                    {String(index).padStart(2, '0')}
                  </span>
                  <span>{step.shortLabel ?? step.stepNumber}</span>
                </button>
                {index < argumentMapSteps.length - 1 && (
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#52524E] dark:text-[#A1A19A] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Progressive Argument Steps */}
      <div className="space-y-14">
        {argumentMapSteps.map((step, index) => (
          <article
            key={step.id}
            id={step.id}
            className="scroll-mt-24 pt-10 first:pt-2 border-t-2 first:border-t-0 border-[#0A0A0A] dark:border-[#44443F] space-y-6"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 font-index text-xs">
                <span className="px-2 py-0.5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] font-bold">
                  {String(index).padStart(2, '0')} · {step.stepNumber}
                </span>
                <span className="text-[#52524E] dark:text-[#A1A19A]">{step.chaptersRange}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-[28px] font-black leading-[1.22] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title">
                {step.title}
              </h2>
            </div>

            <QaBlock
              question={step.question}
              leadJudgment={step.leadJudgment}
              paragraphs={step.paragraphs}
              fontScale={fontScale}
            />

            <div className="bg-[#EAEAE4] dark:bg-[#1C1C1A] border-l-4 border-[#E10600] dark:border-[#FF2A1F] px-4 py-3.5 flex items-start gap-3 text-sm leading-relaxed text-[#2A2A27] dark:text-[#D4D4D0]">
              <CornerDownRight
                className="w-4 h-4 text-[#E10600] dark:text-[#FF2A1F] shrink-0 mt-1"
                aria-hidden="true"
              />
              <p>{step.transitionNote}</p>
            </div>
          </article>
        ))}

        {/* Boundary Consciousness Two-Column Architectural Matrix */}
        <article
          id={boundaryComparison.id}
          className="scroll-mt-24 pt-10 border-t-4 border-[#0A0A0A] dark:border-[#F4F4F0] space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2 py-0.5 bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF] font-index text-xs font-bold">
              界 · BOUNDARY
            </span>
            <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
              作者的方法与当代回看
            </span>
          </div>

          <QaBlock
            question={boundaryComparison.question}
            leadJudgment={boundaryComparison.leadJudgment}
            fontScale={fontScale}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-[#0A0A0A] dark:border-[#F4F4F0] divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0A0A0A] dark:divide-[#F4F4F0] mt-2">
              <div className="bg-[#FFFFFF] dark:bg-[#141414] flex flex-col">
                <div className="px-5 py-3 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold">作者的方法能推出什么</h3>
                  <span className="font-index text-xs font-bold text-[#FF2A1F] dark:text-[#E10600]">
                    + VALID
                  </span>
                </div>
                <div
                  className={`p-5 space-y-4 font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${detailSizeClass}`}
                >
                  {boundaryComparison.authorMethodParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="bg-[#EAEAE4] dark:bg-[#1C1C1A] flex flex-col">
                <div className="px-5 py-3 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
                    回看时不能保证什么
                  </h3>
                  <span className="font-index text-xs font-bold text-[#E10600] dark:text-[#FF2A1F]">
                    — LIMIT
                  </span>
                </div>
                <div
                  className={`p-5 space-y-4 font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${detailSizeClass}`}
                >
                  {boundaryComparison.readerLookbackParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </QaBlock>
        </article>
      </div>
    </section>
  );
};
