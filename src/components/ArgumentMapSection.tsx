import React from 'react';
import { ArrowRight, CornerDownRight } from 'lucide-react';
import type { BookReadingDataset, FontScale } from '../types/reading';
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
    fontScale === 'large' ? 'text-[16px] leading-[1.82]' : 'text-[15px] leading-[1.78]';

  return (
    <section id="section-map" aria-labelledby="heading-map" className="space-y-12">
      <div className="pb-4 border-b border-stone-300 dark:border-stone-700 flex items-baseline justify-between gap-4">
        <h1
          id="heading-map"
          className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance-title"
        >
          论证地图
        </h1>
        <span className="font-ui tabular-nums text-xs text-stone-500 dark:text-stone-400 shrink-0">
          {argumentMapSteps.length} 段推演 · 边界对照
        </span>
      </div>

      <div className="p-6 bg-[#F3EFE6] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-md space-y-5">
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-[#1E3A8A] dark:text-sky-400">
            目的地与图例
          </span>
          <span className="font-ui tabular-nums">{argumentMapSteps.length} 段递进路径</span>
        </div>
        <p className="font-editorial text-base sm:text-[17px] font-medium leading-[1.75] text-stone-900 dark:text-stone-100">
          {ultimateThesis.thesis}
        </p>
        <div className="pt-3.5 border-t border-stone-200/90 dark:border-stone-800 flex flex-wrap items-center gap-2">
          {argumentMapSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => jumpToStep(step.id)}
                className="px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 hover:text-[#1E3A8A] dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {step.stepNumber}
              </button>
              {index < argumentMapSteps.length - 1 && (
                <ArrowRight
                  className="w-3 h-3 text-stone-400 dark:text-stone-500 shrink-0"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-14">
        {argumentMapSteps.map((step) => (
          <article
            key={step.id}
            id={step.id}
            className="scroll-mt-24 pt-10 first:pt-2 border-t first:border-t-0 border-stone-200 dark:border-stone-800 space-y-6"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-stone-500 dark:text-stone-400 font-ui">
                <span className="font-index font-semibold text-[#1E3A8A] dark:text-sky-400">
                  {step.stepNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span>{step.chaptersRange}</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-[26px] font-bold leading-snug text-stone-900 dark:text-stone-100 text-balance-title">
                {step.title}
              </h2>
            </div>

            <QaBlock
              question={step.question}
              leadJudgment={step.leadJudgment}
              paragraphs={step.paragraphs}
              fontScale={fontScale}
            />

            <div className="pt-4 border-t border-dashed border-stone-300/80 dark:border-stone-700/80 flex items-start gap-2.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400 font-ui">
              <CornerDownRight
                className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400 shrink-0 mt-1"
                aria-hidden="true"
              />
              <p className="italic">{step.transitionNote}</p>
            </div>
          </article>
        ))}

        <article
          id={boundaryComparison.id}
          className="scroll-mt-24 pt-10 border-t border-stone-300 dark:border-stone-700 space-y-6"
        >
          <div className="flex items-center gap-2 text-xs font-ui text-stone-500 dark:text-stone-400">
            <span className="font-index font-semibold text-[#1E3A8A] dark:text-sky-400">
              边界意识
            </span>
            <span aria-hidden="true">·</span>
            <span>作者的方法与当代回看</span>
          </div>

          <QaBlock
            question={boundaryComparison.question}
            leadJudgment={boundaryComparison.leadJudgment}
            fontScale={fontScale}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-stretch">
              <div className="p-5 sm:p-6 border border-stone-200 dark:border-stone-800 rounded-md bg-white/85 dark:bg-stone-900/50 space-y-3.5">
                <h3 className="font-ui text-sm font-semibold text-stone-900 dark:text-stone-100 pb-2.5 border-b border-stone-200 dark:border-stone-800">
                  作者的方法能推出什么
                </h3>
                <div className={`space-y-3.5 font-editorial text-stone-700 dark:text-stone-300 ${detailSizeClass}`}>
                  {boundaryComparison.authorMethodParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 border border-stone-200 dark:border-stone-800 rounded-md bg-[#F3EFE6]/85 dark:bg-stone-900/85 space-y-3.5">
                <h3 className="font-ui text-sm font-semibold text-stone-900 dark:text-stone-100 pb-2.5 border-b border-stone-200 dark:border-stone-800">
                  回看时不能保证什么
                </h3>
                <div className={`space-y-3.5 font-editorial text-stone-700 dark:text-stone-300 ${detailSizeClass}`}>
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
