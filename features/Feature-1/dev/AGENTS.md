# DEVELOPMENT AGENT MANDATE

You are the dedicated AI Agent for the Software Engineering team.

## 0. Feature identity (resolve once)

- Feature root = parent of this `dev/` folder → `../`
- Feature name = basename of that folder (e.g. `Prices`)
- Shipping code for this feature lives in repo-root `src/` — layout and filenames are chosen by Dev engineers (document actual paths in `tech-design.md` when authored)
- Upstream BA artifacts: `../ba/req/{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`, `{FeatureName}MockData.json`
- Implementation from those artifacts: **`code-api`** / **`code-front-end`** (§2.0)

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
- **Unit tests** — Vitest specs named `*.test.ts(x)` under `./eng/` (see §2.2)
- Do **not** keep duplicate copies of main UI/API source in `./eng/` — those belong in `src/`

### 2.0 Feature implementation (BSR → shipping code)

When the user asks to **implement**, **code**, **build**, or **ship** a feature from approved BA artifacts — or invokes **`code-api`** or **`code-front-end`** — follow the matching global skill.

| Skill | Write scope | Use when |
|-------|-------------|----------|
| **`code-api`** | `src/api/**` and `./eng/` DDL / upgrade scripts | BSR changes data model, fetch/normalization, clients, mock fallbacks, or schema scripts |
| **`code-front-end`** | `src/**` except `src/api/**` | BSR changes routes, pages, list/table UX, hooks, CSS, shell wiring, or help anchors |

**Before coding:** read `./eng_context.md` (**Consolidated Context**), `../ba/req/{FeatureName}BSR.md`, and the page mockup / mock data when present.

**Layer order:** complete or verify **`code-api`** before **`code-front-end`** when the BSR includes both schema/API and UI. UI-only increments may use **`code-front-end`** alone.

**On ordinary implementation:** update `src/`, `./eng/` scripts as needed, and `eng_context.md`; **do not** create or rewrite `tech-design.md` or unit tests unless explicitly asked (§2.1, §2.2).

**API root (project-specific):** default `src/api/**`; if the repo documents a different client path, follow that convention in **`code-api`** only.

### 2.1 Technical design (explicit ask only)

Create or update `./eng/tech-design.md` **only** when the user clearly asks — e.g. `create tech-design`, `write technical design`, `update tech design`, or invoke the global skill `write-tech-design`.

- Author **after** feature coding in `src/` is substantially complete — document what was built
- On ordinary implementation work: update `src/`, `./eng/` scripts as needed, and `eng_context.md`; **do not** create, rewrite, or “sync” `tech-design.md`
- When asked, use `write-tech-design`; output `./eng/tech-design.md`

### 2.2 Unit tests (explicit ask only)

Create or update `./eng/**/*.test.ts(x)` **only** when the user clearly asks — e.g. `write unit tests`, `create unit testing`, `update unit test cases`, or invoke the global skill `write-unit-tests`.

- Output **`./eng/**/*.test.ts(x)`** that exercise the feature’s shipping modules in repo-root `src/`
- On ordinary implementation work: update `src/`, `./eng/` scripts as needed, and `eng_context.md`; **do not** create or rewrite unit tests proactively
- **Do not** run Vitest after authoring unless the user also asks to run (see §4)
- Unit tests are **Dev-owned** under `./eng/`; QC owns Playwright E2E under `../qc/tst/` — do not use `write-qc-tests` for unit work
- When asked, use `write-unit-tests`; name files after the `src/` module under test (e.g. `{ModuleName}.test.ts`)

## 3. Mandatory Living Context Loop

**The Goal:** The folder `./eng/` must be 100% reproducible from scratch at any moment using only `./eng_context.md` (plus upstream `../ba/req/` artifacts, repo-root `src/` implementation for this feature, the `write-tech-design` and `write-unit-tests` skills when used, and global standards it names).

`./eng_context.md` has two parts, in this order:

1. `## Consolidated Context` (required, always current)
  - Rewrite this section on **every** change — do not append to it.
  - It must contain **everything** needed to recreate `./eng/` from an empty folder: feature identity, artifact inventory, technical design grounded in BA specs and `src/` implementation, component/API surface (summarize `src/api/**` modules and front-end modules outside `src/api/**`), open questions, constraints, and an ordered rebuild recipe.
  - Prefer this section over the chronological log when regenerating artifacts.
2. `## Chronological Log` (append-only history)
  - After each change, append a dated (date and time both) entry with user intent, decisions, and what changed.
  - Never edit or delete prior log entries (except trivial typo fixes).

**Execution:** Before making code changes, read `./eng_context.md` — start with **Consolidated Context**.

**Persistence:** After every change to `src/`, `./eng/`, `tech-design.md`, or unit tests:

1. Update **Consolidated Context** so it fully describes the current `./eng/` (including `./eng/**/*.test.ts(x)` and the `src/` modules they cover) and summarizes relevant `src/` paths for this feature.
2. Append one entry under **Chronological Log**. Skipping the Chronological Log because a `src/` change is unrelated to this feature is **never** permitted.

## 4. Running unit tests (explicit ask only)

Run the suite **only** when the user asks to **run unit tests**, **run vitest**, **execute unit tests**, or similar. Do **not** run tests as part of writing or updating them unless the user also asks for a run in the same request.

1. Default from **repo root**: `npm run test:unit`
2. Feature-scoped: `npx vitest run features/Feature-1/dev/eng/` (adjust feature folder as needed)
3. Optional watch: `npm run test:unit:watch`
4. Single file: `npx vitest run features/Feature-1/dev/eng/{ModuleName}.test.ts`
5. Report pass/fail counts and summarize any failures (file, test title, error). Do not invent green results if the command failed or no tests were found.
6. After failures: report findings; fix only when the user asks for fixes (same spirit as QC §3.8).
