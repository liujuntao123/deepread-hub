import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface VideoSceneData {
  sceneId: string;
  actId: string;
  startSec: number;
  endSec: number;
  layout:
    | 'ppt-cover'
    | 'ppt-slide'
    | 'ppt-quote'
    | 'ppt-closing'
    | 'act-title-card'
    | 'editorial-illustration'
    | 'quote-spotlight'
    | 'data-contrast'
    | 'closing-card';
  motion: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'static';
  imageFile?: string;
  overlay?: {
    chapterTag?: string;
    headline?: string;
    subtitleText?: string;
    quoteZh?: string;
    quoteEn?: string;
    quoteSource?: string;
    statItems?: Array<{
      label: string;
      value: string;
      highlight?: boolean;
    }>;
  };
}

export interface SubtitleCue {
  id: string;
  actId: string;
  hostId: 'A' | 'B';
  startSec: number;
  endSec: number;
  text: string;
}

export interface PodcastVideoProps {
  bookTitle: string;
  episodeTitle: string;
  audioUrl: string;
  assetBaseUrl: string;
  fps: number;
  width: number;
  height: number;
  totalDurationSec: number;
  acts: Array<{ id: string; indexLabel: string; title: string }>;
  scenes: VideoSceneData[];
  subtitles: SubtitleCue[];
  /** When set, renders a single crisp still slide for fast FFmpeg assembly */
  forceSceneIndex?: number;
  /** When true, omits subtitle overlay so FFmpeg burns styled subtitles cleanly */
  hideSubtitle?: boolean;
}

const FONT_SERIF =
  '"DeepReadSerif", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", Georgia, serif';
const FONT_SANS =
  '"DeepReadSans", "Noto Sans CJK SC", "Source Han Sans SC", "PingFang SC", sans-serif';
const FONT_MONO = '"DejaVu Sans Mono", "Ubuntu Mono", monospace';

