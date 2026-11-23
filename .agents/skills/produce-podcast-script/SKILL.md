---
name: produce-podcast-script
description: >-
  Use this skill when writing, editing, validating, or exporting a dual-host
  podcast episode script (Artifact 2) for a book in deepread-hub.
---

# 产物 2：双人播客演播稿制作流程

用于基于产物 1（深度领读）为指定书目编写 7 幕完整双人播客演播稿，并导出可读 Markdown 至本地产物目录。

## 前置规范
创作前必须先阅读 [podcast-production-spec.md](../../../docs/podcast-production-spec.md)（重点核对第 1–3 节：底本取材、独立闭合语境、双人声线角色、停顿标签、Fish S2 情绪/副语言标签与分句变速规则）。

## 标准步骤

1. **取材核对**
   - 读取 `content/reading/books/<book>.ts` 作为幕后底本，完整覆盖全书论证主轴、各核心章节实证、Key20 原典金句及认识论边界。
   - **独立闭合硬性要求**：台词正文（`scriptText`）面向纯听觉场景，严禁出现 `Key20`、`论证地图`、`洞见概览`、`深度领读集`、`页面里`、`第N条` 等外部网页/结构化索引泄漏词。

2. **编写演播稿 TS 模块**
   - 参照 [types.ts](../../../content/podcast/types.ts) 与现行标准样本 [amusing.ts](../../../content/podcast/episodes/amusing.ts)，新建 `content/podcast/episodes/<camelCaseSlug>.ts`：
     - 固定 7 幕结构（`act-1` ~ `act-7`），第 2–7 幕首句必须以 `[pause:long]` 开头。
     - 固定主播声线配置：必须通过 [voices.ts](../../../content/podcast/voices.ts) 的 `createPodcastHosts(...)` 生成（统一维护 Host A 林舟 `zh-CN-YunjianNeural` `+5Hz` / Fish `7bbcf02c0398403fa3048aa9917c7a5f` `+2%` `[pitch up] [confident]` 与 Host B 苏晴 `zh-CN-XiaoxiaoNeural` / Fish `048222d36be842f199ec8ac71993dce4`）。
     - 凡净文本超过 75 字的段落，必须插入 `[pause:short]` 或 `[pause:medium]`；全篇总字数控制在 `6500–9000` 字（约 25–40 分钟）。
     - 善用 [script.ts](../../../content/podcast/script.ts) 中定义的 18 种 Fish Audio S2 `[cue:*]` 标签（情绪：`excited`/`curious`/`confident`/`surprised`/`serious`/`calm`/`thoughtful`/`empathetic`/`frustrated`；声音控制：`emphasis`/`whisper`/`soft`/`pitch-up`；副语言：`chuckle`/`laugh`/`sigh`/`inhale`/`tsk`），在真实情绪转折、反讽和金句落脚处自然点缀，避免密集堆砌。

3. **注册并导出本地可读稿**
   - 在 [registry.ts](../../../content/podcast/registry.ts) 中导出并加入 `PODCAST_EPISODES`。
   - 运行导出命令同步生成 `artifacts/<book-slug>/podcast/script.md`：
     ```bash
     npm run podcast:export -- --book <book-slug>
     ```

4. **自动覆盖率校验与验收**
   - [script.test.ts](../../../content/podcast/script.test.ts) 会自动从 `content/reading/registry.ts` 推导对应书目的章节覆盖清单、统一声线绑定、`[cue:*]` 标签合法性与上下文闭合校验，无需手动重复维护章节表。
   - 执行验收：
     ```bash
     npm run lint && npm test
     ```
