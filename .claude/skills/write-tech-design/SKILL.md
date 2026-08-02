---
name: write-tech-design
description: >-
  Generate technical design documents for feature Dev workspaces. Use when creating
  or updating tech-design.md in features/*/dev/eng/ after implementation is complete.
---

# Write Technical Design

Generate structured **Design IID** documents that describe how a feature was implemented in the shipping app and supporting engineering artifacts.

Aligned with ENFS enterprise Design IID layout (e.g. `td-template.pdf`, Design IID 112407): Objects Inventory, Permissions, MIPCO Settings, Brief Technical Description, per-endpoint REST API tables, Impacted Modules.

## When to Use

- User says `create tech-design`, `write technical design`, `update tech design`, or invokes `write-tech-design`
- **After** feature coding in repo-root `src/` is substantially complete — document what was built, not speculative design
- Updating `tech-design.md` after significant implementation or schema/API changes

Do **not** create or rewrite `tech-design.md` on ordinary coding vibes — implementation work and technical design authoring are separate steps.

## Prerequisites

Resolve feature identity from the `dev/` folder (see `dev/AGENTS.md`), then READ:

1. `../ba/req/{FeatureName}BSR.md` — functional requirements, FR/REQ IDs, and IID/ZID reference (when present)
2. `../ba/req/{FeatureName}PageMockup.tsx` and `{FeatureName}MockData.json` — UI and data expectations (when present)
3. Repo-root `src/` — actual implementation (pages, hooks, API clients, routes, shell wiring)
4. `./eng/` — DDL scripts, data upgrade scripts, and other non-application artifacts
5. `./eng_context.md` — start with **Consolidated Context** before writing

Ground every section in real paths and artifacts. Prefer implemented behavior over BSR when they diverge; note gaps under **Open questions**.

Before writing, decide which tier sections apply — see **Stack-aware section rule** below.

## Output Location

| Artifact | Path |
|----------|------|
| Technical design | `features/Feature-N/dev/eng/tech-design.md` |

Write only the technical design file under the feature’s `dev/eng/` tree. After every create/update, refresh `dev/eng_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Technical Design Document Structure

Every `tech-design.md` MUST follow this ENFS Design IID section order. Omit tier-specific sections per **Stack-aware section rule** — do not emit empty enterprise headings.

```markdown
# Design IID [IID] — [Feature Title]

Reference: BSR IID [IID] — [BSR title] (`../ba/req/{FeatureName}BSR.md`)

## IID Name and Description

| Field | Value |
|-------|-------|
| Feature ID | Feature-[N] |
| Feature name | [FeatureName] |
| IID / ZID | [From BSR Project Metadata; else N/A] |
| Status | Draft \| In Review \| Approved |
| Author | [Engineer name] |
| Last Updated | YYYY-MM-DD |
| Upstream | `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `{FeatureName}MockData.json` (if any) |
| Implementation baseline | [List of repo-root `src/` and `./eng/` paths touched] |

[1–2 paragraphs: what the change delivers, where it lives in the app, and key technical decisions.]

## Change Summary

### New APIs

- [Endpoint-VERB — one per line; omit subsection when none]

### Modified APIs

- [Endpoint-VERB — one per line; omit subsection when none]

### New Views/Files

- [path/to/new/file — one per line; omit subsection when none]

### Modified Views/Files

- [path/to/modified/file — one per line; omit subsection when none]

## Objects Inventory

### Front End (Web Tier)

[List every front-end object as an indented folder tree using real paths, e.g. `src` → `pages` → `FeaturePage.tsx`. Include hooks, CSS, and shell wiring under `src/`.]

### Services and Middle Tier

[Emit only when `src/api/**` exists for this feature. List objects from controller/API client through service/repository layers using real paths.]

### SQL

[Emit only when `./eng/` contains DDL/upgrade scripts. List DDL scripts, stored procedures, triggers, ID counters, and data scripts by filename and purpose.]

## Permissions

[Emit only when the product has screen/API permission subsystems. Omit entirely for theApp shell features.]

### Screen Permissions

- [Permission name — feature category — when assigned / behavior]

### API Permissions

- [Functional entitlement — endpoint — when required]

## MIPCO Settings

[Emit only when the product has MIPCO / page-customization subsystems. Omit entirely for theApp shell features.]

### Page Customization Settings

- [Tab path → setting name → purpose]

### Display Settings

- [Tab path → setting name → purpose]

### Activity and Email Settings

- [Tab path → setting name → purpose]

### Acknowledgement Settings

- [Tab path → setting name → purpose]

## Fund Group Settings

[Emit only when fund-group or tenant settings gate access to the screen/API. Omit when not applicable.]

- [Setting path → flag or value → effect on feature]

## Error codes

[Emit when the feature surfaces coded errors (API tier, SQL, or client validation). Omit when no coded errors exist.]

| Code | Message | Raised by | Notes |
|------|---------|-----------|-------|
| [Code or HTTP status] | [User-facing or API message] | [Endpoint, proc, or module] | [When triggered] |

## Brief Technical Description

### FE

[Numbered, imperative implementation steps for the front end. Reference BSR FR/REQ IDs inline. Short payload or state-shape snippets allowed when essential.]

1. [Step — e.g. Add route `#feature` in `navRoutes.ts` and wire sidebar entry (REQ-003).]
2. [Step — e.g. Load mock data from `{FeatureName}MockData.json` via hook in `src/pages/...`.]

### Service

[Emit only when `src/api/**` exists. Numbered steps for API client modules, DTOs, and middle-tier changes.]

1. [Step — e.g. Add `getFeature()` in `src/api/feature/feature.ts` calling `GET /Feature`.]

### SQL

[Emit only when `./eng/` contains scripts. Numbered steps per script — validation rules, proc behavior, migration order.]

1. [Step — e.g. Update `usp_api_GetFeature` to return new column `EnableFeature`.]

## REST API

[Emit only when `src/api/**` exists for this feature.]

[Flat list of endpoints, one per line:]

- GET /Resource({Key})
- PUT /Resource
- POST /Resource

### Exceptions

| Permissions / URL Access | Exception message |
|--------------------------|-------------------|
| /Resource({Key})-GET | Unauthorized access. |
| /Resource-PUT | Unauthorized access. |

### /Resource (GET)

| Field | Value |
|-------|-------|
| URI | /Resource({Key}) |
| Description | [What the API does] |
| HTTP Methods | GET |
| Restricted | Yes \| No |
| Functional Entitlements | [Entitlement name or N/A] |
| Data Entitlements | [e.g. IsAuthorizedAccount — validation rule] |
| Stored Procedure(s) | [usp_name or N/A] |
| Exceptions (Code-Message) | [Unauthorized access. / other messages] |

[Repeat `### /Endpoint (METHOD)` block for every endpoint — one detail table per endpoint; never merge endpoints into a shared table.]

## Impacted Modules

[List modules or products affected beyond this feature — e.g. TA, SA, MEFA, PAWeb, or in-repo areas like `src/app/navRoutes.ts`. Write N/A when the feature is self-contained.]

## Desktop View

Screenshots shall be added after development.

## Open questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [BA/Dev gap, unresolved API behavior] | Open / Resolved | [Answer] |

## Revision history

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

## Stack-aware section rule

Emit only sections that match the implemented stack. Never invent entitlements, stored procedures, or MIPCO paths to fill a section.

| Section | Emit when |
|---------|-----------|
| **IID Name and Description**, **Change Summary**, **Objects Inventory → Front End**, **Brief Technical Description → FE**, **Impacted Modules**, **Desktop View**, **Open questions**, **Revision history** | Always |
| **Objects Inventory → Services and Middle Tier**, **Brief Technical Description → Service**, **REST API** (all subsections), **API Permissions**, **Error codes** (API-sourced) | `src/api/**` exists for this feature |
| **Objects Inventory → SQL**, **Brief Technical Description → SQL**, **Error codes** (SQL-sourced) | `./eng/` contains DDL or upgrade scripts |
| **Permissions** (Screen and API), **MIPCO Settings**, **Fund Group Settings** | Product has those subsystems (ENFS host-integrated work) |

**theApp (this repo) defaults:** auth is client-side only (`sessionStorage` key `theapp.session`; any credentials succeed). There is no MIPCO, fund-group settings, or entitlement subsystem — omit **Permissions**, **MIPCO Settings**, and **Fund Group Settings** for typical theApp features. When no API tier exists, omit **REST API** and **Services and Middle Tier**; note "no API tier" in **Change Summary** if relevant.

## Writing Rules

1. Describe *how* the feature is implemented — ground every section in actual `src/` and `./eng/` artifacts
2. Reference exact file paths as implemented; **do not prescribe** how `src/` should be organized — document what Dev chose
3. **Objects Inventory** uses folder-tree form with real paths (e.g. `src` → `pages` → `FeaturePage.tsx`), matching ENFS Design IID Web Tier listings
4. **Brief Technical Description** is numbered, imperative, and step-wise per tier; reference BSR FR/REQ IDs inline (replaces a separate traceability table)
5. Call out BA vs implemented behavior gaps under **Open questions**
6. Do not duplicate full source listings — summarize structure and responsibilities; keep snippets to essential payload shapes only
7. SQL and upgrade scripts belong in `./eng/`; document them in **Objects Inventory → SQL** and **Brief Technical Description → SQL** with filenames, not inline dumps unless a short excerpt is essential
8. **REST API**: one detail table per endpoint — never merge endpoints into a shared table
9. **Desktop View**: use placeholder text until screenshots exist ("Screenshots shall be added after development")
10. After creating or updating `tech-design.md`, update `dev/eng_context.md` Living Context Loop

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from dev/ parent folder
- [ ] Read eng_context.md Consolidated Context
- [ ] Read BA BSR (+ mockup / mock data if present); note IID/ZID and BSR title for Reference line
- [ ] Inspect repo-root src/ for implemented pages, APIs, routes
- [ ] Inspect ./eng/ for DDL and upgrade scripts
- [ ] Decide which tier sections apply (stack-aware section rule)
- [ ] Build Change Summary (new vs modified APIs and files)
- [ ] Enumerate REST endpoints for per-endpoint detail tables (when API tier exists)
- [ ] Create or update eng/tech-design.md using the Technical Design Document Structure above
- [ ] Rewrite eng_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
