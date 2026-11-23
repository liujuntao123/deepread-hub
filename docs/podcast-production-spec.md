# 深度领读集 · 双人播客音频生产规范文档

> 本规范用于指导各书目双人整书播客演播稿创作、多引擎语音合成与母带质检，确保每一期成品在内容忠实度、听觉自洽性与音频听感上保持稳定一致的水准。

---

## 1. 内容取材与文本自洽规范

### 1.1 底本取材与边界分工

每期整书播客均以目标书目的三份结构化领读底本为幕后依据，忠实传递全书论证脉络与实证细节：

1. **主骨架取材**：以《论证地图》的“起点现场 → 递进追问 → 终点闭环 → 边界对照”作为全集叙事轴线，保持节点之间的因果承转。
2. **章节实证补齐**：结合《洞见概览》吸纳原书前言与各核心章节的关键命题、历史人物、年份与实证数据。
3. **核心金句嵌入**：提取《Key20》收录的高辨识度原典原话，在对话转折处完整念出，并配合降速与停顿突出分量。
4. **认识论边界分工**：将“作者明确划定的界线”“书内保留标注的推测”与“当代读者的延伸回看”转化为对谈双方的追问与澄清，明确区分作者原意与读者引申。

### 1.2 独立闭合语境规范

1. **独立听觉闭合**：演播稿面向纯听觉接收场景构建完整自足的语义体系，所有核心概念、人物身份、史料语境与逻辑转折均在对话内部直接交代闭环。
2. **底本化入原典叙事**：结构化底本作为幕后取材依据，在正式台词中完全转化为原著书名、具体章节与现场案例的自然表达，对话内部仅指涉原著文本自身与当下的播客交流。
3. **自足式首尾引导**：开篇导语与收尾寄语紧扣本期书目主题与原著精读延伸，使听众在完全脱离网页界面、栏目名称或编号索引的独立播放环境中，依然能够无障碍理解全片内容。

---

## 2. 双人角色分工与自然对话优化

### 2.1 角色定位
- **Host A（林舟 · 主讲）**：负责叙事主轴、历史现场复原、数据举证与原典精句引述，语调明朗笃定、叙事有推进感。
- **Host B（苏晴 · 对谈）**：代表具备思辨力的听众视角，负责提出常识反驳（例如围绕具体现象发问或辨析边界）、拆解隐喻并承接逻辑转折，以实质性追问推动对话向前。

### 2.2 自然感与节奏控制三原则
1. **长段落内部切分停顿**：凡净文本超过 **75 个汉字** 的段落，均在语义转折、数据列举、引文落脚之前插入显式停顿符（`[pause:short]` / `[pause:medium]`），让长句形成清晰的呼吸段落。
2. **分句变速与音高基调校准**：
   - 演播稿基准 `ratePercent` 按自然叙事节奏定调：原典金句、关键判断、全篇收束 **`-4% ~ -6%`**，常规陈述 **`-2% ~ +1%`**，现场反问与例证列举 **`+2% ~ +4%`**。
   - **Host A 明亮度与活力校准**：统一在 `content/podcast/voices.ts` 中配置 Host A 林舟的 Edge TTS `edgePitch = '+5Hz'`，Fish Audio `fishRateOffset = +2`、`fishDefaultToneTag = '[pitch up] [confident]'`、`fishTemperature = 0.82`，确保男声在保持叙事厚度的同时明朗昂扬、富有对话张力；当单句显式标注 `[cue:whisper]` / `[cue:soft]` / `[cue:sigh]` / `[cue:serious]` / `[cue:calm]` 时，引擎自动尊重该低能量情绪标签，不叠加默认高昂基调。
   - **Host B 基准配置**：苏晴保持 `edgePitch = '+0Hz'`、`fishRateOffset = 0`、`fishTemperature = 0.8`，以自然清亮的女声质感与主讲形成声部互补。
3. **克制型口语连接与情绪留白**：在真实思路顿挫、恍然、反讽或追问起手处配合自然连接词与 `[cue:*]` 音频标签，全篇每 3–4 句点缀一处精准情绪或副语言提示，增强声音起伏而不流于夸张。

---

## 3. 停顿符与音频标签语法规范

演播稿统一采用结构化内联标记，由 `content/podcast/script.ts` 解析并分别适配两套 TTS 引擎。Edge TTS 在合成时自动剥离 `[cue:*]` 标签并严格执行静音切分；Fish Audio `s2.1-pro-free` 直接将 `[cue:*]` 映射为 S2 官方支持的方括号自然语言控制标签。

### 3.1 停顿与轮换标记

