import type { PodcastTtsProvider } from '@content/podcast/types';
import type { VideoStoryboard } from '@pipelines/video/types';

export interface ProbedAudioTrack {
  provider: PodcastTtsProvider;
  available: boolean;
  timingsAvailable: boolean;
  durationSec: number | null;
  fileSizeBytes: number | null;
  generatedAt: string | null;
}

export interface ProbedVideoStatus {
  storyboardAvailable: boolean;
  storyboard: VideoStoryboard | null;
  finalVideoAvailable: boolean;
  finalVideoUrl: string | null;
  finalVideoBytes: number | null;
}

export interface BookArtifactProbe {
  bookSlug: string;
  scriptMdAvailable: boolean;
  edge: ProbedAudioTrack;
  fish: ProbedAudioTrack;
  video: ProbedVideoStatus;
}

async function headStaticFile(url: string): Promise<{ ok: boolean; bytes: number | null }> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const ct = (res.headers.get('content-type') ?? '').toLowerCase();
    if (res.ok && !ct.includes('text/html')) {
      const len = res.headers.get('content-length');
      const parsed = len ? Number.parseInt(len, 10) : Number.NaN;
      return { ok: true, bytes: Number.isFinite(parsed) && parsed > 0 ? parsed : null };
    }
    return { ok: false, bytes: null };
  } catch {
    return { ok: false, bytes: null };
  }
}

async function probeAudioTrack(
  bookSlug: string,
  provider: PodcastTtsProvider
): Promise<ProbedAudioTrack> {
  const mp3Url = `/${bookSlug}/podcast/${provider}.mp3`;
  const timingsUrl = `/${bookSlug}/podcast/${provider}.timings.json`;

  let timingsAvailable = false;
  let durationSec: number | null = null;
  let generatedAt: string | null = null;

  try {
    const res = await fetch(timingsUrl);
    if (res.ok) {
      const raw = await res.text();
      if (!raw.trimStart().startsWith('<')) {
        const parsed = JSON.parse(raw) as {
          bookSlug?: string;
          provider?: string;
          durationSec?: number;
          generatedAt?: string;
          timings?: unknown[];
        };
        if (parsed.bookSlug === bookSlug && Array.isArray(parsed.timings)) {
          timingsAvailable = true;
          durationSec = typeof parsed.durationSec === 'number' ? parsed.durationSec : null;
          generatedAt = typeof parsed.generatedAt === 'string' ? parsed.generatedAt : null;
        }
      }
    }
  } catch {
    // ignore missing timings
  }

  const head = await headStaticFile(mp3Url);

  return {
    provider,
    available: head.ok,
    timingsAvailable,
    durationSec,
    fileSizeBytes: head.bytes,
    generatedAt,
  };
}

async function probeVideoArtifacts(bookSlug: string): Promise<ProbedVideoStatus> {
  const storyboardUrl = `/${bookSlug}/video/storyboard.json`;
  const videoUrl = `/${bookSlug}/video/final.mp4`;

  let storyboard: VideoStoryboard | null = null;
  try {
    const res = await fetch(storyboardUrl);
    if (res.ok) {
      const raw = await res.text();
      if (!raw.trimStart().startsWith('<')) {
        const parsed = JSON.parse(raw) as Partial<VideoStoryboard>;
        if (parsed.bookSlug === bookSlug && Array.isArray(parsed.scenes)) {
          storyboard = parsed as VideoStoryboard;
        }
      }
    }
  } catch {
    storyboard = null;
  }

  const head = await headStaticFile(videoUrl);

  return {
    storyboardAvailable: storyboard !== null,
    storyboard,
    finalVideoAvailable: head.ok,
    finalVideoUrl: head.ok ? videoUrl : null,
    finalVideoBytes: head.bytes,
  };
}

export async function probeBookArtifacts(bookSlug: string): Promise<BookArtifactProbe> {
  const [scriptHead, edge, fish, video] = await Promise.all([
    headStaticFile(`/${bookSlug}/podcast/script.md`),
    probeAudioTrack(bookSlug, 'edge'),
    probeAudioTrack(bookSlug, 'fish'),
    probeVideoArtifacts(bookSlug),
  ]);

  return {
    bookSlug,
    scriptMdAvailable: scriptHead.ok,
    edge,
    fish,
    video,
  };
}
