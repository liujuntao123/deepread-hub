# deepread-hub 项目协作与架构边界约束

本仓库包含严格隔离的三层职责，所有开发与内容生产必须遵守以下边界：

1. **公开 Web 静态站（`apps/web/` + `content/reading/`）**
   - 仅承载 **产物 1（深度领读）**，构建输出到 `dist/`。
   - **禁止**引入 `content/podcast/`、`pipelines/` 或 `artifacts/` 中的任何代码、文案或媒体文件。
   - **禁止**将电子书原稿或播客音频放入 `apps/web/public/`。
2. **本地制作工作台（`apps/workbench/`）**
   - 仅用于本地 `127.0.0.1:3001` 检视产物状态与双引擎音频试听（`npm run workbench`），静态挂载本地固定目录 `artifacts/`。
   - 不与公开 Web 站耦合，不对外部署。
3. **本地生产管线、规范文档与产物（`pipelines/`、`docs/`、`artifacts/`、`.agents/skills/`）**
   - 每本书以统一的 `bookSlug` 关联四阶段产物：
     - 输入源：`artifacts/sources/<slug>.md`（仅本地，`.gitignore`）
     - 产物 1：`content/reading/books/<slug>.ts`（入 Git，公开 Web 展示）
     - 产物 2：`content/podcast/episodes/<slug>.ts` + `artifacts/<slug>/podcast/script.md`（入 Git，本地工作台展示）
     - 产物 3：`artifacts/<slug>/podcast/{edge,fish}.timings.json`（入 Git）+ `{edge,fish}.mp3`（仅本地，`.gitignore`）
     - 产物 4（规划）：`artifacts/<slug>/video/storyboard.json`（入 Git）+ `frames/*.png` / `final.mp4`（仅本地，`.gitignore`）
4. **验证命令**
   - 每次改动后必须保证 `npm run lint`、`npm test`、`npm run build` 全部通过；提交前确认 `git status` 不包含 `.mp3`、`.mp4`、`artifacts/sources/` 或 `video/frames/`。
