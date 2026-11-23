---
name: produce-podcast-video
description: >-
  Use this skill when planning, designing, or producing automated podcast videos
  (Artifact 4) using GPT Image 2.5 illustrations and Remotion programmatic
  motion graphics in deepread-hub.
---

# 产物 4：自动化播客视频制作流程（GPT Image 2.5 + Remotion）

基于产物 1~3（领读底本、播客演播稿、精确时间戳与成品音频）自动化生产播客视频。

## 设计文档与数据契约
- 架构与视觉风格圣经：[video-production-design.md](../../../docs/video-production-design.md)
- 默认风格配置：[pipelines/video/styleBible.ts](../../../pipelines/video/styleBible.ts)
- 分镜数据契约：[pipelines/video/types.ts](../../../pipelines/video/types.ts)
- 管线目录说明：[pipelines/video/README.md](../../../pipelines/video/README.md)

## 四阶段作业流

1. **阶段 4A：生成时间轴分镜（`storyboard.json`）**
   - 读取 `content/podcast/episodes/<slug>.ts`、`content/reading/books/<slug>.ts` 与 `artifacts/<slug>/podcast/<provider>.timings.json`（默认 `fish`）。
   - 将全篇 50–65 段对话按逻辑意群聚合为 18–26 个 `VideoStoryboardScene`，精确绑定 `startSec` 与 `endSec`。
   - 写入统一 `styleBible`（潦草手绘蜡笔与马克笔编辑插画风格，画面无字），输出至 `artifacts/<slug>/video/storyboard.json`（同步入 Git）。

2. **阶段 4B：GPT Image 2.5 批量生图（`npm run video:image`）**
   - 确认本地 `.env` 已配置 `IMAGE_API_BASE_URL`、`IMAGE_API_KEY` 与 `IMAGE_MODEL=gpt-image-2.5`。
   - 调用 `npm run video:image` 自动套用 [styleBible.ts](../../../pipelines/video/styleBible.ts)，按 `sceneId + promptHash` 增量生成插画至 `artifacts/<slug>/video/frames/scene-XX.png`（仅本地保留，`.gitignore`）：
     ```bash
     # 按分镜批量生图（自动跳过哈希未变帧）
     npm run video:image -- --book <book-slug> --size 1536x1024
     # 单帧重绘或单图测试
     npm run video:image -- --book <book-slug> --scene scene-03 --force --size 1536x1024
     npm run video:image -- --prompt "画面描述" --out artifacts/_style-samples/demo.png --size 1536x1024
     ```
   - 在本地工作台（`npm run workbench`）的「播客视频」Tab 展开审图，必要时微调 Prompt 单帧重绘。

3. **阶段 4C：Remotion 代码化动效编排**
   - 在独立子包 `pipelines/video/remotion/` 读取 `storyboard.json`、`timings.json`、`<provider>.mp3` 与 `frames/*.png`。
   - 插画叠加缓慢 Ken Burns 运动，所有中文标题、Key20 原典金句、对比数据卡、发言人声波指示器与双行字幕由 React + Tailwind 精确渲染。

4. **阶段 4D：渲染输出与验收**
   - 渲染成片输出至 `artifacts/<slug>/video/final.mp4`（仅本地保留，`.gitignore`），按需导出 9:16 精华切片。
   - 在本地工作台回放验收音画同步、字幕断句与幕间转场节奏。
