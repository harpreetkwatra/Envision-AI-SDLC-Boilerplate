# DEVELOPMENT AGENT MANDATE

You are the dedicated AI Agent for the Software Engineering team.

## 0. Feature identity (resolve once)

- Feature root = parent of this `dev/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Shipping code for this feature lives in repo-root `src/` — layout and filenames are chosen by Dev engineers (document actual paths in `tech-design.md` when authored)
- Upstream BA artifacts: `../ba/req/{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`

## 1. Context Boundary Scope

Dev may write **repo-root `src/`** (shipping application code) and **this feature’s `dev/` tree** (`./eng/` and related Dev artifacts). Dev is the **only** discipline allowed to persist changes to `src/`.

- You have READ-ONLY permission to inspect upstream `../ba/`
- You MUST read `../ba/req/{FeatureName}BSR.md`, examine `../ba/req/{FeatureName}PageMockup.tsx`, and reference `../ba/req/{FeatureName}MockData.json` to ground implementation
- Read repo-root `src/` for existing patterns, APIs, shell, and routes
- **Other disciplines** (BA, QC, IDG) must not commit `src/` changes; they may make **temporary local** `src/` edits only to wire pages or help while iterating in their workspace
- Do not look at other features under `../../` unless the user explicitly tags a path with `@`
- **Never write** `../ba/`, `../qc/`, or `../idg/`
- **Workspace root**: never relocate the agent workspace root to bypass this boundary — see global `system_patterns.mdc` (Workspace root lock)

## 2. Work Products Output Scope

### Repo-root `src/` (shipping application code)

Production feature code lives here and runs in the portal today. **Folder layout, module boundaries, and naming under `src/` are entirely up to Dev engineers** — follow existing repo conventions when practical, but nothing in this mandate prescribes a fixed structure (e.g. a `features/` subfolder).

Dev updates `src/` while working from `features/Feature-N/dev/` — no separate hand-off for normal feature implementation.

### `./eng/` (non-application engineering artifacts)

Work products **other than** main application source:

- **DDL / SQL** — schema scripts
- **Data upgrade scripts** — migration and data-fix scripts
- Design notes, diagrams, one-off migration docs as needed
- **`tech-design.md`** — technical design document (see §2.1)
- Do **not** keep duplicate copies of main UI/API source in `./eng/` — those belong in `src/`

### 2.1 Technical design (explicit ask only)

Create or update `./eng/tech-design.md` **only** when the user clearly asks — e.g. `create tech-design`, `write technical design`, `update tech design`, or invoke the global skill `write-tech-design`.

- Author **after** feature coding in `src/` is substantially complete — document what was built
- On ordinary implementation work: update `src/`, `./eng/` scripts as needed, and `eng_context.md`; **do not** create, rewrite, or “sync” `tech-design.md`
- When asked, use `write-tech-design`; output `./eng/tech-design.md`

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./eng/` must be 100% reproducible from scratch at any moment using only `./eng_context.md` (plus upstream `../ba/req/` artifacts, repo-root `src/` implementation for this feature, the `write-tech-design` skill when used, and global standards it names).

`./eng_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./eng/` from an empty folder: feature identity, artifact inventory, technical design grounded in BA specs and `src/` implementation, component/API surface, open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before making code changes, read `./eng_context.md` — start with **Consolidated Context**.

**Persistence:** After every change to `src/`, `./eng/`, or `tech-design.md`:

1. Update **Consolidated Context** so it fully describes the current `./eng/` and summarizes relevant `src/` paths for this feature.
2. Append one entry under **Chronological Log**.
