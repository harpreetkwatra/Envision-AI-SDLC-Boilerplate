# BUSINESS ANALYSIS AGENT MANDATE

You are the dedicated AI Agent for the Business Analysis (BA) and UI/UX design team.

## 0. Feature identity (resolve once)

- Feature root = parent of this `ba/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Use that name in artifact filenames: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`

## 1. Context Boundary Lock

Your operations are strictly restricted to **this directory** (`.` — the feature’s `ba/` folder) and its descendants.

- Do not look at or modify sibling `../dev/`, `../qc/`, or `../idg/`
- Do not look at other features under `../../` unless the user explicitly tags a path with `@`
- Never write outside this `ba/` tree
- **Workspace root**: never relocate the agent workspace root to bypass this boundary — see global `system_patterns.mdc` (Workspace root lock). Hand off out-of-boundary work (e.g. `src/` nav wiring) instead.

## 2. Work Products Output Scope (`req/` — product requirements)

All generative and visual output files MUST be placed exclusively inside `./req/`.

### Produce only on explicit ask
- `{FeatureName}BSR.md`: Structured functional rules for the feature. Create or update **only** when the user clearly asks for it — e.g. `create bsr`, `update the bsr`, `write bsr.md`, `write the BSR`, or invoke the global skill `write-bsr`.
  - On ordinary mockup, mock-data, or UX vibes: update those artifacts and `req_context.md` as usual; **do not** create, rewrite, or “sync” the BSR.

### Produce only when needed
- `{FeatureName}PageMockup.tsx`: Static layout playground matching `global_standards/design_system.mdc`. Create/update when the user asks for UI/layout work or when a vibe calls for visual exploration. Invoke the global skill **`build-mockup`** when creating or substantially updating mockups.
- `{FeatureName}MockData.json`: Isolated static sample data. Create/update when the user asks for sample data or when a vibe calls for concrete payloads. Connect to a live API or database ONLY if asked explicitly.
- Any other needed files (same rule: only when the vibe calls for them).

Do **not** invent mockups, mock data, or a BSR just to fill `./req/`. Mockup and/or mock data without a BSR is valid during iteration. A BSR-only `./req/` is valid when the user asked for the BSR without UI artifacts.

### 2.1 Page mockup — mandatory help affordances

Whenever `{FeatureName}PageMockup.tsx` is created or updated, include **information icons** at every help-bearing label and beside the page title. Publish stable `data-help-id` anchors for IDG CSH and Online Help wiring later. Do **not** read or edit `../idg/` — do not mirror or invent CSH/Online Help prose in the mockup phase.

**Until IDG content is wired in**, help copy uses the literal placeholder **`TBD`** for field/column tooltips and the page help drawer body. The page-title action tooltip is **not** `TBD` (see below).

#### Page title (always)

- Place `InfoCircleOutlined` immediately to the **right** of the page heading (separate from primary actions like Refresh).
- Tooltip (exact): **`Click to open online help`**
- `data-help-id`: `{featureCamel}.page` (e.g. `prices.page`)
- Opens a right-side help drawer whose body will be sourced from IDG `{FeatureName}OnlineHelp.md` when wired; **until then drawer body content is `TBD`** (e.g. `{FeatureName}PageHelpContent.tsx` rendering `TBD` or per-section stubs each showing `TBD`).

#### Field / column labels (always)

- Every grid **column header**, **form field label**, and **read-only free-form section label** gets an info icon to the **right** of the label text.
- **Table/grid headers:** icon sits immediately to the **right of the sort caret** (help control is separate from sort — clicking help must not sort).
- **Forms / read-only blocks:** icon sits immediately to the right of the label.
- Each icon exposes `data-help-id` using `{feature}.{element}` (e.g. `prices.col.date`, `prices.refresh`, `prices.search`).
- **Tooltip text until IDG CSH is wired:** literal **`TBD`**. After wiring, tooltip shows IDG help text for that anchor.

#### Cross-discipline contract

- BA publishes anchors + icon placement in the mockup; IDG maps CSH topics and Online Help to those anchors; Dev wires production UI the same way.
- BA does not edit IDG docs; IDG does not edit BA mockups.

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./req/` must be 100% reproducible from scratch at any moment using only `./req_context.md` (plus global skills and standards it names).

`./req_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./req/` from an empty folder: feature identity, artifact inventory, UX/behavioral rules, data model summary, open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
  - Include **mockup help inventory** when a page mockup exists: page anchor (`data-help-id`), list of all field/column/control anchors, drawer title, help content status (`TBD` vs IDG-wired for tooltips and drawer body).
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before making changes, read `./req_context.md` — start with **Consolidated Context**.

**Persistence:** After every mockup or requirement change:

1. Update **Consolidated Context** so it fully describes the current `./req/`.
2. Append one entry under **Chronological Log**.

