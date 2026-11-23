import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface ImageClientConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export interface GenerateImageOptions {
  prompt: string;
  size?: string;
  quality?: string;
  n?: number;
  idempotencyKey?: string;
  pollIntervalMs?: number;
  maxPollMs?: number;
  onStatus?: (msg: string) => void;
}

export interface EditImageOptions extends GenerateImageOptions {
  referenceImagePath: string;
}

export interface GeneratedImageResult {
  taskId?: string;
  imageUrl?: string;
  buffer: Buffer;
  contentType: string;
  rawResponse?: unknown;
}

export function getImageClientConfig(): ImageClientConfig {
  const apiKey = process.env.IMAGE_API_KEY?.trim() ?? '';
  const baseUrl = (process.env.IMAGE_API_BASE_URL?.trim() || 'https://image.mlgb7.com/v1').replace(
    /\/+$/,
    ''
  );
  const model = process.env.IMAGE_MODEL?.trim() || 'gpt-image-2.5';

  if (!apiKey || apiKey === 'MY_IMAGE_API_KEY') {
    throw new Error(
      'IMAGE_API_KEY 尚未配置。请在 .env 中设置 IMAGE_API_KEY（可参考 .env.example）。'
    );
  }

  return { baseUrl, apiKey, model };
}

function getApiOrigin(baseUrl: string): string {
  const parsed = new URL(baseUrl);
  return parsed.origin;
}

function extractTaskId(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const obj = payload as Record<string, unknown>;
  for (const key of ['task_id', 'taskId', 'id']) {
    if (typeof obj[key] === 'string' && obj[key].trim()) {
      return obj[key].trim();
    }
  }
  if (obj.data && typeof obj.data === 'object') {
    const nested = extractTaskId(obj.data);
    if (nested) return nested;
  }
  if (obj.task && typeof obj.task === 'object') {
    const nested = extractTaskId(obj.task);
    if (nested) return nested;
  }
  return null;
}

function extractFirstImage(
  payload: unknown
): { url?: string; b64?: string } | null {
  if (!payload) return null;
  if (typeof payload === 'string') {
    if (/^https?:\/\//i.test(payload)) return { url: payload };
    return null;
  }
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = extractFirstImage(item);
      if (found) return found;
    }
    return null;
  }
  if (typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    for (const key of ['url', 'image_url', 'imageUrl', 'output_url', 'result_url']) {
      if (typeof obj[key] === 'string' && /^https?:\/\//i.test(obj[key])) {
        return { url: obj[key] };
      }
    }
    for (const key of ['b64_json', 'b64', 'base64']) {
      if (typeof obj[key] === 'string' && obj[key].length > 100) {
        return { b64: obj[key] };
      }
    }
    for (const key of ['urls', 'images', 'data', 'result', 'results', 'output', 'tasks', 'items']) {
      if (obj[key]) {
        const found = extractFirstImage(obj[key]);
        if (found) return found;
      }
    }
  }
  return null;
}

function extractTaskRecord(payload: unknown, taskId: string): Record<string, unknown> | null {
  if (!payload || typeof payload !== 'object') return null;
  if (Array.isArray(payload)) {
    const matched = payload.find(
      (item) =>
        item &&
        typeof item === 'object' &&
        ((item as Record<string, unknown>).id === taskId ||
          (item as Record<string, unknown>).task_id === taskId ||
          (item as Record<string, unknown>).taskId === taskId)
    );
    return (matched ?? payload[0] ?? null) as Record<string, unknown> | null;
  }
  const obj = payload as Record<string, unknown>;
  for (const listKey of ['tasks', 'data', 'items', 'results']) {
    const list = obj[listKey];
    if (Array.isArray(list) && list.length > 0) {
      return extractTaskRecord(list, taskId);
    }
  }
  return obj;
}

async function downloadImageFromUrl(
  url: string
): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!res.ok) {
    throw new Error(`下载生成图片失败 (${res.status}): ${url}`);
  }
  const arrayBuf = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  if (buffer.length === 0) {
    throw new Error(`下载到的图片内容为空: ${url}`);
  }
  const contentType = res.headers.get('content-type') || 'image/png';
  return { buffer, contentType };
}

async function materializeImage(
  found: { url?: string; b64?: string },
  taskId?: string,
  rawResponse?: unknown
): Promise<GeneratedImageResult> {
  if (found.url) {
    const { buffer, contentType } = await downloadImageFromUrl(found.url);
    return { taskId, imageUrl: found.url, buffer, contentType, rawResponse };
  }
  if (found.b64) {
    return {
      taskId,
      buffer: Buffer.from(found.b64, 'base64'),
      contentType: 'image/png',
      rawResponse,
    };
  }
  throw new Error('未能从响应中解析出图片 URL 或 base64 数据。');
}

