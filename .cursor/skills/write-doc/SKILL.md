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
4. Repo-root **`src/`** — shipped implementation (labels, validation messages, workflows)
5. `../dev/eng/` — optional (`tech-design.md`, SQL/upgrade scripts)
6. `./doc_context.md` — start with **Consolidated Context** before writing

Do not invent UI strings that contradict Dev implementation in **`src/`**. Prefer Dev labels; note BA/Dev mismatches under **Open questions**.

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
| `{FeatureName}OnlineHelp.md` | Pre-composed page help drawer / slider body and open-in-new-tab content; assembled from CSH + Manual **Screen elements** (layout summary) |
| `{FeatureName}Manual.md` | Comprehensive end-user guide: ENFS-style screen documentation, screenshot references, glossary |
| `{FeatureName}ReleaseNotes.md` | What's new, changed, fixed, and known issues per release |

CSH **Help text** per topic targets **15 words** and MUST NOT exceed **25 words**. Link to Manual sections when deeper guidance exists. Online Help prose for a control may be longer and more elaborate than the matching CSH **Help text**. BA/Dev may adopt Online Help optionally.

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
| CSH-001 | [Page / dialog] | [Control or field] | [Validation / failure help, or N/A] | [Short title] | [[Screen name] screen / Messages and validation / N/A] |

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

- [[Screen name] screen, Messages and validation, CSH-00x, or N/A]

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

[Help text — may expand CSH-001]

## Page layout
<!-- manual: Screen elements (layout summary) -->

- **Toolbar** — …
- …

## [Control section — e.g. Refresh]
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[Help text — may expand matching CSH topic]

## Table columns

### [Column label]
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[Help text — may expand matching CSH topic]

## Pagination
<!-- anchor: … -->
<!-- csh: CSH-00x -->

[Help text — may expand matching CSH topic]

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

Every `{FeatureName}Manual.md` file MUST follow this section order. Structure and prose style follow the ENFS product manual pattern (e.g. Internet Portal Product Manual): screen-centric sections with Navigation, Security permissions, Pre-requisites, and prose-first control descriptions.

```markdown
# [Product Name] — [Feature Title] User Manual

## Document information

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Product**: [Product name — e.g. PowerAgent IRIS Transmitter]
- **Version / build**: [e.g. 1.0.0 or TBD]
- **Status**: Draft | In Review | Approved
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `{FeatureName}-csh.md`, `dev/eng/`

## About This Document

[One paragraph: what this document covers — screens, workflows, and setup prerequisites for this feature.]

## Who Should Read This Document

This document is intended for the following audience:

- [Persona / role — e.g. Operations staff]
- [Another persona — or omit if single audience]

## Other Documents of Interest

Refer to the following document(s) for related information:

- `{FeatureName}BSR.md` — requirements and acceptance criteria
- `{FeatureName}-csh.md` — context-sensitive help topics
- `{FeatureName}OnlineHelp.md` — page help drawer content
- [Other product manuals, PowerAgent Online Help topics, or N/A]

## After Reading This Document

Envision welcomes your comments and suggestions on the quality and usefulness of this document. Please feel free to share your input with the documentation team by sending an email to documentation@enfs.com.

## Introduction

### What is [Feature Name]?

[One paragraph: what the feature is and what it lets the user do.]

The feature includes:

- [Capability bullet — mirror BSR user-visible outcomes]
- [Another capability]
- …

### User interface notes

[Optional — responsive design, click/tap convention, theme notes. Omit this subsection if N/A.]

Note: Throughout this manual, only the click action is mentioned for simplicity.

## Application setup

[Optional — include only when the BSR documents admin or PowerAgent configuration prerequisites. Omit this entire section if N/A.]

### Introduction

[One paragraph: who performs setup and what modules are involved.]

### [Setup topic — e.g. PowerAgent permissions]

[Prose or table describing modules, permissions, and configuration steps. Reference PowerAgent Online Help for detail.]

Note: Refer to the PowerAgent Online Help for more details on these setup tasks.

## User steps and screens

### Introduction

[One paragraph: this section explains the screens and user tasks for [Feature Name].]

### [Screen name — exact UI label]

[Overview paragraph: purpose, who can access, and landing behavior if applicable.]

#### Navigation

[Product Name] -> [Menu path — e.g. IRIS A2A Transmit]

#### Security permissions

- [Permission name — or N/A]
- …

#### Pre-requisites

- [Prerequisite — e.g. signed in, fund group selected]
- …

Or: None.

#### Customization

[Optional — admin customization options. Omit if N/A.]

- Menu Option Customization: …
- Page Customization for Header/Footer: …

Note: Refer to the PowerAgent Online Help topic [topic name] for more details on these customizations.

#### Screen elements

[Prose-first descriptions of fields, controls, columns, and regions. Use exact UI labels.]

- **[Control or field label]** — [What it does, valid input, and behavior]. For more details, refer to the [Related section] section. (CSH-00x)
- **[Column or region name]** — [Description].
- …

[Embed numbered workflow steps here when the screen involves a multi-step task:]

1. [Step using exact UI labels.]
2. [Next step.]

#### Notes

- [Behavioral caveat, permission interaction, or validation note.]
- …

![Figure: [Screen name]](screenshots/[filename].png)

### [Next screen or sub-task — e.g. Retrieve User Name]

[Repeat per-screen subsections: Overview prose, Navigation, Security permissions, Pre-requisites, Customization (optional), Screen elements, Notes, Figure.]

## Messages and validation

| Situation | Message or behavior | What to do |
|-----------|---------------------|------------|
| [Empty list] | [Message] | [User action] |
| [Validation error] | [Exact message] | [Correction] |

## Glossary

| Term | Definition |
|------|------------|
| [Term] | [Plain-language definition] |

[Omit this section if no domain terms need definition.]

## Related documentation

- Context-sensitive help: `{FeatureName}-csh.md`
- Online help: `{FeatureName}OnlineHelp.md`
- Requirements: `{FeatureName}BSR.md` (FR references as needed)

## Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [BA/Dev gap, missing screenshot, unclear workflow] | Open / Resolved | [Answer] |

## Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

### Release Notes Document Structure

Every `{FeatureName}ReleaseNotes.md` file MUST follow this section order:

```markdown
# Feature [N]: [Feature Title] — Release Notes

