---
name: code-api
description: >-
  Implement API-tier changes from a feature BSR into src/api/ and dev/eng SQL.
  Use for HTTP clients, fetch/normalization, mock fallbacks, schema scripts, or
  when the user asks to code the API or backend layer.
---

# Code API

Implement or extend the **API tier** for a feature increment: HTTP clients, response normalizers, shared API types, mock/offline fallbacks, and optional DDL or upgrade scripts in `./eng/`.

Pair with **`code-front-end`** for UI work. Complete or verify **`code-api`** before **`code-front-end`** when the BSR includes both schema/API and UI.

## When to Use

- User asks to **implement the API**, **backend**, **fetch layer**, or **schema** for a BSR
- BSR changes data model, endpoints, normalization, or mock fallback behavior
- User invokes **`code-api`**

Do **not** edit pages, routes, or CSS in this skill — use **`code-front-end`**.

## Prerequisites

Resolve feature identity from the `dev/` folder (see `dev/AGENTS.md` §0), then READ:

1. `./eng_context.md` — start with **Consolidated Context**
2. `../ba/req/{FeatureName}BSR.md` — endpoints, data model (§5), mock rules
3. `../ba/req/{FeatureName}MockData.json` — field names and sample payloads (when present)
4. Repo-root `src/api/` — clone the nearest entity or client module
5. Optional: archived list/API patterns under `archived/requirements/` when this repo documents them

Ground every change in the BSR and existing client patterns. Prefer implemented behavior over BSR when they diverge; note gaps in `eng_context.md`.

## Write Scope

| In scope | Out of scope |
|----------|--------------|
| Repo-root **`src/api/**`** — clients, fetch helpers, normalizers, types, mock fallbacks | **`src/**` outside `src/api/**`** → **`code-front-end`** |
| **`features/*/dev/eng/**`** — DDL, migration, and data-upgrade scripts when the BSR includes schema changes | **`../ba/`**, **`../qc/`**, **`../idg/`** |
| **`features/*/dev/eng_context.md`** — Living Context Loop after changes | Unit tests (`write-unit-tests`), `tech-design.md` (`write-tech-design`) |

**API root (project-specific):** default `src/api/**`. If the repo documents a different client path, follow that convention in this skill only.

**Schema scripts path (project-specific):** default `features/*/dev/eng/`; follow repo convention when documented in `eng_context.md` or `dev/AGENTS.md`.

## Decision Tree

Classify the BSR increment before coding:

```
API increment type?
├─ New or changed attribute on existing entity
│   → key variants, column/order helpers, label map, mock fallback, optional DDL
├─ New list entity (read path)
│   → fetch*, normalize*, resolve* columns, sort helpers, mock block
├─ Write path (POST/PATCH/DELETE) — when in scope
│   → update* / create* functions, payload shape, error types
├─ Secondary analytics or ledger API
│   → route constants, normalize*Response, fetch*Rows
└─ Cross-cutting shared formatters
│   → shared helpers only when the BSR requires it
```

## Standard Checklist

### A. List entity (extend or new)

When the BSR adds or changes a read-only list backed by an API:

1. **Fetch** — `fetch{Entity}()` with query parameters documented in the BSR (pagination, populate, filters)
2. **Normalize** — map API payloads to stable list items; strip system/metadata keys the UI must not show as columns
3. **Column model** — `resolve{Entity}ColumnsFromItems` (or equivalent) with preferred key groups and display labels
4. **Active last** — when the entity has an Active field, that column resolves last (follow repo list-column pattern)
5. **Cell access** — `get{Entity}ColumnValue`, `format{Entity}Value` (and masking helpers when required)
6. **Sort** — stable row order per BSR (typically Active band, then primary label, tie-break id)
7. **Mock fallback** — return `{ data, mock: true }` (or repo equivalent) when the API is unreachable; sample rows include new fields per BSR
8. **Config guard** — respect existing `*Configured()` helpers; do not break offline/demo mode

### B. Schema / DDL

When the BSR §5 Data Model adds or changes persistence:

1. Author `./eng/{feature}-{change}-ddl.sql` (and upgrade script if needed)
2. Document content-type or table identity in `eng_context.md`
3. List attribute key variants the client accepts (camelCase, snake_case aliases)
4. Note apply/rollback order — do not assume admin UI was updated

### C. Secondary API client

When the BSR integrates a non-primary API:

1. Add route or path constants in the project's client module
2. `normalize*Response(json: unknown)` — defensive parsing; reuse shared field pickers when present
3. `fetch*Rows({ signal })` — consistent error type and offline behavior with sibling modules
4. Export types consumed by feature hooks (hooks live under **`code-front-end`**)

## BSR Traceability

Before finishing, produce a table (in the agent response and reflected in `eng_context.md`):

| FR-ID | API change | File / symbol |
|-------|------------|---------------|
| FR-005 | New optional field + mock fallback | `src/api/...` |

## Living Context Loop

After every change:

1. Rewrite **`eng_context.md` → Consolidated Context** (API surface, DDL inventory, open questions)
2. Append **Chronological Log** entry (date and time)

## Explicit Don'ts

1. Do not add UI columns, routes, or nav — hand off to **`code-front-end`**
2. Do not call live APIs with real credentials during implementation
3. Do not duplicate rendering logic beyond `format*` / `mask*` helpers
4. Do not create `tech-design.md` or unit tests unless explicitly asked

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from dev/ parent folder
- [ ] Read eng_context.md Consolidated Context
- [ ] Read BSR (+ mock data when present)
- [ ] Classify increment type (decision tree)
- [ ] Inspect src/api/ for reference module
- [ ] Implement fetch/normalize/column/mock and/or DDL in scope
- [ ] FR traceability table
- [ ] Rewrite eng_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
