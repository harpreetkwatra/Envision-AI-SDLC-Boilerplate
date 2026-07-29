# Design System

**Canonical token & component catalogue:** repo-root [`design-system.json`](/design-system.json)

All themes, CSS custom properties, typography, spacing, radii, motion, semantic Active Yes/No colors, component guidelines (buttons, forms, rail, top bar, entity lists), and Ant Design primary alignments for this project are defined there (translated from Figma).

## Agent requirements

1. **Read** `design-system.json` before creating or updating BA mockups (`ba/req/*.tsx`) or Dev components in repo-root `src/` (when scaffolded).
2. **Reference** CSS custom property names from that file (e.g. `--color-primary`, `--spacing-md`). Do not invent parallel token values. 
3. In CSS and inline var(--…) usage, every custom property name must exist under design-system.json → tokens (any section).

## Quick pointers

| Need | Look in JSON |
|------|----------------|
| Theme IDs / shells | `themes` |
| Classic colors | `tokens.color` |
| Fonts | `tokens.typography` |
| Rail / top bar sizes | `tokens.spacing`, `components.navRail`, `components.topBar` |
| Primary / Refresh buttons | `components.primaryButton` |
| Form errors | `components.formValidation` |
| Active Yes/No | `semantic.activeBoolean` |
| Ant primary per theme | `themes[].antdPrimary` |