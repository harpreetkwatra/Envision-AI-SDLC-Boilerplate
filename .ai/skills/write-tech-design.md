---
name: write-tech-design
description: >-
  Generate technical design documents for feature Dev workspaces. Use when creating
  or updating tech-design.md in features/*/dev/eng/ after implementation is complete.
---

# Write Technical Design

Generate structured technical design documents that describe how a feature was implemented in the shipping app and supporting engineering artifacts.

## When to Use

- User says `create tech-design`, `write technical design`, `update tech design`, or invokes `write-tech-design`
- **After** feature coding in repo-root `src/` is substantially complete — document what was built, not speculative design
- Updating `tech-design.md` after significant implementation or schema/API changes

Do **not** create or rewrite `tech-design.md` on ordinary coding vibes — implementation work and technical design authoring are separate steps.

## Prerequisites

Resolve feature identity from the `dev/` folder (see `dev/AGENTS.md`), then READ:

1. `../ba/req/{FeatureName}BSR.md` — functional requirements and FR traceability (when present)
2. `../ba/req/{FeatureName}PageMockup.tsx` and `{FeatureName}MockData.json` — UI and data expectations (when present)
3. Repo-root `src/` — actual implementation (pages, hooks, API clients, routes, shell wiring)
4. `./eng/` — DDL scripts, data upgrade scripts, and other non-application artifacts
5. `./eng_context.md` — start with **Consolidated Context** before writing

Ground every section in real paths and artifacts. Prefer implemented behavior over BSR when they diverge; note gaps under **Open questions**.

## Output Location

| Artifact | Path |
|----------|------|
| Technical design | `features/Feature-N/dev/eng/tech-design.md` |

Write only the technical design file under the feature’s `dev/eng/` tree. After every create/update, refresh `dev/eng_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Technical Design Document Structure

Every `tech-design.md` MUST follow this exact section order:

```markdown
# Feature [N]: Technical Design — [Feature Title]

## 1. Metadata

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Status**: Draft | In Review | Approved
- **Author**: [Engineer name]
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `{FeatureName}MockData.json` (if any)
- **Implementation baseline**: [List of repo-root `src/` paths touched]

## 2. Summary

[2–4 paragraphs: architecture overview, key technical decisions, and how the feature fits the DTX portal shell.]

## 3. Requirements traceability

| FR-ID | BSR requirement | Implementation (`src/` path / module) | Notes |
|-------|-----------------|--------------------------------------|-------|
| FR-001 | [Short title] | [Actual `src/` path or module as implemented] | [N/A or gap] |

## 4. Architecture overview

[Component and service relationships; route hash; nav/shell integration; data flow between UI, API tier, and persistence. Optional mermaid or ASCII diagram.]

## 5. Back-end / database (SQL)

- **DDL scripts** (in `./eng/`): [filenames and purpose]
- **Data upgrade scripts** (in `./eng/`): [filenames and purpose]
- **Schema changes**: tables, columns, indexes, constraints
- **Rollback / migration order**: [steps or N/A]

## 6. API tier

### Strapi

- Content-types / REST endpoints (new or changed)
- Auth / permissions notes

### Analytics / envdlt (if applicable)

- Endpoints, request/response shapes, client modules (paths as implemented)

### Error handling

| Scenario | HTTP / behavior | User-facing message |
|----------|-----------------|---------------------|
| [Scenario] | [Code or behavior] | [Message or N/A] |

## 7. Services and shared logic

| Module | Path | Responsibility |
|--------|------|----------------|
| [Hook / util / provider] | [Actual path under `src/`] | [What it does] |

Cross-feature dependencies: [list or N/A]

## 8. UI / page components

- **Route / entry** (if applicable): [e.g. hash route, URL, or N/A]
- **Implementation paths**: [List actual `src/` paths — layout is engineer's choice]

| Component | Path | Role |
|-----------|------|------|
| [Page / widget / modal] | [path] | [Purpose] |

State and data flow: [brief description]

Shell / theme / layout: [Settings, Cards/Table toggle, etc.]

## 9. Configuration and environment

| Variable / setting | Purpose | Notes |
|--------------------|---------|-------|
| [e.g. `API_STRAPI_URL`] | [Why needed] | [Dev proxy / production] |

## 10. Testing and deployment notes

- **QC**: [Pointers to `../qc/tst/` coverage or gaps]
- **Manual smoke**: [Key steps]
- **Deployment / rollout**: [Migration order, feature flags, or N/A]

## 11. Open questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [BA/Dev gap, unresolved API behavior] | Open / Resolved | [Answer] |

## 12. Revision history

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

## Writing Rules

1. Describe *how* the feature is implemented — ground every section in actual `src/` and `./eng/` artifacts
2. Reference exact file paths as implemented; **do not prescribe** how `src/` should be organized — document what Dev chose
3. Link FR-IDs to BSR rows when a BSR exists; mark N/A when requirements were driven by mockup-only iteration
4. Call out BA vs implemented behavior gaps under **Open questions**
5. Do not duplicate full source listings — summarize structure and responsibilities
6. SQL and upgrade scripts belong in `./eng/`; document them in §5 with filenames, not inline dumps unless a short excerpt is essential
7. After creating or updating `tech-design.md`, update `dev/eng_context.md` Living Context Loop

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from dev/ parent folder
- [ ] Read eng_context.md Consolidated Context
- [ ] Read BA BSR (+ mockup / mock data if present)
- [ ] Inspect repo-root src/ for implemented pages, APIs, routes
- [ ] Inspect ./eng/ for DDL and upgrade scripts
- [ ] Create or update eng/tech-design.md using the Technical Design Document Structure above
- [ ] Rewrite eng_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
