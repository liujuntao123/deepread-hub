import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Film, Image, Layers, Sparkles } from 'lucide-react';
import type { BookEntry } from '@content/reading/types';
import { formatTimeMMSS } from '@content/podcast/script';
import type { ProbedVideoStatus } from '../lib/artifactProbe';

interface VideoSlotPreviewProps {
  book: BookEntry;
  video: ProbedVideoStatus | undefined;
}

export const VideoSlotPreview: React.FC<VideoSlotPreviewProps> = ({ book, video }) => {
  const storyboard = video?.storyboard ?? null;
  const [expandedSceneId, setExpandedSceneId] = useState<string | null>(null);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400">
            <Film className="w-3.5 h-3.5" aria-hidden="true" />
            <span>产物 4 · 播客视频自动化槽位（GPT Image 2.5 + Remotion）</span>
          </div>
          <h2 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            {book.title} 视频分镜与成片检视
          </h2>
        </div>
        <span className="font-index text-xs text-stone-500 dark:text-stone-400">
          artifacts/{book.slug}/video/
        </span>
      </div>

      {video?.finalVideoAvailable && video.finalVideoUrl && (
        <div className="rounded-md overflow-hidden border border-stone-200 dark:border-stone-800 bg-black">
          <video controls className="w-full max-h-[460px]" src={video.finalVideoUrl} />
        </div>
      )}

      {storyboard ? (
        <div className="space-y-4">
          <div className="p-3.5 rounded-md bg-[#F6F2EA] dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-4 text-xs font-index text-stone-600 dark:text-stone-300">
            <span>画幅：{storyboard.aspectRatio} ({storyboard.width}×{storyboard.height})</span>
            <span>帧率：{storyboard.fps} fps</span>
            <span>音轨：{storyboard.audioProvider}</span>
            <span>场景数：{storyboard.scenes.length}</span>
            <span>总时长：{formatTimeMMSS(storyboard.totalDurationSec)}</span>
          </div>

          <div className="space-y-2">
            {storyboard.scenes.map((scene) => {
              const isOpen = expandedSceneId === scene.sceneId;
              return (
                <div
                  key={scene.sceneId}
                  className="border border-stone-200 dark:border-stone-800 rounded-md overflow-hidden bg-white dark:bg-stone-900/50"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSceneId((prev) => (prev === scene.sceneId ? null : scene.sceneId))
                    }
                    className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                      )}
                      <span className="font-index text-xs font-semibold text-[#1E3A8A] dark:text-sky-400 shrink-0">
                        {scene.sceneId}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                        {scene.layout}
                      </span>
                      <span className="text-xs text-stone-700 dark:text-stone-300 truncate">
                        {scene.overlay?.headline ?? scene.imagePrompt ?? scene.actId}
                      </span>
                    </div>
                    <span className="font-index text-[11px] text-stone-500 dark:text-stone-400 shrink-0">
                      {formatTimeMMSS(scene.startSec)} – {formatTimeMMSS(scene.endSec)}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 border-t border-stone-200 dark:border-stone-800 space-y-3">
                      {scene.imageFile && (
                        <img
                          src={`/${book.slug}/video/frames/${scene.imageFile}`}
                          alt={scene.sceneId}
                          className="w-full max-w-xl aspect-video object-cover rounded border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950"
                          loading="lazy"
                        />
                      )}
                      {scene.imagePrompt && (
                        <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-950/60 p-3 rounded border border-stone-200/80 dark:border-stone-800">
                          <div className="font-index text-[10px] uppercase text-stone-400 mb-1">
                            GPT Image 2.5 Prompt
                          </div>
                          {scene.imagePrompt}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-md border border-dashed border-stone-300 dark:border-stone-700 bg-[#F6F2EA]/50 dark:bg-stone-900/40 space-y-4">
          <p className="text-sm text-stone-700 dark:text-stone-300">
            尚未检测到 <code className="font-index text-xs px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800">artifacts/{book.slug}/video/storyboard.json</code> 或渲染成片。后续生成后点击顶部「刷新产物」即可在此按场景展开审图与预览成片。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>1. 时间轴分镜生成</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                对齐 timings.json 聚合 18–26 个场景，产出 storyboard.json（入 Git）。
              </p>
            </div>
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Image className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>2. GPT Image 2.5 制图</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                按统一 styleBible 绘无字插画至 video/frames/（仅本地保留），支持单帧重绘。
              </p>
            </div>
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Layers className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>3. Remotion 动效合成</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                插画 Ken Burns + 代码渲染清晰中文金句/数据卡 + 双人声波字幕 HUD → final.mp4。
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
