import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface VideoSceneData {
  sceneId: string;
  actId: string;
  startSec: number;
  endSec: number;
  layout:
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
  hosts: {
    A: { name: string; role: string };
    B: { name: string; role: string };
  };
  acts: Array<{ id: string; indexLabel: string; title: string }>;
  scenes: VideoSceneData[];
  subtitles: SubtitleCue[];
}

const FONT_SERIF =
  '"Noto Serif CJK SC", "Source Han Serif SC", "WenQuanYi Zen Hei", "Songti SC", Georgia, serif';
const FONT_SANS =
  '"Noto Sans CJK SC", "Source Han Sans SC", "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", sans-serif';
const FONT_MONO = '"WenQuanYi Zen Hei Mono", "DejaVu Sans Mono", monospace';

function formatTime(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const VoiceWaveBars: React.FC<{ frame: number; active: boolean; color: string }> = ({
  frame,
  active,
  color,
}) => {
  const heights = [0, 1, 2, 3, 4].map((i) => {
    if (!active) return 4;
    const wave = Math.abs(Math.sin(frame * 0.28 + i * 1.15));
    return Math.round(6 + wave * 18);
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 24 }}>
      {heights.map((h, idx) => (
        <div
          key={idx}
          style={{
            width: 3.5,
            height: h,
            borderRadius: 2,
            backgroundColor: color,
            opacity: active ? 0.95 : 0.28,
          }}
        />
      ))}
    </div>
  );
};

