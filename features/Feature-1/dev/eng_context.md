# Dev Living Context Ledger

Two-part ledger for full reproduction of `./eng/` from scratch (plus upstream `../ba/req/` and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./eng/`. Rewrite on every change; do not append. Prefer this section when regenerating engineering artifacts.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./eng/`.

### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD (drives `{FeatureName}Page.tsx`, `{FeatureName}Widget.tsx`, `{FeatureName}Utils.ts`)
- Workspace: `features/Feature-1/dev/` — write only here; technical design, SQL scripts, and production code land in `./eng/`

### Artifact inventory

_(none — `./eng/` is empty)_

Expected when implemented (per `AGENTS.md`):

- Technical design docs / notes (as needed)
- SQL scripts (schema, migrations) as needed
- `./eng/{FeatureName}Page.tsx` — page / route UI
- `./eng/{FeatureName}Widget.tsx` — sub-components (as needed)
- `./eng/{FeatureName}Utils.ts` — logic, converters, API handlers

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

- Writes: only this `dev/` tree (`./` and `./eng/`)
- Reads: upstream `../ba/` only (unless user `@`-tags another feature)
- Do not write sibling `../ba/`, `../qc/`, or `../idg/`
- Shared app shell and shipped feature pages live under repo-root **`src/`** (shipping app); `./eng/` holds pre-release work for this feature increment
- Production components in `./eng/` connect to real state/APIs as specified; use BA mock data only as a behavioral reference, not as live BA prototypes in `./eng/`
- When approved, compose `./eng/` into **`src/`** (routes, shell, shared APIs) — that step is outside this folder’s write boundary unless directed

### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and approved BA artifacts under `../ba/req/`.
2. Recreate `./eng/` files from this Consolidated Context (inventory + technical design + component/API surface).
3. Match naming, UX, and data rules from the pinned BSR / mockup / mock data.
4. _(No source artifacts yet — recipe completes once first implementation ships.)_

---

## Chronological Log

### 2026-07-14 — Initialization

- **Action**: Dev workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./src/` — awaiting approved BA requirements
- **Upstream dependency**: `../ba/req/{FeatureName}BSR.md` not yet created

### 2026-07-16 13:36 — Rename work products folder

- **User intent**: Rename `src` to `engg`; update context file
- **Decisions**: Production code directory is `./engg/` (was `./src/`); living context ledger renamed to `engg_context.md` (was `src_context.md`); `AGENTS.md` paths updated to match
- **Changed**: `src/` → `engg/` (empty); `src_context.md` → `engg_context.md` with all Consolidated Context paths pointing at `./engg/`

### 2026-07-16 13:37 — Correct folder name to eng

- **User intent**: Use `eng` instead of `engg`
- **Decisions**: Production code directory is `./eng/`; living context ledger is `eng_context.md`; `AGENTS.md` paths updated to match
- **Changed**: `engg/` → `eng/` (empty); `engg_context.md` → `eng_context.md` with Consolidated Context paths pointing at `./eng/`

### 2026-07-21 — Shipping app vs new features

- **User intent**: Document that repo-root `src/` is the shipping app and `features/` holds new work in development
- **Decisions**: `src/` = live DTX portal (deployable today); `features/Feature-N/` = AI-SDLC staging for upcoming releases; composition into `src/` happens when release-ready
- **Changed**: Global rules (`README.md`, `product_context.mdc`, `system_patterns.mdc`, `tech_context.mdc`), `AGENTS.md` shell note, Consolidated Context constraints

### 2026-07-16 14:12 — Consistency alignment

- **User intent**: Align Dev workspace with README (technical design, SQL scripts, production code) and root `src/` shell
- **Decisions**: `./eng/` holds technical design, SQL, and production code; repo-root `src/` is the shared app shell (composed outside this feature folder unless directed)
- **Changed**: Consolidated Context inventory, workspace description, and constraints updated; `AGENTS.md` work-product scope expanded
