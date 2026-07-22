---
name: write-bsr
description: Generate standardized Business & System Requirements (BSR) documents for feature BA workspaces. Use when creating or updating FeatureNBSR.md files in features/*/ba/req/.
---

# Write BSR (Business & System Requirements)

Generate structured BSR documents that serve as the upstream source of truth for Dev and QC teams.

## When to Use
- Creating a new `FeatureNBSR.md` in `features/Feature-N/ba/req/`
- Updating requirements after stakeholder feedback
- User explicitly invokes the write-bsr skill

## BSR Document Structure

Every BSR MUST follow this exact section order:

```markdown
# Feature [N]: [Feature Title]

## 1. Overview
- **Feature ID**: Feature-[N]
- **Status**: Draft | In Review | Approved
- **Owner**: [BA/PO name]
- **Last Updated**: [YYYY-MM-DD]

### 1.1 Purpose
One paragraph describing why this feature exists and the business problem it solves.

### 1.2 Scope
- **In Scope**: Bulleted list of included functionality
- **Out of Scope**: Bulleted list of explicitly excluded functionality

## 2. User Stories

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-001 | [persona] | [action] | [benefit] | Must / Should / Could |

## 3. Functional Requirements

### FR-001: [Requirement Title]
- **Description**: Detailed behavior description
- **Acceptance Criteria**:
  - [ ] Given [context], when [action], then [outcome]
  - [ ] Given [context], when [action], then [outcome]
- **Business Rules**: Numbered list of domain rules
- **UI Reference**: Link to mockup file (e.g., `Feature1PageMockup.tsx`)
- **Mock Data Reference**: Link to JSON file (e.g., `Feature1MockData.json`)

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

## 9. Revision History

| Date | Author | Change Summary |
|------|--------|----------------|
| YYYY-MM-DD | [Author] | Initial draft |
```

## Writing Rules

1. Use clear, testable acceptance criteria — every FR must be verifiable by QC
2. Reference mockup and mock data files by exact filename
3. Number all requirements sequentially (FR-001, FR-002, etc.)
4. Never include implementation details — describe *what*, not *how*
5. After creating or updating a BSR, log the change in `ba/req_context.md`

## Output Location

All BSR files MUST be saved to `features/Feature-N/ba/req/FeatureNBSR.md`.
