---
name: write-context-sensitive-help
description: >-
  Produce and update context-sensitive help (CSH) markdown for feature IDG
  workspaces as FeatureN-csh.md. Use when creating or updating *-csh.md files
  in features/*/idg/docs/, or when the user asks for context-sensitive help,
  field-level help, or in-app help mapping.
---

# Write Context-Sensitive Help (CSH)

Generate field- and surface-mapped help content that the product can surface next to UI controls, forms, and pages.

## When to Use

- Creating a new `{FeatureName}-csh.md` in `features/Feature-N/idg/docs/`
- Updating CSH after BA or Dev changes affect labels, workflows, or validation
- User explicitly invokes the write-context-sensitive-help skill
- Working in a feature’s `idg/` folder on in-app / field-level help (distinct from long-form `{FeatureName}OnlineHelp.md`)

## Prerequisites

Resolve feature identity from the `idg/` folder (see `idg/AGENTS.md`), then READ:

1. `../ba/req/{FeatureName}BSR.md` — required behavior and acceptance criteria
2. `../ba/req/{FeatureName}PageMockup.tsx` — UI layout and control labels (when present)
3. `../ba/req/{FeatureName}MockData.json` — sample payloads / field names (when present)
4. `../dev/src/` — implemented labels, validation messages, and workflows
5. `./docs_context.md` — start with **Consolidated Context** before writing

Do not invent UI strings that contradict Dev implementation. Prefer Dev labels; note BA/Dev mismatches under **Open questions**.

## Output Location and Naming

| Artifact | Path |
|----------|------|
| CSH markdown | `features/Feature-N/idg/docs/{FeatureName}-csh.md` |

Examples: `Feature1-csh.md`, `Prices-csh.md`.

Write only inside the feature’s `idg/` tree. After every create/update, refresh `idg/docs_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## CSH vs Online Help

| Artifact | Purpose |
|----------|---------|
| `{FeatureName}-csh.md` | Short, keyed topics for a specific page, dialog, control, or field (tooltips, help icons, F1 panes) |
| `{FeatureName}OnlineHelp.md` | Longer task-oriented help topics for browsing |

CSH topics stay brief (typically 1–3 short paragraphs or a tight bullet list). Link to Online Help topic IDs when deeper guidance exists.

## Document Structure

Every CSH file MUST follow this section order:

```markdown
# Feature [N]: Context-Sensitive Help

## 1. Metadata

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Status**: Draft | In Review | Approved
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `dev/src/`

## 2. Help Map Summary

| CSH-ID | UI surface | Trigger / control | Topic title | Online Help ref |
|--------|------------|-------------------|-------------|-----------------|
| CSH-001 | [Page / dialog] | [Control or field] | [Short title] | [Optional topic id or N/A] |

## 3. Topics

### CSH-001: [Topic title]

- **UI surface**: [Page, dialog, drawer, or panel name as shown in product]
- **Anchor**: [Stable key — e.g. field name, `data-help-id`, route + control]
- **Trigger**: Help icon | F1 | Tooltip | Inline | Other
- **Audience**: [Persona if relevant]
- **Related FR**: [FR-00x or N/A]

**Help text**

[Concise user-facing copy. Use product UI labels exactly. No implementation jargon.]

**See also**

- [Optional: Online Help topic, related CSH-ID]

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

## Writing Rules

1. One CSH topic per distinct UI context (page region, dialog, or field group); split fields when messages differ.
2. Assign sequential IDs: `CSH-001`, `CSH-002`, …
3. Every topic MUST include a stable **Anchor** Dev can map to code (`name`, `id`, or agreed `data-help-id`).
4. Help text is user-facing only — what the control does, valid input, and what happens on error — not API or storage details.
5. Mirror exact UI labels from Dev (button text, column headers, validation wording).
6. Cover required fields, primary actions, and BSR edge cases that surface in the UI.
7. Do not duplicate the full Online Help or User Manual; keep CSH short and link out when needed.
8. After creating or updating CSH, update `idg/docs_context.md` Living Context Loop.

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from idg/ parent folder
- [ ] Read docs_context.md Consolidated Context
- [ ] Read BA BSR (+ mockup / mock data if present)
- [ ] Read Dev src for labels and validation
- [ ] Create or update docs/{FeatureName}-csh.md
- [ ] Rewrite docs_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
