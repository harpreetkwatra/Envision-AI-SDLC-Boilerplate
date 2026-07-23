# IDG Living Context Ledger

Two-part ledger for full reproduction of `./doc/` from scratch (plus upstream `../ba/req/` and `../dev/eng/`, the `write-doc` skill, and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./doc/`. Rewrite on every change; do not append. Prefer this section when regenerating documentation.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./doc/`.



### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD (drives `{FeatureName}ReleaseNotes.md`, `{FeatureName}Manual.md`, `{FeatureName}-csh.md`, `{FeatureName}OnlineHelp.md`)
- Workspace: `features/Feature-1/idg/` — write only here; documentation lands in `./doc/`



### Artifact inventory

*(none — `./doc/` is empty)*

Expected when authored (per `AGENTS.md`):

- `./doc/{FeatureName}ReleaseNotes.md` — what's new, changed, fixed, known issues
- `./doc/{FeatureName}-csh.md` — context-sensitive help (field/surface map); create/update via skill `write-doc`
- `./doc/{FeatureName}OnlineHelp.md` — page help drawer body; create/update via skill `write-doc`
- `./doc/{FeatureName}Manual.md` — end-user guide, workflows, glossary
- Supplementary docs as needed (prefix with `{FeatureName}`)



### Terminology

*(none yet — lock terms from BA BSR / UI labels in Dev once upstream exists)*

### Source references (BA + Dev)

Ground documentation against approved upstream (read-only):

- BA: `../ba/req/{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`
- Dev: `../dev/eng/` components and utilities (labels, workflows, config as implemented)

*(No BA or Dev deliverables pinned yet — do not invent user-facing docs ahead of requirements and implementation.)*

### Document structure

- CSH, Online Help, Manual, and Release Notes follow skill `write-doc`
- CSH files (`*-csh.md`): Metadata → Help Map Summary → Topics (`CSH-00x`) → Open Questions → Revision History



### Open questions

*(none yet)*

### Constraints

- Writes: only this `idg/` tree (`./` and `./doc/`)
- Reads: upstream `../ba/` and `../dev/` only (unless user `@`-tags another feature)
- Do not write sibling `../ba/`, `../dev/`, or `../qc/`
- Document implemented behavior from Dev; use BA for intent and acceptance language — call out gaps when they diverge
- CSH stays short and anchor-mapped; long-form guidance belongs in the Manual; Online Help composes CSH for the page drawer (see `AGENTS.md`)



### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and pinned BA + Dev upstream artifacts.
2. Recreate `./doc/` from this Consolidated Context (inventory + terminology + source refs + document structure); use `write-doc` for CSH, Online Help, Manual, and Release Notes as needed.
3. Align labels and workflows to Dev; align scope and rules to BA BSR.
4. *(No doc artifacts yet — recipe completes once first documentation set ships.)*

---



## Chronological Log



### 2026-07-14 — Initialization

- **Action**: IDG workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./docs/` — awaiting BA requirements and Dev implementation
- **Upstream dependencies**: `../ba/req/` and `../dev/src/` not yet populated


