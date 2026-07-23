---
name: write-doc
description: >-
  Produce and update IDG documentation in features/*/idg/doc/: context-sensitive
  help (FeatureN-csh.md), online help (FeatureNOnlineHelp.md), user manuals
  (FeatureNManual.md), and release notes (FeatureNReleaseNotes.md). Use when
  creating or updating IDG docs, CSH, online help, manuals, release notes,
  field-level help, or in-app help mapping.
---

# Write Doc

Generate IDG deliverables for a feature: context-sensitive help (CSH), online help, user manuals, and release notes. All artifacts land under `features/Feature-N/idg/doc/`.

On every `write-doc` invocation, produce or refresh **all four** standard deliverables in one pass. BA/Dev adoption of Online Help is optional.

## When to Use

- Creating or updating IDG documentation for a feature (`write doc`, `write the docs`, `author IDG`, or explicit `write-doc` skill invocation)
- Creating or updating any of: `{FeatureName}-csh.md`, `{FeatureName}OnlineHelp.md`, `{FeatureName}Manual.md`, `{FeatureName}ReleaseNotes.md`
- Working in a feature's `idg/` folder on release notes, manuals, online help, or in-app / field-level help

**Standard deliverable set:** always output CSH + OnlineHelp + Manual + Release Notes together. Partial requests (e.g. CSH-only) still require syncing `{FeatureName}OnlineHelp.md` when any CSH topic in the Online Help body changes.

## Prerequisites

Resolve feature identity from the `idg/` folder (see `idg/AGENTS.md`), then READ:

1. `../ba/req/{FeatureName}BSR.md` — required behavior and acceptance criteria
2. `../ba/req/{FeatureName}PageMockup.tsx` — UI layout and control labels (when present)
3. `../ba/req/{FeatureName}MockData.json` — sample payloads / field names (when present)
4. `../dev/eng/` — implemented labels, validation messages, and workflows
5. `./doc_context.md` — start with **Consolidated Context** before writing

Do not invent UI strings that contradict Dev implementation. Prefer Dev labels; note BA/Dev mismatches under **Open questions**.

## Output Location and Naming

| Artifact | Path |
|----------|------|
| Context-sensitive help | `features/Feature-N/idg/doc/{FeatureName}-csh.md` |
| Online help (page drawer) | `features/Feature-N/idg/doc/{FeatureName}OnlineHelp.md` |
| User manual | `features/Feature-N/idg/doc/{FeatureName}Manual.md` |
| Release notes | `features/Feature-N/idg/doc/{FeatureName}ReleaseNotes.md` |

Write only inside the feature’s `idg/` tree. After every create/update, refresh `idg/doc_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Deliverable roles

| Artifact | Purpose |
|----------|---------|
| `{FeatureName}-csh.md` | Short, keyed topics for a specific page, dialog, control, or field (tooltips, help icons, F1 panes) |
| `{FeatureName}OnlineHelp.md` | Pre-composed page help drawer / slider body and open-in-new-tab content; assembled from CSH + Manual §4 |
| `{FeatureName}Manual.md` | Comprehensive end-user guide: workflows, screenshot references, glossary |
| `{FeatureName}ReleaseNotes.md` | What's new, changed, fixed, and known issues per release |

CSH topics stay brief (typically 1–3 short paragraphs or a tight bullet list). Link to Manual sections when deeper guidance exists. Online Help prose for a control MUST match CSH **Help text** verbatim. BA/Dev may adopt Online Help optionally.

## Document Structures

Every IDG deliverable MUST follow the section order for its artifact type below.

### CSH Document Structure

Every `{FeatureName}-csh.md` file MUST follow this section order:

```markdown
# Feature [N]: Context-Sensitive Help

## 1. Metadata

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Status**: Draft | In Review | Approved
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `dev/eng/`

## 2. Help Map Summary

| CSH-ID | UI surface | Trigger / control | Error state | Topic title | Manual ref |
|--------|------------|-------------------|-------------|-------------|------------|
| CSH-001 | [Page / dialog] | [Control or field] | [Validation / failure help, or N/A] | [Short title] | [Manual §x.x or N/A] |

## 3. Topics

### CSH-001: [Topic title]

- **UI surface**: [Page, dialog, drawer, or panel name as shown in product]
- **Anchor**: [Stable key — e.g. field name, `data-help-id`, route + control]
- **Trigger**: Help icon | F1 | Tooltip | Inline | Other
- **Audience**: [Persona if relevant]
- **Related FR**: [FR-00x or N/A]

**Help text**

[Concise user-facing copy. Use product UI labels exactly. No implementation jargon.]

**Validation / errors** (optional)

[User-facing validation or error message and what the user should do. Omit if N/A.]

**See also**

- [Manual §5.2, CSH-00x, or N/A]

### CSH-002: [Topic title]

…

## 4. Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [Gap between BA and Dev, missing anchor, unclear copy] | Open / Resolved | [Answer] |

## 5. Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

### Online Help Document Structure

Every `{FeatureName}OnlineHelp.md` file MUST follow this section order. See `idg/AGENTS.md` §2.2 for sync rules and anti-patterns.

```markdown
# Feature [FeatureName]: Online Help

## 1. Metadata

- **Feature name**: [FeatureName]
- **Drawer title**: [e.g. Prices Help]
- **Page anchor**: [e.g. prices.page]
- **Status**: Draft | In Review | Approved
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}-csh.md`, `{FeatureName}Manual.md`, `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx`

## 2. Drawer body

## Overview
<!-- anchor: [page anchor] -->
<!-- csh: CSH-001 -->

[CSH-001 help text verbatim]

## Page layout
<!-- manual: §4.1 -->

- **Toolbar** — …
- …

## [Control section — e.g. Refresh]
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[CSH help text verbatim]

## Table columns

### [Column label]
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[CSH help text verbatim]

## Pagination
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[CSH help text verbatim]

## Messages
<!-- csh: CSH-00x -->

- **[Message]** — [What to do]
- …

## 3. Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [Gap or adoption question] | Open / Resolved | [Answer] |

## 4. Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

### User Manual Document Structure

Every `{FeatureName}Manual.md` file MUST follow this section order:

```markdown
# Feature [N]: [Feature Title] — User Manual

## 1. Metadata

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Product**: DLT Manager
- **Status**: Draft | In Review | Approved
- **Audience**: [e.g. Operations / transfer-agent ops]
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `{FeatureName}-csh.md`, `dev/eng/`

## 2. Introduction

### 2.1 Purpose

[One paragraph: what this feature lets the user do and why it matters.]

### 2.2 Who should use this guide

[Personas and roles.]

### 2.3 Prerequisites

- Signed in to DLT Manager (Strapi credentials)
- [Permissions, data setup, or other prerequisites — or N/A]

## 3. Accessing the feature

- **Navigation**: [Left rail icon / menu label]
- **Route**: `#[route-hash]` (e.g. `#tokens`)
- **Breadcrumb**: [Label as shown in shell]
- **Notes**: [Shell or theme notes if relevant — or N/A]

## 4. Screen overview

### 4.1 Layout

[Cards vs Table toggle, default layout, Settings → Layout if applicable.]

### 4.2 Toolbar and primary actions

| Action | Control label | Description |
|--------|---------------|-------------|
| Refresh | [Label] | [What it does] |
| [Add / Create] | [Label] | [What it does] |

### 4.3 List / main content

[Columns, cards, sort, filter, pagination — mirror Dev UI labels.]

![Figure 4.1: [Screen name]](screenshots/[filename].png)

## 5. Workflows

### 5.1 [Workflow title — e.g. View the list]

**Goal**: [One line.]

**Related FR**: [FR-00x or N/A]

1. [Numbered step using exact UI labels.]
2. [Next step.]

![Figure 5.1: [Workflow step]](screenshots/[filename].png)

### 5.2 [Workflow title — e.g. Create a new record]

**Goal**: [One line.]

**Related FR**: [FR-00x or N/A]

1. [Numbered step.]
2. [Next step.]

## 6. Fields and controls

| Label | Control type | Required | Description | CSH-ID |
|-------|--------------|----------|-------------|--------|
| [Field label] | [Text / Select / Toggle / …] | Yes / No | [User-facing description] | [CSH-00x or N/A] |

## 7. Messages and troubleshooting

| Situation | Message or behavior | What to do |
|-----------|---------------------|------------|
| [Empty list] | [Message] | [User action] |
| [Validation error] | [Exact message] | [Correction] |

## 8. Glossary

| Term | Definition |
|------|------------|
| [Term] | [Plain-language definition] |

## 9. Related documentation

- Context-sensitive help: `{FeatureName}-csh.md`
- Requirements: `{FeatureName}BSR.md` (FR references as needed)

## 10. Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [BA/Dev gap, missing screenshot, unclear workflow] | Open / Resolved | [Answer] |

## 11. Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

### Release Notes Document Structure

Every `{FeatureName}ReleaseNotes.md` file MUST follow this section order:

```markdown
# Feature [N]: [Feature Title] — Release Notes

## 1. Release metadata

- **Product**: DLT Manager
- **Feature**: [FeatureName]
- **Version / build**: [e.g. 1.2.0 or TBD]
- **Release date**: [YYYY-MM-DD or TBD]
- **Status**: Draft | Published
- **Last Updated**: [YYYY-MM-DD]

## 2. Summary

[2–4 sentences: headline of what shipped and who benefits. User-facing language only.]

## 3. New

- [User-visible addition — link FR-00x when BSR exists]
- [Another new capability]

## 4. Changed

- [Behavior or UI change users will notice]
- [Another change]

## 5. Fixed

- [Symptom → resolution in plain language]
- [Another fix]

## 6. Known issues

| Issue | Workaround | Target fix |
|-------|------------|------------|
| [Limitation or defect] | [What the user can do, or None] | [Version / TBD / N/A] |

## 7. Upgrade / compatibility notes

[Breaking changes, config, permissions, or dependency notes. Omit this section if N/A.]

## 8. Documentation updates

- Manual: [Section(s) added or updated — or N/A]
- CSH: [CSH-ID(s) added or updated — or N/A]

## 9. Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

## Writing Rules

1. One CSH topic per distinct UI context (page region, dialog, or field group); split fields when messages differ.
2. Assign sequential IDs: `CSH-001`, `CSH-002`, …
3. Every CSH topic MUST include a stable **Anchor** Dev can map to code (`name`, `id`, or agreed `data-help-id`).
4. Every primary control and required field on the mockup MUST have a CSH topic or an explicit N/A row in the Help Map Summary.
5. Help text is user-facing only — what the control does, valid input, and what happens on error — not API or storage details.
6. Mirror exact UI labels from Dev (button text, column headers, validation wording).
7. Cover required fields, primary actions, and BSR edge cases that surface in the UI.
8. Do not duplicate the full User Manual in CSH; keep CSH short and link out using `Manual §x.x` and `CSH-00x` cross-refs.
9. **Manual**: use task-oriented numbered steps; one workflow section (§5.x) per major user goal from BSR user stories; do not paste full CSH text — link by CSH-ID or Manual section.
10. **Manual**: screenshot placeholders are optional at draft time; use `![Figure x.x: …](screenshots/…)` when figures are available.
11. **Release notes**: user-facing language only; group items under New / Changed / Fixed; no implementation detail.
12. **Release notes**: if nothing has shipped yet, set status **Draft** and version **TBD**.
13. All deliverables must ground against BA BSR and Dev `eng/` behavior; call out BA/Dev gaps under **Open Questions**.
14. After creating or updating any IDG doc, update `idg/doc_context.md` Living Context Loop.
15. **Online Help**: section order and headings follow `idg/AGENTS.md` §2.2; omit sections not on the page.
16. **Online Help**: use CSH **Help text** verbatim for controls; Manual §4.1 for layout bullets and Manual §7 for messages only.
17. **Online Help**: update whenever any CSH topic referenced in the drawer body changes. Always author Online Help with the other three standard deliverables on `write-doc`.

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from idg/ parent folder
- [ ] Read doc_context.md Consolidated Context
- [ ] Read BA BSR (+ mockup / mock data if present)
- [ ] Read Dev eng for labels and validation
- [ ] Create or update all four deliverables: -csh.md, OnlineHelp.md, Manual.md, ReleaseNotes.md (matching Document Structure sections)
- [ ] Sync OnlineHelp.md when CSH topics in the drawer body change
- [ ] Rewrite doc_context.md Consolidated Context (include OnlineHelp in inventory)
- [ ] Append Chronological Log entry (date and time)
```
