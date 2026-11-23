import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Film,
  Headphones,
  LayoutGrid,
  Search,
  X,
} from 'lucide-react';
import type { BookEntry } from '@content/reading/types';
import { getPodcastEpisodeByBookSlug } from '@content/podcast/registry';
import type { BookArtifactProbe } from '../lib/artifactProbe';

export type SidebarFilter = 'all' | 'has-podcast' | 'todo-podcast';

interface SidebarNavProps {
  books: BookEntry[];
  probes: Record<string, BookArtifactProbe>;
  mode: 'overview' | 'book';
  selectedSlug: string;
  onSelectOverview: () => void;
  onSelectBook: (slug: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  books,
  probes,
  mode,
  selectedSlug,
  onSelectOverview,
  onSelectBook,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SidebarFilter>('all');

  const filteredBooks = books.filter((book) => {
    const hasEpisode = Boolean(getPodcastEpisodeByBookSlug(book.slug));
    if (filter === 'has-podcast' && !hasEpisode) return false;
    if (filter === 'todo-podcast' && hasEpisode) return false;

    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.slug.toLowerCase().includes(q)
    );
  });

  const podcastReadyCount = books.filter((b) =>
    Boolean(getPodcastEpisodeByBookSlug(b.slug))
  ).length;

  return (
    <aside className="w-full lg:w-76 xl:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800 bg-[#F6F2EA]/75 dark:bg-stone-950/60 flex flex-col lg:h-[calc(100vh-3rem)] lg:sticky lg:top-12">
      {/* Top Overview Switch + Search */}
      <div className="p-3.5 space-y-3 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={onSelectOverview}
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            mode === 'overview'
              ? 'bg-[#1E3A8A] dark:bg-sky-500 text-white dark:text-stone-950 shadow-xs'
              : 'bg-white/80 dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
            <span>全局产物看板</span>
          </span>
          <span
            className={`font-index text-[11px] px-1.5 py-0.5 rounded ${
              mode === 'overview'
                ? 'bg-white/20 dark:bg-stone-950/20'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
            }`}
          >
            {books.length} 部
          </span>
        </button>

        <div className="relative">
          <Search
            className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="筛选作品 / 作者 / slug"
            aria-label="筛选作品列表"
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-md focus:outline-none focus:border-[#1E3A8A] dark:focus:border-sky-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="清空筛选"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1 p-0.5 bg-stone-200/70 dark:bg-stone-900 rounded-md text-[11px]">
          {[
            { id: 'all' as const, label: `全部 (${books.length})` },
            { id: 'has-podcast' as const, label: `有播客 (${podcastReadyCount})` },
            { id: 'todo-podcast' as const, label: `待制 (${books.length - podcastReadyCount})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`py-1 px-1.5 rounded font-medium transition-colors cursor-pointer truncate ${
                filter === item.id
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Works List */}
      <nav
        aria-label="作品导航列表"
        className="flex-1 overflow-y-auto p-2.5 space-y-1.5"
      >
        {filteredBooks.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500 dark:text-stone-400">
            无匹配作品
          </div>
        ) : (
          filteredBooks.map((book) => {
            const isActive = mode === 'book' && book.slug === selectedSlug;
            const episode = getPodcastEpisodeByBookSlug(book.slug);
            const probe = probes[book.slug];
            const audioCount =
              (probe?.edge.available ? 1 : 0) + (probe?.fish.available ? 1 : 0);
            const videoReady = Boolean(probe?.video.finalVideoAvailable);
            const storyboardReady = Boolean(probe?.video.storyboardAvailable);

            return (
              <button
                key={book.slug}
                type="button"
                onClick={() => onSelectBook(book.slug)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left p-3 rounded-md border transition-all cursor-pointer space-y-2 ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 border-[#1E3A8A] dark:border-sky-400 shadow-xs'
                    : 'bg-transparent border-transparent hover:bg-white/70 dark:hover:bg-stone-900/60 hover:border-stone-200 dark:hover:border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div
                      className={`font-editorial text-sm font-bold truncate ${
                        isActive
                          ? 'text-[#1E3A8A] dark:text-sky-400'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {book.title}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {book.author} · {book.publicationYear}
                    </div>
                  </div>
                </div>

                {/* Compact 4-Artifact Status Badges */}
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-index">
                  <span
                    title="产物 1：深度领读已就绪"
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                  >
                    <BookOpen className="w-2.5 h-2.5" aria-hidden="true" />
                    领读
                  </span>

                  <span
                    title={episode ? '产物 2：播客文稿已就绪' : '产物 2：待创作'}
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                      episode
                        ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-stone-200/70 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    <FileText className="w-2.5 h-2.5" aria-hidden="true" />
                    {episode ? '稿' : '待稿'}
                  </span>

                  <span
                    title={`产物 3：双引擎音频 ${audioCount}/2 就绪`}
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                      audioCount === 2
                        ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : audioCount === 1
                          ? 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    <Headphones className="w-2.5 h-2.5" aria-hidden="true" />
                    音 {audioCount}/2
                  </span>

                  <span
                    title={
                      videoReady
                        ? '产物 4：视频成片已就绪'
                        : storyboardReady
                          ? '产物 4：视频分镜已就绪'
                          : '产物 4：视频规划预留'
                    }
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                      videoReady
                        ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : storyboardReady
                          ? 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    <Film className="w-2.5 h-2.5" aria-hidden="true" />
                    {videoReady ? '影' : storyboardReady ? '分镜' : '待影'}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </nav>
    </aside>
  );
};
