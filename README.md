# Envision Agentic AI-SDLC Boilerplate

Multi-disciplinary, multi-team, spec-driven AI software development lifecycle (SDLC) framework for enterprise applications.

## Shipping app vs new features

This repo holds **two related trees** with different roles:

| Location | Role |
| -------- | ---- |
| **`src/`** (repo root) | **Shipping application** — the live portal (Vite/React) once scaffolded: app shell, routes, API clients, and feature pages in production. In this boilerplate the folder may start empty (`.gitkeep` only) until the app is composed. |
| **`features/Feature-N/`** | **New feature development** — AI-SDLC workspaces where BA, Dev, QC, and IDG collaborate on *upcoming* work before it is composed into `src/`. Each feature folder is an isolated spec → build → test → doc pipeline. |

**Workflow:** New capability is specified and built under `features/Feature-N/` (BSR, mockups, `dev/eng/`, tests, docs). When approved, Dev (or explicit human) work **composes** that implementation into repo-root `src/` (routing, shell wiring, shared APIs). Until then, `features/` scaffolds may be empty while `src/` continues to evolve independently.

Agents working in `features/*/ba|dev|qc|idg/` must not assume code lives only in `dev/eng/` — the shipping codebase is **`src/`**; feature folders are the staging ground for the next increment.

## Repository/Directory Structure

```
├── .ai/
│   ├── rules/                    # Source of truth for product/tech/patterns/design
│   └── skills/                   # Source of truth for agent skills (*.md)
├── .cursor/
│   ├── rules/global_standards/   # Cursor rules (synced from .ai/rules)
│   └── skills/                   # Cursor skills (synced from .ai/skills)
├── .claude/
│   └── skills/                   # Claude skills (synced from .ai/skills)
├── CLAUDE.md                     # Combined Claude project rules (synced)
├── design-system.json            # Shared design tokens
├── features/
│   └── Feature-1/                # Template feature scaffold
│       ├── ba/                   # Business Analysis (page/screen mockups, mock data, BSR)
│       │   ├── AGENTS.md
│       │   ├── req_context.md
│       │   └── req/              # BSR, React mockups, mock JSON
│       ├── dev/                  # Development (technical design, SQL DDL scripts, SQL upgrade scripts)
│       │   ├── AGENTS.md
│       │   ├── eng_context.md
│       │   └── eng/
│       ├── qc/                   # Quality Control (test cases, test data, Playwright scripts)
│       │   ├── AGENTS.md
│       │   ├── tst_context.md
│       │   ├── playwright.config.ts
│       │   └── tst/
│       └── idg/                  # Information Development (CSH, online help, manuals, release notes)
│           ├── AGENTS.md
│           ├── doc_context.md
│           └── doc/
│   └── Feature-2/ … Feature-9/   # Placeholder feature folders
└── src/                          # Shipping app (live portal when scaffolded)
```

## How It Works

### New features (`features/Feature-N/`)

1. **BA Team** works in `features/Feature-N/ba/` — produces BSR docs, React mockups, and mock JSON data
2. **Dev Team** works in `features/Feature-N/dev/eng/` — reads BA outputs, writes technical design docs, SQL scripts, and production code for that feature increment
3. **QC Team** works in `features/Feature-N/qc/tst/` — reads BA + Dev, writes test suites
4. **IDG Team** works in `features/Feature-N/idg/doc/` — reads BA + Dev, writes release notes, context-sensitive help, and manuals

Each discipline writes exclusively to its own folder. Upstream folders are read-only. Living Context Ledgers (`*_context.md`) ensure every output folder is 100% reproducible.

### Shipping app (`src/`)

Maintained as the composed, deployable application. Feature work from `features/` is integrated here (routes, shell, shared APIs, etc.) when ready to release. Ongoing fixes and enhancements to already-shipped surfaces also land in `src/` directly.

## Getting Started

1. `npm install` — installs Playwright; Chromium downloads via `postinstall`
2. Copy `features/Feature-1/` as a template for new features (Feature-2, Feature-3, etc.)
3. Open the appropriate `AGENTS.md` in Cursor Agent mode for your discipline
4. Follow the Living Context Loop: read context ledger → do work → update context ledger
5. After editing `.ai/rules` or `.ai/skills`, sync IDE copies:
   ```bash
   npm run sync:rules
   npm run sync:skills
   ```

## Global Rules

**Source of truth:** [`.ai/rules/`](.ai/rules/) (`product_context.md`, `tech_context.md`, `system_patterns.md`, `design_system.md`).

**Sync to IDEs:** `npm run sync:rules` → writes Cursor [`.cursor/rules/global_standards/*.mdc`](.cursor/rules/global_standards/) and repo-root [`CLAUDE.md`](CLAUDE.md).

| Source (`.ai/rules/`) | Cursor output | Purpose |
| --------------------- | ------------- | ------- |
| `product_context.md` | `product_context.mdc` | Business vision and user personas |
| `tech_context.md` | `tech_context.mdc` | Tech stack and environment setup |
| `system_patterns.md` | `system_patterns.mdc` | Folder architecture and naming conventions |
| `design_system.md` | `design_system.mdc` | Points to root `design-system.json` tokens |

Claude reads the combined rules in **`CLAUDE.md`** at repo root.

## Global Skills

**Source of truth:** [`.ai/skills/`](.ai/skills/) (`write-bsr.md`, `build-mockup.md`, `write-tests.md`, `write-doc.md`).

**Sync to IDEs:** `npm run sync:skills` → writes Cursor [`.cursor/skills/<name>/SKILL.md`](.cursor/skills/) and Claude [`.claude/skills/<name>/SKILL.md`](.claude/skills/).

| Source (`.ai/skills/`) | Purpose |
| ---------------------- | ------- |
| `write-bsr.md` | Standardized Business & System Requirements documents |
| `build-mockup.md` | BA page mockups with help icons, `data-help-id` anchors, and design-system styling |
| `write-tests.md` | Standardized test case matrices and automation |
| `write-doc.md` | Context-sensitive help, manuals, and release notes |
