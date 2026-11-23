# deepread-hub 架构说明与工作流总览

## 1. 目录职责划分

| 目录 / 文件 | 职责定位 | 运行形态 | Git 同步 |
| :--- | :--- | :--- | :---: |
| `apps/web/` | 公开领读 Web 站（仅展示产物 1） | 纯静态站 (`dist/`) | ✅ |
| `apps/workbench/` | 本地制作工作台（检视产物 1~4 + 双引擎播客播放器） | 仅本地静态站 (`127.0.0.1:3001`) | ✅ |
| `content/reading/` | 产物 1：领读数据（`books/<slug>.ts` 统一导出 `BOOK_DATASET`）、单一真源元数据（`metas.ts`）、懒加载目录（`catalog.ts`）、过滤与全量自检单测 | 被 `apps/web` 与工作台引用 | ✅ |
| `content/podcast/` | 产物 2：播客演播稿 TS 源码、标签解析与单测 | 仅被工作台与管线引用 | ✅ |
| `pipelines/podcast/` | 产物 2 → 3：双引擎 TTS 合成、母带响度与 MD 导出 | 本地 CLI 脚本 | ✅ |
| `pipelines/video/` | 产物 4 规划：GPT Image 2.5 + Remotion 视频数据契约 | 本地 CLI 脚本（规划） | ✅ |
| `artifacts/` | 本地固定产物目录（按书目聚合，工作台直接静态挂载） | 本地文件系统 | 文本/JSON ✅；音视频/原稿/生图 ❌ |
| `docs/` | 创作规范、生产规则与设计文档 | 本地参考文档 | ✅ |
| `.agents/skills/` | 项目级 Agent Skills（覆盖 4 阶段产物制作与盘点） | Antigravity 自动发现 | ✅ |

## 2. 固定产物目录规范（`artifacts/`）

```text
artifacts/
├── sources/                              # 【仅本地】原书底本 Markdown (<slug>.md)
└── <book-slug>/
    ├── podcast/
    │   ├── script.md                     # 【入 Git】产物 2 导出可读稿
    │   ├── edge.timings.json             # 【入 Git】产物 3 Edge TTS 帧级时间戳
    │   ├── fish.timings.json             # 【入 Git】产物 3 Fish Audio 帧级时间戳
    │   ├── edge.mp3                      # 【仅本地】产物 3 Edge TTS 成品音频
    │   └── fish.mp3                      # 【仅本地】产物 3 Fish Audio 成品音频
    └── video/                            # 【产物 4 预留】
        ├── storyboard.json               # 【入 Git】分镜时间轴与生图 Prompt
        ├── frames/                       # 【仅本地】GPT Image 2.5 生成插画帧
        └── final.mp4                     # 【仅本地】Remotion 合成视频成片
```

## 3. 常用命令速查

```bash
# 公开领读静态站（仅产物 1）
npm run dev                  # http://localhost:3000
npm run build                # 构建纯静态产物至 dist/（< 1 MB）
npm run preview              # 预览 dist/

# 本地产物制作工作台（仅绑定 127.0.0.1，直接挂载 artifacts/）
npm run workbench            # http://127.0.0.1:3001
npm run workbench:build      # 校验工作台前端打包（不复制大体积媒体文件）

# 本地播客生产脚本
npm run podcast:export                                           # 导出所有书目的 artifacts/<slug>/podcast/script.md
npm run podcast:export -- --book <slug>                          # 导出单本书的 script.md
npm run podcast:generate -- --book <slug> --provider both        # 合成 Edge + Fish 双引擎音频与时间戳
npm run podcast:generate -- --book <slug> --provider edge        # 仅合成 Edge TTS

# 质量校验与审计
npm run audit                # 一键输出全书目产物 1~4 矩阵、公开站隔离与 Git 边界检查
npm run lint                 # TypeScript 全仓零报错检查
npm test                     # 运行领读与播客全部单元测试
```

## 4. 项目级 Skills 一览

- `produce-reading`：产物 1（深度领读）创作、入库与单测验收
- `produce-podcast-script`：产物 2（双人播客演播稿）创作、自洽校验与导出
- `produce-podcast-audio`：产物 3（双引擎音频）离线合成与质检
- `audit-artifacts`：全书目产物 1~4 盘点、单测/构建体检与 Git 忽略校验
- `produce-podcast-video`：产物 4（GPT Image 2.5 + Remotion）自动化视频流程骨架
