---
name: write-qc-tests
description: >-
  Standardize QC test case writing for feature workspaces. Use when creating test
  matrices, test data, or Playwright E2E automation in features/*/qc/tst/.
---

# Write QC Tests

Generate comprehensive QC test cases and Playwright E2E automation that validate requirements against implementation.

## When to Use

- Creating test case matrices in `features/Feature-N/qc/tst/`
- Writing test data payloads for pipeline execution
- Authoring or updating Playwright `*.spec.ts` E2E scripts under `qc/tst/`
- User says `write qc tests`, `create qc tests`, `write e2e tests`, or invokes `write-qc-tests`

Do **not** use this skill for Dev unit tests — those belong under `dev/eng/` via `write-unit-tests`.

## Prerequisites

Before writing QC tests, READ:

1. `features/Feature-N/ba/req/FeatureNBSR.md` — what it should do
2. `features/Feature-N/ba/req/FeatureNPageMockup.tsx` — UI layout expectations
3. Repo-root **`src/`** — shipped implementation (what was actually built)
4. `features/Feature-N/dev/eng/` — optional (`tech-design.md`, SQL/upgrade scripts)
5. `./tst_context.md` — start with **Consolidated Context** when present

## Test Case Document Structure

Save test case matrices as `FeatureNTestCases.md` in `qc/tst/`:

```markdown
# Feature [N]: Test Cases

## Test Summary

| Category | Total | Pass | Fail | Blocked | Not Run |
|----------|-------|------|------|---------|---------|
| Happy Path | 0 | 0 | 0 | 0 | 0 |
| Boundary | 0 | 0 | 0 | 0 | 0 |
| Error Handling | 0 | 0 | 0 | 0 | 0 |
| Integration | 0 | 0 | 0 | 0 | 0 |

## Happy Path Tests

| TC-ID | Requirement Ref | Test Description | Preconditions | Steps | Expected Result | Priority |
|-------|-------------------|------------------|---------------|-------|-----------------|----------|
| TC-001 | FR-001 | [Description] | [Setup] | 1. Step one 2. Step two | [Outcome] | P1 |

## Boundary Tests

| TC-ID | Requirement Ref | Test Description | Input Boundary | Expected Result | Priority |
|-------|-------------------|------------------|----------------|-----------------|----------|
| TC-101 | FR-001 | [Description] | [Min/Max/Empty/Null] | [Outcome] | P2 |

## Error Handling Tests

| TC-ID | Requirement Ref | Test Description | Trigger | Expected Error | Priority |
|-------|-------------------|------------------|---------|----------------|----------|
| TC-201 | FR-001 | [Description] | [Invalid input/action] | [Error message/behavior] | P2 |

## Integration Tests

| TC-ID | Systems Involved | Test Description | Steps | Expected Result | Priority |
|-------|------------------|------------------|-------|-----------------|----------|
| TC-301 | Feature-1 + Feature-9 | [Description] | [Steps] | [Outcome] | P1 |
```

## Test Data Format

Save dynamic payloads as `FeatureNTestData.json` in `qc/tst/`:

```json
{
  "happyPath": {
    "description": "Valid input scenario",
    "payload": {}
  },
  "boundaryCases": [
    {
      "description": "Empty input",
      "payload": {}
    }
  ],
  "errorCases": [
    {
      "description": "Invalid format",
      "payload": {},
      "expectedError": "Error message"
    }
  ]
}
```

## Automation Script Guidelines

- Place Playwright E2E scripts in `qc/tst/` — name `FeatureN.spec.ts` (never `*.test.ts`; that pattern is reserved for Dev unit tests)
- Map each automated test to a TC-ID from the test case matrix
- Include setup/teardown that injects test data from `FeatureNTestData.json`

## Writing Rules

1. Every FR in the BSR must have at least one corresponding test case
2. Include explicit boundary failure tests — not just happy paths
3. Reference requirement IDs (FR-001, US-001) in every test case
4. Cross-feature tests must document which shared modules are involved
5. After creating or updating QC tests, log the change in `qc/tst_context.md`

## Output Location

All QC test artifacts MUST be saved to `features/Feature-N/qc/tst/`.

## Do Not Run

Authoring and running are separate steps. Do **not** run Playwright after authoring unless the user also asks to run tests. Running follows `qc/AGENTS.md` §3.
