import React from 'react';
import type { FontScale } from '../types/reading';

interface QaBlockProps {
  question: string;
  leadJudgment?: string;
  paragraphs?: string[];
  fontScale: FontScale;
  children?: React.ReactNode;
}

export const QaBlock: React.FC<QaBlockProps> = ({
  question,
  leadJudgment,
  paragraphs = [],
  fontScale,
  children,
}) => {
  const proseSizeClass =
    fontScale === 'large' ? 'text-[18px] leading-[1.88]' : 'text-[16px] leading-[1.82]';
  const questionSizeClass =
    fontScale === 'large' ? 'text-[20px] leading-[1.55]' : 'text-[18px] leading-[1.55]';
  const leadSizeClass =
    fontScale === 'large' ? 'text-[19px] leading-[1.72]' : 'text-[17px] leading-[1.7]';

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3 pb-3.5 border-b border-stone-200/80 dark:border-stone-800/80">
        <span
          aria-hidden="true"
          className="font-ui text-xs font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#1E3A8A]/10 dark:bg-sky-400/15 text-[#1E3A8A] dark:text-sky-300 shrink-0 select-none"
        >
          问
        </span>
        <h3
          className={`font-editorial font-semibold text-stone-900 dark:text-stone-100 text-balance-title ${questionSizeClass}`}
        >
          {question}
        </h3>
      </div>

      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-ui text-xs font-semibold tracking-wider px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0 select-none"
        >
          答
        </span>
        <div
          className={`font-editorial text-stone-800 dark:text-stone-200 space-y-4 min-w-0 flex-1 ${proseSizeClass}`}
        >
          {leadJudgment && (
            <p
              className={`font-semibold text-stone-950 dark:text-stone-50 bg-[#F3EFE6]/85 dark:bg-stone-900/75 px-4 py-3 rounded-md ${leadSizeClass}`}
            >
              {leadJudgment}
            </p>
          )}
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
};
