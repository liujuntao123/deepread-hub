import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { BOOKS_CATALOG } from '../content/reading/registry.ts';
import { getPodcastEpisodeByBookSlug } from '../content/podcast/registry.ts';
import { countSpokenCharacters } from '../content/podcast/script.ts';
import type { BookEntry } from '../content/reading/types.ts';
import type { PodcastEpisode, PodcastTtsProvider } from '../content/podcast/types.ts';

const execFileAsync = promisify(execFile);

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(dir: string): Promise<string[]> {
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listFilesRecursive(full)));
    } else {
      results.push(full);
    }
  }
  return results;
}

function stripSourceMarkdownNoise(raw: string): string {
  return raw
    .replace(/<a[^>]*><\/a>/g, '')
    .replace(/\\\[\d+\\\]\(#[^)]+\)/g, '')
    .replace(/〔\d+〕/g, '')
    .replace(/\r\n/g, '\n');
}

async function auditReadingSourceFidelity(
  root: string,
  book: BookEntry
): Promise<{ matchedCount: number; warnings: string[] }> {
  const warnings: string[] = [];
  const srcPath = path.join(root, 'artifacts', 'sources', `${book.slug}.md`);

  const missingShortLabels = [
    ...book.dataset.argumentMapSteps.filter((s) => !s.shortLabel?.trim()),
    ...book.dataset.chapters.filter((c) => !c.shortLabel?.trim()),
    ...book.dataset.keyGroups.filter((g) => !g.shortLabel?.trim()),
  ].length;
  if (missingShortLabels > 0) {
    warnings.push(`${book.slug}: 存在 ${missingShortLabels} 处缺失 shortLabel（影响侧边目录可读性）`);
  }

  if (!(await pathExists(srcPath))) {
    return { matchedCount: 0, warnings };
  }

  const rawSource = await fs.readFile(srcPath, 'utf8');
  const plainSource = stripSourceMarkdownNoise(rawSource);
  const compactSource = plainSource.replace(/\s+/g, '');

  let matchedCount = 0;
  const mismatchedIndices: string[] = [];

  for (const item of book.dataset.keyInsights) {
    const clauses = item.propositionZh
      .split('……')
      .map((c) => c.trim())
      .filter((c) => c.length >= 6);

    const allClausesFound =
      clauses.length > 0 &&
      clauses.every((clause) => {
        const cleanClause = clause.replace(/\s+/g, '');
        return plainSource.includes(clause) || compactSource.includes(cleanClause);
      });

    if (allClausesFound) {
      matchedCount += 1;
    } else {
      mismatchedIndices.push(item.indexLabel);
    }
  }

  if (mismatchedIndices.length > 0) {
    warnings.push(
      `${book.slug}: Key20 原文核验有 ${mismatchedIndices.length} 条未在底本逐段匹配（编号: ${mismatchedIndices.join(', ')}）`
    );
  }

  return { matchedCount, warnings };
}

async function auditTrack(
  bookSlug: string,
  provider: PodcastTtsProvider,
  episode: PodcastEpisode | undefined
): Promise<{ summary: string; warnings: string[] }> {
  const pDir = path.join(process.cwd(), 'artifacts', bookSlug, 'podcast');
  const mp3Path = path.join(pDir, `${provider}.mp3`);
  const timingsPath = path.join(pDir, `${provider}.timings.json`);
  const hasMp3 = await pathExists(mp3Path);
  const hasTimings = await pathExists(timingsPath);

  if (!hasMp3 && !hasTimings) {
    return { summary: '未生成', warnings: [] };
  }
  if (!hasMp3 && hasTimings) {
    return { summary: '仅时间戳(缺MP3)', warnings: [`${bookSlug}/${provider}: 存在 timings.json 但缺少 mp3`] };
  }
  if (hasMp3 && !hasTimings) {
    return { summary: '仅MP3(缺时间戳)', warnings: [`${bookSlug}/${provider}: 存在 mp3 但缺少 timings.json`] };
  }

  const stat = await fs.stat(mp3Path);
  const mb = (stat.size / (1024 * 1024)).toFixed(1);
  const raw = await fs.readFile(timingsPath, 'utf8');
  const payload = JSON.parse(raw) as {
    durationSec?: number;
    timings?: unknown[];
  };
  const durationSec = typeof payload.durationSec === 'number' ? payload.durationSec : 0;
  const timingsCount = Array.isArray(payload.timings) ? payload.timings.length : 0;
  const warnings: string[] = [];

  let cpmLabel = '';
  if (episode) {
    if (timingsCount !== episode.segments.length) {
      warnings.push(
        `${bookSlug}/${provider}: timings 段落数 (${timingsCount}) 与演播稿 (${episode.segments.length}) 不一致`
      );
    }
    if (durationSec > 0) {
      const chars = countSpokenCharacters(episode.segments);
      const cpm = Math.round(chars / (durationSec / 60));
      cpmLabel = `/${cpm}字分`;
      if (cpm < 200 || cpm > 320) {
        warnings.push(`${bookSlug}/${provider}: 语速异常 (${cpm} 字/分钟，预期 200–320)`);
      }
    }
  }

  return {
    summary: `${(durationSec / 60).toFixed(1)}m/${mb}MB${cpmLabel}`,
    warnings,
  };
}

async function auditVideo(bookSlug: string): Promise<string> {
  const vDir = path.join(process.cwd(), 'artifacts', bookSlug, 'video');
  const hasStoryboard = await pathExists(path.join(vDir, 'storyboard.json'));
  const hasFinal = await pathExists(path.join(vDir, 'final.mp4'));
  const frames = await listFilesRecursive(path.join(vDir, 'frames'));
  const pngCount = frames.filter((f) => f.endsWith('.png')).length;

  if (hasFinal) return `成片(${pngCount}图)`;
  if (hasStoryboard) return `分镜(${pngCount}图)`;
  return '预留';
}

async function main() {
  const root = process.cwd();
  const warnings: string[] = [];
  const errors: string[] = [];

  console.log('\n=== deepread-hub 全仓产物与工程边界审计 ===\n');
  console.log(
    `${'书目 Slug'.padEnd(32)} | ${'原稿'.padEnd(4)} | ${'产物1(章/原句)'.padEnd(13)} | ${'产物2(TS/MD)'.padEnd(14)} | ${'产物3(Edge)'.padEnd(20)} | ${'产物3(Fish)'.padEnd(20)} | 产物4`
  );
  console.log('-'.repeat(126));

  const registeredSlugs = new Set(BOOKS_CATALOG.map((b) => b.slug));

  for (const book of BOOKS_CATALOG) {
    const srcOk = await pathExists(path.join(root, 'artifacts', 'sources', `${book.slug}.md`));
    const readingAudit = await auditReadingSourceFidelity(root, book);
    const ep = getPodcastEpisodeByBookSlug(book.slug);
    const mdOk = await pathExists(path.join(root, 'artifacts', book.slug, 'podcast', 'script.md'));

    const edge = await auditTrack(book.slug, 'edge', ep);
    const fish = await auditTrack(book.slug, 'fish', ep);
    const videoSummary = await auditVideo(book.slug);

    warnings.push(...readingAudit.warnings, ...edge.warnings, ...fish.warnings);

    const quoteBadge = srcOk
      ? `${readingAudit.matchedCount}/${book.dataset.keyInsights.length}`
      : `${book.dataset.keyInsights.length}句`;
    const a1 = `${book.dataset.chapters.length}章/${quoteBadge}`;
    const a2 = ep ? `${countSpokenCharacters(ep.segments)}字/${mdOk ? 'MD✓' : '无MD'}` : '待创作';

    console.log(
      `${book.slug.padEnd(32)} | ${(srcOk ? '✓' : '✗').padEnd(4)} | ${a1.padEnd(13)} | ${a2.padEnd(14)} | ${edge.summary.padEnd(20)} | ${fish.summary.padEnd(20)} | ${videoSummary}`
    );
  }

  // Check for unproduced source books sitting in artifacts/sources/*.md
  const sourcesDir = path.join(root, 'artifacts', 'sources');
  if (await pathExists(sourcesDir)) {
    const sourceEntries = await fs.readdir(sourcesDir);
    for (const entry of sourceEntries) {
      if (!entry.endsWith('.md')) continue;
      const slug = entry.slice(0, -3);
      if (!registeredSlugs.has(slug)) {
        warnings.push(`artifacts/sources/${entry} 尚未入库产物 1（缺少 content/reading/books/${slug}.ts）`);
      }
    }
  }

  // 1. Verify public web isolation (apps/web + content/reading must not import podcast/pipelines)
  console.log('\n--- 1. 公开站隔离检查 ---');
  const webFiles = [
    ...(await listFilesRecursive(path.join(root, 'apps', 'web'))),
    ...(await listFilesRecursive(path.join(root, 'content', 'reading'))),
  ].filter((f) => /\.(ts|tsx)$/.test(f) && !f.endsWith('.test.ts'));

  for (const file of webFiles) {
    const text = await fs.readFile(file, 'utf8');
    if (/@content\/podcast|content\/podcast|@pipelines\/|pipelines\//.test(text)) {
      errors.push(`公开站隔离违规: ${path.relative(root, file)} 引用了 podcast 或 pipelines 模块`);
    }
  }

  const distFiles = await listFilesRecursive(path.join(root, 'dist'));
  if (distFiles.length > 0) {
    let totalDistBytes = 0;
    for (const f of distFiles) {
      totalDistBytes += (await fs.stat(f)).size;
      if (/\.(mp3|wav|mp4|mov)$/.test(f) || f.includes(`${path.sep}sources${path.sep}`)) {
        errors.push(`公开站构建污染: dist/ 包含禁止文件 ${path.relative(root, f)}`);
      }
    }
    console.log(`dist/ 检查通过：${distFiles.length} 个文件，合计 ${(totalDistBytes / 1024).toFixed(1)} KB`);
  } else {
    console.log('dist/ 尚未构建（可运行 npm run build 后复查）');
  }

  // 2. Verify Git boundary (no large binary audio/video, raw sources, frames, or cache tracked)
  console.log('\n--- 2. Git 同步边界检查 ---');
  try {
    const { stdout } = await execFileAsync('git', ['status', '--short']);
    const lines = stdout
      .split('\n')
      .map((l) => l.trimEnd())
      .filter(Boolean);
    const forbiddenTracked = lines.filter((line) => {
      // Ignore deleted legacy files (status starts with D)
      if (/^\s*D\s+/.test(line)) return false;
      const target = line.slice(3);
      return (
        /(^|\/)\.cache\//.test(target) ||
        /^artifacts\/sources\//.test(target) ||
        /^artifacts\/.*\.(mp3|wav|mp4|mov)$/.test(target) ||
        /^artifacts\/.*\/video\/frames\//.test(target)
      );
    });
    if (forbiddenTracked.length > 0) {
      for (const bad of forbiddenTracked) {
        errors.push(`Git 边界违规（不应入库的大文件/本地源）: ${bad}`);
      }
    } else {
      console.log('Git 边界检查通过：无 .mp3/.mp4/sources/frames/.cache 待入库');
    }
  } catch {
    console.log('跳过 Git 检查（当前目录不可执行 git status）');
  }

  if (warnings.length > 0) {
    console.log('\n⚠️ 告警项：');
    for (const w of warnings) console.log(`  - ${w}`);
  }

  if (errors.length > 0) {
    console.error('\n❌ 发现工程边界错误：');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log('\n✅ 全部工程边界与产物结构审计通过。\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
