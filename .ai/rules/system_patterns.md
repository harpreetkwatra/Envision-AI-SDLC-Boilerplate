# System Patterns

## Repository Architecture

```
dtx2/
├── .cursor/
│   ├── rules/global_standards/     # Cursor agent rules (*.mdc)
│   └── skills/                     # Cursor agent skills (write-bsr, write-tests, write-doc, build-mockup)
│
├── .claude/
│   └── skills/                     # Claude agent skills (write-bsr, write-tests, write-doc, build-mockup)
│
├── CLAUDE.md                       # Claude agent project rules
│
├── src/                            # SHIPPING APP — DLT Manager (deployable today)
│   ├── api/                        # Strapi, envdlt, MCP helpers
│   ├── app/                        # Shell, auth, theme, nav, layout prefs
│   ├── components/                 # Shared components
│   ├── features/                   # Shipped route modules
│   │   ├── accounts/
│   │   ├── ai-assistant/
│   │   ├── assetManagers/
│   │   ├── auth/
│   │   ├── chains/
│   │   ├── dashboard/
│   │   ├── dividends/
│   │   ├── intermediaries/
│   │   ├── orders/
│   │   ├── placeholder/
│   │   ├── settings/
│   │   ├── stablecoins/
│   │   ├── tokens/
│   │   └── transferAgents/
│   ├── index.css                   # Design tokens + theme overrides
│   └── main.tsx
│
├── archived/
│   └── requirements/               # Historical specs (blueprint, features, patterns)
│
├── features/                       # NEW FEATURES — AI-SDLC staging (pre-ship)
│   ├── Feature-1/                  # Template scaffold (ba/dev/qc/idg)
│   ├── Feature-2/
│   └── Feature-N/
│
├── public/                         # Static assets (logo, favicons, chain SVGs)
├── vite.config.ts
├── vite-plugin-ai-assistant.ts
└── package.json                    # name: dltmgr
```

### Agent rules (by IDE)

| IDE | Location | Format |
|-----|----------|--------|
| **Cursor** | `.cursor/rules/global_standards/` | `*.mdc` with `alwaysApply: true` |
| **Claude** | `CLAUDE.md` (repo root) | Concatenated project rules |

### Shipping app (`src/`)

- Authoritative codebase for production behavior and UI labels.
- **Shell**: hash routing; ENFS Classic shell in `App.tsx` (also used for Dark theme); alternate shells `AppShellAntd` / `Material` / `Glass` / `LiquidGlass`.
- **API**: all Strapi traffic via `src/api/strapi.ts` (+ auth helper); ledger/analytics via `envdlt*`.
- **Feature modules**: page + CSS + `use*.ts` (+ mock data where API not wired).
- Ongoing fixes to shipped surfaces land **directly in `src/`**.

### Archived requirements (`archived/requirements/`)

- Former `requirements/` rebuild pack: `blueprint.md`, `overview.md`, `strapi-pattern.md`, `pattern-*.md`, `feature-*.md`.
- Read for architecture intent and acceptance language; **do not treat as live BA workspace**.
- When shipping code and archived text disagree, **shipping `src/` wins** for agents implementing or testing current behavior.

### New feature development (`features/`)

- Each `Feature-N` isolates BA / Dev / QC / IDG with Living Context Ledgers.
- Scaffolds may be empty; `src/` may advance independently until composition.
- Approved `dev/eng/` work is composed into `src/` (routes, shell, APIs) by Dev or explicit human work.

## App architecture patterns (shipping)

| Concern | Pattern |
|---------|---------|
| Routing | Hash (`#chains`, …); `parseAppRoute` / `BREADCRUMB_LABEL` |
| Auth | Strapi JWT in `sessionStorage` (`dltmgr.strapi.jwt`); `AuthProvider` gates shell |
| Theme | `localStorage` key `dltmgr-ui-theme`; `data-ui-theme` on `documentElement` |
| List layout | Defaults in `localStorage` (`dltmgr-layout-views-v1`); session overrides in `sessionStorage` |
| Strapi lists | Normalize v4/v5 → `{ id, label, attributes }`; Active-band sort + dynamic columns |
| Forms | Required asterisk + inline errors (`app-form-*`, `--form-error`) |
| Active Yes/No | Shared classes `app-active-boolean--yes` / `--no` |
| Primary toolbar actions | Yellow primary (`app-btn-primary` / `--btn-primary-bg`); Refresh pattern shared across lists |
| AI Assistant | Chat UI + Vite plugin; session key `dltmgr.aiAssistant.session` |

## Agent write boundaries (non-negotiable)

| Agent | Write | Read |
|-------|-------|------|
| BA | `features/*/ba/` only | Not sibling disciplines; `@`-tagged peers only |
| Dev | `features/*/dev/` only (composition into `src/` when directed) | Upstream `ba/`; shipping `src/` when composing |
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

1. **Context boundary lock**: each discipline writes only to its own directory
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

Feature **folder basename** is the product feature name (e.g. `Prices`). IDG always produces `{FeatureName}OnlineHelp.md` with CSH, Manual, and Release Notes; `{FeatureName}-csh.md` remains atomic per-control help. BA/Dev may adopt Online Help optionally.

### BA mockup help conventions

BA page mockups (`features/*/ba/req/*PageMockup.tsx`) **always** include info icons per `ba/AGENTS.md` §2.1 and skill `build-mockup`:

| Surface | Placement | Pre-IDG content | Post-wire IDG source |
|---------|-----------|-----------------|----------------------|
| Page title | Icon right of heading | Tooltip: `Click to open online help`; drawer body **`TBD`** | `{FeatureName}OnlineHelp.md` |
| Column / field / read-only labels | Icon right of label (grid: right of sort caret) | Tooltip **`TBD`** | `{FeatureName}-csh.md` by `data-help-id` |

- BA publishes `data-help-id` anchors (e.g. `prices.page`, `prices.col.date`); IDG maps CSH and Online Help to those anchors; Dev wires shipping UI the same way.
- BA does not read or edit `idg/`; IDG does not edit BA mockups — anchors are the shared contract.
- Do not author real help prose in BA mockups before IDG wiring; use **`TBD`** for tooltips and drawer body until content is wired in.

### Shipping module naming (`src/features/`)

CamalCase folder for multi-word domains (`assetManagers`, `transferAgents`); kebab route hashes (`asset-managers`). Page files typically `*Page.tsx` + `*Page.css` + `use*.ts`.

## Parallel Sprint Rules

1. BA → `features/Feature-N/ba/*`
2. Dev → `features/Feature-N/dev/*` (then compose to `src/` when releasing)
3. QC → `features/Feature-N/qc/*`
4. IDG → `features/Feature-N/idg/*`
5. Cross-feature dependencies require explicit `@` path tagging

## Agent Configuration Files

Each discipline folder contains `AGENTS.md` defining write scope, output locations, and the Living Context Loop.
