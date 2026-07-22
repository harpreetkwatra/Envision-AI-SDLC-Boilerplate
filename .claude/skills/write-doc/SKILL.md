---
name: write-doc
description: >-
  Produce and update IDG documentation in features/*/idg/doc/: context-sensitive
  help (FeatureN-csh.md), user manuals (FeatureNManual.md), and release notes
  (FeatureNReleaseNotes.md). Use when creating or updating IDG docs, CSH,
  manuals, release notes, field-level help, or in-app help mapping.
---

# Write Doc

Generate IDG deliverables for a feature: context-sensitive help (CSH), user manuals, and release notes. All artifacts land under `features/Feature-N/idg/doc/`.

## When to Use

- Creating or updating `{FeatureName}-csh.md`, `{FeatureName}Manual.md`, or `{FeatureName}ReleaseNotes.md`
- User explicitly invokes the write-doc skill
- Working in a feature’s `idg/` folder on release notes, manuals, or in-app / field-level help

Do **not** create `{FeatureName}OnlineHelp.md` — CSH covers in-app / task-oriented help; long-form guidance belongs in the Manual.

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
| User manual | `features/Feature-N/idg/doc/{FeatureName}Manual.md` |
| Release notes | `features/Feature-N/idg/doc/{FeatureName}ReleaseNotes.md` |

Write only inside the feature’s `idg/` tree. After every create/update, refresh `idg/doc_context.md` (rewrite **Consolidated Context**; append **Chronological Log**).

## Deliverable roles

| Artifact | Purpose |
|----------|---------|
| `{FeatureName}-csh.md` | Short, keyed topics for a specific page, dialog, control, or field (tooltips, help icons, F1 panes) |
| `{FeatureName}Manual.md` | Comprehensive end-user guide: workflows, screenshot references, glossary |
| `{FeatureName}ReleaseNotes.md` | What's new, changed, fixed, and known issues per release |

CSH topics stay brief (typically 1–3 short paragraphs or a tight bullet list). Link to Manual sections when deeper guidance exists.

## CSH Document Structure

Every CSH file MUST follow this section order:

```markdown
# Feature [N]: Context-Sensitive Help

## 1. Metadata

- **Feature ID**: Feature-[N]
- **Feature name**: [FeatureName]
- **Status**: Draft | In Review | Approved
- **Last Updated**: [YYYY-MM-DD]
- **Upstream**: `{FeatureName}BSR.md`, `{FeatureName}PageMockup.tsx` (if any), `dev/eng/`

## 2. Help Map Summary

| CSH-ID | UI surface | Trigger / control | Topic title | Manual ref |
|--------|------------|-------------------|-------------|------------|
| CSH-001 | [Page / dialog] | [Control or field] | [Short title] | [Optional section or N/A] |

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

- [Optional: Manual section, related CSH-ID]

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
3. Every CSH topic MUST include a stable **Anchor** Dev can map to code (`name`, `id`, or agreed `data-help-id`).
4. Help text is user-facing only — what the control does, valid input, and what happens on error — not API or storage details.
5. Mirror exact UI labels from Dev (button text, column headers, validation wording).
6. Cover required fields, primary actions, and BSR edge cases that surface in the UI.
7. Do not duplicate the full User Manual in CSH; keep CSH short and link out when needed.
8. Release notes and manuals must ground against BA BSR and Dev `eng/` behavior; call out BA/Dev gaps.
9. After creating or updating any IDG doc, update `idg/doc_context.md` Living Context Loop.

## Workflow Checklist

```
Task Progress:
- [ ] Resolve FeatureName from idg/ parent folder
- [ ] Read doc_context.md Consolidated Context
- [ ] Read BA BSR (+ mockup / mock data if present)
- [ ] Read Dev eng for labels and validation
- [ ] Create or update doc/{FeatureName}-csh.md and/or Manual / ReleaseNotes as requested
- [ ] Rewrite doc_context.md Consolidated Context
- [ ] Append Chronological Log entry (date and time)
```
