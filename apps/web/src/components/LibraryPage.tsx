import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import type { BookCatalogMeta, ViewMode } from '@content/reading/types';
import { filterBooks, getBookCategories } from '@content/reading/filters';

interface LibraryPageProps {
  books: BookCatalogMeta[];
  onOpenBook: (slug: string, initialView?: ViewMode) => void;
}

type LibraryLayoutMode = 'dossier' | 'index';

export const LibraryPage: React.FC<LibraryPageProps> = ({ books, onOpenBook }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<LibraryLayoutMode>('dossier');
  const [expandedRowSlugs, setExpandedRowSlugs] = useState<Record<string, boolean>>({});
  const [expandedMobileCards, setExpandedMobileCards] = useState<Record<string, boolean>>({});

  const categories = getBookCategories(books);
  const filteredBooks = filterBooks(books, { query, category });
  const totalChapters = books.reduce((sum, b) => sum + b.stats.chapterCount, 0);
  const totalKeyInsights = books.reduce((sum, b) => sum + b.stats.originCounts.total, 0);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  const toggleIndexRow = (slug: string) => {
    setExpandedRowSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleMobileCardDetails = (slug: string) => {
    setExpandedMobileCards((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-12 sm:space-y-16">
      {/* Swiss Exhibition Poster Hero */}
      <section
        id="library-catalog"
        aria-labelledby="library-heading"
        className="space-y-6 sm:space-y-8"
      >
        <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8 py-6 sm:py-10 lg:pr-10 space-y-4 sm:space-y-6 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span
                aria-hidden="true"
                className="inline-block w-6 sm:w-8 h-1.5 sm:h-2 bg-[#E10600] dark:bg-[#FF2A1F] shrink-0"
              />
              <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#52524E] dark:text-[#A1A19A] break-words">
                DEEPREAD ARCHIVE · VOL. 01—{String(books.length).padStart(2, '0')}
              </span>
            </div>

            <h1
              id="library-heading"
              className="font-display text-[2.25rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.5rem] font-black leading-[1.05] tracking-[-0.035em] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
            >
              深度领读书库
            </h1>

            <p className="font-editorial text-sm sm:text-base lg:text-lg leading-[1.75] text-[#2A2A27] dark:text-[#D4D4D0] max-w-2xl">
              每部书均基于原著文本实证梳理，以“问—答”推演还原作者的论证路径，并将作者原意、引申推断与当代回看明确分层。
            </p>
          </div>

          {/* Mobile-safe 3-metric Swiss Telemetry Panel */}
          <div className="lg:col-span-5 xl:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex flex-col justify-between min-w-0">
            <div className="grid grid-cols-3 divide-x divide-[#D0D0C8] dark:divide-[#2A2A27] flex-1">
              <div className="p-3 sm:p-5 flex flex-col justify-between min-w-0">
                <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.14em] uppercase text-[#52524E] dark:text-[#A1A19A] truncate">
                  BOOKS
                </span>
                <div className="mt-2.5 sm:mt-4">
                  <div className="font-display text-2xl sm:text-4xl font-black tabular-nums leading-none text-[#E10600] dark:text-[#FF2A1F]">
                    {String(books.length).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-medium text-[#52524E] dark:text-[#A1A19A] truncate">
                    归档书目
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-5 flex flex-col justify-between min-w-0">
                <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.14em] uppercase text-[#52524E] dark:text-[#A1A19A] truncate">
                  UNITS
                </span>
                <div className="mt-2.5 sm:mt-4">
                  <div className="font-display text-2xl sm:text-4xl font-black tabular-nums leading-none text-[#0A0A0A] dark:text-[#F4F4F0]">
                    {totalChapters}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-medium text-[#52524E] dark:text-[#A1A19A] truncate">
                    章节单元
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-5 flex flex-col justify-between min-w-0">
                <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.14em] uppercase text-[#52524E] dark:text-[#A1A19A] truncate">
                  QUOTES
                </span>
                <div className="mt-2.5 sm:mt-4">
                  <div className="font-display text-2xl sm:text-4xl font-black tabular-nums leading-none text-[#0A0A0A] dark:text-[#F4F4F0]">
                    {totalKeyInsights}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-medium text-[#52524E] dark:text-[#A1A19A] truncate">
                    原典句库
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-5 border-t border-[#D0D0C8] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#141414] space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <span className="font-index text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-[#E10600] dark:text-[#FF2A1F]">
                  PROVENANCE · 原典核验
                </span>
                <span className="font-index text-[10px] sm:text-[11px] font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                  100% VERBATIM
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#52524E] dark:text-[#A1A19A]">
                全量 Key20 逐条对照原书底本核验出处，严格区分原著原句、译本原句与英文回译标注。
              </p>
            </div>
          </div>
        </div>

        {/* Precision Filter, Search & View-Density Bar */}
        <div className="border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] divide-y divide-[#0A0A0A] dark:divide-[#44443F] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative flex items-center border-b lg:border-b-0 lg:border-r border-[#0A0A0A] dark:border-[#44443F] min-w-0">
              <label htmlFor="library-search" className="sr-only">
                检索书名、作者或命题
              </label>
              <Search
                className="w-4 h-4 text-[#52524E] dark:text-[#A1A19A] absolute left-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="library-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="检索书名、作者或核心命题..."
                className="w-full min-w-0 pl-10 pr-9 py-3 text-sm bg-transparent text-[#0A0A0A] dark:text-[#F4F4F0] placeholder:text-[#73736C] focus:outline-none"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="清空检索"
                  className="absolute right-2.5 p-1 text-[#52524E] hover:text-[#E10600] dark:text-[#A1A19A] dark:hover:text-[#FF2A1F] cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Single-row swipeable rail on mobile, flex-wrap on sm+ */}
            <div className="lg:col-span-7 min-w-0">
              <div
                role="group"
                aria-label="按主题分类筛选"
                className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar items-stretch divide-x divide-[#D0D0C8] dark:divide-[#2A2A27]"
              >
                <button
                  type="button"
                  onClick={() => setCategory('all')}
                  aria-pressed={category === 'all'}
                  className={`px-3.5 py-2.5 sm:py-3 text-xs font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    category === 'all'
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  全部 ({books.length})
                </button>
                {categories.map((cat) => {
                  const active = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      aria-pressed={active}
                      className={`px-3.5 py-2.5 sm:py-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                          : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Secondary Utility Strip: Result count + Dossier/Index View Switcher */}
          <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#F4F4F0] dark:bg-[#101010] flex flex-wrap items-center justify-between gap-2">
            <div className="font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
              显示{' '}
              <span className="font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
                {String(filteredBooks.length).padStart(2, '0')}
              </span>{' '}
              / {String(books.length).padStart(2, '0')} 部
            </div>

            <div className="flex items-center gap-2">
              <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A] hidden sm:inline">
                VIEW
              </span>
              <div
                role="group"
                aria-label="切换书库排列密度"
                className="inline-flex border border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]"
              >
                <button
                  type="button"
                  onClick={() => setLayoutMode('dossier')}
                  aria-pressed={layoutMode === 'dossier'}
                  className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    layoutMode === 'dossier'
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>卷宗</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('index')}
                  aria-pressed={layoutMode === 'index'}
                  className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-semibold border-l border-[#0A0A0A] dark:border-[#44443F] transition-colors cursor-pointer whitespace-nowrap ${
                    layoutMode === 'index'
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>索引表</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State vs Compact Index Table vs Dossier Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center space-y-5 border-2 border-dashed border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]">
            <p className="font-display text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
              未找到匹配的书目档案
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>重置筛选条件</span>
            </button>
          </div>
        ) : layoutMode === 'index' ? (
          <div className="border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414] divide-y-2 divide-[#0A0A0A] dark:divide-[#44443F]">
            <div className="hidden lg:grid lg:grid-cols-12 px-5 py-3 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] swiss-kicker">
              <div className="col-span-1">NO.</div>
              <div className="col-span-4">书目 / 作者</div>
              <div className="col-span-2">主题 / 年份</div>
              <div className="col-span-2">结构规模</div>
              <div className="col-span-3 text-right">直达阅读模块</div>
            </div>

            {filteredBooks.map((book) => {
              const catalogNumber = String(
                books.findIndex((b) => b.slug === book.slug) + 1
              ).padStart(2, '0');
              const isExpanded = Boolean(expandedRowSlugs[book.slug]);

              return (
                <article key={book.slug} className="group">
                  <div className="p-3.5 sm:px-5 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center hover:bg-[#F4F4F0]/70 dark:hover:bg-[#1C1C1A]/60 transition-colors">
                    <div className="lg:col-span-1 flex items-center justify-between lg:justify-start gap-2 min-w-0">
                      <span className="font-display text-xl sm:text-2xl font-black tabular-nums text-[#0A0A0A] dark:text-[#F4F4F0] group-hover:text-[#E10600] dark:group-hover:text-[#FF2A1F] transition-colors">
                        {catalogNumber}
                      </span>
                      <span className="lg:hidden font-index text-[11px] font-semibold px-2 py-0.5 bg-[#EAEAE4] dark:bg-[#1C1C1A] truncate">
                        {book.publicationYear} · {book.category}
                      </span>
                    </div>

                    <div className="lg:col-span-4 min-w-0 space-y-0.5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onOpenBook(book.slug, 'map')}
                          className="font-display text-lg font-black text-[#0A0A0A] dark:text-[#F4F4F0] hover:text-[#E10600] dark:hover:text-[#FF2A1F] text-left cursor-pointer"
                        >
                          {book.title}
                        </button>
                        <span className="font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
                          {book.author}
                        </span>
                      </div>
                      <p className="font-index text-[11px] text-[#73736C] truncate">
                        {book.originalTitle}
                      </p>
                    </div>

                    <div className="hidden lg:block lg:col-span-2 space-y-0.5">
                      <div className="text-xs font-semibold text-[#E10600] dark:text-[#FF2A1F]">
                        {book.category}
                      </div>
                      <div className="font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
                        {book.publicationYear} · {book.readingTimeLabel}
                      </div>
                    </div>

                    <div className="lg:col-span-2 font-index text-xs text-[#52524E] dark:text-[#A1A19A] flex items-center justify-between lg:block gap-3">
                      <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                        {book.stats.chapterCount} 章 / {book.stats.originCounts.total} 句
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleIndexRow(book.slug)}
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1 lg:mt-1 text-[11px] font-semibold text-[#52524E] hover:text-[#E10600] dark:text-[#A1A19A] dark:hover:text-[#FF2A1F] cursor-pointer"
                      >
                        <span>{isExpanded ? '收起导语' : '预览命题'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-4 lg:flex lg:flex-wrap lg:justify-end gap-1.5">
                      {(
                        [
                          { view: 'map', label: '地图' },
                          { view: 'overview', label: '概览' },
                          { view: 'key20', label: 'Key20' },
                          { view: 'all', label: '连读' },
                        ] as const
                      ).map((mod) => (
                        <button
                          key={mod.view}
                          type="button"
                          onClick={() => onOpenBook(book.slug, mod.view)}
                          className="px-2 py-1.5 text-xs font-semibold text-center border border-[#0A0A0A] dark:border-[#44443F] text-[#0A0A0A] dark:text-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors cursor-pointer"
                        >
                          {mod.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 py-4 bg-[#F4F4F0] dark:bg-[#0B0B0B] border-t border-[#D0D0C8] dark:border-[#2A2A27] grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                      <div className="lg:col-span-5 space-y-1.5">
                        <div className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
                          SCENE HOOK · 问题现场
                        </div>
                        <p className="text-sm leading-[1.78] text-[#2A2A27] dark:text-[#D4D4D0]">
                          {book.premiseHook}
                        </p>
                      </div>
                      <div className="lg:col-span-7 border-l-4 border-[#E10600] dark:border-[#FF2A1F] pl-4 space-y-1.5">
                        <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
                          ULTIMATE THESIS · 终极核心命题
                        </div>
                        <p className="text-sm font-semibold leading-[1.75] text-[#0A0A0A] dark:text-[#F4F4F0]">
                          {book.ultimateThesisText}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {filteredBooks.map((book) => {
              const catalogNumber = String(
                books.findIndex((b) => b.slug === book.slug) + 1
              ).padStart(2, '0');
              const originCounts = book.stats.originCounts;
              const mobileExpanded = Boolean(expandedMobileCards[book.slug]);

              return (
                <article
                  key={book.slug}
                  className="group bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#0A0A0A] dark:border-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12 transition-colors overflow-hidden"
                >
                  {/* Cols 1-2: Oversized Swiss Index Spine */}
                  <div className="lg:col-span-2 px-4 py-3.5 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex lg:flex-col justify-between items-center lg:items-start gap-3 bg-[#EAEAE4] dark:bg-[#1C1C1A] relative">
                    <span
                      aria-hidden="true"
                      className="hidden lg:block absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-[#E10600] dark:group-hover:bg-[#FF2A1F] transition-colors"
                    />
                    <div className="flex lg:flex-col items-baseline gap-2 lg:gap-1">
                      <div className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
                        NO.
                      </div>
                      <div className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-none tabular-nums text-[#0A0A0A] dark:text-[#F4F4F0] group-hover:text-[#E10600] dark:group-hover:text-[#FF2A1F] transition-colors">
                        {catalogNumber}
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-center lg:items-start gap-2 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] font-index text-[11px] font-semibold shrink-0">
                        {book.publicationYear}
                      </span>
                      <span className="text-xs font-semibold text-[#E10600] dark:text-[#FF2A1F] truncate">
                        {book.category}
                      </span>
                    </div>
                  </div>

                  {/* Cols 3-8: Editorial Core */}
                  <div className="lg:col-span-6 p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6 flex flex-col justify-between min-w-0">
                    <div className="space-y-3.5 sm:space-y-5">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
                        <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                          {book.author}
                        </span>
                        {book.translator && (
                          <>
                            <span aria-hidden="true">/</span>
                            <span>{book.translator}</span>
                          </>
                        )}
                        <span aria-hidden="true">/</span>
                        <span>{book.publisherInfo}</span>
                      </div>

                      <div className="space-y-1">
                        <h2
                          className={`font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-black leading-[1.15] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title ${
                            book.title.startsWith('《') ? 'sm:-ml-[0.32em]' : ''
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => onOpenBook(book.slug, 'map')}
                            className="text-left hover:text-[#E10600] dark:hover:text-[#FF2A1F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E10600]"
                          >
                            {book.title}
                          </button>
                        </h2>
                        <p className="font-index text-[11px] sm:text-xs text-[#52524E] dark:text-[#A1A19A] leading-relaxed break-words">
                          {book.originalTitle}
                        </p>
                      </div>

                      <p className="font-editorial text-[14.5px] sm:text-[15.5px] leading-[1.78] sm:leading-[1.82] text-[#2A2A27] dark:text-[#D4D4D0]">
                        {book.premiseHook}
                      </p>
                    </div>

                    {/* Mobile Compact Specs + Foldable Ultimate Thesis Trigger */}
                    <div className="lg:hidden flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D0D0C8] dark:border-[#2A2A27]">
                      <span className="font-index text-[11px] text-[#52524E] dark:text-[#A1A19A]">
                        {book.stats.chapterCount} 章 · {originCounts.total} 原句 · {book.readingTimeLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleMobileCardDetails(book.slug)}
                        aria-expanded={mobileExpanded}
                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold border border-[#0A0A0A] dark:border-[#44443F] text-[#0A0A0A] dark:text-[#F4F4F0] cursor-pointer"
                      >
                        <span>{mobileExpanded ? '收起命题与规格' : '终极命题与规格'}</span>
                        {mobileExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>

                    {/* Ultimate Thesis: always shown on lg+, foldable on mobile to prevent 900px tall cards */}
                    <div
                      className={`${
                        mobileExpanded ? 'block' : 'hidden lg:block'
                      } border-l-4 border-[#E10600] dark:border-[#FF2A1F] bg-[#F4F4F0] dark:bg-[#0B0B0B] px-4 sm:px-5 py-3.5 sm:py-4 space-y-1.5`}
                    >
                      <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
                        ULTIMATE THESIS · 全书终极核心命题
                      </div>
                      <p className="font-editorial text-sm sm:text-[15px] font-semibold leading-[1.72] text-[#0A0A0A] dark:text-[#F4F4F0]">
                        {book.ultimateThesisText}
                      </p>
                    </div>
                  </div>

                  {/* Cols 9-12: Spec Matrix & Direct Module Launchers */}
                  <div className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex flex-col justify-between bg-[#F4F4F0]/60 dark:bg-[#101010] min-w-0">
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                      {/* Spec DL: always shown on lg+, toggled with mobileExpanded on mobile */}
                      <div className={`${mobileExpanded ? 'block' : 'hidden lg:block'} space-y-4`}>
                        <div className="swiss-kicker text-[#52524E] dark:text-[#A1A19A] pb-2 border-b border-[#0A0A0A] dark:border-[#F4F4F0]">
                          DOSSIER INDEX · 领读卷宗
                        </div>

                        <dl className="divide-y divide-[#D0D0C8] dark:divide-[#2A2A27] text-xs">
                          <div className="py-2 first:pt-0 flex items-baseline justify-between gap-3">
                            <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A] shrink-0">
                              论证地图
                            </dt>
                            <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] text-right">
                              {book.stats.mapStepCount} 段递进 + 边界
                            </dd>
                          </div>
                          <div className="py-2 flex items-baseline justify-between gap-3">
                            <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A] shrink-0">
                              洞见概览
                            </dt>
                            <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] text-right">
                              {book.stats.chapterCount} 个章节单元
                            </dd>
                          </div>
                          <div className="py-2 flex items-baseline justify-between gap-3">
                            <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A] shrink-0">
                              {originCounts.chineseOriginal === originCounts.total
                                ? '原典句库'
                                : '双语句库'}
                            </dt>
                            <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] text-right">
                              {originCounts.chineseOriginal === originCounts.total
                                ? `${originCounts.total} 条（原著原句）`
                                : originCounts.original > 0
                                  ? `${originCounts.total} 条（原句 ${originCounts.original} · 回译 ${originCounts.backTranslation}）`
                                  : `${originCounts.total} 条（译本原句 · 附回译）`}
                            </dd>
                          </div>
                          <div className="py-2 last:pb-0 flex items-baseline justify-between gap-3">
                            <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A] shrink-0">
                              通读时长
                            </dt>
                            <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] text-right">
                              {book.readingTimeLabel}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* 4-module quick jump: 4-col compact bar on mobile, 2x2 matrix on lg */}
                      <div className="grid grid-cols-4 lg:grid-cols-2 border border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414] divide-x divide-[#0A0A0A] dark:divide-[#44443F] lg:divide-x-0">
                        {(
                          [
                            { view: 'map', code: '01', label: '论证地图', mobileLabel: '地图' },
                            { view: 'overview', code: '02', label: '洞见概览', mobileLabel: '概览' },
                            { view: 'key20', code: '03', label: 'Key20', mobileLabel: 'Key20' },
                            { view: 'all', code: 'ALL', label: '全篇连读', mobileLabel: '连读' },
                          ] as const
                        ).map((mod, idx) => (
                          <button
                            key={mod.view}
                            type="button"
                            onClick={() => onOpenBook(book.slug, mod.view)}
                            className={`px-2 py-2.5 lg:px-3 text-center lg:text-left flex items-center justify-center lg:justify-between gap-1 text-xs font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors cursor-pointer ${
                              idx % 2 === 0
                                ? 'lg:border-r lg:border-[#0A0A0A] dark:lg:border-[#44443F]'
                                : ''
                            } ${
                              idx < 2
                                ? 'lg:border-b lg:border-[#0A0A0A] dark:lg:border-[#44443F]'
                                : ''
                            }`}
                          >
                            <span className="lg:hidden">{mod.mobileLabel}</span>
                            <span className="hidden lg:inline">{mod.label}</span>
                            <span className="hidden lg:inline font-index text-[10px] opacity-60">
                              {mod.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenBook(book.slug, 'map')}
                      className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E10600]"
                    >
                      <span>进入深度领读</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Editorial Method Band */}
      <section
        id="library-method"
        aria-labelledby="method-heading"
        className="border-t-4 border-[#0A0A0A] dark:border-[#F4F4F0] pt-8 sm:pt-10 space-y-6 sm:space-y-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="space-y-1">
            <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
              EDITORIAL METHODOLOGY
            </div>
            <h2
              id="method-heading"
              className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F4F4F0]"
            >
              领读编排体例
            </h2>
          </div>
          <span className="font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
            SYSTEM 01—03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-[#0A0A0A] dark:border-[#F4F4F0] divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0A0A0A] dark:divide-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414]">
          {[
            {
              num: '01',
              title: '现场开篇与问答推演',
              desc: '所有论证从原书具体事件现场起步，用“问—答”连贯段落推动因果追问，先亮判断再给依据，拒绝空洞术语堆砌。',
            },
            {
              num: '02',
              title: '作者原意与边界分层',
              desc: '将作者明确论证与读者“引申、推断、保留标注”严格分层呈现，并在论证终点设立“方法能推出什么 / 回看不能保证什么”双栏对照。',
            },
            {
              num: '03',
              title: '原典句库与出处核验',
              desc: '全部 Key20 中文引文逐条对照原书底本核验，透明区分中文原著原句、外文原句与英文回译，支持一键复制与双向检索。',
            },
          ].map((item) => (
            <div key={item.num} className="p-5 sm:p-8 space-y-3 sm:space-y-4">
              <div className="font-display text-3xl sm:text-4xl font-black tabular-nums leading-none text-[#E10600] dark:text-[#FF2A1F]">
                {item.num}
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
                {item.title}
              </h3>
              <p className="font-editorial text-sm leading-[1.82] text-[#52524E] dark:text-[#A1A19A]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