export async function pollImageTask(
  taskId: string,
  config: ImageClientConfig,
  options: {
    pollIntervalMs?: number;
    maxPollMs?: number;
    onStatus?: (msg: string) => void;
  } = {}
): Promise<GeneratedImageResult> {
  const origin = getApiOrigin(config.baseUrl);
  const pollUrl = `${origin}/api/image-tasks?ids=${encodeURIComponent(taskId)}`;
  const pollIntervalMs = options.pollIntervalMs ?? 3000;
  const maxPollMs = options.maxPollMs ?? 180_000;
  const startedAt = Date.now();
  let attempt = 0;

  while (Date.now() - startedAt < maxPollMs) {
    attempt += 1;
    const res = await fetch(pollUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`查询异步生图任务失败 (${res.status}): ${text.slice(0, 300)}`);
    }

    const payload = (await res.json()) as unknown;
    const record = extractTaskRecord(payload, taskId);
    const statusRaw = String(record?.status ?? record?.state ?? '').toLowerCase();

    if (
      statusRaw === 'failed' ||
      statusRaw === 'error' ||
      statusRaw === 'cancelled' ||
      statusRaw === 'canceled'
    ) {
      const errMsg =
        String(record?.error ?? record?.message ?? record?.fail_reason ?? '') ||
        JSON.stringify(record).slice(0, 300);
      throw new Error(`异步生图任务失败 (${taskId}): ${errMsg}`);
    }

    const foundImage = extractFirstImage(record ?? payload);
    if (
      foundImage &&
      (statusRaw === '' ||
        statusRaw === 'succeeded' ||
        statusRaw === 'completed' ||
        statusRaw === 'done' ||
        statusRaw === 'success' ||
        statusRaw === 'finished')
    ) {
      options.onStatus?.(`[image] task ${taskId} completed on poll #${attempt}`);
      return materializeImage(foundImage, taskId, payload);
    }

    options.onStatus?.(
      `[image] task ${taskId} status=${statusRaw || 'pending'} (poll #${attempt}, elapsed=${Math.round((Date.now() - startedAt) / 1000)}s)`
    );
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error(`异步生图任务超时 (${taskId}, >${Math.round(maxPollMs / 1000)}s)`);
}

export async function generateImageAsync(
  options: GenerateImageOptions,
  config: ImageClientConfig = getImageClientConfig()
): Promise<GeneratedImageResult> {
  const endpoint = `${config.baseUrl}/images/generations`;
  const idempotencyKey = options.idempotencyKey ?? crypto.randomUUID();
  const body: Record<string, unknown> = {
    model: config.model,
    prompt: options.prompt,
    n: options.n ?? 1,
    async: true,
    response_format: 'url',
  };
  if (options.size) body.size = options.size;
  if (options.quality) body.quality = options.quality;

  options.onStatus?.(`[image] submitting async generation (${config.model})...`);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`提交生图任务失败 (${res.status}): ${errText.slice(0, 400)}`);
  }

  const payload = (await res.json()) as unknown;

  // Handle direct/synchronous image return if gateway returns immediately
  const immediateImage = extractFirstImage(payload);
  if (immediateImage) {
    return materializeImage(immediateImage, extractTaskId(payload) ?? undefined, payload);
  }

  const taskId = extractTaskId(payload);
  if (!taskId) {
    throw new Error(`接口未返回 taskId 或图片结果: ${JSON.stringify(payload).slice(0, 400)}`);
  }

  options.onStatus?.(`[image] accepted (HTTP ${res.status}), taskId=${taskId}`);
  return pollImageTask(taskId, config, {
    pollIntervalMs: options.pollIntervalMs,
    maxPollMs: options.maxPollMs,
    onStatus: options.onStatus,
  });
}

export async function editImageWithReference(
  options: EditImageOptions,
  config: ImageClientConfig = getImageClientConfig()
): Promise<GeneratedImageResult> {
  const endpoint = `${config.baseUrl}/images/edits`;
  const refPath = path.resolve(options.referenceImagePath);
  const fileBuffer = await fs.readFile(refPath);
  const ext = path.extname(refPath).toLowerCase();
  const mimeType =
    ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.webp'
        ? 'image/webp'
        : 'image/png';

  const form = new FormData();
  form.set('model', config.model);
  form.set('prompt', options.prompt);
  form.set('n', String(options.n ?? 1));
  form.set('response_format', 'url');
  if (options.size) form.set('size', options.size);
  if (options.quality) form.set('quality', options.quality);
  form.set('image', new Blob([fileBuffer], { type: mimeType }), path.basename(refPath));

  options.onStatus?.(`[image] submitting edit with reference ${path.basename(refPath)}...`);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: form,
    signal: AbortSignal.timeout(90_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`参考图生图失败 (${res.status}): ${errText.slice(0, 400)}`);
  }

  const payload = (await res.json()) as unknown;
  const immediateImage = extractFirstImage(payload);
  if (immediateImage) {
    return materializeImage(immediateImage, extractTaskId(payload) ?? undefined, payload);
  }

  const taskId = extractTaskId(payload);
  if (taskId) {
    return pollImageTask(taskId, config, {
      pollIntervalMs: options.pollIntervalMs,
      maxPollMs: options.maxPollMs,
      onStatus: options.onStatus,
    });
  }

  throw new Error(`参考图生图接口未返回图片或 taskId: ${JSON.stringify(payload).slice(0, 400)}`);
}
