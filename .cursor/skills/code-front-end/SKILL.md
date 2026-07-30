---
name: code-front-end
description: >-
  Implement front-end shipping UI from a feature BSR into src/ (excluding the
  API client layer). Use for new pages, routes, list/table UX, hooks, CSS, shell
  wiring, help anchors, or when the user asks to code the UI layer.
---

# Code Front-End

Implement or extend **shipping UI** for a feature increment: routes, navigation, pages, feature hooks, styles, shell widgets, help anchors, and temporary BA mockup bridges.

Pair with **`code-api`**. When the BSR includes schema or fetch changes, complete or verify **`code-api`** first. UI-only increments may use this skill alone.

## When to Use

- User asks to **implement the UI**, **front-end**, **page**, or **wire the screen** for a BSR
- BSR adds a route, nav item, list/table UX, forms, CSS, or help anchors
- User invokes **`code-front-end`**

Do **not** edit `src/api/**` (or the repo's API client path) in this skill — use **`code-api`**.

## Prerequisites

Resolve feature identity from the `dev/` folder (see `dev/AGENTS.md` §0), then READ:

1. `./eng_context.md` — start with **Consolidated Context**
2. `../ba/req/{FeatureName}BSR.md`
3. `../ba/req/{FeatureName}PageMockup.tsx` and mock data (when present)
4. Repo-root **`design-system.json`** and global CSS tokens (when this repo uses them)
5. Reference pages in `src/` — especially when the BSR says "parity with" an existing screen
6. Optional: archived UI patterns under `archived/requirements/` (list columns, form validation)

Assume API exports from `src/api/` already exist unless you are implementing UI-only against the current API surface.

## Write Scope

| In scope | Out of scope |
|----------|--------------|
| Repo-root **`src/**`** — all shipping application UI, shell, routes, hooks, styles, and feature modules (exact folder layout is project-specific) | **`src/api/**`** (or the repo's API client path) → **`code-api`** |
| **`features/*/dev/eng_context.md`** — Living Context Loop after changes | **`features/*/dev/eng/**`** DDL/SQL → **`code-api`** |
| | **`../ba/`**, **`../qc/`**, **`../idg/`** |
| | Unit tests (`write-unit-tests`), `tech-design.md` (`write-tech-design`) |

**API exclusion (project-specific):** default **`src/api/**`**. If the repo documents a different client root, treat that path as API-tier only.

## Decision Tree

Classify the BSR increment before coding:

```
UI increment type?
├─ New route + nav item
│   → routes, nav, shell entry, feature module, layout mode per BSR
├─ Extend existing API-backed list page
│   → page uses resolve*ColumnsFromItems; custom cells only when format* is insufficient
├─ Table-only list (search, filters, pagination)
│   → search, date presets, sort headers, pagination footer, Refresh reset behavior
├─ Form / modal CRUD
│   → shared form validation pattern; wire to existing API update* functions
├─ Help anchors
│   → data-help-id from mockup; TBD tooltips until IDG content is wired
└─ Ship production / remove interim mock bridge
    → shell route swap from *BaMockupPage to *Page when BSR specifies
```

## Standard Checklists

### A. New list page

1. **Route** — register hash or path, breadcrumb label (follow repo routing module)
2. **Nav** — add rail or menu entry at BSR position
3. **Shell** — wire route to page component in the app shell
4. **Module** — page component, co-located CSS, data hook (`use*` or app-wide data context)
5. **Data** — hook calls `fetch*` from `src/api/` or shared app data provider
6. **Layout** — cards/table toggle or table-only per BSR
7. **Toolbar** — heading, Refresh, primary actions per BSR
8. **States** — loading, empty, error (including typed HTTP errors when the repo defines them), offline/mock banner
9. **Entity chrome** — card/table styling tokens when the repo defines them
10. **Help** — page title info icon and column `data-help-id` matching the mockup; use **`TBD`** pre-IDG

### B. Extend existing list page

1. Confirm API already exposes the column via column-resolution helpers — if not, stop and run **`code-api`**
2. Change the page only for **non-generic** rendering (custom cells, tooltips, icons)
3. Preserve column order, Active-last, Refresh, and view-mode toggle
4. Respect deployment visibility rules in the BSR (e.g. conditional columns)
5. Match mockup labels exactly

### C. Table page with client-side filtering

1. Search across visible columns
2. Date range presets and specified dates when required
3. Sortable headers with default sort from BSR
4. Pagination (page size options, range label, first/last)
5. Refresh resets filters/sort but retains page size per BSR
6. Colocate formatting helpers in the page or small feature utils

### D. Forms and modals

1. Required asterisk and inline validation errors (follow repo form pattern)
2. Submit disabled while loading; cancel closes without side effects
3. Writes only through existing API functions in `src/api/`

### E. Interim BA mockup bridge

1. Mock page imports static mock data — **no live API** at runtime
2. Shell routes to mockup until the BSR says production ships
3. Document bridge status in `eng_context.md`

## Reference Cloning (project examples)

Use the closest existing screen in `src/` — do not invent parallel patterns:

| Need | Look for |
|------|----------|
| API-backed cards + table | Existing entity list pages in `src/` |
| Address masking display | List page that already masks wallet addresses |
| Date filter + pagination | Orders/Dividends-style table pages |
| Active Yes/No styling | Shared active-boolean CSS classes |
| Feature hook shape | Sibling `use*.ts` in the same feature area |
| App-wide cached data | App-level data provider pattern |

## BSR Traceability

Before finishing, produce a table (in the agent response and reflected in `eng_context.md`):

| FR-ID | UI change | File |
|-------|-----------|------|
| FR-001 | New column in cards/table | `src/...` |

## Living Context Loop

After every change:

1. Rewrite **`eng_context.md` → Consolidated Context** (relevant `src/` paths, mock bridge status, help anchors)
2. Append **Chronological Log** entry (date and time)

## Explicit Don'ts

1. Do not edit API client modules — hand off to **`code-api`**
2. Do not author real help copy (IDG owns prose); use **`TBD`** until wired
3. Do not create `tech-design.md` or unit tests unless explicitly asked
4. Do not invent live API behavior not present in `src/api/`

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from dev/ parent folder
- [ ] Read eng_context.md Consolidated Context
- [ ] Read BSR, mockup, and mock data
- [ ] Classify increment type (decision tree)
- [ ] Verify API surface exists (or run code-api first)
- [ ] Inspect reference pages in src/
- [ ] Implement routes, page, hook, CSS, help anchors in scope
- [ ] FR traceability table
- [ ] Rewrite eng_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