export const PodcastVideo: React.FC<PodcastVideoProps> = ({
  bookTitle,
  episodeTitle,
  audioUrl,
  assetBaseUrl,
  totalDurationSec,
  hosts,
  acts,
  scenes,
  subtitles,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const activeScene =
    scenes.find((s) => currentSec >= s.startSec && currentSec < s.endSec) ??
    scenes[scenes.length - 1];

  const activeCue =
    subtitles.find((c) => currentSec >= c.startSec && currentSec < c.endSec) ?? null;

  const activeAct =
    acts.find((a) => a.id === (activeCue?.actId ?? activeScene?.actId)) ?? acts[0];

  const sceneStartFrame = activeScene ? Math.round(activeScene.startSec * fps) : 0;
  const sceneEndFrame = activeScene ? Math.round(activeScene.endSec * fps) : 300;
  const localFrame = Math.max(0, frame - sceneStartFrame);
  const sceneLenFrames = Math.max(15, sceneEndFrame - sceneStartFrame);

  const fadeIn = interpolate(localFrame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(
    localFrame,
    [Math.max(14, sceneLenFrames - 12), sceneLenFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.9 },
  });
  const slideY = interpolate(entrance, [0, 1], [22, 0]);

  const progressRatio =
    totalDurationSec > 0 ? Math.max(0, Math.min(1, currentSec / totalDurationSec)) : 0;

  // Compute gentle Ken Burns transform for illustration scenes
  const kenBurnsProgress = Math.min(1, localFrame / sceneLenFrames);
  let imgTransform = 'scale(1)';
  if (activeScene?.layout === 'editorial-illustration') {
    if (activeScene.motion === 'zoom-in') {
      const s = interpolate(kenBurnsProgress, [0, 1], [1.0, 1.07]);
      imgTransform = `scale(${s.toFixed(4)})`;
    } else if (activeScene.motion === 'zoom-out') {
      const s = interpolate(kenBurnsProgress, [0, 1], [1.07, 1.0]);
      imgTransform = `scale(${s.toFixed(4)})`;
    } else if (activeScene.motion === 'pan-right') {
      const x = interpolate(kenBurnsProgress, [0, 1], [-14, 14]);
      imgTransform = `scale(1.05) translateX(${x.toFixed(2)}px)`;
    } else if (activeScene.motion === 'pan-left') {
      const x = interpolate(kenBurnsProgress, [0, 1], [14, -14]);
      imgTransform = `scale(1.05) translateX(${x.toFixed(2)}px)`;
    }
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FBF9F5',
        color: '#1C1917',
        fontFamily: FONT_SANS,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {audioUrl ? <Audio src={audioUrl} /> : null}

      {/* Top Editorial Header Strip */}
      <div
        style={{
          height: 68,
          padding: '0 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E7E5E4',
          backgroundColor: '#FBF9F5',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 24,
              fontWeight: 700,
              color: '#1C1917',
            }}
          >
            {bookTitle}
          </span>
          <span style={{ color: '#A8A29E', fontSize: 18 }}>|</span>
          <span style={{ fontSize: 18, color: '#57534E', fontWeight: 500 }}>
            {activeAct ? `${activeAct.indexLabel} · ${activeAct.title}` : episodeTitle}
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: '#57534E',
            letterSpacing: '0.03em',
          }}
        >
          {formatTime(currentSec)} / {formatTime(totalDurationSec)}
        </div>
      </div>

      {/* Main Visual Stage */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          padding: '28px 64px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: sceneOpacity,
        }}
      >
        {activeScene?.layout === 'editorial-illustration' && activeScene.imageFile ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* Compact Scene Caption Row */}
            {(activeScene.overlay?.chapterTag || activeScene.overlay?.headline) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 24,
                  transform: `translateY(${slideY * 0.4}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 30,
                    fontWeight: 700,
                    color: '#1C1917',
                  }}
                >
                  {activeScene.overlay?.headline}
                </div>
                {activeScene.overlay?.chapterTag && (
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: '#1E3A8A',
                      backgroundColor: '#EEF2FF',
                      border: '1px solid #C7D2FE',
                      padding: '4px 14px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activeScene.overlay.chapterTag}
                  </div>
                )}
              </div>
            )}

            {/* Pure-White Sketchbook Frame with Ken Burns Motion */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '2px solid #292524',
                boxShadow: '6px 6px 0px #E7E5E4',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Img
                src={`${assetBaseUrl}/video/frames/${activeScene.imageFile}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: imgTransform,
                }}
              />
            </div>
          </div>
        ) : activeScene?.layout === 'act-title-card' ? (
          <div
            style={{
              maxWidth: 1360,
              width: '100%',
              padding: '64px 72px',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '2px solid #292524',
              boxShadow: '8px 8px 0px #E7E5E4',
              transform: `translateY(${slideY}px)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#1E3A8A',
                letterSpacing: '0.06em',
              }}
            >
              {activeScene.overlay?.chapterTag}
            </div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.32,
                color: '#1C1917',
              }}
            >
              {activeScene.overlay?.headline}
            </div>
            {activeScene.overlay?.quoteZh && (
              <div
                style={{
                  marginTop: 8,
                  paddingLeft: 24,
                  borderLeft: '5px solid #E11D48',
                  fontFamily: FONT_SERIF,
                  fontSize: 28,
                  lineHeight: 1.65,
                  color: '#44403C',
                }}
              >
                {activeScene.overlay.quoteZh}
              </div>
            )}
            {activeScene.overlay?.quoteSource && (
              <div style={{ fontSize: 18, color: '#78716C' }}>
                — {activeScene.overlay.quoteSource}
              </div>
            )}
          </div>
        ) : activeScene?.layout === 'data-contrast' ? (
          <div
            style={{
              maxWidth: 1480,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              transform: `translateY(${slideY}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 700 }}>
                {activeScene.overlay?.headline}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1E3A8A' }}>
                {activeScene.overlay?.chapterTag}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {(activeScene.overlay?.statItems ?? []).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    padding: '44px 42px',
                    borderRadius: 14,
                    backgroundColor: item.highlight ? '#FFF1F2' : '#FFFFFF',
                    border: item.highlight ? '2.5px solid #E11D48' : '2px solid #292524',
                    boxShadow: '6px 6px 0px #E7E5E4',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: 32,
                      fontWeight: 700,
                      color: item.highlight ? '#BE123C' : '#1E3A8A',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: 28,
                      lineHeight: 1.65,
                      color: '#292524',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeScene?.layout === 'quote-spotlight' ? (
          <div
            style={{
              maxWidth: 1380,
              width: '100%',
              padding: '64px 76px',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '2.5px solid #1E3A8A',
              boxShadow: '8px 8px 0px #DBEAFE',
              transform: `translateY(${slideY}px)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1E3A8A' }}>
              {activeScene.overlay?.chapterTag}
            </div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 44,
                fontWeight: 700,
                lineHeight: 1.5,
                color: '#1C1917',
              }}
            >
              “{activeScene.overlay?.quoteZh}”
            </div>
            {activeScene.overlay?.quoteEn && (
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: '#57534E',
                }}
              >
                {activeScene.overlay.quoteEn}
              </div>
            )}
            {activeScene.overlay?.quoteSource && (
              <div style={{ fontSize: 20, color: '#78716C', marginTop: 4 }}>
                —— {activeScene.overlay.quoteSource}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              maxWidth: 1260,
              width: '100%',
              padding: '72px 80px',
              backgroundColor: '#1C1917',
              color: '#FBF9F5',
              borderRadius: 16,
              transform: `translateY(${slideY}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 20, color: '#FBBF24', letterSpacing: '0.1em' }}>
              {activeScene?.overlay?.chapterTag}
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 700 }}>
              {activeScene?.overlay?.headline ?? bookTitle}
            </div>
            {activeScene?.overlay?.quoteZh && (
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 28,
                  lineHeight: 1.65,
                  color: '#E7E5E4',
                  maxWidth: 960,
                }}
              >
                {activeScene.overlay.quoteZh}
              </div>
            )}
            {activeScene?.overlay?.quoteSource && (
              <div style={{ fontSize: 18, color: '#A8A29E', marginTop: 8 }}>
                {activeScene.overlay.quoteSource}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Persistent Bottom Podcast HUD (Dual Speaker + Live Subtitle + Progress) */}
      <div
        style={{
          height: 178,
          padding: '16px 64px 20px',
          backgroundColor: '#F6F2EA',
          borderTop: '1px solid #D6D3D1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }}>
          {/* Dual Host Live Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220, flexShrink: 0 }}>
            {(['A', 'B'] as const).map((hid) => {
              const speaking = activeCue?.hostId === hid;
              const accent = hid === 'A' ? '#1E3A8A' : '#BE123C';
              return (
                <div
                  key={hid}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: speaking ? '#FFFFFF' : 'transparent',
                    border: speaking ? `2px solid ${accent}` : '1px solid #D6D3D1',
                    opacity: speaking ? 1 : 0.55,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontSize: 20,
                        fontWeight: 700,
                        color: speaking ? accent : '#44403C',
                      }}
                    >
                      {hosts[hid].name}
                    </span>
                    <span style={{ fontSize: 13, color: '#78716C' }}>
                      {hid === 'A' ? '主讲' : '对谈'}
                    </span>
                  </div>
                  <VoiceWaveBars frame={frame} active={speaking} color={accent} />
                </div>
              );
            })}
          </div>

          {/* Live Synchronized Subtitle Box */}
          <div
            style={{
              flex: 1,
              minHeight: 96,
              padding: '14px 26px',
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              border: '1px solid #E7E5E4',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.48,
                color: '#1C1917',
              }}
            >
              {activeCue ? activeCue.text : `${bookTitle} · 双人整书深读播客`}
            </div>
          </div>
        </div>

        {/* Bottom 7-Act Timeline Bar */}
        <div
          style={{
            height: 6,
            width: '100%',
            backgroundColor: '#E7E5E4',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(progressRatio * 100).toFixed(3)}%`,
              backgroundColor: '#1E3A8A',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
