# IDG Living Context Ledger

Two-part ledger for full reproduction of `./docs/` from scratch (plus upstream `../ba/req/` and `../dev/src/`, the `write-context-sensitive-help` skill for `*-csh.md`, and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./docs/`. Rewrite on every change; do not append. Prefer this section when regenerating documentation.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./docs/`.

### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD (drives `{FeatureName}ReleaseNotes.md`, `{FeatureName}OnlineHelp.md`, `{FeatureName}Manual.md`, `{FeatureName}-csh.md`)
- Workspace: `features/Feature-1/idg/` — write only here; documentation lands in `./docs/`

### Artifact inventory

_(none — `./docs/` is empty)_

Expected when authored (per `AGENTS.md`):

- `./docs/{FeatureName}ReleaseNotes.md` — what's new, changed, fixed, known issues
- `./docs/{FeatureName}OnlineHelp.md` — task-oriented help topics
- `./docs/{FeatureName}-csh.md` — context-sensitive help (field/surface map); create/update via skill `write-context-sensitive-help`
- `./docs/{FeatureName}Manual.md` — end-user guide, workflows, glossary
- Supplementary docs as needed (prefix with `{FeatureName}`)

### Terminology

_(none yet — lock terms from BA BSR / UI labels in Dev once upstream exists)_

### Source references (BA + Dev)

Ground documentation against approved upstream (read-only):

- BA: `../ba/req/{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`
- Dev: `../dev/src/` components and utilities (labels, workflows, config as implemented)

_(No BA or Dev deliverables pinned yet — do not invent user-facing docs ahead of requirements and implementation.)_

### Document structure

- CSH files (`*-csh.md`) follow skill `write-context-sensitive-help`: Metadata → Help Map Summary → Topics (`CSH-00x`) → Open Questions → Revision History

### Open questions

_(none yet)_

### Constraints

- Writes: only this `idg/` tree (`./` and `./docs/`)
- Reads: upstream `../ba/` and `../dev/` only (unless user `@`-tags another feature)
- Do not write sibling `../ba/`, `../dev/`, or `../qc/`
- Document implemented behavior from Dev; use BA for intent and acceptance language — call out gaps when they diverge
- CSH stays short and anchor-mapped; do not replace Online Help or Manual

### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and pinned BA + Dev upstream artifacts.
2. Recreate `./docs/` from this Consolidated Context (inventory + terminology + source refs + document structure); use `write-context-sensitive-help` for `{FeatureName}-csh.md`.
3. Align labels and workflows to Dev; align scope and rules to BA BSR.
4. _(No doc artifacts yet — recipe completes once first documentation set ships.)_

---

## Chronological Log

### 2026-07-14 — Initialization

- **Action**: IDG workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./docs/` — awaiting BA requirements and Dev implementation
- **Upstream dependencies**: `../ba/req/` and `../dev/src/` not yet populated

### 2026-07-14 20:17 PDT — Context-sensitive help skill

- **Intent**: Add global skill for IDG CSH markdown (`FeatureN-csh.md`)
- **Decisions**: Output path `idg/docs/{FeatureName}-csh.md`; distinct from Online Help; wire via `write-context-sensitive-help`
- **Changed**: Expected inventory and rebuild recipe include `*-csh.md`; `AGENTS.md` lists CSH work product
