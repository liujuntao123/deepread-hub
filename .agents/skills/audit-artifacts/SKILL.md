---
name: audit-artifacts
description: >-
  Use this skill when auditing project health, checking which books are missing
  reading/script/audio/video artifacts, verifying web vs workbench isolation,
  or running pre-commit/pre-release checks in deepread-hub.
---

# 全仓产物盘点与健康体检流程

用于快速盘点全书目产物 1~4 覆盖情况、核查公开站与本地工作台边界、并执行构建/测试/Git 同步策略检查。

## 执行步骤

1. **运行一键产物与边界审计 CLI**
   ```bash
   npm run audit
   ```
   自动输出 6 本书（及后续新增书目）的：
   - 原书底本（`artifacts/sources/<slug>.md`）
   - 产物 1（章节数 / Key20 数）
   - 产物 2（TS 演播稿字数 & `script.md` 同步状态）
   - 产物 3（Edge / Fish 时长、体积、语速告警与 timings 段落数对齐检查）
   - 产物 4（分镜 / 生图帧数 / 成片状态）
   - 公开站隔离性检查（`apps/web/`、`content/reading/` 与 `dist/`）及 Git 忽略边界校验。

2. **执行全量静态检查、单测与双端构建**
   ```bash
   npm run lint && npm test && npm run build && npm run workbench:build
   ```

3. **异常修复提示**
   - 如 `script.md` 缺失或过期，执行 `npm run podcast:export`。
   - 如某音轨缺失，按需使用 `produce-podcast-audio` 补齐。
