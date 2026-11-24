import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Film,
  Grid2x2,
  Image,
  Layers,
  Link2,
  Maximize2,
  Play,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import type { BookEntry } from '@content/reading/types';
import { formatTimeMMSS } from '@content/podcast/script';
import type { VideoSceneLayout, VideoStoryboardScene } from '@pipelines/video/types';
import type { ProbedVideoStatus } from '../lib/artifactProbe';

interface VideoSlotPreviewProps {
  book: BookEntry;
  video: ProbedVideoStatus | undefined;
}

function getLayoutBadge(layout: VideoSceneLayout): string {
  switch (layout) {
    case 'ppt-cover':
    case 'act-title-card':
      return '封面';
    case 'ppt-closing':
    case 'closing-card':
      return '尾页';
    case 'ppt-slide':
    case 'editorial-illustration':
      return 'PPT';
    case 'ppt-quote':
    case 'quote-spotlight':
      return '金句';
    case 'data-contrast':
      return '对照';
    default:
      return layout;
  }
}

function formatActShortLabel(actId: string): string {
  const m = /^act-(\d+)$/.exec(actId);
  if (m) return `第${m[1]}幕`;
  return actId;
}

export const VideoSlotPreview: React.FC<VideoSlotPreviewProps> = ({ book, video }) => {
  const storyboard = video?.storyboard ?? null;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerSectionRef = useRef<HTMLDivElement | null>(null);
  const filmstripRef = useRef<HTMLDivElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [selectedActId, setSelectedActId] = useState<string>('all');
  const [anchorsCollapsed, setAnchorsCollapsed] = useState(false);

  // Gallery interactive controls: collapsible + carousel/grid switcher + video-sync
  const [galleryOpen, setGalleryOpen] = useState(true);
  const [galleryMode, setGalleryMode] = useState<'carousel' | 'grid'>('carousel');
  const [syncWithVideo, setSyncWithVideo] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageScenes = useMemo<VideoStoryboardScene[]>(
    () => (storyboard ? storyboard.scenes.filter((s) => Boolean(s.imageFile)) : []),
    [storyboard]
  );

  const actIds = useMemo(() => {
    if (!storyboard) return [];
    const seen = new Set<string>();
    const list: string[] = [];
    for (const s of storyboard.scenes) {
      if (!seen.has(s.actId)) {
        seen.add(s.actId);
        list.push(s.actId);
      }
    }
    return list;
  }, [storyboard]);

  const filteredScenes = useMemo(() => {
    if (!storyboard) return [];
    if (selectedActId === 'all') return storyboard.scenes;
    return storyboard.scenes.filter((s) => s.actId === selectedActId);
  }, [storyboard, selectedActId]);

  const activeSceneId = useMemo(() => {
    if (!storyboard || storyboard.scenes.length === 0) return null;
    const matched = storyboard.scenes.find(
      (s) => currentTime >= s.startSec && currentTime < s.endSec
    );
    return matched?.sceneId ?? storyboard.scenes[0].sceneId;
  }, [storyboard, currentTime]);

  // Reset local indices when switching books
  useEffect(() => {
    setCurrentTime(0);
    setSelectedActId('all');
    setSelectedImageIdx(0);
    setShowPrompt(false);
    setLightboxIndex(null);
  }, [book.slug]);

  // Optionally sync carousel slide with active playing video scene
  useEffect(() => {
    if (!syncWithVideo || !activeSceneId || imageScenes.length === 0) return;
    const matchedImgIdx = imageScenes.findIndex((s) => s.sceneId === activeSceneId);
    if (matchedImgIdx >= 0) {
      setSelectedImageIdx(matchedImgIdx);
    }
  }, [syncWithVideo, activeSceneId, imageScenes]);

  // Keep active filmstrip thumbnail centered smoothly
  useEffect(() => {
    if (galleryMode !== 'carousel' || !filmstripRef.current) return;
    const activeThumb = filmstripRef.current.querySelector<HTMLElement>(
      `[data-thumb-idx="${selectedImageIdx}"]`
    );
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedImageIdx, galleryMode]);

  const cacheVersion = storyboard?.generatedAt
    ? `?v=${encodeURIComponent(storyboard.generatedAt)}`
    : '';

  const jumpToScene = (scene: VideoStoryboardScene, scrollToPlayer = false) => {
    const el = videoRef.current;
    const targetSec = Math.max(0, scene.startSec + 0.05);
    if (el) {
      el.currentTime = targetSec;
      setCurrentTime(targetSec);
      void el.play().catch(() => {
        // Ignore autoplay restriction
      });
    }
    const imgIdx = imageScenes.findIndex((s) => s.sceneId === scene.sceneId);
    if (imgIdx >= 0) {
      setSelectedImageIdx(imgIdx);
    }
    if (scrollToPlayer && playerSectionRef.current) {
      playerSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + imageScenes.length) % imageScenes.length
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % imageScenes.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, imageScenes.length]);

  const safeImageIdx =
    imageScenes.length > 0 ? Math.max(0, Math.min(imageScenes.length - 1, selectedImageIdx)) : 0;
  const currentImageScene = imageScenes[safeImageIdx] ?? null;
  const activeLightboxScene =
    lightboxIndex !== null && imageScenes[lightboxIndex] ? imageScenes[lightboxIndex] : null;

  return (
    <section className="space-y-5">
      {/* Compact Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#1E3A8A] dark:text-sky-400">
            <Film className="w-3.5 h-3.5" aria-hidden="true" />
            <span>产物 4 · 播客视频自动化槽位（手绘 PPT + 零冗余帧合成）</span>
          </div>
          <h2 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            {book.title} 视频成片与配图检视
          </h2>
        </div>
        <span className="font-index text-xs text-stone-500 dark:text-stone-400">
          artifacts/{book.slug}/video/
        </span>
      </div>

      {storyboard ? (
        <div className="space-y-5">
          {/* Top Workspace: Side-by-Side Video Player + Equal-Height Scrollable Timeline Anchors */}
          <div
            ref={playerSectionRef}
            className={`grid grid-cols-1 gap-4 items-stretch ${
              video?.finalVideoAvailable && !anchorsCollapsed
                ? 'lg:grid-cols-[minmax(0,1fr)_330px]'
                : ''
            }`}
          >
            {/* Left: Video Player + Compact Specs Bar */}
            {video?.finalVideoAvailable && video.finalVideoUrl && (
              <div className="space-y-2.5 min-w-0">
                <div className="rounded-md overflow-hidden border border-stone-200 dark:border-stone-800 bg-black shadow-sm">
                  <video
                    ref={videoRef}
                    controls
                    preload="metadata"
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onSeeked={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    className="w-full aspect-video max-h-[460px] block"
                    src={`${video.finalVideoUrl}${cacheVersion}`}
                  />
                </div>
                <div className="px-3 py-2 rounded-md bg-[#F6F2EA] dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-index text-stone-600 dark:text-stone-300">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      {storyboard.width}×{storyboard.height} · {storyboard.fps}fps
                    </span>
                    <span>音轨：{storyboard.audioProvider}</span>
                    <span>
                      {storyboard.scenes.length} 锚点 / {imageScenes.length} 配图
                    </span>
                    <span>时长 {formatTimeMMSS(storyboard.totalDurationSec)}</span>
                  </div>
                  {anchorsCollapsed && (
                    <button
                      type="button"
                      onClick={() => setAnchorsCollapsed(false)}
                      className="text-[#1E3A8A] dark:text-sky-400 hover:underline cursor-pointer"
                    >
                      展开右侧锚点列表
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Right (or Full-Width if no video yet): Pixel-Perfect Equal-Height Scrollable Anchor List */}
            {!anchorsCollapsed && (
              <div className={video?.finalVideoAvailable ? 'lg:relative min-w-0' : 'min-w-0'}>
                <div
                  className={`rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 flex flex-col overflow-hidden ${
                    video?.finalVideoAvailable ? 'lg:absolute lg:inset-0' : ''
                  }`}
                >
                  <div className="shrink-0 px-3 py-2.5 border-b border-stone-200 dark:border-stone-800 bg-[#F6F2EA]/70 dark:bg-stone-900 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100">
                      <Clock className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                      <span>跳转锚点（{filteredScenes.length}/{storyboard.scenes.length}）</span>
                    </div>
                    {video?.finalVideoAvailable && (
                      <button
                        type="button"
                        onClick={() => setAnchorsCollapsed(true)}
                        className="text-[11px] text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 cursor-pointer"
                        title="收起锚点栏，放大播放器"
                      >
                        收起
                      </button>
                    )}
                  </div>

                  {/* Horizontal Act Filter Strip */}
                  {actIds.length > 1 && (
                    <div className="shrink-0 px-2.5 py-2 border-b border-stone-200/80 dark:border-stone-800 flex items-center gap-1 overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedActId('all')}
                        className={`px-2 py-0.5 rounded text-[11px] shrink-0 cursor-pointer transition-colors ${
                          selectedActId === 'all'
                            ? 'bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950 font-semibold'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                        }`}
                      >
                        全部
                      </button>
                      {actIds.map((actId) => (
                        <button
                          key={actId}
                          type="button"
                          onClick={() => setSelectedActId(actId)}
                          className={`px-2 py-0.5 rounded text-[11px] shrink-0 cursor-pointer transition-colors ${
                            selectedActId === actId
                              ? 'bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950 font-semibold'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
                          }`}
                        >
                          {formatActShortLabel(actId)}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Independently Scrollable Compact Anchor Rows */}
                  <div
                    className={`overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/70 ${
                      video?.finalVideoAvailable
                        ? 'max-h-[340px] lg:max-h-none lg:flex-1 lg:min-h-0'
                        : 'max-h-[360px]'
                    }`}
                  >
                    {filteredScenes.map((scene) => {
                      const isActive = activeSceneId === scene.sceneId && video?.finalVideoAvailable;
                      const title =
                        scene.overlay?.headline ?? scene.overlay?.chapterTag ?? scene.sceneId;
                      return (
                        <button
                          key={scene.sceneId}
                          type="button"
                          disabled={!video?.finalVideoAvailable}
                          onClick={() => jumpToScene(scene, false)}
                          className={`w-full px-3 py-2 text-left flex items-center gap-2.5 transition-colors ${
                            video?.finalVideoAvailable ? 'cursor-pointer' : 'cursor-default opacity-75'
                          } ${
                            isActive
                              ? 'bg-[#EEF2FF] dark:bg-sky-950/50'
                              : 'hover:bg-stone-50 dark:hover:bg-stone-800/50'
                          }`}
                        >
                          <span
                            className={`font-index text-[11px] font-semibold px-1.5 py-0.5 rounded shrink-0 inline-flex items-center gap-1 ${
                              isActive
                                ? 'bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" aria-hidden="true" />
                            {formatTimeMMSS(scene.startSec)}
                          </span>
                          <span
                            className={`text-xs truncate flex-1 ${
                              isActive
                                ? 'font-semibold text-[#1E3A8A] dark:text-sky-300'
                                : 'text-stone-700 dark:text-stone-200'
                            }`}
                            title={title}
                          >
                            {title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-400 shrink-0">
                            {getLayoutBadge(scene.layout)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Interactive Panel: Compact Filmstrip Carousel / Scrollable Grid + Collapsible */}
          {imageScenes.length > 0 && (
            <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 overflow-hidden">
              {/* Panel Control Bar */}
              <div className="px-4 py-2.5 bg-[#F6F2EA]/70 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100 cursor-pointer"
                >
                  {galleryOpen ? (
                    <ChevronDown className="w-4 h-4 text-stone-500" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-500" aria-hidden="true" />
                  )}
                  <Image className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                  <span>视频配图检视（{imageScenes.length} 张）</span>
                </button>

                {galleryOpen && (
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Video-sync Toggle */}
                    {video?.finalVideoAvailable && galleryMode === 'carousel' && (
                      <button
                        type="button"
                        onClick={() => setSyncWithVideo((prev) => !prev)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs border transition-colors cursor-pointer ${
                          syncWithVideo
                            ? 'border-[#1E3A8A]/40 bg-[#EEF2FF] text-[#1E3A8A] dark:border-sky-500/40 dark:bg-sky-950/50 dark:text-sky-300 font-medium'
                            : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                        }`}
                        title="开启后，配图轮播将随视频播放进度自动翻页"
                      >
                        <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{syncWithVideo ? '已联动进度' : '手动翻页'}</span>
                      </button>
                    )}

                    {/* View Mode Switcher: Carousel vs Scrollable Grid */}
                    <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setGalleryMode('carousel')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                          galleryMode === 'carousel'
                            ? 'bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950 font-medium'
                            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                        }`}
                      >
                        <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
                        <span>轮播胶片</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGalleryMode('grid')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                          galleryMode === 'grid'
                            ? 'bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950 font-medium'
                            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                        }`}
                      >
                        <Grid2x2 className="w-3 h-3" aria-hidden="true" />
                        <span>滚动网格</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {galleryOpen && (
                <div className="p-4">
                  {galleryMode === 'carousel' && currentImageScene ? (
                    <div className="space-y-3.5">
                      {/* Main Focused Slide Preview (Compact Height) */}
                      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-4 items-stretch">
                        <div className="relative rounded-md border border-stone-200 dark:border-stone-800 bg-white overflow-hidden flex items-center justify-center min-h-[260px] max-h-[360px]">
                          <img
                            src={`/${book.slug}/video/frames/${currentImageScene.imageFile}${cacheVersion}`}
                            alt={currentImageScene.sceneId}
                            onClick={() => setLightboxIndex(safeImageIdx)}
                            className="max-h-[348px] w-full object-contain p-2 cursor-zoom-in"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setSyncWithVideo(false);
                              setSelectedImageIdx(
                                (safeImageIdx - 1 + imageScenes.length) % imageScenes.length
                              );
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-900/65 text-white hover:bg-stone-900 cursor-pointer"
                            aria-label="上一张配图"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSyncWithVideo(false);
                              setSelectedImageIdx((safeImageIdx + 1) % imageScenes.length);
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-900/65 text-white hover:bg-stone-900 cursor-pointer"
                            aria-label="下一张配图"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setLightboxIndex(safeImageIdx)}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded bg-stone-900/65 text-white hover:bg-stone-900 cursor-pointer"
                            title="全屏放大查看"
                          >
                            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Right Side Info & Actions for Current Slide */}
                        <div className="rounded-md border border-stone-200/90 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70 p-3.5 flex flex-col justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-index text-xs font-semibold px-2 py-0.5 rounded bg-[#1E3A8A] text-white dark:bg-sky-500 dark:text-stone-950">
                                {currentImageScene.sceneId}
                              </span>
                              <span className="font-index text-xs text-stone-500 dark:text-stone-400">
                                {safeImageIdx + 1} / {imageScenes.length}
                              </span>
                            </div>

                            {currentImageScene.overlay?.chapterTag && (
                              <div className="text-xs text-stone-500 dark:text-stone-400">
                                {currentImageScene.overlay.chapterTag}
                              </div>
                            )}

                            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                              {currentImageScene.overlay?.headline ?? currentImageScene.imageFile}
                            </h3>

                            <div className="font-index text-xs text-stone-500 dark:text-stone-400">
                              时段：{formatTimeMMSS(currentImageScene.startSec)} –{' '}
                              {formatTimeMMSS(currentImageScene.endSec)}
                            </div>

                            {showPrompt && currentImageScene.imagePrompt && (
                              <div className="max-h-32 overflow-y-auto text-[11px] leading-relaxed text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-950 p-2 rounded border border-stone-200 dark:border-stone-800">
                                {currentImageScene.imagePrompt}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
                            {video?.finalVideoAvailable && (
                              <button
                                type="button"
                                onClick={() => jumpToScene(currentImageScene, true)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#1E3A8A] text-white text-xs font-medium hover:bg-[#1E3A8A]/90 cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                                <span>跳转视频至此页</span>
                              </button>
                            )}
                            {currentImageScene.imagePrompt && (
                              <button
                                type="button"
                                onClick={() => setShowPrompt((prev) => !prev)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer"
                              >
                                <FileText className="w-3 h-3" aria-hidden="true" />
                                <span>{showPrompt ? '隐藏 Prompt' : 'Prompt'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Horizontal Scrollable Filmstrip */}
                      <div
                        ref={filmstripRef}
                        className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5"
                      >
                        {imageScenes.map((scene, idx) => {
                          const selected = idx === safeImageIdx;
                          return (
                            <button
                              key={scene.sceneId}
                              type="button"
                              data-thumb-idx={idx}
                              onClick={() => {
                                setSyncWithVideo(false);
                                setSelectedImageIdx(idx);
                              }}
                              className={`relative shrink-0 w-32 rounded border overflow-hidden bg-white transition-all cursor-pointer text-left ${
                                selected
                                  ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/30 dark:border-sky-400'
                                  : 'border-stone-200 dark:border-stone-700 opacity-75 hover:opacity-100'
                              }`}
                            >
                              <div className="aspect-[3/2] bg-white flex items-center justify-center">
                                <img
                                  src={`/${book.slug}/video/frames/${scene.imageFile}${cacheVersion}`}
                                  alt={scene.sceneId}
                                  className="w-full h-full object-contain p-0.5"
                                  loading="lazy"
                                />
                              </div>
                              <div className="px-1.5 py-1 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-index text-stone-600 dark:text-stone-300">
                                <span>{scene.sceneId.replace('scene-', '#')}</span>
                                <span>{formatTimeMMSS(scene.startSec)}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Scrollable Compact Grid Mode (capped height so it never bloats the page) */
                    <div className="max-h-[460px] overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {imageScenes.map((scene, idx) => {
                        const isActive =
                          activeSceneId === scene.sceneId && video?.finalVideoAvailable;
                        return (
                          <div
                            key={scene.sceneId}
                            className={`rounded-md border overflow-hidden bg-white dark:bg-stone-900/70 flex flex-col ${
                              isActive
                                ? 'border-[#1E3A8A] ring-1 ring-[#1E3A8A]/30 dark:border-sky-400'
                                : 'border-stone-200 dark:border-stone-800'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setLightboxIndex(idx)}
                              className="relative group aspect-[3/2] bg-white border-b border-stone-100 dark:border-stone-800 cursor-zoom-in overflow-hidden"
                            >
                              <img
                                src={`/${book.slug}/video/frames/${scene.imageFile}${cacheVersion}`}
                                alt={scene.sceneId}
                                className="w-full h-full object-contain p-1 group-hover:scale-[1.03] transition-transform"
                                loading="lazy"
                              />
                              <span className="absolute top-1.5 left-1.5 font-index text-[10px] px-1.5 py-0.5 rounded bg-stone-900/70 text-white">
                                {scene.sceneId}
                              </span>
                            </button>
                            <div className="p-2 flex items-center justify-between gap-1.5">
                              <span
                                className="text-[11px] font-medium text-stone-700 dark:text-stone-200 truncate"
                                title={scene.overlay?.headline ?? scene.sceneId}
                              >
                                {scene.overlay?.headline ?? scene.sceneId}
                              </span>
                              {video?.finalVideoAvailable && (
                                <button
                                  type="button"
                                  onClick={() => jumpToScene(scene, true)}
                                  className="font-index text-[10px] px-1.5 py-0.5 rounded bg-[#EEF2FF] text-[#1E3A8A] dark:bg-sky-950/60 dark:text-sky-300 hover:bg-[#1E3A8A] hover:text-white shrink-0 cursor-pointer transition-colors"
                                  title="跳转到视频对应时间"
                                >
                                  {formatTimeMMSS(scene.startSec)}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 rounded-md border border-dashed border-stone-300 dark:border-stone-700 bg-[#F6F2EA]/50 dark:bg-stone-900/40 space-y-4">
          <p className="text-sm text-stone-700 dark:text-stone-300">
            尚未检测到{' '}
            <code className="font-index text-xs px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800">
              artifacts/{book.slug}/video/storyboard.json
            </code>{' '}
            或渲染成片。后续生成后点击顶部「刷新产物」即可在此按锚点跳转播放与检视全部配图。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>1. PPT 时间轴分镜</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                对齐 timings.json 编排 25–30 页手绘 PPT 场景，产出 storyboard.json（入 Git）。
              </p>
            </div>
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Image className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>2. GPT Image 2.5 绘手绘 PPT</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                按统一 styleBible 直出含简洁中文手写注记的手绘信息图 PPT 至 video/frames/，支持单页重绘。
              </p>
            </div>
            <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Layers className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" aria-hidden="true" />
                <span>3. 零冗余帧极速合成</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400">
                仅渲染 N 张 1080p 母版页 + 并行 FFmpeg 平滑转场与悬浮胶囊字幕 → final.mp4。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {activeLightboxScene && activeLightboxScene.imageFile && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-6xl w-full bg-white dark:bg-stone-950 rounded-lg overflow-hidden shadow-2xl border border-stone-700/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-index text-xs font-semibold px-2 py-0.5 rounded bg-[#1E3A8A] text-white">
                  {activeLightboxScene.sceneId}
                </span>
                <span className="text-xs font-index text-stone-500 dark:text-stone-400">
                  {lightboxIndex + 1} / {imageScenes.length}
                </span>
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {activeLightboxScene.overlay?.headline ?? activeLightboxScene.imageFile}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {video?.finalVideoAvailable && (
                  <button
                    type="button"
                    onClick={() => {
                      jumpToScene(activeLightboxScene, true);
                      setLightboxIndex(null);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1E3A8A] text-white text-xs font-medium hover:bg-[#1E3A8A]/90 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                    <span>跳至 {formatTimeMMSS(activeLightboxScene.startSec)}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  aria-label="关闭预览"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative bg-white flex items-center justify-center p-4 max-h-[78vh]">
              <img
                src={`/${book.slug}/video/frames/${activeLightboxScene.imageFile}${cacheVersion}`}
                alt={activeLightboxScene.sceneId}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
              {imageScenes.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + imageScenes.length) % imageScenes.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 cursor-pointer"
                    aria-label="上一张"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % imageScenes.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 cursor-pointer"
                    aria-label="下一张"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
