import React, { useState } from 'react';
import { ArrowUpRight, RotateCcw, Search, X } from 'lucide-react';
import type { BookCatalogMeta, ViewMode } from '@content/reading/types';
import { filterBooks, getBookCategories } from '@content/reading/filters';

interface LibraryPageProps {
  books: BookCatalogMeta[];
  onOpenBook: (slug: string, initialView?: ViewMode) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ books, onOpenBook }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = getBookCategories(books);
  const filteredBooks = filterBooks(books, { query, category });
  const totalChapters = books.reduce((sum, b) => sum + b.stats.chapterCount, 0);
  const totalKeyInsights = books.reduce((sum, b) => sum + b.stats.originCounts.total, 0);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Swiss Exhibition Poster Hero */}
      <section
        id="library-catalog"
        aria-labelledby="library-heading"
        className="space-y-10"
      >
        <div className="border-t-4 border-b-2 border-[#0A0A0A] dark:border-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 py-8 sm:py-12 lg:pr-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block w-8 h-2 bg-[#E10600] dark:bg-[#FF2A1F]"
              />
              <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
                INTERNATIONAL ARCHIVE OF DEEP READING · VOL. 01—{String(books.length).padStart(2, '0')}
              </span>
            </div>

            <h1
              id="library-heading"
              className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-black leading-[1.02] tracking-[-0.04em] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title"
            >
              深度领读书库
            </h1>

            <p className="font-editorial text-base sm:text-lg leading-[1.75] text-[#2A2A27] dark:text-[#D4D4D0] max-w-2xl">
              每部书均基于原著文本实证梳理，以“问—答”推演还原作者的论证路径，并将作者原意、引申推断与当代回看明确分层。
            </p>
          </div>

          <div className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-[#0A0A0A] dark:border-[#F4F4F0] grid grid-cols-3 lg:grid-cols-2 divide-x lg:divide-x-0 divide-[#D0D0C8] dark:divide-[#2A2A27]">
            <div className="p-5 sm:p-6 lg:border-b lg:border-r border-[#D0D0C8] dark:border-[#2A2A27] flex flex-col justify-between">
              <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">ARCHIVE</span>
              <div className="mt-3">
                <div className="font-display text-4xl sm:text-5xl font-black tabular-nums leading-none text-[#E10600] dark:text-[#FF2A1F]">
                  {String(books.length).padStart(2, '0')}
                </div>
                <div className="mt-1.5 text-xs font-medium text-[#52524E] dark:text-[#A1A19A]">
                  已归档书目
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:border-b border-[#D0D0C8] dark:border-[#2A2A27] flex flex-col justify-between">
              <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">UNITS</span>
              <div className="mt-3">
                <div className="font-display text-4xl sm:text-5xl font-black tabular-nums leading-none text-[#0A0A0A] dark:text-[#F4F4F0]">
                  {totalChapters}
                </div>
                <div className="mt-1.5 text-xs font-medium text-[#52524E] dark:text-[#A1A19A]">
                  精炼章节单元
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:col-span-2 flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#141414]">
              <div className="flex items-center justify-between gap-2">
                <span className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">PROVENANCE</span>
                <span className="font-index text-xs font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                  {totalKeyInsights} KEY QUOTES
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#52524E] dark:text-[#A1A19A]">
                全量 Key20 均对照原书底本核验出处，严格区分原书原句与回译标注。
              </p>
            </div>
          </div>
        </div>

        {/* Precision Filter & Search Grid Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-2 border-[#0A0A0A] dark:border-[#F4F4F0] bg-[#FFFFFF] dark:bg-[#141414]">
          <div className="lg:col-span-5 relative flex items-center border-b lg:border-b-0 lg:border-r border-[#0A0A0A] dark:border-[#F4F4F0]">
            <label htmlFor="library-search" className="sr-only">
              检索书名、作者或命题
            </label>
            <Search
              className="w-4 h-4 text-[#52524E] dark:text-[#A1A19A] absolute left-4 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="library-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="检索书名、作者或核心命题..."
              className="w-full pl-11 pr-10 py-3.5 text-sm bg-transparent text-[#0A0A0A] dark:text-[#F4F4F0] placeholder:text-[#73736C] dark:placeholder:text-[#73736C] focus:outline-none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="清空检索"
                className="absolute right-3 p-1 text-[#52524E] hover:text-[#E10600] dark:text-[#A1A19A] dark:hover:text-[#FF2A1F] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="按主题分类筛选"
            className="lg:col-span-7 flex flex-wrap items-stretch divide-x divide-[#D0D0C8] dark:divide-[#2A2A27]"
          >
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`px-4 py-3 text-xs font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
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
                  className={`px-4 py-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A]'
                      : 'text-[#52524E] dark:text-[#A1A19A] hover:bg-[#EAEAE4] dark:hover:bg-[#1C1C1A] hover:text-[#0A0A0A] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            <div className="ml-auto px-4 py-3 flex items-center font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
              {String(filteredBooks.length).padStart(2, '0')} / {String(books.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Catalogue Dossier Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-20 text-center space-y-5 border-2 border-dashed border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]">
            <p className="font-display text-xl font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
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
        ) : (
          <div className="space-y-8">
            {filteredBooks.map((book) => {
              const catalogNumber = String(
                books.findIndex((b) => b.slug === book.slug) + 1
              ).padStart(2, '0');
              const originCounts = book.stats.originCounts;

              return (
                <article
                  key={book.slug}
                  className="group bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#0A0A0A] dark:border-[#F4F4F0] grid grid-cols-1 lg:grid-cols-12 transition-colors"
                >
                  {/* Cols 1-2: Oversized Swiss Index Spine */}
                  <div className="lg:col-span-2 p-5 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex lg:flex-col justify-between items-baseline lg:items-start gap-4 bg-[#EAEAE4] dark:bg-[#1C1C1A] relative">
                    <span
                      aria-hidden="true"
                      className="hidden lg:block absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-[#E10600] dark:group-hover:bg-[#FF2A1F] transition-colors"
                    />
                    <div className="space-y-1">
                      <div className="swiss-kicker text-[#52524E] dark:text-[#A1A19A]">
                        CAT. NO.
                      </div>
                      <div className="font-display text-5xl sm:text-6xl font-black leading-none tabular-nums text-[#0A0A0A] dark:text-[#F4F4F0] group-hover:text-[#E10600] dark:group-hover:text-[#FF2A1F] transition-colors">
                        {catalogNumber}
                      </div>
                    </div>

                    <div className="lg:space-y-2 text-right lg:text-left">
                      <div className="inline-block px-2 py-0.5 bg-[#0A0A0A] text-[#F4F4F0] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] font-index text-[11px] font-semibold">
                        {book.publicationYear}
                      </div>
                      <div className="mt-1.5 lg:mt-0 text-xs font-semibold text-[#E10600] dark:text-[#FF2A1F]">
                        {book.category}
                      </div>
                    </div>
                  </div>

                  {/* Cols 3-8: Editorial Core */}
                  <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-index text-xs text-[#52524E] dark:text-[#A1A19A]">
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

                      <div className="space-y-1.5">
                        <h2
                          className={`font-display text-3xl sm:text-[2.25rem] font-black leading-[1.12] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#F4F4F0] text-balance-title ${
                            book.title.startsWith('《') ? '-ml-[0.32em]' : ''
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
                        <p className="font-index text-xs text-[#52524E] dark:text-[#A1A19A] leading-relaxed">
                          {book.originalTitle}
                        </p>
                      </div>

                      <p className="font-editorial text-[15.5px] leading-[1.82] text-[#2A2A27] dark:text-[#D4D4D0]">
                        {book.premiseHook}
                      </p>
                    </div>

                    <div className="border-l-4 border-[#E10600] dark:border-[#FF2A1F] bg-[#F4F4F0] dark:bg-[#0B0B0B] px-5 py-4 space-y-1.5">
                      <div className="swiss-kicker text-[#E10600] dark:text-[#FF2A1F]">
                        ULTIMATE THESIS · 全书终极核心命题
                      </div>
                      <p className="font-editorial text-[15px] font-semibold leading-[1.72] text-[#0A0A0A] dark:text-[#F4F4F0]">
                        {book.ultimateThesisText}
                      </p>
                    </div>
                  </div>

                  {/* Cols 9-12: Spec Matrix & Direct Module Launchers */}
                  <div className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-[#0A0A0A] dark:border-[#F4F4F0] flex flex-col justify-between bg-[#F4F4F0]/60 dark:bg-[#101010]">
                    <div className="p-6 space-y-5">
                      <div className="swiss-kicker text-[#52524E] dark:text-[#A1A19A] pb-2 border-b border-[#0A0A0A] dark:border-[#F4F4F0]">
                        DOSSIER INDEX · 领读卷宗
                      </div>

                      <dl className="divide-y divide-[#D0D0C8] dark:divide-[#2A2A27] text-xs">
                        <div className="py-2.5 first:pt-0 flex items-baseline justify-between gap-4">
                          <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A]">论证地图</dt>
                          <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                            {book.stats.mapStepCount} 段递进 + 边界
                          </dd>
                        </div>
                        <div className="py-2.5 flex items-baseline justify-between gap-4">
                          <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A]">洞见概览</dt>
                          <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                            {book.stats.chapterCount} 个章节单元
                          </dd>
                        </div>
                        <div className="py-2.5 flex items-baseline justify-between gap-4">
                          <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A]">
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
                        <div className="py-2.5 last:pb-0 flex items-baseline justify-between gap-4">
                          <dt className="font-semibold text-[#52524E] dark:text-[#A1A19A]">通读时长</dt>
                          <dd className="font-index font-semibold text-[#0A0A0A] dark:text-[#F4F4F0]">
                            {book.readingTimeLabel}
                          </dd>
                        </div>
                      </dl>

                      <div className="pt-1">
                        <div className="grid grid-cols-2 border border-[#0A0A0A] dark:border-[#44443F] bg-[#FFFFFF] dark:bg-[#141414]">
                          {(
                            [
                              { view: 'map', code: '01', label: '论证地图' },
                              { view: 'overview', code: '02', label: '洞见概览' },
                              { view: 'key20', code: '03', label: 'Key20' },
                              { view: 'all', code: 'ALL', label: '全篇连读' },
                            ] as const
                          ).map((mod, idx) => (
                            <button
                              key={mod.view}
                              type="button"
                              onClick={() => onOpenBook(book.slug, mod.view)}
                              className={`px-3 py-2.5 text-left flex items-baseline justify-between gap-2 text-xs font-semibold text-[#0A0A0A] dark:text-[#F4F4F0] hover:bg-[#0A0A0A] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#0A0A0A] transition-colors cursor-pointer ${
                                idx % 2 === 0
                                  ? 'border-r border-[#0A0A0A] dark:border-[#44443F]'
                                  : ''
                              } ${
                                idx < 2 ? 'border-b border-[#0A0A0A] dark:border-[#44443F]' : ''
                              }`}
                            >
                              <span>{mod.label}</span>
                              <span className="font-index text-[10px] opacity-60">{mod.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenBook(book.slug, 'map')}
                      className="w-full px-6 py-4 flex items-center justify-between text-sm font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#0A0A0A] hover:bg-[#E10600] dark:bg-[#F4F4F0] dark:text-[#0A0A0A] dark:hover:bg-[#FF2A1F] dark:hover:text-[#FFFFFF] border-t-2 border-[#0A0A0A] dark:border-[#F4F4F0] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E10600]"
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
        className="border-t-4 border-[#0A0A0A] dark:border-[#F4F4F0] pt-10 space-y-8"
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
            <div key={item.num} className="p-6 sm:p-8 space-y-4">
              <div className="font-display text-4xl font-black tabular-nums leading-none text-[#E10600] dark:text-[#FF2A1F]">
                {item.num}
              </div>
              <h3 className="font-display text-lg font-bold text-[#0A0A0A] dark:text-[#F4F4F0]">
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
