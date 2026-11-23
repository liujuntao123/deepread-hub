# 产物 4：播客视频自动化生产管线（规划骨架）

本目录为后续 **GPT Image 2.5（生图）+ Remotion（代码动效合成）** 自动化播客视频管线的代码契约与落位点。

- 详细架构设计请阅读：[docs/video-production-design.md](../../docs/video-production-design.md)
- 项目级操作规范请阅读：[.agents/skills/produce-podcast-video/SKILL.md](../../.agents/skills/produce-podcast-video/SKILL.md)
- 数据契约定义：[pipelines/video/types.ts](./types.ts)

## 产物落盘路径约定（每本书独立隔离）

```text
artifacts/<book-slug>/video/
├── storyboard.json     # 分镜脚本、时间轴映射与 GPT Image 2.5 提示词（入 Git）
├── frames/             # GPT Image 2.5 批量生成的插画帧（.gitignore，仅本地）
│   ├── scene-01.png
│   └── ...
└── final.mp4           # Remotion 渲染输出成片（.gitignore，仅本地）
```

## 后续接入步骤（Roadmap）

1. 实现 `pipelines/video/build-storyboard.ts`：结合 `content/podcast/episodes/<slug>.ts`、`content/reading/books/<slug>.ts` 与 `artifacts/<slug>/podcast/<provider>.timings.json` 生成 `storyboard.json`。
2. 实现 `pipelines/video/generate-images.ts`：按 `promptHash` 增量调用 GPT Image 2.5 输出至 `artifacts/<slug>/video/frames/`，支持 `--scene <sceneId>` 单帧重绘。
3. 在 `pipelines/video/remotion/` 下初始化独立 Remotion 子包（与主仓依赖隔离），读取 `storyboard.json` + `timings.json` + `<provider>.mp3` + `frames/*.png` 渲染 `final.mp4`。
