---
name: write-bsr
description: Generate standardized Business & System Requirements (BSR) documents for feature BA workspaces. Use when creating or updating FeatureNBSR.md files in features/*/ba/req/.
---

# Write BSR (Business & System Requirements)

Generate structured BSR documents that serve as the upstream source of truth for Dev and QC teams.

Aligned with ENFS enterprise BSR layout (**ENFS-T-BSR Template 4.0**; e.g. BSR IID 112407): front matter, Incident Details, Executive Summary, Business Requirements, Out of Scope, System Requirements by product/module, SM/SR numbering, and per-control attribute tables with nested child controls.

## When to Use

- Creating a new `FeatureNBSR.md` in `features/Feature-N/ba/req/`
- Updating requirements after stakeholder feedback
- User explicitly invokes the write-bsr skill

Before writing, decide which optional sections apply — see **Stack-aware section rule** below.

## BSR Document Structure

Every BSR MUST follow this ENFS section order. Omit optional sections per **Stack-aware section rule** — do not emit empty enterprise headings.

```markdown
# [Feature Title]

## Business and System Requirements

## Revision History

| Ver# | Date | Change Description | Author(s) | Sign-Off |
|------|------|--------------------|-----------|----------|
| 1.0 | YYYY-MM-DD | Initial draft | [Author] | |

## Incident Details

| Field | Value |
|-------|-------|
| Feature ID | Feature-[N] |
| IID(s) | [If applicable; else N/A] |
| Submitted Date | YYYY-MM-DD |
| Product | [Product name] |
| Modules Affected | [Modules, apps, or repo areas touched] |
| Related IID(s), ZOHO ID | [Cross-feature or external refs; else N/A] |
| IAE Name and Version | [If applicable; else N/A] |
| Reference to CR/CRD/Supporting Documents | [If applicable; else N/A] |
| Status | Draft \| In Review \| Approved |
| Owner | [BA/PO name] |
| Mockup Reference | `{FeatureName}PageMockup.tsx` |
| Mock Data Reference | `{FeatureName}MockData.json` |

## 1. Executive Summary

### Business Need

One or more paragraphs describing the business problem, regulatory or operational context, and why the feature is needed now.

### Requirement Overview

[One or more paragraphs summarizing the high-level capability being delivered — not a numbered table unless stakeholders request one.]

### Functional Summary

Numbered list of capabilities delivered, grouped by product/module when the feature spans multiple surfaces:

1. [Module or product area]:
   a. [Specific enhancement — checkbox, screen, permission, etc.]
   b. [Next enhancement]
2. [Next module or product area]:
   a. [Enhancement]

## 2. Business Requirements

Business-facing outcomes — *what* the organization needs, not screen-level behavior.

| Requirements | Description |
|--------------|-------------|
| R1. | [Business outcome statement] |
| R2. | [Business outcome statement] |

## 3. Out of Scope

| Requirements | Description |
|--------------|-------------|
| R1. | [Explicitly excluded functionality or environment] |

## 4. System Requirements – [Product / Module Name]

[Repeat §4 as §5, §6, … for each product or module affected — e.g. PowerAgent Administrator, PowerAgent Operator, Internet Portal, or theApp shell. Single-module features use one System Requirements section numbered §4.]

### SM1. [Full navigation path to mockup anchor — e.g. App > Feature Page > Toolbar]

[Optional one-line caption describing what the mockup shows.]

**Mockup**: `{FeatureName}PageMockup.tsx` — Refer SM1

**Mock data**: `{FeatureName}MockData.json`

#### SR1. [Enhancement title — e.g. Enhance Administrator to support consent management]

One-sentence summary of the enhancement.

##### SR1.1. [Specific change — e.g. Add checkbox 'Enable Consent Management']

| Attribute | Value |
|-----------|-------|
| Type | Checkbox \| Button \| Text field \| Select \| Date picker \| Dropdown \| Column \| Screen \| Step \| Group Box \| Toggle Button \| … |
| Label / Title | [Visible label as shown in UI] |
| Sub-label / Title | [When the surface has a parent title + sub-title; else omit row] |
| Display Description | [Short description shown to the user on steps/screens; else omit row] |
| Placement | Refer SM1 \| [Full navigation path when no SM anchor] |
| Show/Hide logic | [When visible; use "Always shown" when unconditional] |
| Enable/Disable logic | [When interactive; use "Always enabled" / "Always disabled" when unconditional] |
| Default Value | [Initial value or N/A] |
| Default for Upgrade | [For persisted settings on upgrade; N/A if not applicable] |
| Features | 1. [Numbered "the system shall…" behavior — primary behavior row]<br>2. [Side effects, cross-module updates, navigation]<br>&nbsp;&nbsp;&nbsp;a. [Nested child control — see nested table below] |
| Processes Triggered | [On change, submit, or open — when distinct from Features; else omit row] |
| Audit Trail | Yes \| No \| [Audit trail name when named] |
| Security | [Permission name, feature category, role gate; omit when N/A] |
| Page Customization | [MIPCO / page-customization records — Page, View, Section, Default text; omit when N/A] |
| Acknowledgements and Disclaimers | [Page, Section, HTML Content, HTML Label; omit when N/A] |
| Other Considerations | [Validation messages, help anchors (`data-help-id`), scripts, applicability notes] |

**Nested child control** (when a parent Features bullet introduces a sub-control, embed a full attribute table under that bullet — do not flatten to a sibling SR block):

Type Dropdown
Label / Title [Child label]
Placement Refer SM1
Show/Hide logic [Child visibility]
Enable/Disable logic [Child interactivity]
Default Value [Child default]
Default for Upgrade [When applicable]
Features 1. [Child-specific numbered behavior]
Audit Trail [Yes/No]
Other Considerations [Validation copy, constraints]

##### SR1.2. [Next specific change on same SM anchor]

[Same attribute table pattern]

### SM2. [Next mockup anchor on this module]

#### SR2. [Next enhancement]

##### SR2.1. [Specific change]

[Same attribute table pattern]

## Notes

[Global applicability caveats, permission prerequisites, environment exclusions — numbered list at document end when needed.]

1. [e.g. Enhancement not applicable for Plan529 environments.]
2. [e.g. Web user still requires existing transaction permissions.]
```

### Control attribute table — row reference

Use only rows that apply; omit empty rows entirely (do not write "N/A" for every unused row).

| Row | When to include |
|-----|-----------------|
| Type | Always |
| Label / Title | Always (screens/steps may also use Display Description) |
| Sub-label / Title | Parent screen + sub-screen pattern (e.g. Transact Online > Consent) |
| Display Description | Steps and screens with user-facing intro copy |
| Placement | Always — prefer `Refer SMn` when an SM anchor exists |
| Show/Hide logic | Always |
| Enable/Disable logic | Always |
| Default Value | When the control has an initial value |
| Default for Upgrade | When persisted settings need an upgrade default |
| Features | **Always** — primary numbered behavior list; nest child-control tables here |
| Processes Triggered | When open/change/submit side effects are distinct from Features |
| Audit Trail | When the product audits the control |
| Security | When a permission gates the control |
| Page Customization | When MIPCO / page-customization records are required |
| Acknowledgements and Disclaimers | When acknowledgement HTML is required |
| Other Considerations | Validation messages, help anchors, scripts, cross-references |

Do **not** use a `Mandatory` row — the ENFS template does not include it. Put required-field validation copy under **Other Considerations**.

### Notification specification (optional pattern)

When the BSR adds in-app notifications, use a table under the relevant SR subsection:

| Event | Notification Message | Show/Hide Logic |
|-------|---------------------|-----------------|
| [Trigger event] | [Message text; may include link markup] | [Visibility conditions] |

## Stack-aware section rule

Emit a section or table row **only when the feature needs it**. Do not pad BSRs with empty enterprise headings.

| Section / row | Emit when | Omit when |
|---------------|-----------|-----------|
| §3 Out of Scope | Any explicit exclusions | Nothing excluded — omit §3 entirely |
| Multiple System Requirements sections (§4, §5, …) | Feature spans multiple products/modules | Single theApp page — one §4 only |
| SM anchors | Multiple mockup regions or cross-module UI | Single mockup — one SM1 is enough |
| Audit Trail row | Product audits the control | theApp shell / no audit subsystem |
| Security row | Permission or role gates the control | Open to all signed-in users |
| Page Customization / Acknowledgements rows | MIPCO or customization subsystem | theApp shell / no customization tier |
| § Notes | Global caveats apply | No global caveats — omit |
| Optional appendix sections (below) | Stakeholder or project needs them | Default BSR — omit entirely |

## Optional sections (repo extensions — omit unless needed)

These are **not** part of the default ENFS BSR layout. Append only when stakeholders or the project explicitly need them. Omit the heading entirely when empty.

### Non-Functional Requirements

```markdown
## [N]. Non-Functional Requirements

| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-001 | Performance | Page load time | < 2s |
```

### Data Model

```markdown
## [N]. Data Model

[Entities, fields, types, relationships. Reference `{FeatureName}MockData.json` for sample payloads.]
```

### Integration Points

```markdown
## [N]. Integration Points

| System | Direction | Protocol | Notes |
|--------|-----------|----------|-------|
| [System name] | Inbound/Outbound | REST/GraphQL/Event | [Details] |
```

### Edge Cases & Error Handling

```markdown
## [N]. Edge Cases & Error Handling

| Scenario | Expected Behavior | Error Message |
|----------|-------------------|---------------|
| [Scenario] | [Behavior] | [Message or N/A] |
```

### Open Questions

```markdown
## [N]. Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [Question] | Open / Resolved | [Answer] |
```

### Acceptance criteria (QC traceability extension)

When QC needs Given/When/Then criteria, append under §2 Business Requirements as a sub-table or add an optional appendix — do **not** replace the ENFS R1./R2. table:

```markdown
| R# | Acceptance Criteria |
|----|---------------------|
| R1 | Given [context], when [action], then [outcome] |
```

### User Stories

When explicitly requested, append after all required and optional sections:

```markdown
## Appendix A: User Stories

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-001 | [persona] | [action] | [benefit] | Must / Should / Could |
```

## Writing Rules

1. **Business vs System split**: Put outcomes in §2 (R1., R2., …); put screen paths, controls, and interaction detail in §4+ System Requirements
2. **Out of Scope is §3**: Do not bury exclusions under Executive Summary — use the R-numbered Out of Scope table
3. **System Requirements by module**: Split §4, §5, §6… by product or module (Administrator, Operator, Portal, theApp) — not one subsection per screen when modules differ
4. **SM / SR numbering**: `SMn` = mockup anchor (full nav path); `SRn` = enhancement statement; `SRn.m` = specific change carrying the attribute table; `SRn.m.k` = narrative sub-points only (no table)
5. **Features is the primary behavior row**: Numbered "the system shall…" lists belong in **Features**, not scattered in prose. Nest child-control attribute tables inside Features bullets when a parent control contains sub-controls (dropdown in grid column, toggle inside step)
6. **Placement references SM**: When an SM anchor exists, use `Refer SMn` in Placement; keep the full path on the SM heading
7. **Mockup linkage**: Every SM references `{FeatureName}PageMockup.tsx`; cross-reference SR Features bullets to other SR IDs (e.g. "Please refer SR5")
8. **Testability**: Features and Processes Triggered text must be assertable by QC; optional acceptance-criteria extension maps to R# when requested
9. **Implementation boundary**: Describe *what* the system shall do — not internal code structure, file names under `src/`, or technology choices unless an optional NFR section is used
10. **Revision discipline**: Increment Ver# in Revision History on every published change; do not rely only on git history
11. After creating or updating a BSR, log the change in `ba/req_context.md`

## Output Location

All BSR files MUST be saved to `features/Feature-N/ba/req/{FeatureName}BSR.md`.
