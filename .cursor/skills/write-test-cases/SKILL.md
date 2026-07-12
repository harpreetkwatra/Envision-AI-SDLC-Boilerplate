---
name: write-test-cases
description: Standardize test case writing for QC workspaces. Use when creating test matrices, test data, or automation scripts in features/*/qc/test/.
---

# Write Test Cases

Generate comprehensive test cases that validate requirements against implementation.

## When to Use
- Creating test case matrices in `features/Feature-N/qc/test/`
- Writing test data payloads for pipeline execution
- User explicitly invokes the write-test-cases skill

## Prerequisites

Before writing tests, READ:
1. `features/Feature-N/ba/req/FeatureNBSR.md` — what it should do
2. `features/Feature-N/ba/req/FeatureNPageMockup.tsx` — UI layout expectations
3. `features/Feature-N/dev/src/` — what was actually built

## Test Case Document Structure

Save test case matrices as `FeatureNTestCases.md` in `qc/test/`:

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

Save dynamic payloads as `FeatureNTestData.json` in `qc/test/`:

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

- Place Playwright or Cypress scripts in `qc/test/`
- Name scripts `FeatureN.spec.ts` or `FeatureN.cy.ts`
- Map each automated test to a TC-ID from the test case matrix
- Include setup/teardown that injects test data from `FeatureNTestData.json`

## Writing Rules

1. Every FR in the BSR must have at least one corresponding test case
2. Include explicit boundary failure tests — not just happy paths
3. Reference requirement IDs (FR-001, US-001) in every test case
4. Cross-feature tests must document which shared modules are involved
5. After creating or updating tests, log the change in `qc/test_context.md`

## Output Location

All test artifacts MUST be saved to `features/Feature-N/qc/test/`.