| 演播稿内联标记 | 含义与适用场景 | 时长 | Edge TTS 映射 | Fish Audio `s2.1-pro-free` 映射 |
| --- | --- | --- | --- | --- |
| `[pause:short]` | 句内换气、分号转折、引文落脚前 | `350ms` | 切片后 `ffmpeg` 插入 `0.35s` 静音 | 保留为内联 `[short pause]` 交由 S2 模型自然换气 |
| `[pause:medium]` | 反常识结论后留白、事例切向规律前 | `650ms` | 切片后 `ffmpeg` 插入 `0.65s` 静音 | 切片后 `ffmpeg` 插入 `0.65s` 确定性静音 |
| `[pause:long]` | 幕间转场（Act 切换） | `1000ms` | 切片后 `ffmpeg` 插入 `1.0s` 静音 | 切片后 `ffmpeg` 插入 `1.0s` 确定性静音 |
| `turnGapMs` | 双人轮换接话间隔 | `240–550ms` | 紧密反问 `240–280ms`，幕末留白 `450–550ms` | 紧密反问 `240–280ms`，幕末留白 `450–550ms` |

### 3.2 Fish Audio S2 情感与副语言表现标签（`[cue:*]`）

| 类别 | 演播稿标记 | Fish Audio S2 映射 | 适用演播场景 |
| --- | --- | --- | --- |
| **情绪状态** | `[cue:excited]` | `[excited]` | 揭晓精彩历史现场、发现关键转折时的振奋感 |
| **情绪状态** | `[cue:curious]` | `[curious]` | 提出反常识疑问、追问底层机制 |
| **情绪状态** | `[cue:confident]` | `[confident]` | 亮出全书核心判断、斩钉截铁的论证结论 |
| **情绪状态** | `[cue:surprised]` | `[surprised]` | 面对惊人史料数字或反直觉案例时的惊讶 |
| **情绪状态** | `[cue:serious]` | `[serious]` | 严肃警示、批判核心病灶、划定历史后果 |
| **情绪状态** | `[cue:calm]` | `[calm]` | 冷静梳理定义、方法论边界澄清 |
| **情绪状态** | `[cue:thoughtful]` | `[thoughtful]` | 停下来反思、拆解隐喻与深层逻辑 |
| **情绪状态** | `[cue:empathetic]` | `[empathetic]` | 体察当代人处境、温和回应现实焦虑 |
| **情绪状态** | `[cue:frustrated]` | `[frustrated]` | 点出荒诞困境或难以回避的结构性无奈 |
| **声音控制** | `[cue:emphasis]` | `[emphasis]` | 关键命题、核心金句与反差词的重音突出 |
| **声音控制** | `[cue:whisper]` | `[whisper]` | 拆穿潜台词、压低声线的贴耳点破 |
| **声音控制** | `[cue:soft]` | `[soft]` | 收束余韵、温柔的尾声寄语 |
| **声音控制** | `[cue:pitch-up]` | `[pitch up]` | 提高语调带动悬念、高昂的开场或反问 |
| **副语言** | `[cue:chuckle]` | `[chuckle]` | 荒诞反讽或会心一笑处的轻微笑意 |
| **副语言** | `[cue:laugh]` | `[laughing]` | 明显喜剧反差处的自然笑声 |
| **副语言** | `[cue:sigh]` | `[sigh]` | 面对时代宿命或无力感处的轻叹 |
| **副语言** | `[cue:inhale]` | `[inhale]` | 展开重磅论断或长句前的吸气起势 |
| **副语言** | `[cue:tsk]` | `[tsk]` | 听到荒谬细节时的自然啧声感叹 |

---

## 4. 双引擎 TTS 生产配置

系统同时维护两套生产级 TTS 引擎，确保同一份演播稿稳定产出双版本成品音频：

### 4.1 引擎 A：Edge TTS
- **实现库**：`msedge-tts`（WebSocket 直连，免密钥）
- **声线绑定（统一定义于 `content/podcast/voices.ts`）**：
  - 林舟（Host A）：`zh-CN-YunjianNeural`（`edgePitch: '+5Hz'`）
  - 苏晴（Host B）：`zh-CN-XiaoxiaoNeural`（`edgePitch: '+0Hz'`）
- **输出规格**：`audio-24khz-96kbitrate-mono-mp3` 中间切片，经 `ffmpeg` 转码拼接。
- **静音合成机制**：先按 `[pause:*]` 切分为多段纯文本分别合成，再与 `anullsrc` 生成的精准静音 WAV 拼接合并，规避接口对自定义 SSML `<break>` 的拦截限制。

