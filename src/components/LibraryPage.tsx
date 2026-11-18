import React, { useState } from 'react';
import { ArrowRight, BookOpen, Compass, KeyRound, ListOrdered, RotateCcw, Search, X } from 'lucide-react';
import type { BookEntry, ViewMode } from '../types/reading';
import { countKeyOrigins, filterBooks, getBookCategories } from '../utils/readingFilters';

interface LibraryPageProps {
  books: BookEntry[];
  onOpenBook: (slug: string, initialView?: ViewMode) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ books, onOpenBook }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = getBookCategories(books);
  const filteredBooks = filterBooks(books, { query, category });

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <section id="library-catalog" aria-labelledby="library-heading" className="space-y-8">
        <div className="pb-6 border-b border-stone-300 dark:border-stone-700 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <h1
              id="library-heading"
              className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance-title"
            >
              深度领读书库
            </h1>
            <p className="font-editorial text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              每部书均基于原著文本实证梳理，以“问—答”推演还原作者的论证路径，并将原意、引申与当代回看明确分层。
            </p>
          </div>

          <div className="font-ui tabular-nums text-xs text-stone-500 dark:text-stone-400 shrink-0">
            已归档 {filteredBooks.length} / {books.length} 部
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <label htmlFor="library-search" className="sr-only">
              检索书名、作者或命题
            </label>
            <Search
              className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="library-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="检索书名、作者或核心命题"
              className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:border-[#1E3A8A] dark:focus:border-sky-400"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="清空检索"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="按主题分类筛选"
            className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800 self-start overflow-x-auto max-w-full"
          >
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                category === 'all'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              全部书目
            </button>
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center space-y-4 border border-dashed border-stone-300 dark:border-stone-700 rounded-md">
            <p className="font-editorial text-lg text-stone-700 dark:text-stone-300">
              未找到匹配的书目档案
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>重置筛选</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredBooks.map((book) => {
              const originCounts = countKeyOrigins(book.dataset.keyInsights);
              return (
                <article
                  key={book.slug}
                  className="bg-[#F6F2EA] dark:bg-stone-900/75 border border-stone-200 dark:border-stone-800 rounded-md overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-ui text-stone-500 dark:text-stone-400">
                        <span className="font-medium text-[#1E3A8A] dark:text-sky-400">
                          {book.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{book.author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{book.publicationYear}</span>
                        {book.translator && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{book.translator}</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h2
                          className={`font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance-title ${
                            book.title.startsWith('《') ? '-ml-[0.35em]' : ''
                          }`}
                        >
                          {book.title}
                        </h2>
                        <p className="font-editorial italic text-sm sm:text-base text-stone-600 dark:text-stone-400">
                          {book.originalTitle}
                        </p>
                      </div>

                      <p className="font-editorial text-base sm:text-[17px] leading-[1.8] text-stone-800 dark:text-stone-200 max-w-prose">
                        {book.premiseHook}
                      </p>

                      <div className="bg-[#FBF9F5] dark:bg-stone-950/60 px-5 py-4 rounded-md space-y-2">
                        <div className="text-xs font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400 font-ui">
                          全书终极核心命题
                        </div>
                        <p className="font-editorial text-[15px] sm:text-base font-medium leading-[1.75] text-stone-900 dark:text-stone-100">
                          {book.dataset.ultimateThesis.thesis}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 bg-[#FBF9F5]/75 dark:bg-stone-950/40 p-6 sm:p-8 flex flex-col justify-between gap-8">
                      <div className="space-y-6">
                        <div className="text-xs font-semibold tracking-wider text-stone-500 dark:text-stone-400">
                          领读卷宗索引
                        </div>

                        <dl className="divide-y divide-stone-200 dark:divide-stone-800 text-sm">
                          <div className="py-3 first:pt-0 flex items-baseline justify-between gap-4">
                            <dt className="text-stone-500 dark:text-stone-400">论证地图</dt>
                            <dd className="font-index font-medium text-stone-900 dark:text-stone-100">
                              {book.dataset.argumentMapSteps.length} 段递进 + 边界
                            </dd>
                          </div>
                          <div className="py-3 flex items-baseline justify-between gap-4">
                            <dt className="text-stone-500 dark:text-stone-400">洞见概览</dt>
                            <dd className="font-index font-medium text-stone-900 dark:text-stone-100">
                              {book.dataset.chapters.length} 个章节单元
                            </dd>
                          </div>
                          <div className="py-3 flex items-baseline justify-between gap-4">
                            <dt className="text-stone-500 dark:text-stone-400">
                              {originCounts.chineseOriginal === originCounts.total
                                ? '原典精要'
                                : originCounts.original > 0
                                  ? '双语精要'
                                  : '核心句库'}
                            </dt>
                            <dd className="font-index font-medium text-stone-900 dark:text-stone-100 text-right">
                              {originCounts.chineseOriginal === originCounts.total
                                ? `${originCounts.total} 条（原书原句）`
                                : originCounts.original > 0
                                  ? `${originCounts.total} 条（原句 ${originCounts.original} · 回译 ${originCounts.backTranslation}）`
                                  : `${originCounts.total} 条（译本精要 · 附回译）`}
                            </dd>
                          </div>
                          <div className="py-3 flex items-baseline justify-between gap-4">
                            <dt className="text-stone-500 dark:text-stone-400">阅读时长</dt>
                            <dd className="font-index font-medium text-stone-900 dark:text-stone-100">
                              {book.readingTimeLabel}
                            </dd>
                          </div>
                          <div className="py-3 last:pb-0 flex items-baseline justify-between gap-4">
                            <dt className="text-stone-500 dark:text-stone-400">依据版本</dt>
                            <dd className="text-stone-700 dark:text-stone-300 text-right">
                              {book.publisherInfo}
                            </dd>
                          </div>
                        </dl>

                        <div className="space-y-2.5 pt-2">
                          <div className="text-xs font-medium text-stone-500 dark:text-stone-400">
                            直达阅读模块
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenBook(book.slug, 'map')}
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <Compass className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                              <span>论证地图</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenBook(book.slug, 'overview')}
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <ListOrdered className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                              <span>洞见概览</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenBook(book.slug, 'key20')}
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                              <span>Key20</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenBook(book.slug, 'all')}
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                              <span>全篇连读</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenBook(book.slug, 'map')}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1E3A8A] dark:bg-sky-500 dark:text-stone-950 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                      >
                        <span>进入领读</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section
        id="library-method"
        aria-labelledby="method-heading"
        className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-6"
      >
        <h2
          id="method-heading"
          className="text-sm font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400"
        >
          领读编排体例
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100">
              01. 现场开篇与问答推演
            </h3>
            <p className="font-editorial text-sm leading-[1.8] text-stone-600 dark:text-stone-400">
              所有论证从原书具体事件现场起步，用“问—答”连贯段落推动因果追问，避免空洞术语罗列。
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100">
              02. 作者原意与边界分层
            </h3>
            <p className="font-editorial text-sm leading-[1.8] text-stone-600 dark:text-stone-400">
              将作者明确论证与读者“引申、推断、保留标注”分开呈现，在论证末尾附上方法适用边界对照。
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100">
              03. 原典句库与出处核验
            </h3>
            <p className="font-editorial text-sm leading-[1.8] text-stone-600 dark:text-stone-400">
              关键反常识命题标明所属章节与出处类型（中文原著原句，或外文译著加注“原书原句 / 英文回译”），方便检索复核。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
