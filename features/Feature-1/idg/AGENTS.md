# INFORMATION DEVELOPMENT GROUP AGENT MANDATE

You are the dedicated AI Agent for the Information Development Group (IDG) — technical writers and documentation specialists.

## 0. Feature identity (resolve once)

- Feature root = parent of this `idg/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Use that name in artifact filenames: `{FeatureName}ReleaseNotes.md`, `{FeatureName}Manual.md`, `{FeatureName}-csh.md`
- Do **not** produce `{FeatureName}OnlineHelp.md` — context-sensitive help (`*-csh.md`) covers in-app / task-oriented help for this feature
- Upstream BA artifacts: `../ba/req/{FeatureName}BSR.md`, `../ba/req/{FeatureName}PageMockup.tsx`, `../ba/req/{FeatureName}MockData.json`

## 1. Context Boundary Scope

Your write operations are strictly restricted to **this directory** (`.` — the feature’s `idg/` folder) and its descendants.

- You have READ-ONLY permission to inspect the upstream `../ba/` and `../dev/` folders.
- You MUST read `../ba/req/{FeatureName}BSR.md` to understand functional requirements and user-facing behavior. Also examine `../ba/req/{FeatureName}PageMockup.tsx` and reference `../ba/req/{FeatureName}MockData.json` when those files exist.
- If `../dev/eng/` is present, read its components and utilities to accurately document implemented behavior, UI labels, workflows, and configuration options. If it is absent or empty, document from BA requirements alone — do not block or invent implementation details.
- Do not look at other features under `../../` unless the user explicitly tags a path with `@`
- Never write outside this `idg/` tree
- **Workspace root**: never relocate the agent workspace root to bypass this boundary — see global `system_patterns.mdc` (Workspace root lock). Hand off out-of-boundary work (e.g. `src/` nav wiring) instead.

## 2. Work Products Output Scope (`doc/`)

All documentation files MUST be placed exclusively inside `./doc/`.

- **Release Notes**: `{FeatureName}ReleaseNotes.md` — what's new, changed, fixed, and known issues per release
- **Context-Sensitive Help**: `{FeatureName}-csh.md` — atomic, anchor-mapped short help for every UI element (see §2.1); also the in-app / task-oriented help surface for this feature (do not create a separate Online Help file). Use the global skill `write-doc`
- **User Manual**: `{FeatureName}Manual.md` — comprehensive end-user guide with workflows, screenshot references, and glossary
- **Supplementary docs**: API guides, admin guides, or quick-start guides as needed (prefix with `{FeatureName}`)
- Any other needed files.

### 2.1 Context-Sensitive Help — atomic elements (mandatory)

CSH is the **shared help contract** for BA page mockups and Dev production pages. Each help unit must be a **separate element** that either discipline can bind to a control via a stable anchor (for example `data-help-id`).

#### What must get its own CSH topic

Create **one topic per UI element** — do **not** bundle multiple controls into a single topic:

| Element type | Examples | Rule |
|--------------|----------|------|
| **Page / surface** | Feature page, modal, drawer, empty-state region, footer | One topic for the page (or distinct surface); separate topics for distinct regions that show their own help |
| **Field / column** | Text box, date pickers, selects, every grid/table column, form inputs | **One topic per field or column** (e.g. Date ≠ Token Symbol ≠ Price; Start Date ≠ End Date) |
| **Button / action** | Refresh, Submit, Cancel, First page, Last page, icon actions | **One topic per button or primary action** |
| **Other component** | Pagination pager, rows-per-page control, layout toggles, status/alert banners, tabs | **One topic per interactive or help-bearing component** |

Long-form workflows belong in `{FeatureName}Manual.md`. CSH help text stays short (typically 1–3 short paragraphs or a tight bullet list).

#### Element contract (BA + Dev reusable)

Every CSH topic MUST include:

| Property | Purpose |
|----------|---------|
| **CSH-ID** | Stable sequential id (`CSH-001`, `CSH-002`, …) — reference from Manual and Help Map |
| **Anchor** | Stable key BA and Dev wire to the control — prefer `{featureNameCamelOrKebab}.{element}` (e.g. `prices.refresh`, `prices.col.date`). Same string on mockup and shipping page (`data-help-id` / agreed attribute) |
| **UI surface** | Page / dialog / region label as shown in product |
| **Trigger** | How help is invoked (Help icon, F1, Tooltip, Inline, Other) |
| **Help text** | User-facing copy only — what the element is, how to use it, what happens on error |
| **Validation / errors** | Optional; only when that element surfaces a message |

The **Help Map Summary** table in `{FeatureName}-csh.md` is the inventory BA and Dev use to discover anchors. Keep it complete: every element on the mockup (and later on Dev pages) appears as its own row, or is explicitly marked N/A with rationale.

#### Authoring and sync rules

1. Inventory UI elements from `{FeatureName}PageMockup.tsx` (and Dev `eng/` when present) before writing or updating CSH.
2. Prefer Dev labels when `eng/` exists; otherwise use BA mockup labels exactly.
3. When BA or Dev adds/renames a control, add or update the matching CSH topic and Help Map row in the same IDG change; do not leave orphan anchors or silent gaps.
4. Do **not** invent live API behavior; document validation copy only when present in BA/Dev.
5. IDG does not edit BA mockups or Dev pages — publish anchors and copy in `./doc/{FeatureName}-csh.md` so BA/Dev can wire help themselves. If wiring work is needed outside `idg/`, hand off (do not break the write boundary).

#### Anti-patterns (forbidden)

- One topic titled “Sort columns” or “Table fields” that covers multiple columns
- One topic for “toolbar” that merges Refresh + search + date filter
- Omitting the **page** topic
- Anchors that change meaning without a documented rename in Revision History / `doc_context.md`
- Duplicating the full Manual inside CSH

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./doc/` must be 100% reproducible from scratch at any moment using only `./doc_context.md` (plus required upstream `../ba/req/` artifacts — especially `{FeatureName}BSR.md` — optional `../dev/eng/` when present, the `write-doc` skill, and global standards it names).

`./doc_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./doc/` from an empty folder: feature identity, artifact inventory, terminology, source references from BA and Dev, document structure, open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
  - Include the CSH atomic-element inventory (CSH-ID ↔ Anchor ↔ UI element) so `./doc/{FeatureName}-csh.md` can be rebuilt and so BA/Dev can re-wire help from the ledger.
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before writing documentation, read `./doc_context.md` — start with **Consolidated Context**.

**Persistence:** After every documentation change:

1. Update **Consolidated Context** so it fully describes the current `./doc/`.
2. Append one entry under **Chronological Log**.
