# Dev Living Context Ledger

Two-part ledger for full reproduction of `./src/` from scratch (plus upstream `../ba/req/` and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./src/`. Rewrite on every change; do not append. Prefer this section when regenerating production source.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./src/`.

### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD (drives `{FeatureName}Page.tsx`, `{FeatureName}Widget.tsx`, `{FeatureName}Utils.ts`)
- Workspace: `features/Feature-1/dev/` — write only here; production code lands in `./src/`

### Artifact inventory

_(none — `./src/` is empty)_

Expected when implemented (per `AGENTS.md`):

- `./src/{FeatureName}Page.tsx` — page / route UI
- `./src/{FeatureName}Widget.tsx` — sub-components (as needed)
- `./src/{FeatureName}Utils.ts` — logic, converters, API handlers

### Technical design (grounded in BA)

Ground implementation against approved upstream (read-only):

- `../ba/req/{FeatureName}BSR.md`
- `../ba/req/{FeatureName}PageMockup.tsx`
- `../ba/req/{FeatureName}MockData.json`

_(No BA deliverables pinned yet — do not invent production behavior ahead of approved requirements.)_

### Component / API surface

_(none yet)_

### Open questions

_(none yet)_

### Constraints

- Writes: only this `dev/` tree (`./` and `./src/`)
- Reads: upstream `../ba/` only (unless user `@`-tags another feature)
- Do not write sibling `../ba/`, `../qc/`, or `../idg/`
- Production components should connect to real state/APIs as specified; use BA mock data only as a behavioral reference, not as live BA prototypes in `./src/`

### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and approved BA artifacts under `../ba/req/`.
2. Recreate `./src/` files from this Consolidated Context (inventory + technical design + component/API surface).
3. Match naming, UX, and data rules from the pinned BSR / mockup / mock data.
4. _(No source artifacts yet — recipe completes once first implementation ships.)_

---

## Chronological Log

### 2026-07-14 — Initialization

- **Action**: Dev workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./src/` — awaiting approved BA requirements
- **Upstream dependency**: `../ba/req/{FeatureName}BSR.md` not yet created
