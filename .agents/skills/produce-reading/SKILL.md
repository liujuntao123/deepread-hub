---
name: produce-reading
description: >-
  Use this skill when creating a new book's deep reading content (Artifact 1)
  or revising existing reading data in deepread-hub (论证地图, 洞见概览, Key20).
---

# 产物 1：图书深度领读制作流程

用于从原书底本生产结构化深度领读数据并入库到公开静态领读站（`apps/web` + `content/reading`）。

## 前置规范
开始创作前，必须先完整阅读 [book-reading-guide.md](../../../docs/book-reading-guide.md)，严格遵循全文本问答推演、先定判断再给理由、认识论分层（作者原意 / 引申 / 推断 / 保留标注）与原句出处可核查准则。

## 标准步骤

1. **确认原书底本与书目 Slug**
   - 检查 `artifacts/sources/<book-slug>.md` 是否存在（该目录仅本地保留，不入 Git）。
   - 通读原书底本，提炼 4–6 个高密度现场切片、终极核心命题、分章命题与 20 条可逐字核验的 Key20 原书原句。

2. **创建书目领读数据模块（统一 `<book-slug>.ts` 与 `BOOK_DATASET` 契约）**
   - 参照 [types.ts](../../../content/reading/types.ts) 的 `BookReadingDataset` 契约，在 `content/reading/books/<book-slug>.ts` 中编写完整数据并统一导出 `export const BOOK_DATASET: BookReadingDataset`：
     - `ultimateThesis`（终极核心命题）
     - `overviewIntroQa` + `chapters`（按原书前言与各章逐单元提炼，每章配备简洁 `shortLabel`）
     - `argumentMapSteps`（5–7 步递进推演，统一采用 `起点 / 第 1 步 … 第 N 步 / 终点`，每步配备 `shortLabel`）+ `boundaryComparison`（方法与边界双栏对照）
     - `keyGroups`（4 组，配备 `shortLabel` 且 `rangeLabel` 与组内条目区间严格对应）
     - `keyInsights`（20 条，`propositionZh` 必须取自 `artifacts/sources/<book-slug>.md` 的原文原句或以 `……` 衔接的精确节选，禁止写成概括改写句；明确标注 `original` / `back-translation` / `chinese-original`，凡 `back-translation` 须在 `propositionEn` 末尾保留 `（回译）` 标注）

3. **单一元数据登记与注册（禁止双份复制元数据）**
   - 在 [metas.ts](../../../content/reading/metas.ts) 的 `BOOK_CATALOG_METAS` 中登记新书轻量元数据（唯一元数据真源）。
   - 在 [catalog.ts](../../../content/reading/catalog.ts) 的 `loadBookDataset` 中补充动态 `import('./books/<book-slug>')`，保持公开 Web 站按书懒加载。
   - 在 [registry.ts](../../../content/reading/registry.ts) 的 `BOOK_DATASETS_BY_SLUG` 映射中接入新书 `BOOK_DATASET`（书目元数据自动复用 `metas.ts`，无需重复抄写标题、作者或导语）。
   - 严禁在 `content/reading/` 或 `apps/web/` 中引入任何播客或本地媒体引用。

4. **全自动验收（无需手动修改单测样板）**
   - [filters.test.ts](../../../content/reading/filters.test.ts) 会自动遍历 `BOOKS_CATALOG` 全量书目，校验结构完整性、出处规范、`shortLabel`、`catalog.ts` 与 `registry.ts` 严格同步以及动态懒加载。
   - 执行全量校验与产物审计（`npm run audit` 会自动扫描 `artifacts/sources/*.md` 覆盖率并逐条核验 Key20 原文忠实度）：
     ```bash
     npm run lint && npm test && npm run build && npm run audit
     ```
   - 确认 `dist/` 仅包含纯静态前端资源（无音频、无原书底本）。
