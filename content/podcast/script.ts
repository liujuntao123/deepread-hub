import type {
  PauseKind,
  PodcastEpisode,
  PodcastSegment,
  PodcastTtsProvider,
} from './types';

export const PAUSE_DURATION_MS: Record<PauseKind, number> = {
  short: 350,
  medium: 650,
  long: 1000,
};

export const PAUSE_DISPLAY_LABELS: Record<PauseKind, string> = {
  short: '短停顿 0.35s',
  medium: '停顿 0.65s',
  long: '长停顿 1.0s',
};

export type ScriptToken =
  | { type: 'text'; value: string }
  | { type: 'pause'; kind: PauseKind; durationMs: number; label: string }
  | { type: 'cue'; value: string };

const TOKEN_PATTERN = /\[(pause:(short|medium|long)|cue:([a-z-]+))\]/g;

export function parsePodcastTextTokens(rawText: string): ScriptToken[] {
  const tokens: ScriptToken[] = [];
  let lastIndex = 0;

  for (const match of rawText.matchAll(TOKEN_PATTERN)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      const textSlice = rawText.slice(lastIndex, matchIndex);
      if (textSlice.length > 0) {
        tokens.push({ type: 'text', value: textSlice });
      }
    }

    if (match[2]) {
      const kind = match[2] as PauseKind;
      tokens.push({
        type: 'pause',
        kind,
        durationMs: PAUSE_DURATION_MS[kind],
        label: PAUSE_DISPLAY_LABELS[kind],
      });
    } else if (match[3]) {
      tokens.push({
        type: 'cue',
        value: match[3],
      });
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < rawText.length) {
    const trailing = rawText.slice(lastIndex);
    if (trailing.length > 0) {
      tokens.push({ type: 'text', value: trailing });
    }
  }

  return tokens;
}

export interface EdgeTtsChunk {
  kind: 'speech' | 'silence';
  text?: string;
  silenceMs?: number;
}

/**
 * Converts annotated podcast text into alternating speech chunks and explicit silence
 * durations for Edge TTS + ffmpeg concatenation, since Edge TTS blocks custom SSML <break>.
 */
export function toEdgeTtsChunks(rawText: string): EdgeTtsChunk[] {
  const tokens = parsePodcastTextTokens(rawText);
  const chunks: EdgeTtsChunk[] = [];
  let buffer = '';

  const flushSpeech = () => {
    const cleaned = buffer.replace(/\s+/g, ' ').trim();
    if (cleaned.length > 0) {
      chunks.push({ kind: 'speech', text: cleaned });
    }
    buffer = '';
  };

  for (const token of tokens) {
    if (token.type === 'text') {
      buffer += token.value;
    } else if (token.type === 'pause') {
      flushSpeech();
      chunks.push({ kind: 'silence', silenceMs: token.durationMs });
    } else {
      // Cues like [cue:chuckle] are Fish-Audio expressive instructions; omit literal bracket text for Edge TTS
    }
  }
  flushSpeech();

  return chunks;
}

export function formatEdgeRate(ratePercent: number): string {
  if (ratePercent === 0) return '+0%';
  return ratePercent > 0 ? `+${ratePercent}%` : `${ratePercent}%`;
}

export function getEffectiveRatePercent(
  segment: PodcastSegment,
  provider: PodcastTtsProvider,
  episode?: PodcastEpisode
): number {
  if (provider === 'fish') {
    const offset = episode?.hosts[segment.hostId]?.fishRateOffset ?? 0;
    return segment.ratePercent + offset;
  }
  return segment.ratePercent;
}

export function toFishSpeed(ratePercent: number): number {
  const raw = 1 + ratePercent / 100;
  return Math.max(0.75, Math.min(1.25, Math.round(raw * 100) / 100));
}

export const CUE_TO_FISH_TAG: Record<string, string> = {
  // 情绪状态（Fish Audio S2 官方原生自然语言控制标签）
  excited: '[excited]',
  curious: '[curious]',
  confident: '[confident]',
  surprised: '[surprised]',
  serious: '[serious]',
  calm: '[calm]',
  thoughtful: '[thoughtful]',
  empathetic: '[empathetic]',
  frustrated: '[frustrated]',
  // 声音控制与重音
  emphasis: '[emphasis]',
  whisper: '[whisper]',
  soft: '[soft]',
  'pitch-up': '[pitch up]',
  // 副语言与呼吸声
  chuckle: '[chuckle]',
  laugh: '[laughing]',
  sigh: '[sigh]',
  inhale: '[inhale]',
  tsk: '[tsk]',
};

