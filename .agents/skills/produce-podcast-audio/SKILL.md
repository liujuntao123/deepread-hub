---
name: produce-podcast-audio
description: >-
  Use this skill when synthesizing local dual-engine podcast audio (Artifact 3:
  Edge TTS and Fish Audio s2.1-pro-free), checking audio durations/timings,
  or troubleshooting TTS synthesis in deepread-hub.
---

# 产物 3：双引擎播客音频合成与质检流程

用于将产物 2（`content/podcast/episodes/<slug>.ts`）在本地离线合成为广播级响度标准化的 MP3 音轨与精确时间戳 JSON。

## 前置检查
1. 确认目标书目已注册在 [registry.ts](../../../content/podcast/registry.ts) 且 `npm test` 通过。
2. 音频拼接默认优先使用随包安装的 `ffmpeg-static` 与 `ffprobe-static`（免系统全局安装），也可通过环境变量 `FFMPEG_PATH` / `FFPROBE_PATH` 覆盖。
3. 若需合成 Fish Audio 音轨，确认根目录 `.env` 中已配置有效的 `FISH_API_KEY`（参考 `.env.example`）。
4. 详细声线、停顿映射与响度标准见 [podcast-production-spec.md](../../../docs/podcast-production-spec.md) 第 4–5 节。

## 合成命令

```bash
# 同时合成 Edge TTS 与 Fish Audio 双版本（默认启用切片级哈希缓存 .cache/podcast/ 与 NODE_USE_ENV_PROXY=1）
npm run podcast:generate -- --book <book-slug> --provider both

# 跳过已存在的成品音轨（适合部分引擎失败后续跑）
npm run podcast:generate -- --book <book-slug> --provider both --skip-existing

# 单独合成某一引擎，或加 --no-cache 强制全量重录
npm run podcast:generate -- --book <book-slug> --provider edge
npm run podcast:generate -- --book <book-slug> --provider fish --no-cache
```

## 产出校验清单

1. **检查固定落盘目录**：`artifacts/<book-slug>/podcast/` 下应生成成对文件：
   - `edge.mp3` + `edge.timings.json`
   - `fish.mp3` + `fish.timings.json`
2. **核对时长与语速**：检查 `*.timings.json` 中的 `durationSec` 与文本字数比例是否处于合理区间（约 `240–280 字/分钟`），且 `timings.length === episode.segments.length`。
3. **本地工作台试听联调**：启动 `npm run workbench` 打开 `http://127.0.0.1:3001/?book=<book-slug>`，确认双音轨切换正常、逐句点击跳转误差 `< 0.5s`。
4. **Git 边界确认**：`*.timings.json` 可正常提交入 Git；`*.mp3` 已被 `.gitignore` 忽略，提交前执行 `git status` 确认无 MP3 被误加。
