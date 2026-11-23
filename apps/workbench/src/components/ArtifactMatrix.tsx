import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Film,
  Headphones,
} from 'lucide-react';
import type { BookEntry } from '@content/reading/types';
import { getPodcastEpisodeByBookSlug } from '@content/podcast/registry';
import { countSpokenCharacters, formatTimeMMSS } from '@content/podcast/script';
import type { BookArtifactProbe } from '../lib/artifactProbe';

interface ArtifactMatrixProps {
  books: BookEntry[];
  probes: Record<string, BookArtifactProbe>;
  onSelectBook: (slug: string) => void;
}

function formatMb(bytes: number | null): string {
  if (!bytes || bytes <= 0) return '--';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ArtifactMatrix: React.FC<ArtifactMatrixProps> = ({
  books,
  probes,
  onSelectBook,
}) => {
  const scriptCount = books.filter((b) => Boolean(getPodcastEpisodeByBookSlug(b.slug))).length;
  const audioBothCount = books.filter((b) => {
    const p = probes[b.slug];
    return Boolean(p?.edge.available && p?.fish.available);
  }).length;
  const videoCount = books.filter((b) => Boolean(probes[b.slug]?.video.finalVideoAvailable)).length;

  return (
    <section className="space-y-6">
      <div className="space-y-1 pb-4 border-b border-stone-200 dark:border-stone-800">
        <p className="text-xs font-index uppercase tracking-wider text-[#1E3A8A] dark:text-sky-400">
          Overview · artifacts/&lt;slug&gt;/
        </p>
        <h1 className="font-editorial text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          全局产物制作看板
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          点击任意作品行或左侧导航栏条目，即可进入单书制作检视台。
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-[#F6F2EA] dark:bg-stone-900/70">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>产物 1 · 深度领读</span>
          </div>
          <div className="mt-1.5 font-index text-2xl font-bold text-stone-900 dark:text-stone-100">
            {books.length} / {books.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">已发布至公开静态站</p>
        </div>

        <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-[#F6F2EA] dark:bg-stone-900/70">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <FileText className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>产物 2 · 播客文稿</span>
          </div>
          <div className="mt-1.5 font-index text-2xl font-bold text-stone-900 dark:text-stone-100">
            {scriptCount} / {books.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">TS 演播稿 + script.md</p>
        </div>

        <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-[#F6F2EA] dark:bg-stone-900/70">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <Headphones className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>产物 3 · 双引擎音频</span>
          </div>
          <div className="mt-1.5 font-index text-2xl font-bold text-stone-900 dark:text-stone-100">
            {audioBothCount} / {books.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">Edge + Fish 均就绪（本地）</p>
        </div>

        <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-[#F6F2EA] dark:bg-stone-900/70">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <Film className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
            <span>产物 4 · 播客视频</span>
          </div>
          <div className="mt-1.5 font-index text-2xl font-bold text-stone-900 dark:text-stone-100">
            {videoCount} / {books.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">GPT Image 2.5 + Remotion</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-md bg-white dark:bg-stone-900/60">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 bg-[#F6F2EA]/80 dark:bg-stone-950/60 text-xs text-stone-500 dark:text-stone-400">
              <th className="py-3 px-4 font-semibold">作品 / Slug</th>
              <th className="py-3 px-4 font-semibold">产物 1 · 领读</th>
              <th className="py-3 px-4 font-semibold">产物 2 · 文稿</th>
              <th className="py-3 px-4 font-semibold">产物 3 · Edge</th>
              <th className="py-3 px-4 font-semibold">产物 3 · Fish</th>
              <th className="py-3 px-4 font-semibold">产物 4 · 视频</th>
              <th className="py-3 px-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            {books.map((book) => {
              const episode = getPodcastEpisodeByBookSlug(book.slug);
              const probe = probes[book.slug];
              const spokenChars = episode ? countSpokenCharacters(episode.segments) : 0;

              return (
                <tr
                  key={book.slug}
                  onClick={() => onSelectBook(book.slug)}
                  className="cursor-pointer hover:bg-[#F6F2EA]/60 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-editorial font-semibold text-stone-900 dark:text-stone-100">
                      {book.title}
                    </div>
                    <div className="font-index text-[11px] text-stone-500 dark:text-stone-400">
                      {book.slug}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      {book.dataset.chapters.length} 章
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    {episode ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {spokenChars.toLocaleString()} 字
                        </span>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 font-index">
                          md: {probe?.scriptMdAvailable ? '已同步' : '待导出'}
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-stone-400 dark:text-stone-500">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        待创作
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs font-index">
                    {probe?.edge.available ? (
                      <div>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {probe.edge.durationSec ? formatTimeMMSS(probe.edge.durationSec) : '就绪'}
                        </span>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {formatMb(probe.edge.fileSizeBytes)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-stone-400 dark:text-stone-500">
                        {probe?.edge.timingsAvailable ? '缺 MP3' : '未生成'}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs font-index">
                    {probe?.fish.available ? (
                      <div>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {probe.fish.durationSec ? formatTimeMMSS(probe.fish.durationSec) : '就绪'}
                        </span>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {formatMb(probe.fish.fileSizeBytes)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-stone-400 dark:text-stone-500">
                        {probe?.fish.timingsAvailable ? '缺 MP3' : '未生成'}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    {probe?.video.finalVideoAvailable ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        成片就绪
                      </span>
                    ) : probe?.video.storyboardAvailable ? (
                      <span className="text-amber-700 dark:text-amber-400 font-medium">
                        分镜就绪
                      </span>
                    ) : (
                      <span className="text-stone-400 dark:text-stone-500">规划预留</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A8A] dark:text-sky-400">
                      进入
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
