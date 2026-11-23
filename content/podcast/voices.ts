import type { PodcastHostId, PodcastHostProfile } from './types';

/**
 * Single source of truth for dual-host voice bindings across all podcast episodes.
 * Changing a voice ID, pitch, tone tag, or rate offset here automatically applies to every episode and test.
 */
export const CANONICAL_VOICE_CONFIG = {
  A: {
    name: '林舟',
    edgeVoice: 'zh-CN-YunjianNeural',
    edgePitch: '+5Hz',
    fishReferenceId: '7bbcf02c0398403fa3048aa9917c7a5f',
    fishVoiceTitle: '主讲男声',
    fishRateOffset: 2,
    fishDefaultToneTag: '[pitch up] [confident]',
    fishTemperature: 0.82,
    fishTopP: 0.8,
  },
  B: {
    name: '苏晴',
    edgeVoice: 'zh-CN-XiaoxiaoNeural',
    edgePitch: '+0Hz',
    fishReferenceId: '048222d36be842f199ec8ac71993dce4',
    fishVoiceTitle: '金',
    fishTemperature: 0.8,
    fishTopP: 0.8,
  },
} as const;

export function createPodcastHosts(overrides: {
  A: Pick<PodcastHostProfile, 'role' | 'personaNote'>;
  B: Pick<PodcastHostProfile, 'role' | 'personaNote'>;
}): Record<PodcastHostId, PodcastHostProfile> {
  return {
    A: {
      id: 'A',
      ...CANONICAL_VOICE_CONFIG.A,
      ...overrides.A,
    },
    B: {
      id: 'B',
      ...CANONICAL_VOICE_CONFIG.B,
      ...overrides.B,
    },
  };
}
