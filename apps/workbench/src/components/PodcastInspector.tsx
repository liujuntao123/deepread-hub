import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  Download,
  Pause,
  Play,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Volume2,
  X,
} from 'lucide-react';
import type {
  PodcastEpisode,
  PodcastStatusResponse,
  PodcastTtsProvider,
  ProviderTrackState,
  SegmentTiming,
} from '@content/podcast/types';
import {
  CUE_DISPLAY_LABELS_ZH,
  countSpokenCharacters,
  estimateScriptDurationSeconds,
  formatEdgeRate,
  formatMarkdownPodcastScript,
  formatTimeMMSS,
  getEffectiveRatePercent,
  parsePodcastTextTokens,
  toFishAudioText,
  toPlainReadableText,
} from '@content/podcast/script';

type ScriptDisplayMode = 'annotated' | 'fish-tags';

function formatBytes(bytes: number | null): string {
  if (!bytes || bytes <= 0) return '--';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

interface StaticTimingsPayload {
  bookSlug: string;
  provider: PodcastTtsProvider;
  modelName?: string;
  generatedAt?: string;
  durationSec?: number;
  timings: SegmentTiming[];
}

async function fetchStaticTrackState(
  episode: PodcastEpisode,
  provider: PodcastTtsProvider
): Promise<ProviderTrackState> {
  const label = provider === 'edge' ? 'Edge TTS' : 'Fish Audio s2.1-pro-free';
  const defaultModelName =
    provider === 'edge'
      ? `Edge TTS (${episode.hosts.A.edgeVoice} + ${episode.hosts.B.edgeVoice})`
      : `Fish Audio s2.1-pro-free (${episode.hosts.A.fishVoiceTitle} × ${episode.hosts.B.fishVoiceTitle})`;

  const mp3Url = `/${episode.bookSlug}/podcast/${provider}.mp3`;
  const timingsUrl = `/${episode.bookSlug}/podcast/${provider}.timings.json`;

  let timingsPayload: StaticTimingsPayload | null = null;
  try {
    const timingsRes = await fetch(timingsUrl);
    if (timingsRes.ok) {
      const raw = await timingsRes.text();
      if (!raw.trimStart().startsWith('<')) {
        const parsed = JSON.parse(raw) as Partial<StaticTimingsPayload>;
        if (
          parsed &&
          parsed.bookSlug === episode.bookSlug &&
          parsed.provider === provider &&
          Array.isArray(parsed.timings)
        ) {
          timingsPayload = parsed as StaticTimingsPayload;
        }
      }
    }
  } catch {
    timingsPayload = null;
  }

  let audioAvailable = false;
  let fileSizeBytes: number | null = null;
  try {
    const headRes = await fetch(mp3Url, { method: 'HEAD' });
    const contentType = (headRes.headers.get('content-type') ?? '').toLowerCase();
    if (headRes.ok && !contentType.includes('text/html')) {
      audioAvailable = true;
      const lenHeader = headRes.headers.get('content-length');
      const parsedLen = lenHeader ? Number.parseInt(lenHeader, 10) : Number.NaN;
      if (Number.isFinite(parsedLen) && parsedLen > 0) {
        fileSizeBytes = parsedLen;
      }
    } else if (headRes.status === 405 && timingsPayload !== null) {
      audioAvailable = true;
    }
  } catch {
    audioAvailable = timingsPayload !== null;
  }

  if (!audioAvailable) {
    return {
      provider,
      label,
      modelName: defaultModelName,
      available: false,
      audioUrl: null,
      durationSec: null,
      fileSizeBytes: null,
      timings: [],
      generatedAt: null,
    };
  }

  return {
    provider,
    label,
    modelName: timingsPayload?.modelName ?? defaultModelName,
    available: true,
    audioUrl: mp3Url,
    durationSec: timingsPayload?.durationSec ?? null,
    fileSizeBytes,
    timings: timingsPayload?.timings ?? [],
    generatedAt: timingsPayload?.generatedAt ?? null,
  };
}

interface PodcastInspectorProps {
  episode: PodcastEpisode;
}

export const PodcastInspector: React.FC<PodcastInspectorProps> = ({ episode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [status, setStatus] = useState<PodcastStatusResponse | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);

  const [activeProvider, setActiveProvider] = useState<PodcastTtsProvider>('edge');
  const [scriptMode, setScriptMode] = useState<ScriptDisplayMode>('annotated');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [copiedFishScript, setCopiedFishScript] = useState(false);

  // Progressive disclosure states
  const [showMetaPanel, setShowMetaPanel] = useState(false);
  const [expandedActs, setExpandedActs] = useState<Record<string, boolean>>(() => {
    const firstId = episode.acts[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });
  const [scriptQuery, setScriptQuery] = useState('');

  const spokenChars = useMemo(() => countSpokenCharacters(episode.segments), [episode.segments]);
  const estimatedSec = useMemo(
    () => estimateScriptDurationSeconds(episode.segments),
    [episode.segments]
  );

  const loadStatus = async () => {
    setStatusLoading(true);
    setStatusError(null);
    try {
      const [edge, fish] = await Promise.all([
        fetchStaticTrackState(episode, 'edge'),
        fetchStaticTrackState(episode, 'fish'),
      ]);
      const data: PodcastStatusResponse = {
        bookSlug: episode.bookSlug,
        edge,
        fish,
      };
      setStatus(data);
      if (!data.edge.available && data.fish.available) {
        setActiveProvider('fish');
      }
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : '无法读取播客音频状态');
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    void loadStatus();
  }, [episode]);

  const currentTrack: ProviderTrackState | null = useMemo(() => {
    if (!status) return null;
    return activeProvider === 'edge' ? status.edge : status.fish;
  }, [status, activeProvider]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate, currentTrack?.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    if (currentTrack?.durationSec) {
      setDuration(currentTrack.durationSec);
    }
  }, [activeProvider, currentTrack?.audioUrl]);

  const activeTiming: SegmentTiming | null = useMemo(() => {
    if (!currentTrack || currentTrack.timings.length === 0) return null;
    const found = currentTrack.timings.find(
      (t) => currentTime >= t.startSec && currentTime < t.endSec + 0.35
    );
    return found ?? null;
  }, [currentTrack, currentTime]);

  const activeSegment = useMemo(() => {
    if (!activeTiming) return null;
    return episode.segments.find((s) => s.id === activeTiming.segmentId) ?? null;
  }, [episode.segments, activeTiming]);

  // Auto-expand the act currently playing when playback crosses act boundaries
  useEffect(() => {
    if (isPlaying && activeSegment) {
      setExpandedActs((prev) =>
        prev[activeSegment.actId] ? prev : { ...prev, [activeSegment.actId]: true }
      );
    }
  }, [isPlaying, activeSegment?.actId]);

  const timingsMap = useMemo(() => {
    const map = new Map<string, SegmentTiming>();
    if (currentTrack) {
      for (const item of currentTrack.timings) {
        map.set(item.segmentId, item);
      }
    }
    return map;
  }, [currentTrack]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.available) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seekToTime = async (targetSec: number, autoPlay = false) => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.available) return;
    audio.currentTime = Math.max(0, targetSec);
    setCurrentTime(Math.max(0, targetSec));
    if (autoPlay && audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const toggleAct = (actId: string) => {
    setExpandedActs((prev) => ({ ...prev, [actId]: !prev[actId] }));
  };

  const allExpanded = episode.acts.every((a) => Boolean(expandedActs[a.id]));
  const toggleAllActs = () => {
    const nextVal = !allExpanded;
    const next: Record<string, boolean> = {};
    for (const act of episode.acts) {
      next[act.id] = nextVal;
    }
    setExpandedActs(next);
  };

  const handleCopyFishScript = async () => {
    const fullFishText = episode.segments
      .map((seg) =>
        toFishAudioText(seg, {
          includeSpeakerTag: true,
          defaultToneTag: episode.hosts[seg.hostId].fishDefaultToneTag,
        })
      )
      .join('\n');
    try {
      await navigator.clipboard.writeText(fullFishText);
      setCopiedFishScript(true);
      window.setTimeout(() => setCopiedFishScript(false), 1800);
    } catch {
      // ignore
    }
  };

  const handleDownloadMarkdownScript = () => {
    const markdown = formatMarkdownPodcastScript(episode);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${episode.bookSlug}-podcast-script.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const displayDuration = duration || currentTrack?.durationSec || estimatedSec;
  const progressRatio = displayDuration > 0 ? Math.min(1, currentTime / displayDuration) : 0;
  const normalizedQuery = scriptQuery.trim().toLowerCase();

  return (
    <div id="section-podcast" className="space-y-5">
      {/* Compact Episode Intro + Collapsible Production Config Trigger */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <h2 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            {episode.episodeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {episode.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-index text-xs text-stone-500 dark:text-stone-400">
            {episode.acts.length} 幕 · {episode.segments.length} 轮 · {spokenChars.toLocaleString()} 字
          </span>
          <button
            type="button"
            onClick={() => setShowMetaPanel((prev) => !prev)}
            aria-expanded={showMetaPanel}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              showMetaPanel
                ? 'bg-[#EFEAE0] dark:bg-stone-800 border-[#1E3A8A]/40 dark:border-sky-500/40 text-[#1E3A8A] dark:text-sky-300'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-stone-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>声线与准则</span>
            {showMetaPanel ? (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Host Profiles & Production Notes (Default Collapsed) */}
      {showMetaPanel && (
        <div className="p-4 bg-[#F6F2EA]/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(['A', 'B'] as const).map((hostId) => {
              const host = episode.hosts[hostId];
              return (
                <div
                  key={host.id}
                  className="p-3.5 bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded-md space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100">
                      {host.name}
                    </span>
                    <span className="text-[11px] font-medium text-[#1E3A8A] dark:text-sky-400">
                      {host.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {host.personaNote}
                  </p>
                  <div className="pt-1.5 border-t border-stone-100 dark:border-stone-800 text-[11px] font-index text-stone-500 dark:text-stone-400 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>Edge: {host.edgeVoice}</span>
                    <span>
                      Fish: {host.fishVoiceTitle}
                      {host.fishRateOffset ? ` (${formatEdgeRate(host.fishRateOffset)})` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold tracking-wider text-stone-500 dark:text-stone-400">
              制作与文本忠实度准则
            </div>
            <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {episode.productionNotes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-index text-[11px] text-[#1E3A8A] dark:text-sky-400 mt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Compact Sticky Dual-Engine Audio Player */}
      <div
        id="podcast-player"
        className="sticky top-12 z-20 p-4 bg-[#F3EFE6]/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-md shadow-xs space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div
            role="tablist"
            aria-label="切换播客音轨引擎"
            className="inline-flex p-0.5 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeProvider === 'edge'}
              onClick={() => setActiveProvider('edge')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                activeProvider === 'edge'
                  ? 'bg-[#1E3A8A] dark:bg-sky-500 text-white dark:text-stone-950'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Edge TTS{status ? (status.edge.available ? '' : ' (无)') : ''}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeProvider === 'fish'}
              onClick={() => setActiveProvider('fish')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                activeProvider === 'fish'
                  ? 'bg-[#1E3A8A] dark:bg-sky-500 text-white dark:text-stone-950'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Fish s2.1-pro-free{status ? (status.fish.available ? '' : ' (无)') : ''}
            </button>
          </div>

          {currentTrack?.available && currentTrack.audioUrl && (
            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="播放倍速"
                className="inline-flex items-center border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 rounded overflow-hidden text-[11px] font-index"
              >
                {[0.9, 1, 1.15, 1.25].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2 py-1 cursor-pointer transition-colors ${
                      playbackRate === rate
                        ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100 font-semibold'
                        : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {rate === 1 ? '1.0x' : `${rate}x`}
                  </button>
                ))}
              </div>

              <a
                href={currentTrack.audioUrl}
                download={`${episode.bookSlug}-${activeProvider}.mp3`}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap"
              >
                <Download className="w-3 h-3" aria-hidden="true" />
                <span>MP3</span>
              </a>
            </div>
          )}
        </div>

        {statusLoading && !status ? (
          <div className="py-2 text-xs text-stone-500 dark:text-stone-400">
            正在读取播客音频与时间戳…
          </div>
        ) : statusError ? (
          <div className="flex items-center justify-between gap-3 text-xs text-stone-700 dark:text-stone-300">
            <span>读取状态失败：{statusError}</span>
            <button
              type="button"
              onClick={() => void loadStatus()}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-stone-300 dark:border-stone-700 rounded cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" aria-hidden="true" />
              <span>重试</span>
            </button>
          </div>
        ) : currentTrack?.available && currentTrack.audioUrl ? (
          <div className="flex items-center gap-3">
            <audio
              ref={audioRef}
              src={currentTrack.audioUrl}
              preload="metadata"
              onLoadedMetadata={(e) => {
                const dur = e.currentTarget.duration;
                if (Number.isFinite(dur) && dur > 0) {
                  setDuration(dur);
                }
              }}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />

            <button
              type="button"
              onClick={() => void togglePlay()}
              aria-label={isPlaying ? '暂停播放' : '播放播客音频'}
              className="w-9 h-9 rounded-full bg-[#1E3A8A] dark:bg-sky-500 text-white dark:text-stone-950 flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
              )}
            </button>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="truncate font-medium text-stone-900 dark:text-stone-100">
                  {activeSegment
                    ? `${episode.hosts[activeSegment.hostId].name} · ${activeSegment.actTitle}`
                    : currentTrack.modelName}
                </span>
                <span className="font-index text-[11px] text-stone-500 dark:text-stone-400 shrink-0">
                  {formatTimeMMSS(currentTime)} / {formatTimeMMSS(displayDuration)} ·{' '}
                  {formatBytes(currentTrack.fileSizeBytes)} ({Math.round(progressRatio * 100)}%)
                </span>
              </div>
              <input
                aria-label="播客播放进度条"
                type="range"
                min={0}
                max={Math.max(1, displayDuration)}
                step={0.1}
                value={currentTime}
                onChange={(e) => void seekToTime(Number(e.target.value), false)}
                className="w-full h-1.5 accent-[#1E3A8A] dark:accent-sky-400 cursor-pointer block"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-400">
            <Volume2 className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
            <span>
              {activeProvider === 'edge' ? 'Edge TTS' : 'Fish Audio s2.1-pro-free'} 本地音频未生成，可切换另一引擎或运行{' '}
              <code className="font-index px-1 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800">
                npm run podcast:generate -- --book {episode.bookSlug} --provider {activeProvider}
              </code>
            </span>
          </div>
        )}
      </div>

      {/* Script Toolbar: Search + Expand/Collapse All + Format Switch + Export */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <div className="relative flex-1">
            <Search
              className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={scriptQuery}
              onChange={(e) => setScriptQuery(e.target.value)}
              placeholder="检索台词正文或出处锚点…"
              aria-label="检索演播稿"
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-md focus:outline-none focus:border-[#1E3A8A] dark:focus:border-sky-400"
            />
            {scriptQuery && (
              <button
                type="button"
                onClick={() => setScriptQuery('')}
                aria-label="清空台词检索"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleAllActs}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            {allExpanded ? (
              <>
                <ChevronsDownUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>全部收起</span>
              </>
            ) : (
              <>
                <ChevronsUpDown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>全部展开</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div
            role="group"
            aria-label="演播稿显示格式"
            className="inline-flex p-0.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md"
          >
            <button
              type="button"
              onClick={() => setScriptMode('annotated')}
              aria-pressed={scriptMode === 'annotated'}
              className={`px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                scriptMode === 'annotated'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              标注版
            </button>
            <button
              type="button"
              onClick={() => setScriptMode('fish-tags')}
              aria-pressed={scriptMode === 'fish-tags'}
              className={`px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                scriptMode === 'fish-tags'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Fish S2
            </button>
          </div>

          <button
            type="button"
            onClick={() => void handleCopyFishScript()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {copiedFishScript ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>复制 Fish</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdownScript}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>导出 .md</span>
          </button>
        </div>
      </div>

      {/* Collapsible Act Accordions */}
      <div className="space-y-3">
        {episode.acts.map((act) => {
          const rawSegments = episode.segments.filter((s) => s.actId === act.id);
          const actSegments = normalizedQuery
            ? rawSegments.filter((s) => {
                const hay = [
                  toPlainReadableText(s.scriptText),
                  s.sourceRefs.join(' '),
                  s.directionNote ?? '',
                  episode.hosts[s.hostId].name,
                ]
                  .join(' ')
                  .toLowerCase();
                return hay.includes(normalizedQuery);
              })
            : rawSegments;

          if (normalizedQuery && actSegments.length === 0) {
            return null;
          }

          const firstTiming = rawSegments[0] ? timingsMap.get(rawSegments[0].id) : undefined;
          const lastTiming =
            rawSegments[rawSegments.length - 1]
              ? timingsMap.get(rawSegments[rawSegments.length - 1].id)
              : undefined;
          const isActPlaying = activeSegment?.actId === act.id;
          const isExpanded = normalizedQuery ? true : Boolean(expandedActs[act.id]);

          return (
            <div
              key={act.id}
              id={`podcast-${act.id}`}
              className={`border rounded-md overflow-hidden transition-colors ${
                isActPlaying
                  ? 'border-[#1E3A8A]/60 dark:border-sky-500/60 bg-white dark:bg-stone-900/70'
                  : 'border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/45'
              }`}
            >
              {/* Accordion Header */}
              <div className="px-4 py-3 flex items-center justify-between gap-3 bg-[#F6F2EA]/70 dark:bg-stone-950/50">
                <button
                  type="button"
                  onClick={() => toggleAct(act.id)}
                  aria-expanded={isExpanded}
                  className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                  )}
                  <span className="font-index text-xs font-semibold text-[#1E3A8A] dark:text-sky-400 shrink-0">
                    {act.indexLabel}
                  </span>
                  <span className="font-editorial text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                    {act.title}
                  </span>
                  {isActPlaying && (
                    <span className="px-1.5 py-0.5 text-[10px] font-index rounded bg-[#1E3A8A] dark:bg-sky-500 text-white dark:text-stone-950 shrink-0">
                      播放中
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="hidden md:inline text-stone-500 dark:text-stone-400 truncate max-w-[220px]">
                    {act.summary}
                  </span>
                  <span className="font-index text-[11px] text-stone-500 dark:text-stone-400">
                    {actSegments.length} 轮
                    {firstTiming && lastTiming
                      ? ` · ${formatTimeMMSS(firstTiming.startSec)}–${formatTimeMMSS(lastTiming.endSec)}`
                      : ''}
                  </span>
                  {firstTiming && currentTrack?.available && (
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedActs((prev) => ({ ...prev, [act.id]: true }));
                        void seekToTime(firstTiming.startSec, true);
                      }}
                      title={`从${act.indexLabel}起播`}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#1E3A8A] dark:text-sky-400 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded hover:border-[#1E3A8A] dark:hover:border-sky-400 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5" aria-hidden="true" />
                      <span>播本幕</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="divide-y divide-stone-100 dark:divide-stone-800/80 border-t border-stone-200 dark:border-stone-800">
                  {actSegments.map((seg) => {
                    const host = episode.hosts[seg.hostId];
                    const timing = timingsMap.get(seg.id);
                    const isActive = activeTiming?.segmentId === seg.id;
                    const tokens = parsePodcastTextTokens(seg.scriptText);
                    const effectiveRate = getEffectiveRatePercent(seg, activeProvider, episode);

                    return (
                      <article
                        key={seg.id}
                        className={`px-4 py-3.5 transition-colors ${
                          isActive
                            ? 'bg-[#EFEAE0]/90 dark:bg-sky-950/35'
                            : 'hover:bg-stone-50/70 dark:hover:bg-stone-800/30'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                                seg.hostId === 'A'
                                  ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                                  : 'bg-[#1E3A8A]/10 dark:bg-sky-500/15 text-[#1E3A8A] dark:text-sky-300'
                              }`}
                            >
                              {host.name}
                            </span>
                            <span className="font-index text-[11px] text-stone-400 dark:text-stone-500">
                              {seg.id} · 语速 {formatEdgeRate(effectiveRate)} · 间隔 {seg.turnGapMs}ms
                            </span>
                          </div>

                          {timing && (
                            <button
                              type="button"
                              onClick={() => void seekToTime(timing.startSec, true)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-index text-[#1E3A8A] dark:text-sky-400 hover:underline cursor-pointer"
                            >
                              <Play className="w-2.5 h-2.5" aria-hidden="true" />
                              <span>{formatTimeMMSS(timing.startSec)}</span>
                            </button>
                          )}
                        </div>

                        {scriptMode === 'annotated' ? (
                          <p className="font-editorial text-[14.5px] sm:text-[15px] leading-[1.8] text-stone-800 dark:text-stone-200">
                            {tokens.map((tok, i) => {
                              if (tok.type === 'text') {
                                return <React.Fragment key={i}>{tok.value}</React.Fragment>;
                              }
                              if (tok.type === 'pause') {
                                return (
                                  <span
                                    key={i}
                                    className="inline-block mx-1 px-1 py-0.5 text-[10px] font-index bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 rounded align-baseline"
                                  >
                                    {tok.label}
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={i}
                                  className="inline-block mx-1 px-1 py-0.5 text-[10px] font-index bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded align-baseline"
                                >
                                  {CUE_DISPLAY_LABELS_ZH[tok.value] ?? tok.value}
                                </span>
                              );
                            })}
                          </p>
                        ) : (
                          <pre className="font-index text-xs leading-[1.7] text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                            {toFishAudioText(seg, {
                              includeSpeakerTag: true,
                              defaultToneTag: host.fishDefaultToneTag,
                            })}
                          </pre>
                        )}

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                          <div className="flex flex-wrap items-center gap-1">
                            {seg.sourceRefs.map((ref) => (
                              <span
                                key={ref}
                                className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 rounded"
                              >
                                {ref}
                              </span>
                            ))}
                          </div>
                          {seg.directionNote && <span className="italic">{seg.directionNote}</span>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
