export type PodcastHostId = 'A' | 'B';

export type PodcastTtsProvider = 'edge' | 'fish';

export type PauseKind = 'short' | 'medium' | 'long';

export interface PodcastHostProfile {
  id: PodcastHostId;
  name: string;
  role: string;
  personaNote: string;
  edgeVoice: string;
  /** Optional Edge TTS SSML pitch adjustment, e.g. '+5Hz' */
  edgePitch?: string;
  fishReferenceId: string;
  fishVoiceTitle: string;
  /** Optional Fish-only rate offset (%) relative to each segment's baseline ratePercent */
  fishRateOffset?: number;
  /** Optional Fish S2 baseline tone/pitch bracket prefix, e.g. '[pitch up] [confident]' */
  fishDefaultToneTag?: string;
  /** Optional Fish S2 sampling temperature (default ~0.7-0.85 for livelier prosody) */
  fishTemperature?: number;
  /** Optional Fish S2 top_p */
  fishTopP?: number;
}

export interface PodcastSegment {
  id: string;
  actId: string;
  actTitle: string;
  hostId: PodcastHostId;
  /** Conversational text containing inline pause markers [pause:short|medium|long] and optional [cue:chuckle|sigh|soft] */
  scriptText: string;
  /** Relative speaking rate adjustment, e.g. -5 for -5%, +4 for +4% */
  ratePercent: number;
  /** Silence duration in ms before the next speaker turn begins */
  turnGapMs: number;
  /** Source anchors back to 论证地图 / 洞见概览 / Key20 */
  sourceRefs: string[];
  /** Director note explaining why pacing/pause/interjection is placed here */
  directionNote?: string;
}

export interface PodcastAct {
  id: string;
  indexLabel: string;
  title: string;
  summary: string;
}

export interface PodcastEpisode {
  id: string;
  bookSlug: string;
  bookTitle: string;
  episodeTitle: string;
  subtitle: string;
  productionNotes: string[];
  hosts: Record<PodcastHostId, PodcastHostProfile>;
  acts: PodcastAct[];
  segments: PodcastSegment[];
}

export interface SegmentTiming {
  segmentId: string;
  hostId: PodcastHostId;
  startSec: number;
  endSec: number;
  durationSec: number;
}

export interface ProviderTrackState {
  provider: PodcastTtsProvider;
  label: string;
  modelName: string;
  available: boolean;
  audioUrl: string | null;
  durationSec: number | null;
  fileSizeBytes: number | null;
  timings: SegmentTiming[];
  generatedAt: string | null;
}

export interface PodcastStatusResponse {
  bookSlug: string;
  edge: ProviderTrackState;
  fish: ProviderTrackState;
}
