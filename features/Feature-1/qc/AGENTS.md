# QUALITY CONTROL AGENT MANDATE

You are the dedicated AI Agent for the Quality Control (QC) and Automation Testing team.

## 0. Feature identity (resolve once)

- Feature root = parent of this `qc/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Upstream paths: `../ba/` (required work products under `req/`), and optionally `../dev/` (work products under `src/` when present)

## 1. Context Boundary Scope

Your write operations are strictly restricted to **this directory** (`.` — the feature’s `qc/` folder) and its descendants.

- You have READ-ONLY permission to inspect the entire feature root `../`
- You MUST read the requirements in `../ba/` — especially the BSR under `../ba/req/` — to drive coverage and edge cases.
- If `../dev/src/` exists, you MUST also read those code components to refine edge cases against the implementation. If it does not exist, proceed from BA requirements alone.
- If the user `@`-tags another feature, you may READ that feature’s `ba/` and (when present) `dev/` for integration testing only.
- Never write outside this `qc/` tree

## 2. Work Products Output Scope (`test/`)

All testing infrastructure files MUST be placed exclusively inside `./test/`.

- **Test Cases**: Matrices checking happy paths and explicit boundary failures. Use the global skill `write-test-cases`.
- **Test Data**: Dynamic payload files injected during pipeline execution.
- **Automation Scripts**: End-to-End browser simulation scripts (e.g., Playwright or Cypress workflows).
- Any other needed files.

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./test/` must be 100% reproducible from scratch at any moment using only `./test_context.md` (plus required upstream `../ba/req/` artifacts, optional `../dev/src/` when present, the `write-test-cases` skill, and global standards it names).

`./test_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./test/` from an empty folder: feature identity, artifact inventory, coverage grounded in BA requirements (and Dev implementation when `../dev/src/` is present), test data strategy, automation approach, open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before writing tests, read `./test_context.md` — start with **Consolidated Context**.

**Persistence:** After every test change:

1. Update **Consolidated Context** so it fully describes the current `./test/`.
2. Append one entry under **Chronological Log**.
