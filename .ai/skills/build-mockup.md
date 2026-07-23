---
name: build-mockup
description: >-
  Create or update BA page mockups in features/*/ba/req/ with mandatory help
  icons, data-help-id anchors, page help drawer, and design-system styling.
  Use for UI/layout work, PageMockup.tsx, or when user asks to build a mockup.
---

# Build Mockup

Create or update BA page mockups with mandatory help affordances, design-system styling, and stable anchors for downstream IDG and Dev wiring.

## When to Use

- Creating a new `{FeatureName}PageMockup.tsx` in `features/Feature-N/ba/req/`
- Updating layout, controls, or UX on an existing page mockup
- User asks to build a mockup, explore UI, or invokes `build-mockup` explicitly

## Prerequisites

Resolve feature identity from the `ba/` folder (see `ba/AGENTS.md` §0), then READ:

1. `./req_context.md` — start with **Consolidated Context**
2. Repo-root `design-system.json` — tokens and component patterns
3. `../ba/req/{FeatureName}BSR.md` — when present (behavior and labels)
4. `../ba/req/{FeatureName}MockData.json` — when present (field names and sample data)

Do **not** require reading `../idg/` — IDG owns CSH and Online Help copy. BA publishes anchors only.

## Output Location

| Artifact | Path |
|----------|------|
| Page mockup | `features/Feature-N/ba/req/{FeatureName}PageMockup.tsx` |
| Mockup styles | `features/Feature-N/ba/req/{FeatureName}PageMockup.css` (co-located) |
| Help drawer shell (optional) | `features/Feature-N/ba/req/{FeatureName}PageHelpContent.tsx` |

Write only inside the feature's `ba/` tree. After every create/update, refresh `ba/req_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Placeholder copy rule (pre-IDG wiring)

Until content is imported from IDG (`{FeatureName}-csh.md` and `{FeatureName}OnlineHelp.md`), use **`TBD`** everywhere help text would appear:

| Surface | Pre-wire content | Post-wire source |
|---------|------------------|------------------|
| Page title tooltip | `Click to open online help` (action label — not `TBD`) | unchanged |
| Field/column/toolbar help tooltip | **`TBD`** | `-csh.md` help text for anchor |
| Page help drawer body | **`TBD`** (one block or per-section `TBD`) | `OnlineHelp.md` §2 Drawer body |

Do not author real help prose in BA mockups before IDG wiring.

## Help icon placement rules

| Surface | Icon position | Tooltip (pre-IDG) | Anchor | Post-wire IDG source |
|---------|---------------|-------------------|--------|----------------------|
| Page title | Right of heading | `Click to open online help` | `{feature}.page` | `OnlineHelp.md` drawer body |
| Grid column header | Right of sort caret | **`TBD`** | `{feature}.col.{field}` | `-csh.md` topic |
| Form / read-only label | Right of label | **`TBD`** | `{feature}.{field}` | `-csh.md` topic |
| Toolbar action | Right of or on control | **`TBD`** | `{feature}.{action}` | `-csh.md` topic |

Omit help icons only when a surface has no label (e.g. icon-only button with `aria-label` may use anchor on the control itself).

## Implementation patterns

1. **Icon:** `InfoCircleOutlined` from `@ant-design/icons` + Ant Design `Tooltip` (`mouseEnterDelay` ~0.3s).
2. **Sort vs help (tables):** separate `<button type="button">` elements; help click must not trigger sort. Cluster: label + sort caret + help icon (see Prices `prices-th-cluster`).
3. **Accessibility:** help buttons need descriptive `aria-label` (e.g. `Help for Date column`); sort buttons keep `aria-sort` / sort `aria-label`.
4. **Page drawer:** Ant Design `Drawer`, title `{FeatureName} Help`, width **420px** (full width on narrow viewports); body shows **`TBD`** until `OnlineHelp.md` is wired. Optional **Open in new tab** via self-contained blob HTML (avoids cross-tab JWT issues).
5. **Styling:** CSS custom properties from `design-system.json` / `src/index.css`; feature-prefixed classes (e.g. `prices-page-help-btn`). No Tailwind for Classic shell mockups.
6. **`data-help-id`:** stable `{featureCamelOrKebab}.{element}` on every help control; document full inventory in `req_context.md`.

## Anchor naming

- Page: `{feature}.page` (e.g. `prices.page`)
- Column: `{feature}.col.{field}` (e.g. `prices.col.date`)
- Control: `{feature}.{action}` (e.g. `prices.refresh`, `prices.search`, `prices.datePreset`)

Match anchors IDG will publish in CSH Help Map and Online Help metadata comments.

## Writing rules

1. Every column header, form field label, and read-only section label on the mockup gets a help icon.
2. Pre-IDG: tooltips and drawer body = **`TBD`** only — no stub prose, no mirrored CSH.
3. Page title tooltip is always **`Click to open online help`**.
4. Mirror exact UI labels from BSR/mockup; do not invent API behavior.
5. Mock data stays static JSON — no live Strapi/envdlt calls in mockups.
6. After mockup changes, update `req_context.md` help inventory and chronological log.

## Anti-patterns (forbidden)

- Missing help icons on any column, field, or read-only label
- Combining sort and help on one control
- Reading or editing `../idg/` from BA workspace
- Inventing help prose before IDG wiring (use **`TBD`**)
- Creating mockups without updating `req_context.md`

## Workflow checklist

```
Task Progress:
- [ ] Resolve FeatureName from ba/ parent folder
- [ ] Read req_context.md Consolidated Context
- [ ] Read design-system.json; BSR and mock data if present
- [ ] Create or update PageMockup.tsx + CSS
- [ ] Place page-title help icon (tooltip: Click to open online help; data-help-id: {feature}.page)
- [ ] Place help icon on every column header (right of sort caret), form label, read-only label
- [ ] Set all field/column tooltips to TBD until IDG CSH wired
- [ ] Add help drawer with TBD body (PageHelpContent.tsx or inline)
- [ ] Document anchors and TBD vs wired status in req_context.md
- [ ] Append Chronological Log entry (date and time)
```