export const CUE_DISPLAY_LABELS_ZH: Record<string, string> = {
  excited: '振奋',
  curious: '好奇',
  confident: '笃定',
  surprised: '惊讶',
  serious: '严肃',
  calm: '沉静',
  thoughtful: '沉思',
  empathetic: '共情',
  frustrated: '无奈',
  emphasis: '重音强调',
  whisper: '耳语低声',
  soft: '轻柔',
  'pitch-up': '抬高语调',
  chuckle: '轻笑',
  laugh: '笑声',
  sigh: '轻叹',
  inhale: '吸气起势',
  tsk: '啧声感叹',
};

const PAUSE_TO_FISH_TAG: Record<PauseKind, string> = {
  short: '[short pause]',
  medium: '[pause]',
  long: '[long pause]',
};

const LOW_ENERGY_FISH_TAG_PREFIX = /^\[(whisper|soft|softly|sigh|serious|calm)\]/i;

function applyDefaultFishToneTag(text: string, defaultToneTag?: string): string {
  const trimmedDefault = defaultToneTag?.trim();
  if (!trimmedDefault || !text) {
    return text;
  }
  if (LOW_ENERGY_FISH_TAG_PREFIX.test(text) || text.startsWith(trimmedDefault)) {
    return text;
  }
  return `${trimmedDefault} ${text}`;
}

/**
 * Formats a segment for Fish Audio S2 / s2.1-pro-free using natural-language bracket tags
 * and optional <|speaker:N|> multi-speaker tags.
 */
export function toFishAudioText(
  segment: PodcastSegment,
  options: { includeSpeakerTag?: boolean; defaultToneTag?: string } = {}
): string {
  const tokens = parsePodcastTextTokens(segment.scriptText);
  const parts: string[] = [];

  for (const token of tokens) {
    if (token.type === 'text') {
      parts.push(token.value);
    } else if (token.type === 'pause') {
      parts.push(` ${PAUSE_TO_FISH_TAG[token.kind]} `);
    } else if (token.type === 'cue') {
      const fishTag = CUE_TO_FISH_TAG[token.value];
      if (fishTag) {
        parts.push(`${fishTag} `);
      }
    }
  }

  const rawBody = parts.join('').replace(/\s{2,}/g, ' ').trim();
  const body = applyDefaultFishToneTag(rawBody, options.defaultToneTag);
  if (options.includeSpeakerTag) {
    const speakerIndex = segment.hostId === 'A' ? 0 : 1;
    return `<|speaker:${speakerIndex}|>${body}`;
  }
  return body;
}

/**
 * Splits a Fish Audio segment on medium/long pauses if needed for deterministic timing,
 * keeping [short pause] inline for natural prosody.
 */
export function toFishAudioChunks(rawText: string, defaultToneTag?: string): EdgeTtsChunk[] {
  const tokens = parsePodcastTextTokens(rawText);
  const chunks: EdgeTtsChunk[] = [];
  let buffer = '';

  const flushSpeech = () => {
    const cleaned = buffer.replace(/\s{2,}/g, ' ').trim();
    if (cleaned.length > 0) {
      chunks.push({
        kind: 'speech',
        text: applyDefaultFishToneTag(cleaned, defaultToneTag),
      });
    }
    buffer = '';
  };

  for (const token of tokens) {
    if (token.type === 'text') {
      buffer += token.value;
    } else if (token.type === 'pause') {
      if (token.kind === 'short') {
        buffer += ' [short pause] ';
      } else {
        flushSpeech();
        chunks.push({ kind: 'silence', silenceMs: token.durationMs });
      }
    } else if (token.type === 'cue') {
      const fishTag = CUE_TO_FISH_TAG[token.value];
      if (fishTag) {
        buffer += `${fishTag} `;
      }
    }
  }
  flushSpeech();

  return chunks;
}

