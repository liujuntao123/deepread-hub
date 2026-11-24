import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOKS_CATALOG } from '../reading/registry';
import type { ChapterProposition } from '../reading/types';
import {
  CUE_TO_FISH_TAG,
  countSpokenCharacters,
  estimateScriptDurationSeconds,
  formatEdgeRate,
  formatMarkdownPodcastScript,
  formatTimeMMSS,
  getEffectiveRatePercent,
  parsePodcastTextTokens,
  toEdgeTtsChunks,
  toFishAudioChunks,
  toFishAudioText,
  toFishSpeed,
  toPlainReadableText,
} from './script';
import {
  AMUSING_FULL_PODCAST,
  PODCAST_EPISODES,
  getPodcastEpisodeByBookSlug,
} from './registry';
import { CANONICAL_VOICE_CONFIG } from './voices';

/**
 * External web/UI context leakage patterns forbidden inside spoken `scriptText`.
 * Kept context-aware so natural Chinese phrases (e.g. "第一条铁律") are never falsely rejected.
 */
const EXTERNAL_CONTEXT_LEAKAGE_PATTERNS: RegExp[] = [
  /Key20/i,
  /论证地图/,
  /洞见概览/,
  /深度领读集/,
  /页面里/,
  /十二个单元/,
  /(Key20|句库|命题库|清单|榜单).{0,6}第[一二三四五六七八九十百\d]+条/i,
  /第[一二三四五六七八九十百\d]+条(命题|金句|句库|反常识)/,
  /最后一条(命题|金句|句库|反常识)/,
];

function deriveRequiredSourceRefs(chapters: ChapterProposition[]): string[] {
  const refs = new Set<string>(['论证地图', '洞见概览', 'Key20', '方法与边界']);
  for (const ch of chapters) {
    if (ch.chapterTitle.includes('后记') && ch.chapterTitle.includes('附录')) {
      refs.add('后记');
      refs.add('附录');
    } else if (ch.chapterTitle.includes('后记')) {
      refs.add('后记');
    } else if (ch.indexLabel === '前言') {
      refs.add('前言');
    } else if (ch.indexLabel === '序言') {
      refs.add('序言');
    } else if (ch.indexLabel === '序') {
      refs.add('序');
    } else if (/^\d+$/.test(ch.indexLabel)) {
      refs.add(`第${Number.parseInt(ch.indexLabel, 10)}章`);
    }
  }
  return Array.from(refs);
}

test('parsePodcastTextTokens parses pause and cue markers cleanly', () => {
  const tokens = parsePodcastTextTokens(
    '先说一个现场。[pause:short][cue:chuckle]八十分钟没广告，[pause:medium]结果反而像选美。'
  );
  assert.equal(tokens.length, 6);
  assert.deepEqual(tokens[1], {
    type: 'pause',
    kind: 'short',
    durationMs: 350,
    label: '短停顿 0.35s',
  });
  assert.deepEqual(tokens[2], { type: 'cue', value: 'chuckle' });
  assert.deepEqual(tokens[4], {
    type: 'pause',
    kind: 'medium',
    durationMs: 650,
    label: '停顿 0.65s',
  });
});

test('toEdgeTtsChunks splits pauses into silence blocks and strips Fish cue tags', () => {
  const chunks = toEdgeTtsChunks(
    '第一句。[pause:short][cue:chuckle]第二句。[pause:long]第三句。'
  );
  assert.deepEqual(chunks, [
    { kind: 'speech', text: '第一句。' },
    { kind: 'silence', silenceMs: 350 },
    { kind: 'speech', text: '第二句。' },
    { kind: 'silence', silenceMs: 1000 },
    { kind: 'speech', text: '第三句。' },
  ]);
});

