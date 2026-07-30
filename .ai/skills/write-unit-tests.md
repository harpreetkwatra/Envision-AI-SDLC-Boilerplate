---
name: write-unit-tests
description: >-
  Create or update Vitest unit tests under features/*/dev/eng/. Use when the user
  asks to write unit tests, create unit testing, update unit test cases, or
  invokes write-unit-tests.
---

# Write Unit Tests

Create or update Vitest unit tests that exercise shipping code in repo-root `src/`. Tests live under the feature’s `dev/eng/` tree — not in `src/` or `qc/tst/`.

## When to Use

- User says `write unit tests`, `create unit testing`, `update unit test cases`, or invokes `write-unit-tests`
- Updating existing `./eng/**/*.test.ts(x)` after implementation changes in `src/`

Do **not** create or rewrite unit tests on ordinary feature coding — implementation and unit-test authoring are separate steps.

## Prerequisites

Resolve feature identity from the `dev/` folder (see `dev/AGENTS.md` §0), then READ:

1. `./eng_context.md` — start with **Consolidated Context**
2. Repo-root `src/` — modules under test (hooks, utils, API normalizers, small components)
3. Optional: `../ba/req/{FeatureName}BSR.md`, `./eng/tech-design.md`
4. Global `tech_context.md` — stack constraints (TypeScript ~5.9, React 19, Vite 8, Vitest)

Ground every test in real `src/` behavior. Prefer implemented behavior over BSR when they diverge; note gaps in `eng_context.md`.

## Output Location

| Artifact | Path |
|----------|------|
| Unit test | `features/Feature-N/dev/eng/{ModuleName}.test.ts(x)` |

- Name files after the `src/` module under test (e.g. `envdltSharedFields.test.ts` for `src/api/envdltSharedFields.ts`)
- Never place unit tests under `src/` or `features/*/qc/tst/`
- Imports from `./eng/` into `src/` — use `@/api/...` (Vite alias and `tsconfig.vitest.json` paths) or relative (e.g. `../../../../src/api/envdltSharedFields`)

After every create/update, refresh `dev/eng_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Vitest Tooling (repo-wide)

Vitest is configured at repo root. Do **not** re-bootstrap unless files are missing.

| Artifact | Purpose |
|----------|---------|
| `package.json` | `test:unit`, `test:unit:watch`; devDeps: `vitest`, `jsdom`, `@testing-library/*` |
| `vite.config.ts` | `test` block; `@` → `src/` alias |
| `vitest.setup.js` | `@testing-library/jest-dom/vitest` |
| `tsconfig.vitest.json` | IDE/typecheck for `features/**/dev/eng/**/*.test.{ts,tsx}` with `@/*` paths (run `tsc -p tsconfig.vitest.json --noEmit` when tests exist) |

## What to Unit-Test (Priority)

1. **Pure functions** — API normalizers, formatters, parsers (e.g. `envdltSharedFields`, Strapi helpers)
2. **Hooks** — with `@testing-library/react` `renderHook`
3. **Small components** — isolated behavior, mocked providers

## What Not to Unit-Test Here

- Full portal shell navigation, auth flows, or cross-page journeys → QC / `write-qc-tests` (Playwright E2E)
- Live Strapi or envdlt calls — mock `fetch` or module imports; never use real credentials

## Test Structure Template

```typescript
// features/Feature-1/dev/eng/envdltSharedFields.test.ts
import { describe, it, expect } from 'vitest'
import { pickStr } from '@/api/envdltSharedFields'

describe('pickStr', () => {
  it('returns string input unchanged', () => {
    expect(pickStr('  foo  ')).toBe('  foo  ')
  })

  it('returns null for non-string non-number input', () => {
    expect(pickStr(null)).toBeNull()
  })
})
```

## Writing Rules

1. Name files `*.test.ts` / `*.test.tsx` — never `*.spec.ts` (reserved for Playwright E2E)
2. One `describe` block per exported function or hook; cover happy path, boundary, and error cases
3. Mock external I/O; no credentials in tests
4. Match strict TypeScript — avoid `any` unless unavoidable
5. Useful tests only — skip trivial “renders without crashing” unless behavior is asserted
6. After create/update: update `dev/eng_context.md` Living Context Loop

## Do Not Run

Authoring and running are separate steps. Do **not** run `npm run test:unit` or `npx vitest` after authoring unless the user also asks to run tests in the same request. Running follows `dev/AGENTS.md` §4.

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from dev/ parent folder
- [ ] Read eng_context.md Consolidated Context
- [ ] Inspect repo-root src/ for modules to test
- [ ] Create or update eng/{ModuleName}.test.ts(x) using templates above
- [ ] Rewrite eng_context.md Consolidated Context (list test files + src/ modules covered)
- [ ] Append Chronological Log entry (date and time)
```