export function toPlainReadableText(rawText: string): string {
  return parsePodcastTextTokens(rawText)
    .filter((t) => t.type === 'text')
    .map((t) => t.value)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countSpokenCharacters(segments: PodcastSegment[]): number {
  return segments.reduce((sum, seg) => {
    const plain = toPlainReadableText(seg.scriptText).replace(/[，。！？、；：“”‘’（）《》…—\s,.!?]/g, '');
    return sum + plain.length;
  }, 0);
}

export function estimateScriptDurationSeconds(segments: PodcastSegment[]): number {
  let totalSec = 0;
  for (const seg of segments) {
    const tokens = parsePodcastTextTokens(seg.scriptText);
    const baseCharsPerSec = 4.5 * (1 + seg.ratePercent / 100);
    for (const token of tokens) {
      if (token.type === 'text') {
        const cleanLen = token.value.replace(/\s+/g, '').length;
        totalSec += cleanLen / baseCharsPerSec;
      } else if (token.type === 'pause') {
        totalSec += token.durationMs / 1000;
      }
    }
    totalSec += seg.turnGapMs / 1000;
  }
  return Math.round(totalSec);
}

export function formatTimeMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function formatMarkdownPodcastScript(episode: PodcastEpisode): string {
  const lines: string[] = [
    `# ${episode.episodeTitle}`,
    '',
    `> ${episode.subtitle}`,
    '',
    '## 演播角色与声线配置',
    `- **${episode.hosts.A.name}（${episode.hosts.A.role}）**：Edge TTS \`${episode.hosts.A.edgeVoice}\`${episode.hosts.A.edgePitch ? `（音高 ${episode.hosts.A.edgePitch}）` : ''} ｜ Fish Audio \`${episode.hosts.A.fishVoiceTitle}\` (\`${episode.hosts.A.fishReferenceId}\`)${episode.hosts.A.fishRateOffset ? `（Fish 语速偏置 ${formatEdgeRate(episode.hosts.A.fishRateOffset)}）` : ''}${episode.hosts.A.fishDefaultToneTag ? `（基调 \`${episode.hosts.A.fishDefaultToneTag}\`）` : ''}`,
    `- **${episode.hosts.B.name}（${episode.hosts.B.role}）**：Edge TTS \`${episode.hosts.B.edgeVoice}\`${episode.hosts.B.edgePitch ? `（音高 ${episode.hosts.B.edgePitch}）` : ''} ｜ Fish Audio \`${episode.hosts.B.fishVoiceTitle}\` (\`${episode.hosts.B.fishReferenceId}\`)${episode.hosts.B.fishRateOffset ? `（Fish 语速偏置 ${formatEdgeRate(episode.hosts.B.fishRateOffset)}）` : ''}${episode.hosts.B.fishDefaultToneTag ? `（基调 \`${episode.hosts.B.fishDefaultToneTag}\`）` : ''}`,
    '',
    '## 停顿、语气与节奏标记说明',
    '- `[pause:short]`：句内换气/转折停顿（350ms），Fish Audio 映射为 `[short pause]`，Edge TTS 切片插入静音。',
    '- `[pause:medium]`：反常识落点或逻辑切分停顿（650ms），给听众消化时间。',
    '- `[pause:long]`：幕间转场停顿（1000ms）。',
    '- `[cue:*]`：Fish Audio S2 情绪、重音与副语言控制标签（如 `excited` / `curious` / `confident` / `emphasis` / `chuckle` / `tsk` / `sigh` 等），Edge TTS 自动剥离。',
    '- `语速微调`：常规对谈 `+0% ~ +4%`，重磅原典引述 `-4% ~ -6%`。',
    '',
    '## 制作与忠实度准则',
    ...episode.productionNotes.map((note, idx) => `${idx + 1}. ${note}`),
    '',
  ];

  let currentActId = '';
  for (const seg of episode.segments) {
    if (seg.actId !== currentActId) {
      currentActId = seg.actId;
      const act = episode.acts.find((a) => a.id === currentActId);
      if (act) {
        lines.push(`## ${act.indexLabel} · ${act.title}`, '', `_${act.summary}_`, '');
      }
    }
    const host = episode.hosts[seg.hostId];
    const readable = parsePodcastTextTokens(seg.scriptText)
      .map((token) => {
        if (token.type === 'text') return token.value;
        if (token.type === 'pause') return `〔${token.label}〕`;
        return `〔语气:${CUE_DISPLAY_LABELS_ZH[token.value] ?? token.value}〕`;
      })
      .join('');
    lines.push(
      `### ${host.name}（语速 ${formatEdgeRate(seg.ratePercent)}｜句末间隔 ${seg.turnGapMs}ms）`,
      readable,
      `- 出处锚点：${seg.sourceRefs.join(' · ')}`,
      ''
    );
  }

  return lines.join('\n');
}