test('toFishAudioText and toFishAudioChunks map speaker tags, expanded S2 cues, defaultToneTag, and bracket pauses', () => {
  const seg = AMUSING_FULL_PODCAST.segments[0];
  const tagged = toFishAudioText(seg, {
    includeSpeakerTag: true,
    defaultToneTag: CANONICAL_VOICE_CONFIG.A.fishDefaultToneTag,
  });
  assert.ok(tagged.startsWith('<|speaker:0|>[pitch up] [confident] '));
  assert.ok(!tagged.includes('[pause:'));

  const chunks = toFishAudioChunks(
    '[cue:excited]测试一句，[pause:short][cue:tsk]接着说，[pause:medium][cue:whisper]低声落定。',
    '[pitch up] [confident]'
  );
  assert.deepEqual(chunks, [
    { kind: 'speech', text: '[pitch up] [confident] [excited] 测试一句， [short pause] [tsk] 接着说，' },
    { kind: 'silence', silenceMs: 650 },
    // Low-energy cues (whisper/soft/sigh/serious/calm) should NOT be overridden by defaultToneTag
    { kind: 'speech', text: '[whisper] 低声落定。' },
  ]);

  assert.equal(CUE_TO_FISH_TAG['pitch-up'], '[pitch up]');
  assert.equal(CUE_TO_FISH_TAG.emphasis, '[emphasis]');
  assert.equal(CUE_TO_FISH_TAG.tsk, '[tsk]');
  assert.equal(CUE_TO_FISH_TAG.laugh, '[laughing]');
});

test('rate and duration helpers format cleanly and apply Fish host rate offset', () => {
  assert.equal(formatEdgeRate(-5), '-5%');
  assert.equal(formatEdgeRate(0), '+0%');
  assert.equal(formatEdgeRate(4), '+4%');
  assert.equal(toFishSpeed(-5), 0.95);
  assert.equal(toFishSpeed(4), 1.04);
  assert.equal(formatTimeMMSS(305), '05:05');

  const segA = AMUSING_FULL_PODCAST.segments.find((s) => s.hostId === 'A')!;
  const segB = AMUSING_FULL_PODCAST.segments.find((s) => s.hostId === 'B')!;
  assert.equal(getEffectiveRatePercent(segA, 'edge', AMUSING_FULL_PODCAST), -2);
  assert.equal(
    getEffectiveRatePercent(segA, 'fish', AMUSING_FULL_PODCAST),
    segA.ratePercent + CANONICAL_VOICE_CONFIG.A.fishRateOffset
  );
  assert.equal(getEffectiveRatePercent(segB, 'edge', AMUSING_FULL_PODCAST), segB.ratePercent);
  assert.equal(getEffectiveRatePercent(segB, 'fish', AMUSING_FULL_PODCAST), segB.ratePercent);
});

