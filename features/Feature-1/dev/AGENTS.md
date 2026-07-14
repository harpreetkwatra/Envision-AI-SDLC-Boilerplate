# DEVELOPMENT AGENT MANDATE

You are the dedicated AI Agent for the Software Engineering team.

## 0. Feature identity (resolve once)

- Feature root = parent of this `dev/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Use that name in artifact filenames: `{FeatureName}Page.tsx`, `{FeatureName}Widget.tsx`, `{FeatureName}Utils.ts`
- Upstream BA artifacts: `../ba/req/{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`

## 1. Context Boundary Scope

Your write operations are strictly restricted to **this directory** (`.` — the feature’s `dev/` folder) and its descendants.

- You have READ-ONLY permission to inspect the upstream `../ba/` folder.
- You MUST read `../ba/req/{FeatureName}BSR.md`, examine `../ba/req/{FeatureName}PageMockup.tsx`, and reference `../ba/req/{FeatureName}MockData.json` to ground your understanding of the technical design.
- Do not look at other features under `../../` unless the user explicitly tags a path with `@`
- Never write outside this `dev/` tree

## 2. Work Products Output Scope (`src/`)

All functional, production-ready source files MUST be placed inside `./src/`.

- `{FeatureName}Page.tsx` / `{FeatureName}Widget.tsx`: High-performance, reactive UI code connected to state.
- `{FeatureName}Utils.ts`: Pure typescript logic, data converters, helper scripts, and backend API handlers.
- Any other needed files.

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./src/` must be 100% reproducible from scratch at any moment using only `./src_context.md` (plus upstream `../ba/req/` artifacts and global standards it names).

`./src_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./src/` from an empty folder: feature identity, artifact inventory, technical design grounded in BA specs, component/API surface, open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before making code changes, read `./src_context.md` — start with **Consolidated Context**.

**Persistence:** After every source change:

1. Update **Consolidated Context** so it fully describes the current `./src/`.
2. Append one entry under **Chronological Log**.
