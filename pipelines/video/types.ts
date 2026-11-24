import type { PodcastTtsProvider } from '../../content/podcast/types';

export type VideoAspectRatio = '16:9' | '9:16';

export type VideoSceneLayout =
  | 'ppt-cover'
  | 'ppt-slide'
  | 'ppt-quote'
  | 'ppt-closing'
  | 'act-title-card'
  | 'editorial-illustration'
  | 'quote-spotlight'
  | 'data-contrast'
  | 'closing-card';

export type KenBurnsMotion = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'static';

export interface VideoStyleBible {
  /** Shared art-direction prefix prepended to every GPT Image 2.5 prompt */
  promptPrefix: string;
  /** Shared finish and composition suffix appended to every prompt */
  promptSuffix: string;
  /** Book-specific accent palette aligned with the reading UI */
  palette: {
    paperBg: string;
    inkPrimary: string;
    accent: string;
  };
}

export interface VideoSceneOverlay {
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
}

export interface VideoStoryboardScene {
  sceneId: string;
  actId: string;
  startSegmentId: string;
  endSegmentId: string;
  /** Resolved directly from artifacts/<slug>/podcast/<provider>.timings.json */
  startSec: number;
  endSec: number;
  layout: VideoSceneLayout;
  motion: KenBurnsMotion;
  /** Illustration prompt for GPT Image 2.5 (recommended for all slides including hand-drawn ppt-cover and ppt-closing) */
  imagePrompt?: string;
  /** Relative filename under artifacts/<slug>/video/frames/, e.g. "scene-02.png" */
  imageFile?: string;
  /** SHA-256 prefix of (styleBible + imagePrompt) for incremental re-roll caching */
  promptHash?: string;
  overlay?: VideoSceneOverlay;
}

export interface DeclarativeVideoScene {
  sceneId: string;
  actId: string;
  startSegmentId: string;
  endSegmentId: string;
  layout: VideoSceneLayout;
  motion: KenBurnsMotion;
  imagePrompt?: string;
  imageFile?: string;
  overlay?: VideoSceneOverlay;
}

export interface BookVideoPlan {
  bookSlug: string;
  scenes: DeclarativeVideoScene[];
}

export interface VideoStoryboard {
  schemaVersion: '1.0';
  bookSlug: string;
  bookTitle: string;
  episodeTitle: string;
  audioProvider: PodcastTtsProvider;
  aspectRatio: VideoAspectRatio;
  fps: number;
  width: number;
  height: number;
  totalDurationSec: number;
  generatedAt: string;
  styleBible: VideoStyleBible;
  scenes: VideoStoryboardScene[];
}
