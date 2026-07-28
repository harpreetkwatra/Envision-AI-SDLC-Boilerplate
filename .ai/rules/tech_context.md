# Tech Context

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Language | TypeScript (~6) | All source, mockup, and test files |
| UI Framework | React 19 + React DOM | BA mockups (`*.tsx` in `ba/req/`); Dev components in repo-root `src/` when scaffolded |
| Build Tool | Vite 8 (`@vitejs/plugin-react`) | Dev server, production builds, env/proxy wiring |
| Component Library | Ant Design 6 (`antd`) + `@ant-design/icons` | Shared UI primitives across mockups and app surfaces |
| Lint | Oxlint (Vite React-TS template) | Project-wide lint (`npm run lint`) |
| Test Automation | Playwright | QC automation / E2E scripts in `features/*/qc/tst/` |
| Documentation | Markdown | IDG deliverables in `idg/doc/`; requirements under feature folders |
| Data Format | JSON | Static mock data in `ba/req/`; test payloads in `qc/tst/` |

## Backend / Integrations

| Integration | Role | Notes |
|-------------|------|-------|
| Strapi | Headless CMS over REST | Auth (JWT), entity CRUD; Vite may proxy `/strapi` in local dev |
| envdlt analytics API | Ledger / analytics backend | Proxied as `/envdlt` in local dev (`API_ENVDLT_*` / `VITE_ENVDLT_*`) |
| MCP SDK (`@modelcontextprotocol/sdk`) | AI assistant tooling | Used with Vite AI-assistant plugin / agent integrations |

## Runtime Environments
- **OS**: Windows 10+ (primary dev environment)
- **Node.js**: LTS (required for Vite, npm scripts, and Playwright)
- **IDE**: Cursor with Agent mode for spec-driven workflows

## Local Setup
```bash
# Install dependencies (includes @playwright/test; postinstall downloads Chromium)
npm install

# Run Vite dev server
npm run dev

# Production build
npm run build

# Lint
npm run lint

# E2E (Playwright) — per feature, from that feature’s qc/ folder
cd features/Feature-N/qc
npx playwright test tst/ --workers=1 --headed
```

Playwright Test is configured **per feature** (`features/<Feature>/qc/playwright.config.ts`). There is no repo-root `playwright.config.ts` / `npm run test:e2e`. Chromium binaries are installed automatically via the `postinstall` hook (`playwright install chromium`). Re-run manually with `npm run playwright:install` if needed (e.g. after clearing the Playwright browser cache). Artifacts always go under that feature’s `qc/test-results/` and `qc/playwright-report/` (never at repo root).

## File Conventions

### Shipping app (repo root)

- **`src/`** — **shipping application**: deployable portal (app shell under `src/app/`, API layer under `src/api/`, shipped feature pages under `src/features/`). This is what `npm run dev` and `npm run build` compile when the app is scaffolded.

### New features (AI-SDLC workspaces)

- **BA outputs**: `features/Feature-N/ba/req/` — static mockups, JSON data, BSR markdown
- **Dev outputs**: repo-root **`src/`** — shipping application code; `features/Feature-N/dev/eng/` — DDL, upgrade scripts, optional `tech-design.md` (explicit ask via `write-tech-design`)
- **QC outputs**: `features/Feature-N/qc/tst/` — test cases, test data, automation scripts; `features/Feature-N/qc/playwright.config.ts` — feature Playwright config
- **IDG outputs**: `features/Feature-N/idg/doc/` — release notes, context-sensitive help, online help, user manuals

Dev implements features in **`src/`** while working from `features/Feature-N/dev/`; `dev/eng/` holds non-application artifacts. Until `src/` is scaffolded, `features/` scaffolds may be empty.

## Constraints
- BA mock data must never connect to live APIs or database clients
- Dev code in repo-root **`src/`** must ground against `ba/req/{FeatureName}BSR.md`, mockups, and mock data before implementation
- QC tests must read both `ba/` requirements and repo-root **`src/`**; may read `dev/eng/` for `tech-design.md` and SQL scripts
- IDG documentation must read both `ba/` requirements and repo-root **`src/`** before authoring; may read `dev/eng/` for `tech-design.md`
