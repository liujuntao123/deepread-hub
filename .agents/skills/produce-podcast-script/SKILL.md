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
   - 参照 [types.ts](../../../content/podcast/types.ts) 与现行标准样本 [amusing.ts](../../../content/podcast/episodes/amusing.ts)、[xiangtuZhongguo.ts](../../../content/podcast/episodes/xiangtuZhongguo.ts)，新建 `content/podcast/episodes/<camelCaseSlug>.ts`：
     - 固定 7 幕结构（`act-1` ~ `act-7`），第 2–7 幕首句必须以 `[pause:long]` 开头。
     - 固定主播声线配置：必须通过 [voices.ts](../../../content/podcast/voices.ts) 的 `createPodcastHosts(...)` 生成（统一维护 Host A 林舟 `zh-CN-YunjianNeural` `+5Hz` / Fish `ec48458814e3409196c795a3a6b32201` `+2%` `[pitch up] [confident]` 与 Host B 苏晴 `zh-CN-XiaoxiaoNeural` / Fish `048222d36be842f199ec8ac71993dce4`）。
     - 凡净文本超过 75 字的段落，必须插入 `[pause:short]` 或 `[pause:medium]`；且按 `[pause:*]` 与句末标点（`。！？；`）切分后的单句连续口播长度不得超过 105 字；全篇总字数控制在 `6500–9000` 字（约 25–40 分钟）。
     - 善用 [script.ts](../../../content/podcast/script.ts) 中定义的 18 种 Fish Audio S2 `[cue:*]` 标签（情绪：`excited`/`curious`/`confident`/`surprised`/`serious`/`calm`/`thoughtful`/`empathetic`/`frustrated`；声音控制：`emphasis`/`whisper`/`soft`/`pitch-up`；副语言：`chuckle`/`laugh`/`sigh`/`inhale`/`tsk`），在真实情绪转折、反讽和金句落脚处自然点缀，避免密集堆砌。

3. **中文自然口播风格与逐幕润色（必做）**
   - **去夸张修辞与自媒体/AI腔**：避免“破圈”“振聋发聩”“摄人心魄”“一锤定音”“太扎心了”“笑死人”“掀开底牌”“堪称经典”“把……演绝了”“挂了科”“打了个反证”等过度用力、喧宾夺主的评价词与强动词；改用克制平实的引述与承接语（如“原话是这么说的”“书中说”“作者举了个例子”“由此能看到”）。
   - **拆短长定语，贴合听觉习惯**：将多层前置长定语拆成两个以上符合中文说话节奏的自然短句，避免听众靠耳朵一时跟不上主干。
   - **生活化选词与纯中文口播**：优先使用自然生活词（如“声音”优于“声纹”，“不好使了”优于“挂了科”）；学术英文词一律译为中文口播（允许极短机构缩写如 `KMBC`），避免冗长英文单词混读破坏双引擎 TTS 韵律。
   - **逐幕默读自检**：定稿前逐幕检查是否顺口、有呼吸感，确认在保持原著论证深度与学术边界的前提下，整体听感接近两位见识深厚的朋友在书房娓娓道来。

4. **注册并导出本地可读稿**
   - 在 [registry.ts](../../../content/podcast/registry.ts) 中导出并加入 `PODCAST_EPISODES`。
   - 运行导出命令同步生成 `artifacts/<book-slug>/podcast/script.md`：
     ```bash
     npm run podcast:export -- --book <book-slug>
     ```

5. **自动覆盖率、口播风格与验收校验**
   - [script.test.ts](../../../content/podcast/script.test.ts) 会自动执行以下验证，无需手动维护章节表：
     - 从 `content/reading/registry.ts` 推导对应书目的全章节与结构锚点覆盖率；
     - 统一声线绑定、`[cue:*]` 标签合法性、长段停顿与单句 <= 105 字可读性校验；
     - 独立闭合语境（防外部页面/索引泄漏）与自然口播风格校验（拦截夸张自媒体/AI腔陈词滥调及冗长中英混读）。
   - 执行验收：
     ```bash
     npm run lint && npm test
     ```
