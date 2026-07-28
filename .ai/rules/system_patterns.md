# System Patterns

## Repository Architecture

```
envision-ai-sdlc-boilerplate/
├── .ai/
│   ├── rules/                      # Source of truth for product/tech/patterns/design
│   └── skills/                     # Source of truth for agent skills (*.md)
├── .cursor/
│   ├── rules/global_standards/     # Cursor agent rules (*.mdc)
│   └── skills/                     # Cursor agent skills (write-bsr, build-mockup, write-tests, write-doc, write-tech-design)
├── .claude/
│   └── skills/                     # Claude agent skills (synced from .ai/skills)
├── CLAUDE.md                       # Combined Claude project rules (synced from .ai/rules)
├── design-system.json              # Shared design tokens
├── features/                       # NEW FEATURES — AI-SDLC staging (pre-ship)
│   ├── Feature-1/                  # Template scaffold (ba/dev/qc/idg)
│   ├── Feature-2/
│   └── Feature-N/
├── src/                            # SHIPPING APP (may start empty until scaffolded)
└── package.json
```

### Agent rules (by IDE)

| IDE | Location | Format |
|-----|----------|--------|
| **Cursor** | `.cursor/rules/global_standards/` | `*.mdc` with `alwaysApply: true` |
| **Claude** | `CLAUDE.md` (repo root) | Concatenated project rules |

### Shipping app (`src/`)

- Authoritative codebase for production behavior and UI labels once the app is scaffolded.
- In this boilerplate, `src/` may start as an empty placeholder (`.gitkeep` only).
- Ongoing fixes and new feature implementation land **directly in `src/`** (Dev is the only discipline that may persist `src/` changes).

### New feature development (`features/`)

- Each `Feature-N` isolates BA / Dev / QC / IDG with Living Context Ledgers.
- Scaffolds may be empty; `src/` may advance independently.
- Dev writes shipping code in **`src/`** while working from `features/Feature-N/dev/`; `./eng/` holds non-application artifacts (DDL, upgrades, `tech-design.md`).

## Agent write boundaries (non-negotiable)

| Agent | Write | Read |
|-------|-------|------|
| BA | `features/*/ba/` only | Not sibling disciplines; `@`-tagged peers only |
| Dev | `features/*/dev/` and repo-root `src/` | Upstream `ba/`; shipping `src/` for patterns |
| QC | `features/*/qc/` only | `ba/`, `dev/`, shipping `src/` for behavior under test |
| IDG | `features/*/idg/` only | `ba/`, `dev/`, shipping `src/` for labels/workflows |

BA prototypes live in `features/*/ba/req/`, not `dev/eng/` or root `src/`.

## Workspace root lock (non-negotiable)

- **Never** call `move_agent_to_root`, `move_agent_to_cloned_root`, or any equivalent that changes the Cursor agent workspace root — unless the user **explicitly** asks to change the workspace root.
- Stay in the workspace the user opened for this session (e.g. a discipline folder under `features/*/ba|dev|qc|idg/`, or the repo root they chose).
- Do **not** relocate the workspace to bypass write boundaries or to reach `src/` / sibling disciplines from a scoped feature chat.
- If a request requires writes outside the current agent’s write boundary:
  1. Complete all in-boundary work (and update the Living Context Ledger), then
  2. Stop and tell the user what out-of-boundary steps remain, **or** ask them to open a correctly rooted session (e.g. repo root / Dev) for those edits.

## Multi-Disciplinary Protocol

1. **Context boundary lock**: each discipline writes only to its own directory (Dev also writes `src/`)
2. **Workspace root lock**: never move the agent workspace root to expand scope (see above)
3. **Upstream read access**: Dev ← BA; QC ← BA + Dev (+ `src/` as needed); IDG ← BA + Dev (+ `src/`)
4. **Living Context Loop**: read `*_context.md` before work; rewrite Consolidated Context + append Chronological Log after every change
5. **Reproducibility**: `req/`, `eng/`, `tst/`, `doc/` recreatable from context ledgers + skills

## Naming Conventions (AI-SDLC artifacts)

| Artifact | Pattern | Example |
|----------|---------|---------|
| BSR document | `{FeatureName}BSR.md` | `PricesBSR.md` |
| Page mockup | `{FeatureName}PageMockup.tsx` | `PricesPageMockup.tsx` |
| Mock data | `{FeatureName}MockData.json` | `PricesMockData.json` |
| Mockup help module | `{FeatureName}PageHelpContent.tsx` | `PricesPageHelpContent.tsx` |
| Page component | `{FeatureName}Page.tsx` | `PricesPage.tsx` |
| Sub-component | `{FeatureName}Widget.tsx` | `PricesWidget.tsx` |
| Logic/API/helpers | `{FeatureName}Utils.ts` | `PricesUtils.ts` |
| Release notes | `{FeatureName}ReleaseNotes.md` | |
| Context-sensitive help | `{FeatureName}-csh.md` | |
| Online help (page drawer) | `{FeatureName}OnlineHelp.md` | `PricesOnlineHelp.md` |
| User manual | `{FeatureName}Manual.md` | |
| Technical design | `tech-design.md` | `features/Feature-N/dev/eng/tech-design.md` |

Feature **folder basename** is the product feature name (e.g. `Prices`). IDG always produces `{FeatureName}OnlineHelp.md` with CSH, Manual, and Release Notes; `{FeatureName}-csh.md` remains atomic per-control help. BA/Dev may adopt Online Help optionally.

### BA mockup help conventions

BA page mockups (`features/*/ba/req/*PageMockup.tsx`) **always** include info icons per `ba/AGENTS.md` §2.1 and skill `build-mockup`:

| Surface | Placement | Pre-IDG content | Post-wire IDG source |
|---------|-----------|-----------------|----------------------|
| Page title | Icon right of heading | Tooltip: `Click to open online help`; drawer body **`TBD`** | `{FeatureName}OnlineHelp.md` |
| Column / field / read-only labels | Icon right of label (grid: right of sort caret) | Tooltip **`TBD`** | `{FeatureName}-csh.md` by `data-help-id` |

- BA publishes `data-help-id` anchors (e.g. `prices.page`, `prices.col.date`); IDG maps CSH and Online Help to those anchors; Dev wires shipping UI in `src/` the same way.
- BA does not read or edit `idg/`; IDG does not edit BA mockups — anchors are the shared contract.
- Do not author real help prose in BA mockups before IDG wiring; use **`TBD`** for tooltips and drawer body until content is wired in.

## Parallel Sprint Rules

1. BA → `features/Feature-N/ba/*`
2. Dev → `features/Feature-N/dev/*` and repo-root `src/`
3. QC → `features/Feature-N/qc/*`
4. IDG → `features/Feature-N/idg/*`
5. Cross-feature dependencies require explicit `@` path tagging

## Agent Configuration Files

Each discipline folder contains `AGENTS.md` defining write scope, output locations, and the Living Context Loop.