## 1. Release metadata

- **Product**: [Product name]
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
8. Do not duplicate the full User Manual in CSH; keep CSH short and link out using screen section names (e.g. `[Screen name] screen`), **Messages and validation**, and `CSH-00x` cross-refs.
9. **Manual**: organize by screen under **User steps and screens**; embed numbered workflow steps inside the relevant screen subsection; do not paste full CSH text — link by CSH-ID or screen section name.
10. **Manual**: screenshot placeholders are optional at draft time; use `![Figure: …](screenshots/…)` when figures are available.
11. **Manual authoring style**: mirror ENFS product manual prose — screen labels match Dev UI exactly; prefer prose/bullet **Screen elements** over field tables (reserve tables for Messages, Glossary, and Application setup); use **Navigation / Security permissions / Pre-requisites / Customization** labels consistently; cross-reference by section name (“refer to the [Section] section”); use `Note:` for admin/customization pointers; omit optional sections rather than padding with N/A placeholders.
12. **Release notes**: user-facing language only; group items under New / Changed / Fixed; no implementation detail.
13. **Release notes**: if nothing has shipped yet, set status **Draft** and version **TBD**.
14. All deliverables must ground against BA BSR and Dev `eng/` behavior; call out BA/Dev gaps under **Open Questions**.
15. After creating or updating any IDG doc, update `idg/doc_context.md` Living Context Loop.
16. **Online Help**: section order and headings follow `idg/AGENTS.md` §2.2; omit sections not on the page.
17. **Online Help**: expand CSH **Help text** into longer, more elaborate prose for controls; layout bullets from Manual **Screen elements** (opening region summary for the page); message bullets from Manual **Messages and validation** and CSH error topics.
18. **Online Help — AGENTS.md compatibility**: `idg/AGENTS.md` §2.2 still references “Manual §4.1” and “Manual §7”. Map those to Manual **Screen elements** (layout summary) and **Messages and validation** respectively when authoring Online Help — do not edit AGENTS.md.
19. **Online Help**: update whenever any CSH topic referenced in the drawer body changes. Always author Online Help with the other three standard deliverables on `write-doc`.

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