test('all registered podcast episodes auto-validate against reading catalog, canonical voices, and pause discipline', () => {
  assert.ok(PODCAST_EPISODES.length >= 1, 'Expected at least one registered podcast episode');

  for (const episode of PODCAST_EPISODES) {
    const book = BOOKS_CATALOG.find((b) => b.slug === episode.bookSlug);
    assert.ok(book, `Podcast episode ${episode.bookSlug} must match a book in BOOKS_CATALOG`);

    const lookedUp = getPodcastEpisodeByBookSlug(episode.bookSlug);
    assert.ok(lookedUp, `Missing registry lookup for ${episode.bookSlug}`);
    assert.equal(lookedUp.id, episode.id);

    // Canonical voice binding checks (single source of truth in voices.ts)
    assert.equal(episode.hosts.A.edgeVoice, CANONICAL_VOICE_CONFIG.A.edgeVoice);
    assert.equal(episode.hosts.A.edgePitch, CANONICAL_VOICE_CONFIG.A.edgePitch);
    assert.equal(episode.hosts.A.fishReferenceId, CANONICAL_VOICE_CONFIG.A.fishReferenceId);
    assert.equal(episode.hosts.A.fishRateOffset, CANONICAL_VOICE_CONFIG.A.fishRateOffset);
    assert.equal(episode.hosts.A.fishDefaultToneTag, CANONICAL_VOICE_CONFIG.A.fishDefaultToneTag);
    assert.equal(episode.hosts.A.fishTemperature, CANONICAL_VOICE_CONFIG.A.fishTemperature);
    assert.equal(episode.hosts.A.fishTopP, CANONICAL_VOICE_CONFIG.A.fishTopP);
    assert.equal(episode.hosts.B.edgeVoice, CANONICAL_VOICE_CONFIG.B.edgeVoice);
    assert.equal(episode.hosts.B.edgePitch, CANONICAL_VOICE_CONFIG.B.edgePitch);
    assert.equal(episode.hosts.B.fishReferenceId, CANONICAL_VOICE_CONFIG.B.fishReferenceId);

    const segments = episode.segments;
    assert.ok(
      segments.length >= 45,
      `${episode.bookSlug}: Expected >=45 turns, got ${segments.length}`
    );
    assert.equal(episode.acts.length, 7, `${episode.bookSlug}: Expected 7 acts`);

    // Check act transitions (acts 2..7 start with [pause:long])
    for (let actIdx = 1; actIdx < episode.acts.length; actIdx++) {
      const actId = episode.acts[actIdx].id;
      const firstSeg = segments.find((s) => s.actId === actId);
      assert.ok(firstSeg, `${episode.bookSlug}: Missing segments for ${actId}`);
      assert.ok(
        firstSeg.scriptText.startsWith('[pause:long]'),
        `${episode.bookSlug}: First segment ${firstSeg.id} of ${actId} should start with [pause:long]`
      );
    }

    // Automatically derive chapter & structural coverage from Artifact 1 (reading dataset)
    const requiredRefs = deriveRequiredSourceRefs(book.dataset.chapters);
    const allRefs = segments.flatMap((s) => s.sourceRefs).join(' ');
    for (const requiredRef of requiredRefs) {
      assert.ok(
        allRefs.includes(requiredRef),
        `${episode.bookSlug}: Missing source coverage derived from reading dataset: ${requiredRef}`
      );
    }

    for (const seg of segments) {
      const tokens = parsePodcastTextTokens(seg.scriptText);
      for (const token of tokens) {
        if (token.type === 'cue') {
          assert.ok(
            Boolean(CUE_TO_FISH_TAG[token.value]),
            `${episode.bookSlug}: Unknown [cue:${token.value}] in segment ${seg.id}`
          );
        }
      }
      const plainLen = toPlainReadableText(seg.scriptText).length;
      if (plainLen > 75) {
        assert.ok(
          seg.scriptText.includes('[pause:'),
          `${episode.bookSlug}: Long segment ${seg.id} (${plainLen} chars) should include an explicit [pause:*] marker`
        );
      }
    }

    const charCount = countSpokenCharacters(segments);
    const estSeconds = estimateScriptDurationSeconds(segments);
    assert.ok(
      charCount >= 6500 && charCount <= 9000,
      `${episode.bookSlug}: Expected 6500-9000 spoken chars for full book, got ${charCount}`
    );
    assert.ok(
      estSeconds >= 1500 && estSeconds <= 2400,
      `${episode.bookSlug}: Expected ~25-40 min full episode (1500-2400s), got ${estSeconds}s`
    );

    const md = formatMarkdownPodcastScript(episode);
    assert.ok(md.includes('制作与忠实度准则'));
    assert.ok(!md.includes('Demo'));
  }
});

/**
 * Overwrought marketing / AI-cliche expressions discouraged in natural spoken Chinese scripts.
 */
const SPOKEN_STYLE_CLICHE_PATTERNS: RegExp[] = [
  /振聋发聩/,
  /摄人心魄/,
  /一锤定音/,
  /破圈/,
  /太扎心了/,
  /笑死人/,
  /掀开了?.{0,4}底牌/,
  /挂了科/,
  /打了个反证/,
  /堪称经典/,
];

