import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  FoldVertical,
  UnfoldVertical,
} from 'lucide-react';
import type { BookReadingDataset, FontScale } from '@content/reading/types';
import { QaBlock } from './QaBlock';

interface ArgumentMapSectionProps {
  dataset: BookReadingDataset;
  fontScale: FontScale;
  activeAnchorId?: string | null;
}

export const ArgumentMapSection: React.FC<ArgumentMapSectionProps> = ({
  dataset,
  fontScale,
  activeAnchorId,
}) => {
  const { argumentMapSteps, boundaryComparison, ultimateThesis } = dataset;
  const [skeletonMode, setSkeletonMode] = useState(false);
  const [stepOverrides, setStepOverrides] = useState<Record<string, boolean>>({});

  const jumpToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMode = (nextSkeleton: boolean) => {
    setSkeletonMode(nextSkeleton);
    setStepOverrides({});
  };

  const isStepExpanded = (stepId: string): boolean => {
    if (stepId in stepOverrides) return stepOverrides[stepId];
    return !skeletonMode;
  };

  const toggleStep = (stepId: string) => {
    setStepOverrides((prev) => ({
      ...prev,
      [stepId]: !isStepExpanded(stepId),
    }));
  };

  const detailSizeClass =
    fontScale === 'large' ? 'text-[16px] leading-[1.84]' : 'text-[14.5px] leading-[1.8]';

  return (
    <section id="section-map" aria-labelledby="heading-map" className="space-y-8 sm:space-y-12">
      {/* Section Masthead */}
      <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] py-4 sm:py-5 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-display text-3xl sm:text-5xl font-black leading-none tabular-nums text-[#E10600] dark:text-[#FF2A1F]">
            01
          </span>
          <h1
            id="heading-map"
            className="font-display text-2xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
          >
            论证地图
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="hidden sm:inline swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
            {argumentMapSteps.length} STEPS · BOUNDARY
          </span>

          <div
            role="group"
            aria-label="切换论证地图展开密度"
            className="inline-flex border border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]"
          >
            <button
              type="button"
              onClick={() => toggleMode(false)}
              aria-pressed={!skeletonMode}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                !skeletonMode
                  ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                  : 'text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
              }`}
            >
              <UnfoldVertical className="w-3.5 h-3.5" aria-hidden="true" />
              <span>全文</span>
            </button>
            <button
              type="button"
              onClick={() => toggleMode(true)}
              aria-pressed={skeletonMode}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-semibold border-l border-[#0A0A0A] dark:border-[#44443F] transition-colors cursor-pointer whitespace-nowrap ${
                skeletonMode
                  ? 'bg-[#E10600] text-[#FFFFFF] dark:bg-[#FF2A1F]'
                  : 'text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
              }`}
            >
              <FoldVertical className="w-3.5 h-3.5" aria-hidden="true" />
              <span>骨架</span>
            </button>
          </div>
        </div>
      </div>

      {/* Destination & Route Coordinate Box */}
      <div className="bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#0A0A0A] dark:border-[#F4F4F0] overflow-hidden">
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex flex-wrap items-center justify-between gap-2">
          <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase">
            DESTINATION · 目的地与路线
          </span>
          <span className="font-index text-[11px] sm:text-xs font-semibold">
            {argumentMapSteps.length} 段递进 + 边界
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <p className="font-editorial text-[15px] sm:text-[17px] font-semibold leading-[1.75] text-[#0A0A0A] dark:text-[#F4F4F0] border-l-4 border-[#E10600] dark:border-[#FF2A1F] pl-3.5 sm:pl-4">
            {ultimateThesis.thesis}
          </p>

          {/* Horizontal swipeable timeline on mobile, wrapped grid on sm+ */}
          <div className="pt-3.5 border-t border-[#D0D0C8] dark:border-[#2A2A27] flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar items-center gap-1.5 sm:gap-2 pb-1 sm:pb-0">
            {argumentMapSteps.map((step, index) => {
              const isCurrent = activeAnchorId === step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => jumpToStep(step.id)}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#E10600] border-[#E10600] text-[#FFFFFF] dark:bg-[#FF2A1F] dark:border-[#FF2A1F]'
                        : 'text-[#0A0A0A] dark:text-[#F4F4F0] bg-[#F4F4F0] dark:bg-[#0B0B0B] border-[#0A0A0A] dark:border-[#44443F] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="font-index mr-1 opacity-70">
                      {String(index).padStart(2, '0')}
                    </span>
                    <span>{step.shortLabel ?? step.stepNumber}</span>
                  </button>
                  <ArrowRight
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#52524E] dark:text-[#A1A19A] shrink-0"
                    aria-hidden="true"
                  />
                </React.Fragment>
              );
            })}
            <button
              type="button"
              onClick={() => jumpToStep(boundaryComparison.id)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeAnchorId === boundaryComparison.id
                  ? 'bg-[#E10600] border-[#E10600] text-[#FFFFFF] dark:bg-[#FF2A1F] dark:border-[#FF2A1F]'
                  : 'text-[#E10600] dark:text-[#FF2A1F] bg-[#FFFFFF] dark:bg-[#141414] border-[#E10600] dark:border-[#FF2A1F] hover:bg-[#E10600] hover:text-[#FFFFFF] dark:hover:bg-[#FF2A1F]'
              }`}
            >
              <span className="font-index mr-1">界</span>
              <span>边界对照</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progressive Argument Steps */}
      <div className="space-y-10 sm:space-y-12">
        {argumentMapSteps.map((step, index) => {
          const expanded = isStepExpanded(step.id);
          return (
            <article
              key={step.id}
              id={step.id}
              className="scroll-mt-28 sm:scroll-mt-24 pt-7 sm:pt-9 first:pt-1 border-t-2 first:border-t-0 border-[#0A0A0A] dark:border-[#44443F] space-y-5 sm:space-y-6"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 font-index text-xs min-w-0">
                    <span className="px-2 py-0.5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] font-bold shrink-0">
                      {String(index).padStart(2, '0')} · {step.stepNumber}
                    </span>
                    <span className="text-[#52524E] dark:text-[#A1A19A] truncate">
                      {step.chaptersRange}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    aria-expanded={expanded}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold border border-[#0A0A0A] dark:border-[#44443F] text-[#52524E] dark:text-[#A1A19A] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors shrink-0 cursor-pointer"
                  >
                    <span>{expanded ? '收起' : `展开 ${step.paragraphs.length} 段`}</span>
                    {expanded ? (
                      <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <h2 className="font-display text-xl sm:text-[28px] font-black leading-[1.26] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title">
                  {step.title}
                </h2>
              </div>

              <QaBlock
                question={step.question}
                leadJudgment={step.leadJudgment}
                paragraphs={expanded ? step.paragraphs : []}
                fontScale={fontScale}
              />

              <div className="bg-[#EAEAE4] dark:bg-[#1C1C1A] border-l-4 border-[#E10600] dark:border-[#FF2A1F] px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-start gap-2.5 sm:gap-3 text-sm leading-relaxed text-[#2A2A27] dark:text-[#D4D4D0]">
                <CornerDownRight
                  className="w-4 h-4 text-[#E10600] dark:text-[#FF2A1F] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <p className="min-w-0">{step.transitionNote}</p>
              </div>
            </article>
          );
        })}

        {/* Boundary Consciousness Two-Column Architectural Matrix */}
        <article
          id={boundaryComparison.id}
          className="scroll-mt-28 sm:scroll-mt-24 pt-8 sm:pt-10 border-t-4 border-[#0A0A0A] dark:border-[#F4F4F0] space-y-5 sm:space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2.5">
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
                <div className="px-4 sm:px-5 py-3 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold">作者的方法能推出什么</h3>
                  <span className="font-index text-xs font-bold text-[#FF2A1F] dark:text-[#E10600] shrink-0">
                    + VALID
                  </span>
                </div>
                <div
                  className={`p-4 sm:p-5 space-y-3.5 sm:space-y-4 font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${detailSizeClass}`}
                >
                  {boundaryComparison.authorMethodParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="bg-[#EAEAE4] dark:bg-[#1C1C1A] flex flex-col">
                <div className="px-4 sm:px-5 py-3 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
                    回看时不能保证什么
                  </h3>
                  <span className="font-index text-xs font-bold text-[#E10600] dark:text-[#FF2A1F] shrink-0">
                    — LIMIT
                  </span>
                </div>
                <div
                  className={`p-4 sm:p-5 space-y-3.5 sm:space-y-4 font-editorial text-[#1C1C1A] dark:text-[#D4D4D0] ${detailSizeClass}`}
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