export const PodcastVideo: React.FC<PodcastVideoProps> = ({
  bookTitle,
  audioUrl,
  assetBaseUrl,
  totalDurationSec,
  acts,
  scenes,
  subtitles,
  forceSceneIndex,
  hideSubtitle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isStillMode = typeof forceSceneIndex === 'number' || hideSubtitle;
  const activeSceneIndex = typeof forceSceneIndex === 'number'
    ? Math.max(0, Math.min(scenes.length - 1, forceSceneIndex))
    : Math.max(
        0,
        scenes.findIndex((s) => frame / fps >= s.startSec && frame / fps < s.endSec)
      );

  const activeScene = scenes[activeSceneIndex] ?? scenes[scenes.length - 1];
  const currentSec = isStillMode
    ? (activeScene?.startSec ?? 0) + ((activeScene?.endSec ?? 1) - (activeScene?.startSec ?? 0)) * 0.5
    : frame / fps;

  const activeCue = hideSubtitle
    ? null
    : subtitles.find((c) => currentSec >= c.startSec && currentSec < c.endSec) ?? null;

  const activeAct =
    acts.find((a) => a.id === activeScene?.actId) ?? acts[0];

  const sceneStartFrame = activeScene ? Math.round(activeScene.startSec * fps) : 0;
  const localFrame = isStillMode ? 30 : Math.max(0, frame - sceneStartFrame);
  const fadeIn = isStillMode
    ? 1
    : interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  const totalSlides = Math.max(1, scenes.length);
  const slideProgressRatio = isStillMode
    ? (activeSceneIndex + 1) / totalSlides
    : totalDurationSec > 0
      ? Math.max(0, Math.min(1, currentSec / totalDurationSec))
      : 0;

  const slideNumLabel = `${String(activeSceneIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
  const layout = activeScene?.layout ?? 'ppt-slide';
  const isDarkSlide = layout === 'ppt-closing' || layout === 'closing-card';

  const fontFaceCss = assetBaseUrl
    ? `
      @font-face {
        font-family: 'DeepReadSerif';
        src: url('${assetBaseUrl}/__fonts/NotoSerifCJKsc-Bold.otf') format('opentype');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'DeepReadSans';
        src: url('${assetBaseUrl}/__fonts/NotoSansCJKsc-Medium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: 'DeepReadSans';
        src: url('${assetBaseUrl}/__fonts/NotoSansCJKsc-Bold.otf') format('opentype');
        font-weight: 700;
        font-style: normal;
      }
    `
    : '';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isDarkSlide ? '#171615' : layout === 'ppt-cover' ? '#FAF7F2' : '#FFFFFF',
        color: isDarkSlide ? '#FAF8F5' : '#1C1917',
        fontFamily: FONT_SANS,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {fontFaceCss ? <style>{fontFaceCss}</style> : null}
      {audioUrl && !isStillMode ? <Audio src={audioUrl} /> : null}

      {/* Full-Canvas PPT Slide Stage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: fadeIn,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {(layout === 'ppt-slide' || layout === 'editorial-illustration') && activeScene?.imageFile ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFFFF',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '52px 52px 108px',
              boxSizing: 'border-box',
            }}
          >
            {/* Whisper-minimal Editorial PPT Corner Meta (No clunky top bar!) */}
            <div
              style={{
                position: 'absolute',
                top: 22,
                left: 44,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                zIndex: 5,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#E11D48',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#57534E',
                  letterSpacing: '0.04em',
                }}
              >
                {activeScene.overlay?.chapterTag ?? activeAct?.title ?? bookTitle}
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 22,
                right: 44,
                fontFamily: FONT_MONO,
                fontSize: 16,
                fontWeight: 600,
                color: '#A8A29E',
                letterSpacing: '0.08em',
                zIndex: 5,
              }}
            >
              {slideNumLabel}
            </div>

            {/* Seamless Full-Bleed Hand-Drawn PPT Illustration (Zero Heavy Frame Borders) */}
            <Img
              src={`${assetBaseUrl}/video/frames/${activeScene.imageFile}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : layout === 'ppt-cover' || layout === 'act-title-card' ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FAF7F2',
              position: 'relative',
              padding: '88px 136px 136px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Subtle Swiss Editorial Margin Hairlines */}
            <div
              style={{
                position: 'absolute',
                top: 44,
                left: 64,
                right: 64,
                height: 1,
                backgroundColor: '#E7E0D6',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 64,
                fontSize: 16,
                fontWeight: 700,
                color: '#78716C',
                letterSpacing: '0.14em',
              }}
            >
              DEEPREAD · 全书视觉精读
            </div>
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 64,
                fontFamily: FONT_MONO,
                fontSize: 16,
                color: '#A8A29E',
                letterSpacing: '0.08em',
              }}
            >
              {slideNumLabel}
            </div>

            {/* Giant Faint Editorial Watermark */}
            <div
              style={{
                position: 'absolute',
                right: 110,
                top: 100,
                fontFamily: FONT_SERIF,
                fontSize: 340,
                fontWeight: 700,
                lineHeight: 1,
                color: '#EFE8DC',
                userSelect: 'none',
              }}
            >
              01
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280 }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: 999,
                  backgroundColor: '#FEE2E2',
                  color: '#BE123C',
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: 28,
                }}
              >
                {activeScene?.overlay?.chapterTag ?? '全书视觉精读'}
              </div>

              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 106,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: '#18181B',
                  letterSpacing: '0.04em',
                  marginBottom: 24,
                }}
              >
                {activeScene?.overlay?.headline ?? bookTitle}
              </div>

              {activeScene?.overlay?.subtitleText && (
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: '#44403C',
                    marginBottom: 36,
                    letterSpacing: '0.02em',
                  }}
                >
                  {activeScene.overlay.subtitleText}
                </div>
              )}

              {/* Hand-drawn Crayon Accent Rule (SVG) */}
              <svg
                width="340"
                height="16"
                viewBox="0 0 340 16"
                fill="none"
                style={{ marginBottom: 38 }}
              >
                <path
                  d="M3 10C78 4 196 13 336 6"
                  stroke="#E11D48"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>

              {activeScene?.overlay?.quoteZh && (
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 32,
                    lineHeight: 1.68,
                    color: '#292524',
                    maxWidth: 1120,
                    marginBottom: 26,
                  }}
                >
                  “{activeScene.overlay.quoteZh}”
                </div>
              )}

              {activeScene?.overlay?.quoteSource && (
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#78716C',
                    letterSpacing: '0.04em',
                  }}
                >
                  — {activeScene.overlay.quoteSource}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Editorial Deep-Ink Closing / Spotlight PPT Slide */
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#171615',
              color: '#FAF8F5',
              position: 'relative',
              padding: '92px 150px 140px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 44,
                left: 64,
                right: 64,
                height: 1,
                backgroundColor: '#2E2B28',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 64,
                fontSize: 16,
                fontWeight: 700,
                color: '#A8A29E',
                letterSpacing: '0.14em',
              }}
            >
              {activeScene?.overlay?.chapterTag ?? '全书终极命题'}
            </div>
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 64,
                fontFamily: FONT_MONO,
                fontSize: 16,
                color: '#78716C',
                letterSpacing: '0.08em',
              }}
            >
              {slideNumLabel}
            </div>

            <div style={{ maxWidth: 1420 }}>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 64,
                  fontWeight: 700,
                  color: '#FBBF24',
                  lineHeight: 1.25,
                  marginBottom: 30,
                }}
              >
                {activeScene?.overlay?.headline ?? bookTitle}
              </div>

              <svg
                width="260"
                height="14"
                viewBox="0 0 260 14"
                fill="none"
                style={{ marginBottom: 40 }}
              >
                <path
                  d="M3 8C72 3 162 12 256 6"
                  stroke="#E11D48"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>

              {activeScene?.overlay?.quoteZh && (
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 38,
                    lineHeight: 1.72,
                    color: '#F5F5F4',
                    marginBottom: 42,
                  }}
                >
                  “{activeScene.overlay.quoteZh}”
                </div>
              )}

              {activeScene?.overlay?.quoteSource && (
                <div
                  style={{
                    fontSize: 22,
                    color: '#A8A29E',
                    letterSpacing: '0.06em',
                  }}
                >
                  —— {activeScene.overlay.quoteSource}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sleek Floating Cinema Subtitle (Hidden cleanly during silence or still-export mode) */}
      {!hideSubtitle && activeCue ? (
        <div
          style={{
            position: 'absolute',
            left: 96,
            right: 96,
            bottom: 34,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(22, 21, 20, 0.84)',
              color: '#FAFAF9',
              padding: '12px 30px',
              borderRadius: 12,
              fontFamily: FONT_SANS,
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: '0.03em',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
            }}
          >
            {activeCue.text}
          </div>
        </div>
      ) : null}

      {/* Whisper-thin 3px Bottom Editorial Progress Line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 4,
          backgroundColor: isDarkSlide ? 'rgba(255,255,255,0.08)' : 'rgba(28,25,23,0.06)',
          zIndex: 30,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(slideProgressRatio * 100).toFixed(2)}%`,
            backgroundColor: '#E11D48',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
