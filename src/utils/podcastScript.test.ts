import test from 'node:test';
import assert from 'node:assert/strict';
import {
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
} from './podcastScript';
import {
  AMUSING_FULL_PODCAST,
  HOMO_DEUS_FULL_PODCAST,
  PODCAST_EPISODES,
  SAPIENS_FULL_PODCAST,
  TWENTY_ONE_LESSONS_FULL_PODCAST,
  getPodcastEpisodeByBookSlug,
} from '../data/podcastEpisodesData';

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

test('toFishAudioText and toFishAudioChunks map speaker tags and bracket pauses', () => {
  const seg = AMUSING_FULL_PODCAST.segments[0];
  const tagged = toFishAudioText(seg, { includeSpeakerTag: true });
  assert.ok(tagged.startsWith('<|speaker:0|>'));
  assert.ok(!tagged.includes('[pause:'));

  const chunks = toFishAudioChunks('测试一句，[pause:short]接着说，[pause:medium]最后落定。');
  assert.deepEqual(chunks, [
    { kind: 'speech', text: '测试一句， [short pause] 接着说，' },
    { kind: 'silence', silenceMs: 650 },
    { kind: 'speech', text: '最后落定。' },
  ]);
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
  assert.equal(getEffectiveRatePercent(segA, 'fish', AMUSING_FULL_PODCAST), -4);
  assert.equal(getEffectiveRatePercent(segB, 'edge', AMUSING_FULL_PODCAST), segB.ratePercent);
  assert.equal(getEffectiveRatePercent(segB, 'fish', AMUSING_FULL_PODCAST), segB.ratePercent);
});

const EPISODE_COVERAGE_SPECS = [
  {
    episode: AMUSING_FULL_PODCAST,
    requiredRefs: [
      '论证地图',
      '洞见概览',
      'Key20',
      '前言',
      '第1章',
      '第2章',
      '第3章',
      '第4章',
      '第5章',
      '第6章',
      '第7章',
      '第8章',
      '第9章',
      '第10章',
      '第11章',
      '方法与边界',
    ],
  },
  {
    episode: SAPIENS_FULL_PODCAST,
    requiredRefs: [
      '论证地图',
      '洞见概览',
      'Key20',
      ...Array.from({ length: 20 }, (_, i) => `第${i + 1}章`),
      '后记',
      '方法与边界',
    ],
  },
  {
    episode: HOMO_DEUS_FULL_PODCAST,
    requiredRefs: [
      '论证地图',
      '洞见概览',
      'Key20',
      ...Array.from({ length: 11 }, (_, i) => `第${i + 1}章`),
      '方法与边界',
    ],
  },
  {
    episode: TWENTY_ONE_LESSONS_FULL_PODCAST,
    requiredRefs: [
      '论证地图',
      '洞见概览',
      'Key20',
      '序',
      ...Array.from({ length: 21 }, (_, i) => `第${i + 1}章`),
      '方法与边界',
    ],
  },
];

test('all registered podcast episodes cover entire book, pause discipline, and production metadata', () => {
  assert.equal(PODCAST_EPISODES.length, 4);

  for (const { episode: expectedEpisode, requiredRefs } of EPISODE_COVERAGE_SPECS) {
    const episode = getPodcastEpisodeByBookSlug(expectedEpisode.bookSlug);
    assert.ok(episode, `Missing registry lookup for ${expectedEpisode.bookSlug}`);
    assert.equal(episode.id, expectedEpisode.id);
    assert.equal(episode.hosts.A.edgeVoice, 'zh-CN-YunjianNeural');
    assert.equal(episode.hosts.A.fishReferenceId, 'e6a3424b324040a7aad618b55f4e7163');
    assert.equal(episode.hosts.A.fishRateOffset, -2);
    assert.equal(episode.hosts.B.edgeVoice, 'zh-CN-XiaoxiaoNeural');
    assert.equal(episode.hosts.B.fishReferenceId, '048222d36be842f199ec8ac71993dce4');

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

    const allRefs = segments.flatMap((s) => s.sourceRefs).join(' ');
    for (const requiredRef of requiredRefs) {
      assert.ok(
        allRefs.includes(requiredRef),
        `${episode.bookSlug}: Missing source coverage: ${requiredRef}`
      );
    }

    for (const seg of segments) {
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

test('all podcast episodes spoken scriptText is self-contained without external context leakage', () => {
  const forbiddenPatterns = [
    /Key20/i,
    /论证地图/,
    /洞见概览/,
    /深度领读集/,
    /页面里/,
    /十二个单元/,
    /第[一二三四五六七八九十百\d]+条/,
    /最后一条/,
  ];

  for (const episode of PODCAST_EPISODES) {
    for (const seg of episode.segments) {
      const plain = toPlainReadableText(seg.scriptText);
      for (const pattern of forbiddenPatterns) {
        assert.equal(
          pattern.test(plain),
          false,
          `${episode.bookSlug} segment ${seg.id} spoken text leaked external context (${pattern}): ${plain}`
        );
      }
    }
  }
});


