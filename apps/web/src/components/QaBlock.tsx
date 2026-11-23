import React from 'react';
import type { FontScale } from '@content/reading/types';

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
    fontScale === 'large'
      ? 'text-[17px] sm:text-[17.5px] leading-[1.88]'
      : 'text-[15.5px] leading-[1.84]';
  const questionSizeClass =
    fontScale === 'large'
      ? 'text-[18.5px] sm:text-[20px] leading-[1.52]'
      : 'text-[17px] sm:text-[18px] leading-[1.55]';
  const leadSizeClass =
    fontScale === 'large'
      ? 'text-[17.5px] sm:text-[18.5px] leading-[1.7]'
      : 'text-[16px] sm:text-[16.5px] leading-[1.68]';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Question row: compact inline badge on mobile, Swiss 2-col on sm+ */}
      <div className="flex sm:grid sm:grid-cols-[2.75rem_1fr] gap-2.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-[#0A0A0A] dark:border-[#44443F] items-start">
        <span
          aria-hidden="true"
          className="w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF] font-display text-xs sm:text-sm font-black shrink-0 select-none mt-0.5"
        >
          问
        </span>
        <h3
          className={`font-display font-bold text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title min-w-0 ${questionSizeClass}`}
        >
          {question}
        </h3>
      </div>

      {/* Answer block: full-width prose on mobile (reclaims 48px), Swiss 2-col on sm+ */}
      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-[2.75rem_1fr] sm:gap-4 items-start">
        <div className="flex items-center gap-2 sm:block">
          <span
            aria-hidden="true"
            className="w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center bg-[#0A0A0A] dark:bg-[#F4F4F0] text-[#FFFFFF] dark:text-[#0A0A0A] font-display text-xs sm:text-sm font-black shrink-0 select-none sm:mt-0.5"
          >
            答
          </span>
          <span className="sm:hidden font-index text-[10px] font-semibold tracking-[0.12em] uppercase text-[#52524E] dark:text-[#A1A19A]">
            RESPONSE · 结论与推演
          </span>
        </div>

        <div
          className={`font-editorial text-[#1C1C1A] dark:text-[#D8D8D2] space-y-3.5 sm:space-y-4 min-w-0 ${proseSizeClass}`}
        >
          {leadJudgment && (
            <p
              className={`font-bold text-[#0A0A0A] dark:text-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] border-l-4 border-[#0A0A0A] dark:border-[#F4F4F0] px-3.5 sm:px-4 py-3 sm:py-3.5 ${leadSizeClass}`}
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
