# Dev Living Context Ledger

Two-part ledger for full reproduction of `./eng/` from scratch (plus upstream `../ba/req/` and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./eng/`. Rewrite on every change; do not append. Prefer this section when regenerating engineering artifacts.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./eng/`.



### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD
- Workspace: `features/Feature-1/dev/` — shipping code in repo-root `src/`; `./eng/` for non-application artifacts



### Artifact inventory

*(none — `./eng/` is empty)*

Expected when implemented (per `AGENTS.md`):

- `./eng/tech-design.md` — technical design (explicit ask via `write-tech-design`)
- `./eng/**/*.test.ts(x)` — Vitest unit tests targeting repo-root `src/` (explicit ask via `write-unit-tests`)
- SQL / DDL scripts (schema)
- Data upgrade scripts



### Technical design (grounded in BA)

Ground implementation against approved upstream (read-only):

- `../ba/req/{FeatureName}BSR.md`
- `../ba/req/{FeatureName}PageMockup.tsx`
- `../ba/req/{FeatureName}MockData.json`

*(No BA deliverables pinned yet — do not invent production behavior ahead of approved requirements.)*

### Component / API surface

*(none yet)*

### Open questions

*(none yet)*

### Constraints

- Writes: repo-root `src/` and this `dev/` tree (`./eng/`) — only Dev may persist `src/` changes
- Reads: upstream `../ba/` only (unless user `@`-tags another feature)
- Do not write sibling `../ba/`, `../qc/`, or `../idg/`
- Production application code lives in `src/`; `./eng/` holds DDL, upgrade scripts, optional `tech-design.md`, and Vitest unit tests `*.test.ts(x)` (explicit ask)



### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and approved BA artifacts under `../ba/req/`.
2. Recreate `./eng/` artifacts from this Consolidated Context; implementation lives in `src/` (paths in `tech-design.md` when authored).
3. Match naming, UX, and data rules from the pinned BSR / mockup / mock data.
4. *(No source artifacts yet — recipe completes once first implementation ships.)*

---

## Chronological Log

### 2026-07-30 — Dev unit-test workflow documented

- **Intent**: Align living context with repo-wide Vitest setup and `dev/AGENTS.md` §2.2 / §4
- **State**: No `./eng/**/*.test.ts` yet; repo-root Vitest tooling configured (`npm run test:unit`, `tsconfig.vitest.json`)
- **Artifact inventory**: unit tests listed as expected under `./eng/` on explicit ask via `write-unit-tests`

### 2026-07-14 — Initialization

- **Action**: Dev workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./src/` — awaiting approved BA requirements
- **Upstream dependency**: `../ba/req/{FeatureName}BSR.md` not yet created

