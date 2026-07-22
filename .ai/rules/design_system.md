# Design System

**Source of truth:** repo-root [`design-system.json`](/design-system.json)

All color, typography, spacing, border-radius tokens, and component guidelines for this project are defined there (translated from Figma).

## Agent requirements

1. **Read** `design-system.json` before creating or updating BA mockups (`ba/req/*.tsx`) or Dev components (`dev/eng/*.tsx`).
2. **Reference** CSS custom property names from that file (e.g. `--color-primary`, `--spacing-md`). Do not invent parallel token values.
3. Prefer CSS custom properties or a shared token import once the project is scaffolded.
4. When design tokens change, update **`design-system.json` only** — keep this rule as a pointer, not a duplicate token table.
