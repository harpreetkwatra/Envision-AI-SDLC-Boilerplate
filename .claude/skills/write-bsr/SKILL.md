---
name: write-bsr
description: Generate standardized Business & System Requirements (BSR) documents for feature BA workspaces. Use when creating or updating FeatureNBSR.md files in features/*/ba/req/.
---

# Write BSR (Business & System Requirements)

Generate structured BSR documents that serve as the upstream source of truth for Dev and QC teams.

Aligned with ENFS enterprise BSR layout (e.g. ZID BSR front matter, Executive Summary, Business vs System Requirements split, UI control specification tables).

## When to Use

- Creating a new `FeatureNBSR.md` in `features/Feature-N/ba/req/`
- Updating requirements after stakeholder feedback
- User explicitly invokes the write-bsr skill

## BSR Document Structure

Every BSR MUST follow this exact section order:

```markdown
# [Feature Title]

## Business and System Requirements

## Statement of Intellectual Property

> All Envision Financial Systems materials are the intellectual property of Envision Financial Systems, Inc.
> Screens and descriptions may change during development; the signed BSR captures agreed requirements.

## Disclaimers

> This document captures requirements agreed upon with stakeholders to date.
> By approving this document, stakeholders acknowledge responsibility for user acceptance testing against these requirements.

## Revision History

| Ver# | Date | Change Description | Author(s) | Sign-off Dept | Name and Date |
|------|------|--------------------|-----------|---------------|---------------|
| 1.0 | YYYY-MM-DD | Initial draft | [Author] | BA | |

## Project Metadata

| Field | Value |
|-------|-------|
| Feature ID | Feature-[N] |
| ZID / Tracking ID | [If applicable; else N/A] |
| Status | Draft \| In Review \| Approved |
| Owner | [BA/PO name] |
| Submitted Date | YYYY-MM-DD |
| Product | `<Product name>` |
| Modules Affected | [e.g. `src/features/tokens/`] |
| Related Features / ZIDs | [Cross-feature or external refs] |
| Mockup Reference | `FeatureNPageMockup.tsx` |
| Mock Data Reference | `FeatureNMockData.json` |

## 1. Executive Summary

### 1.1 Business Need

One or more paragraphs describing the business problem, regulatory or operational context, and why the feature is needed now.

### 1.2 Requirements Overview

| Requirement | Description |
|-------------|-------------|
| REQ-001 | [High-level requirement statement] |
| REQ-002 | [High-level requirement statement] |

### 1.3 Functional Summary

- [Capability bullet — what the user can do]
- [Capability bullet — key screen or workflow delivered]
- [Capability bullet — integration or data outcome]

### 1.4 Scope

- **In Scope**: Bulleted list of included functionality
- **Out of Scope**: Bulleted list of explicitly excluded functionality

## 2. Business Requirements

Business-facing outcomes, policies, and rules — *what* the organization needs, not screen-level behavior.

### BR-001: [Requirement Title]

- **Description**: Business outcome or policy
- **Business Rules**: Numbered domain rules
- **Acceptance Criteria**:
  - [ ] Given [context], when [action], then [outcome]

## 3. System Requirements

System behavior organized by **surface** (screen, modal, drawer, admin setting, API-facing workflow). Each surface subsection includes navigation context, mockup reference, prose requirements, and one **control specification table per UI element**.

### SR-001: [Surface Name — e.g. Tokens List Page]

**Navigation / context**: [Where the user opens this surface — route hash, menu path, or triggering action]

**Mockup**: `FeatureNPageMockup.tsx` — [SM reference or section label if multiple surfaces in one mockup]

**Mock data**: `FeatureNMockData.json`

Prose requirements supplementing the tables below (workflows, list behavior, validation messages, etc.).

#### Element: [Screen — use once per page/modal]

| Attribute | Value |
|-----------|-------|
| Type | Screen |
| Label / Title | [As shown in UI] |
| Placement | [Route, nav rail item, modal trigger] |
| Security | [Role/permission gate; N/A if open to all signed-in users] |
| Processes Triggered | [What loads or runs when the surface opens] |
| Sorting Order | [Default list sort; N/A for non-list surfaces] |
| Other Considerations | [Theme, layout mode, empty state, etc.] |

#### Element: [Control name — e.g. Refresh button]

| Attribute | Value |
|-----------|-------|
| Type | Button \| Checkbox \| Text field \| Select \| Date picker \| Column \| … |
| Label | [Visible label] |
| Placement | [Toolbar, form row, column header, etc.] |
| Mandatory | Yes \| No \| N/A |
| Default Value | [Initial value or N/A] |
| Default on Upgrade | [For persisted settings; N/A if not applicable] |
| Show/Hide logic | [When visible; use "Always Show" when unconditional] |
| Enable/Disable logic | [When interactive; use "Always Enabled" when unconditional] |
| Processes Triggered by Field Change | [Side effects on change/submit] |
| Validation / Error Messages | [User-visible copy when invalid] |
| Other Considerations | [Help anchor `data-help-id`, copy behavior, etc.] |

Repeat **Element** subsections and tables for every control, column, and action on the surface.

### SR-002: [Next Surface Name]

[Same pattern as SR-001]

## 4. Non-Functional Requirements

| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-001 | Performance | Page load time | < 2s |
| NFR-002 | Accessibility | WCAG compliance | AA |

## 5. Data Model

Describe entities, fields, types, and relationships. Reference `FeatureNMockData.json` for sample payloads.

## 6. Integration Points

| System | Direction | Protocol | Notes |
|--------|-----------|----------|-------|
| [System name] | Inbound/Outbound | REST/GraphQL/Event | [Details] |

## 7. Edge Cases & Error Handling

| Scenario | Expected Behavior | Error Message |
|----------|-------------------|---------------|
| [Scenario] | [Behavior] | [Message or N/A] |

## 8. Open Questions

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | [Question] | Open / Resolved | [Answer] |
```

## Writing Rules

1. **Business vs System split**: Put outcomes and policies in §2; put screen paths, controls, and interaction detail in §3
2. **Control specification tables**: Every interactive or display element in §3 gets its own `#### Element:` block and attribute table — do not bundle multiple controls into one table row
3. **Prose + tables**: Follow each surface with narrative for cross-control workflows; use tables for atomic, testable element attributes
4. **Mockup linkage**: Every SR surface references `FeatureNPageMockup.tsx`; note mockup section (e.g. "Refer SM 1") when one mockup covers multiple surfaces
5. **Testability**: Every BR and critical SR workflow must include verifiable acceptance criteria or Processes Triggered text QC can assert
6. **Numbering**: BR-001, BR-002… for business requirements; SR-001, SR-002… for surfaces; REQ-001… in Executive Summary overview table
7. **Implementation boundary**: Describe *what* the system shall do — not internal code structure, file names under `src/`, or technology choices unless NFR
8. **Revision discipline**: Increment Ver# in Revision History on every published change; do not rely only on git history
9. After creating or updating a BSR, log the change in `ba/req_context.md`

## Optional Appendix (use when stakeholders request user stories)

User stories are **not** part of the default ENFS BSR layout. When explicitly requested, append after §8:

```markdown
## Appendix A: User Stories

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-001 | [persona] | [action] | [benefit] | Must / Should / Could |
```

## Output Location

All BSR files MUST be saved to `features/Feature-N/ba/req/FeatureNBSR.md`.