### 4.2 引擎 B：Fish Audio `s2.1-pro-free`
- **接口端点**：`POST https://api.fish.audio/v1/tts`
- **鉴权**：Header 传入 `Authorization: Bearer $FISH_API_KEY` 与 `model: s2.1-pro-free`（密钥仅用于本地离线合成脚本 `pipelines/podcast/generate.ts`）。
- **声线绑定（统一定义于 `content/podcast/voices.ts`）**：
  - 林舟（Host A）：`7bbcf02c0398403fa3048aa9917c7a5f`（*主讲男声* · `fishRateOffset: +2` · `fishDefaultToneTag: '[pitch up] [confident]'` · `temperature: 0.82` · `top_p: 0.8`）
  - 苏晴（Host B）：`048222d36be842f199ec8ac71993dce4`（*金* · 柔和知性女声 · `fishRateOffset: 0` · `temperature: 0.8` · `top_p: 0.8`）
- **请求参数**：
  ```json
  {
    "text": "[pitch up] [confident] ...",
    "reference_id": "<host_fish_reference_id>",
    "format": "mp3",
    "chunk_length": 250,
    "temperature": 0.82,
    "top_p": 0.8,
    "prosody": {
      "speed": 1.02,
      "volume": 0
    }
  }
  ```
- **稳定性与切片缓存**：单次片段合成内置最多 4 次指数退避重试与受控并发；所有单段语音 WAV 按 `sha256(version + provider + voice + rate + pitch + temperature + topP + text)` 缓存至本地 `.cache/podcast/`（`.gitignore`），支持断网续跑与单句修改后的秒级增量重拼；命令默认启用 `NODE_USE_ENV_PROXY=1` 兼容代理环境。

### 4.3 后期母带与时间戳标准（`ffmpeg` / `ffprobe`）
1. 所有语音与静音切片统一解码为 `24000Hz / 单声道 / pcm_s16le` WAV，逐段由 `ffprobe` 读取精确时长，累加生成与音频帧完全对齐的 `*.timings.json`（供工作台播放器高亮同步与点击跳转）。
2. 全片通过 `ffmpeg concat` 拼接后执行广播级响度标准化：
   - `-af "loudnorm=I=-16:TP=-1.5:LRA=11"`
   - 导出 `128kbps / 24kHz / mono` MP3，经临时文件原子写入 `artifacts/<slug>/podcast/<provider>.mp3`，并同步输出 `artifacts/<slug>/podcast/<provider>.timings.json`。

---

## 5. 生产流水线与质检清单

### 5.1 本地离线合成 + 本地静态工作台（与公开领读站完全隔离）
播客演播稿（产物 2）维护于 `content/podcast/episodes/<slug>.ts` 并导出可读 Markdown 至 `artifacts/<slug>/podcast/script.md`；音频（产物 3）通过本地离线脚本合成并落盘至 `artifacts/<slug>/podcast/{edge,fish}.{mp3,timings.json}`。

- 公开 Web 站（`apps/web/`）**不展示也不引用**任何播客文稿与音频。
- 本地制作工作台（`npm run workbench`，`http://127.0.0.1:3001`）以纯静态方式挂载 `artifacts/` 目录，用于检视进度、双引擎试听对比与文稿导出。
- Git 同步策略：`script.md` 与 `*.timings.json` 同步至远程仓库，`*.mp3` 大文件经 `.gitignore` 仅本地保留。

```bash
# 导出可读 Markdown 演播稿至 artifacts/<slug>/podcast/script.md
npm run podcast:export -- --book amusing-ourselves-to-death

# 同时生成 Edge TTS 与 Fish Audio s2.1-pro-free 双版本整书播客
npm run podcast:generate -- --book amusing-ourselves-to-death --provider both

# 单独合成某一引擎
npm run podcast:generate -- --book amusing-ourselves-to-death --provider edge
npm run podcast:generate -- --book amusing-ourselves-to-death --provider fish
```

### 5.2 发布前必检项
1. **文本与结构单元测试通过**：执行 `npm test`，确认停顿分布合标、所有 `[cue:*]` 标签合法有效、全书实证覆盖完整，且台词正文保持完全自洽闭合。
2. **音频文件与时间戳齐备**：`artifacts/<slug>/podcast/` 下 `edge.mp3` / `edge.timings.json` 与 `fish.mp3` / `fish.timings.json` 成对生成，且 `durationSec` 与文本体量匹配（中文对话含停顿约 `240–280 字/分钟`）。
3. **本地工作台零报错联调**：运行 `npm run workbench`，确认状态看板准确识别各书目产物，播放器可正常切换已就绪音轨，任意台词点击跳转误差 `< 0.5s`。
