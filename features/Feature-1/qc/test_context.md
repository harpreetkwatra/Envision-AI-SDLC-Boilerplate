# QC Living Context Ledger

Two-part ledger for full reproduction of `./test/` from scratch (plus upstream `../ba/req/` and `../dev/src/`, the `write-test-cases` skill, and global standards named here or in `AGENTS.md`).

1. **Consolidated Context** — self-contained, always-current snapshot of everything needed to recreate `./test/`. Rewrite on every change; do not append. Prefer this section when regenerating the test suite.
2. **Chronological Log** — append-only history of intents, decisions, and what changed. Use for audit/debug; do not treat it as the rebuild source.

---

## Consolidated Context

> **Source of truth for reproduction.** Rewrite on every change. Prefer this over the Chronological Log when regenerating `./test/`.

### Feature identity

- Feature folder basename: `Feature-1`
- Product feature name: TBD
- Workspace: `features/Feature-1/qc/` — write only here; test artifacts land in `./test/`

### Artifact inventory

_(none — `./test/` is empty)_

Expected when authored (per `AGENTS.md`):

- Test case matrices (happy paths + explicit boundary failures) via skill `write-test-cases`
- Test data / payloads for pipeline execution
- Automation scripts (e.g. Playwright or Cypress E2E)

### Coverage (grounded in BA + Dev)

Ground tests against approved upstream (read-only):

- BA: requirements under `../ba/` (`req/` BSR, mockups, mock data)
- Dev: components and utilities under `../dev/src/`

_(No BA or Dev deliverables pinned yet — do not invent coverage ahead of requirements and implementation.)_

### Test data strategy

_(none yet)_

### Automation approach

_(none yet)_

### Open questions

_(none yet)_

### Constraints

- Writes: only this `qc/` tree (`./` and `./test/`)
- Reads: feature root `../` (BA + Dev); other features only when user `@`-tags them (integration testing, read-only)
- Do not write sibling `../ba/`, `../dev/`, or `../idg/`
- Isolate edge cases from both requirements and implemented code; prefer asserting shipping behavior when BA and Dev diverge, and log the gap

### Ordered rebuild recipe

1. Confirm product `{FeatureName}` and pinned BA + Dev upstream artifacts.
2. Recreate `./test/` from this Consolidated Context (inventory + coverage + test data + automation) using `write-test-cases` where matrices apply.
3. Cover happy paths and explicit boundary failures from BSR; exercise Dev UI/APIs as implemented.
4. _(No test artifacts yet — recipe completes once first suite ships.)_

---

## Chronological Log

### 2026-07-14 — Initialization

- **Action**: QC workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./test/` — awaiting BA requirements and Dev implementation
- **Upstream dependencies**: `../ba/req/` and `../dev/src/` not yet populated
