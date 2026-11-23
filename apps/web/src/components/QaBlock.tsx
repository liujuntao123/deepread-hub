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
    fontScale === 'large' ? 'text-[17.5px] leading-[1.9]' : 'text-[15.5px] leading-[1.85]';
  const questionSizeClass =
    fontScale === 'large' ? 'text-[20px] leading-[1.52]' : 'text-[18px] leading-[1.55]';
  const leadSizeClass =
    fontScale === 'large' ? 'text-[18.5px] leading-[1.72]' : 'text-[16.5px] leading-[1.7]';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.75rem_1fr] gap-3 sm:gap-4 pb-4 border-b border-[#0A0A0A] dark:border-[#44443F] items-start">
        <span
          aria-hidden="true"
          className="w-7 h-7 sm:w-8 sm:h-8 inline-flex items-center justify-center bg-[#E10600] dark:bg-[#FF2A1F] text-[#FFFFFF] font-display text-xs sm:text-sm font-black select-none mt-0.5"
        >
          问
        </span>
        <h3
          className={`font-display font-bold text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title ${questionSizeClass}`}
        >
          {question}
        </h3>
      </div>

      <div className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.75rem_1fr] gap-3 sm:gap-4 items-start">
        <span
          aria-hidden="true"
          className="w-7 h-7 sm:w-8 sm:h-8 inline-flex items-center justify-center bg-[#0A0A0A] dark:bg-[#F4F4F0] text-[#FFFFFF] dark:text-[#0A0A0A] font-display text-xs sm:text-sm font-black select-none mt-0.5"
        >
          答
        </span>
        <div
          className={`font-editorial text-[#1C1C1A] dark:text-[#D8D8D2] space-y-4 min-w-0 ${proseSizeClass}`}
        >
          {leadJudgment && (
            <p
              className={`font-bold text-[#0A0A0A] dark:text-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] border-l-4 border-[#0A0A0A] dark:border-[#F4F4F0] px-4 py-3.5 ${leadSizeClass}`}
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
