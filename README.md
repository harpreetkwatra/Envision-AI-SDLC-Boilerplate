# Envision AI-SDLC Boilerplate

Multi-disciplinary, multi-team, spec-driven AI software development lifecycle (SDLC) framework for enterprise applications.

## Shipping app vs new features

This repo holds **two related trees** with different roles:

| Location | Role |
| -------- | ---- |
| **`src/`** (repo root) | **Shipping application** — the live DTX portal built with Vite/React: app shell, routes, API clients, and feature pages currently in production (e.g. accounts, orders, tokens, chains). Changes here ship directly. |
| **`features/Feature-N/`** | **New feature development** — AI-SDLC workspaces where BA, Dev, QC, and IDG collaborate on *upcoming* work before it is composed into `src/`. Each feature folder starts as an isolated spec → build → test → doc pipeline. |

**Workflow:** New capability is specified and built under `features/Feature-N/` (BSR, mockups, `dev/eng/`, tests, docs). When approved, Dev (or explicit human) work **composes** that implementation into repo-root `src/` (routing, shell wiring, shared APIs). Until then, `features/` scaffolds may be empty while `src/` continues to evolve independently.

Agents working in `features/*/ba|dev|qc|idg/` must not assume code lives only in `dev/eng/` — the shipping codebase is **`src/`**; feature folders are the staging ground for the next increment.

## Repository/Directory Structure

```
├── .cursor/
│   ├── rules/global_standards/   # Global Cursor rules (product, tech, patterns, design)
│   └── skills/                   # Agent skills (write-bsr, write-tests, write-doc)
├── features/
│   └── Feature-1/
│       ├── ba/                   # Business Analysis (requirements, mockups, BSR)
│       │   ├── AGENTS.md         # BA Cursor Rules & agent reading scope
│       │   ├── req_context.md    # Living log of requirements prompt steps
│       │   └── req/              # Outputs: Mock data in JSON, UI mockups in ReactJS, descriptive docs
│       ├── dev/                  # Development (technical design, sql scripts, production code)
│       │   ├── AGENTS.md
│       │   ├── eng_context.md
│       │   └── eng/
│       ├── qc/                   # Quality Control (test cases, automation)
│       │   ├── AGENTS.md
│       │   ├── tst_context.md
│       │   └── tst/
│       └── idg/                  # Information Development (release notes, CSH, manuals)
│           ├── AGENTS.md
│           ├── doc_context.md
│           └── doc/
│   └── Feature-2/
.
.
.
│   └── Feature-9/
└── src/                          # Shipping app (live portal — see above)
```

## How It Works

### New features (`features/Feature-N/`)

1. **BA Team** works in `features/Feature-N/ba/` — produces BSR docs, React mockups, and mock JSON data
2. **Dev Team** works in `features/Feature-N/dev/eng/` — reads BA outputs, writes technical design docs, SQL scripts, and production code for that feature increment
3. **QC Team** works in `features/Feature-N/qc/tst/` — reads BA + Dev, writes test suites
4. **IDG Team** works in `features/Feature-N/idg/doc/` — reads BA + Dev, writes release notes, context-sensitive help, and manuals

Each discipline writes exclusively to its own folder. Upstream folders are read-only. Living Context Ledgers (`*_context.md`) ensure every output folder is 100% reproducible.

### Shipping app (`src/`)

Maintained as the composed, deployable application. Feature work from `features/` is integrated here (routes, shell, shared `src/api/`, etc.) when ready to release. Ongoing fixes and enhancements to already-shipped surfaces also land in `src/` directly.

## Getting Started

1. Copy `features/Feature-1/` as a template for new features (Feature-2, Feature-3, etc.)
2. Open the appropriate `AGENTS.md` in Cursor Agent mode for your discipline
3. Follow the Living Context Loop: read context ledger → do work → update context ledger

## Global Rules


| Rule                  | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `product_context.mdc` | Business vision and user personas          |
| `tech_context.mdc`    | Tech stack and environment setup           |
| `system_patterns.mdc` | Folder architecture and naming conventions |
| `design_system.mdc`   | Figma-derived design tokens                |


## Global Skills


| Skill                           | Purpose                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| `write-bsr`                     | Standardized Business & System Requirements documents        |
| `write-tests`                   | Standardized test case matrices and automation               |
| `write-doc`                     | Standardized context-sensitive help, manuals and rel notes   |


