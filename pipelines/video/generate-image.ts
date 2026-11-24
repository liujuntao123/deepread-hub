import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  editImageWithReference,
  generateImageAsync,
  getImageClientConfig,
} from './imageClient.ts';
import {
  DEFAULT_VIDEO_STYLE_BIBLE,
  composeStyledImagePrompt,
} from './styleBible.ts';
import type { VideoStoryboard } from './types.ts';

function readArg(args: string[], flag: string): string | null {
  const idx = args.indexOf(flag);
  if (idx >= 0 && args[idx + 1]) {
    return args[idx + 1];
  }
  return null;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    const stat = await fs.stat(p);
    return stat.size > 0;
  } catch {
    return false;
  }
}

async function runSingleGeneration(args: string[]) {
  const rawPrompt = readArg(args, '--prompt');
  const outPathArg = readArg(args, '--out');
  const refPath = readArg(args, '--ref');
  const size = readArg(args, '--size') ?? undefined;
  const quality = readArg(args, '--quality') ?? undefined;
  const rawMode = args.includes('--raw');

  if (!rawPrompt || !outPathArg) {
    throw new Error(
      '用法：\n' +
        '  单图生成: npm run video:image -- --prompt "画面描述" --out artifacts/_style-samples/demo.png [--size 1536x1024] [--ref ref.png] [--raw]\n' +
        '  分镜批量: npm run video:image -- --book <slug> [--scene scene-03] [--force]'
    );
  }

  const finalPrompt = rawMode
    ? rawPrompt
    : composeStyledImagePrompt(rawPrompt, DEFAULT_VIDEO_STYLE_BIBLE);

  const config = getImageClientConfig();
  const result = refPath
    ? await editImageWithReference(
        {
          prompt: finalPrompt,
          referenceImagePath: refPath,
          size,
          quality,
          onStatus: (m) => console.log(m),
        },
        config
      )
    : await generateImageAsync(
        {
          prompt: finalPrompt,
          size,
          quality,
          onStatus: (m) => console.log(m),
        },
        config
      );

  const outPath = path.resolve(outPathArg);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, result.buffer);
  console.log(
    `[saved] ${path.relative(process.cwd(), outPath)} (${(result.buffer.length / 1024).toFixed(1)} KB)${result.taskId ? ` | taskId=${result.taskId}` : ''}`
  );
}

async function runStoryboardBatch(args: string[], bookSlug: string) {
  const onlyScene = readArg(args, '--scene');
  const force = args.includes('--force');
  const size = readArg(args, '--size') ?? '1536x1024';
  const concurrency = Math.max(
    1,
    Math.min(6, Number.parseInt(readArg(args, '--concurrency') ?? '3', 10) || 3)
  );
  const videoDir = path.resolve(process.cwd(), 'artifacts', bookSlug, 'video');
  const storyboardPath = path.join(videoDir, 'storyboard.json');
  const framesDir = path.join(videoDir, 'frames');

  const raw = await fs.readFile(storyboardPath, 'utf8');
  const storyboard = JSON.parse(raw) as VideoStoryboard;
  const config = getImageClientConfig();
  await fs.mkdir(framesDir, { recursive: true });

  const targets = storyboard.scenes.filter((scene) => {
    if (!scene.imagePrompt || !scene.imageFile) return false;
    if (onlyScene && scene.sceneId !== onlyScene) return false;
    return true;
  });

  if (targets.length === 0) {
    console.log(`[skip] ${bookSlug} 分镜中没有需要生图的目标场景。`);
    return;
  }

  let saveChain = Promise.resolve();
  const flushStoryboard = () => {
    saveChain = saveChain.then(() =>
      fs.writeFile(storyboardPath, `${JSON.stringify(storyboard, null, 2)}\n`, 'utf8')
    );
    return saveChain;
  };

  let cursor = 0;
  let doneCount = 0;

  const workers = Array.from({ length: Math.min(concurrency, targets.length) }, async () => {
    while (true) {
      const idx = cursor;
      cursor += 1;
      if (idx >= targets.length) break;
      const scene = targets[idx];
      const outPath = path.join(framesDir, scene.imageFile!);
      const styledPrompt = composeStyledImagePrompt(
        scene.imagePrompt!,
        storyboard.styleBible ?? DEFAULT_VIDEO_STYLE_BIBLE
      );
      const hash = crypto.createHash('sha256').update(styledPrompt).digest('hex').slice(0, 12);

      if (!force && scene.promptHash === hash && (await fileExists(outPath))) {
        doneCount += 1;
        console.log(`[cache-hit ${doneCount}/${targets.length}] ${scene.sceneId} -> ${scene.imageFile} (${hash})`);
        continue;
      }

      let result: Awaited<ReturnType<typeof generateImageAsync>> | null = null;
      let lastErr: unknown = null;
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          result = await generateImageAsync(
            {
              prompt: styledPrompt,
              size,
              onStatus: (m) => console.log(`[${scene.sceneId}] ${m}`),
            },
            config
          );
          break;
        } catch (err) {
          lastErr = err;
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`[${scene.sceneId}] attempt ${attempt}/3 failed: ${msg}`);
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 2500 * attempt));
          }
        }
      }
      if (!result) {
        throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
      }

      await fs.writeFile(outPath, result.buffer);
      scene.promptHash = hash;
      await flushStoryboard();
      doneCount += 1;
      console.log(
        `[done ${doneCount}/${targets.length}] ${scene.sceneId} -> artifacts/${bookSlug}/video/frames/${scene.imageFile} (${(result.buffer.length / 1024).toFixed(1)} KB)`
      );
    }
  });

  await Promise.all(workers);
  await saveChain;
  console.log(`[updated] artifacts/${bookSlug}/video/storyboard.json (promptHash synced)`);
}

async function main() {
  const args = process.argv.slice(2);
  const bookSlug = readArg(args, '--book');
  if (bookSlug) {
    await runStoryboardBatch(args, bookSlug);
  } else {
    await runSingleGeneration(args);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