/**
 * Un-translated multi-word English phrases or long English academic terms that degrade Chinese TTS prosody.
 * Short abbreviations like KMBC or AI remain allowed.
 */
const UNTRANSLATED_ENGLISH_PROSODY_PATTERN = /\b[A-Za-z]{8,}\b|\b[A-Za-z]{2,}\s+[A-Za-z]{2,}\b/;

const MAX_CONTINUOUS_SPOKEN_CLAUSE_CHARS = 105;

test('all podcast episodes spoken scriptText is self-contained without false-positive rejection of natural speech', () => {
  // Sanity-check regex precision: natural phrases allowed, explicit UI/list references rejected
  const allowedNatural = '这正是第二十六章画下的第一条制度铁律。';
  assert.equal(
    EXTERNAL_CONTEXT_LEAKAGE_PATTERNS.some((p) => p.test(allowedNatural)),
    false,
    'Natural spoken Chinese should not trigger false positives'
  );
  for (const leaked of ['看看 Key20 第三条', '我们来看第三条金句', '前面页面里提过']) {
    assert.equal(
      EXTERNAL_CONTEXT_LEAKAGE_PATTERNS.some((p) => p.test(leaked)),
      true,
      `Expected leakage pattern to catch: ${leaked}`
    );
  }

  for (const episode of PODCAST_EPISODES) {
    for (const seg of episode.segments) {
      const plain = toPlainReadableText(seg.scriptText);
      for (const pattern of EXTERNAL_CONTEXT_LEAKAGE_PATTERNS) {
        assert.equal(
          pattern.test(plain),
          false,
          `${episode.bookSlug} segment ${seg.id} spoken text leaked external context (${pattern}): ${plain}`
        );
      }
    }
  }
});

test('all podcast episodes enforce natural Chinese spoken style, clause breathability, and TTS-friendly phrasing', () => {
  // Sanity-check style guards
  for (const bad of ['这句振聋发聩的断语堪称经典', '这里引入了 Ideal Type 概念', '它属于 Gemeinschaft 社会']) {
    const caught =
      SPOKEN_STYLE_CLICHE_PATTERNS.some((p) => p.test(bad)) ||
      UNTRANSLATED_ENGLISH_PROSODY_PATTERN.test(bad);
    assert.equal(caught, true, `Expected style guard to catch: ${bad}`);
  }
  assert.equal(
    UNTRANSLATED_ENGLISH_PROSODY_PATTERN.test('1981 年堪萨斯市 KMBC 电视台解雇了女主播'),
    false,
    'Short station abbreviations like KMBC should remain allowed'
  );

  for (const episode of PODCAST_EPISODES) {
    for (const seg of episode.segments) {
      const plain = toPlainReadableText(seg.scriptText);
      for (const pattern of SPOKEN_STYLE_CLICHE_PATTERNS) {
        assert.equal(
          pattern.test(plain),
          false,
          `${episode.bookSlug} segment ${seg.id} contains overwrought spoken cliche (${pattern}): ${plain}`
        );
      }
      assert.equal(
        UNTRANSLATED_ENGLISH_PROSODY_PATTERN.test(plain),
        false,
        `${episode.bookSlug} segment ${seg.id} contains long/multi-word English that hurts Chinese TTS prosody: ${plain}`
      );

      // Check continuous spoken clause length between pauses and sentence-ending punctuation
      const textParts = parsePodcastTextTokens(seg.scriptText)
        .filter((t) => t.type === 'text')
        .map((t) => t.value);
      for (const part of textParts) {
        for (const clause of part.split(/[。！？；]/)) {
          const cleanLen = clause.replace(/\s+/g, '').length;
          assert.ok(
            cleanLen <= MAX_CONTINUOUS_SPOKEN_CLAUSE_CHARS,
            `${episode.bookSlug} segment ${seg.id} has an overly long unbroken clause (${cleanLen} chars > ${MAX_CONTINUOUS_SPOKEN_CLAUSE_CHARS}): ${clause}`
          );
        }
      }
    }
  }
});
