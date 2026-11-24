---
name: produce-podcast-video
description: >-
  Use this skill when planning, designing, or producing automated podcast videos
  (Artifact 4) using GPT Image 2.5 hand-drawn PPT slides and the zero-redundant-frame
  Remotion + FFmpeg compositor in deepread-hub.
---

# 产物 4：自动化播客视频制作流程（手绘信息图 PPT + 零冗余帧极速合成）

基于产物 1~3（领读底本、播客演播稿、精确时间戳与成品音频）自动化生产 1920×1080 编辑风 PPT 播客视频。

## 设计文档与数据契约
- 架构与视觉风格圣经：[video-production-design.md](../../../docs/video-production-design.md)
- 默认风格配置：[pipelines/video/styleBible.ts](../../../pipelines/video/styleBible.ts)
- 分镜数据契约：[pipelines/video/types.ts](../../../pipelines/video/types.ts)
- 样本分镜计划：[pipelines/video/plans/amusing.ts](../../../pipelines/video/plans/amusing.ts)

## 四阶段作业流

1. **阶段 4A：编排 PPT 时间轴分镜（`storyboard.json`）**
   - 读取 `content/podcast/episodes/<slug>.ts` 与 `artifacts/<slug>/podcast/<provider>.timings.json`（默认 `fish`）。
   - 将全篇 50–65 段对话细分为 **25–30 页 PPT 场景**（开篇 `ppt-cover` + 22–26 张含简洁中文手写注记的 `ppt-slide` + 收官 `ppt-closing`），每页覆盖 1–3 段对话（约 40–75 秒）。
   - 运行分镜构建命令同步生成 `artifacts/<slug>/video/storyboard.json`（同步入 Git）：
     ```bash
     npm run video:storyboard -- --book <book-slug> --provider fish
     ```

2. **阶段 4B：GPT Image 2.5 批量绘制手绘 PPT（`npm run video:image`）**
   - 确认本地 `.env` 已配置 `IMAGE_API_BASE_URL`、`IMAGE_API_KEY` 与 `IMAGE_MODEL=gpt-image-2.5`。
   - 调用 `npm run video:image` 自动套用 [styleBible.ts](../../../pipelines/video/styleBible.ts)（潦草手绘蜡笔与马克笔编辑信息图 PPT，画内融入简洁中文主标题与 2–3 个关键词注记，底部预留 15% 白纸字幕安全区），按 `sceneId + promptHash` 增量生成至 `artifacts/<slug>/video/frames/scene-XX.png`（仅本地保留，`.gitignore`）：
     ```bash
     # 按分镜批量生图（自动跳过哈希未变帧）
     npm run video:image -- --book <book-slug> --size 1536x1024 --concurrency 3
     # 单页重绘
     npm run video:image -- --book <book-slug> --scene scene-03 --force --size 1536x1024
     ```
   - 在本地工作台（`npm run workbench`）的「播客视频」Tab 逐页审图，核对中文手写字准确性与构图平衡，必要时单页重绘。

3. **阶段 4C & 4D：零冗余帧并行合成与验收（`npm run video:render`）**
   - 运行合成命令：Remotion `renderStill` 仅为每页渲染 1 张 1920×1080 静态母版 PNG，再由并行 FFmpeg 进程完成 0.35s 淡入淡出转场、圆角暗墨悬浮胶囊字幕（`Noto Sans CJK SC Medium`，不显示发言人，静默自动隐藏）与音频无损封装：
     ```bash
     # 默认输出 1920x1080 @ 24fps 全高清成片
     npm run video:render -- --book <book-slug>
     # 如需 720p 轻量预览
     npm run video:render -- --book <book-slug> --preset fast
     ```
   - 抽帧自检封面页、手绘 PPT 页与收束页的字体清晰度、字幕胶囊位置及音画同步精度。
