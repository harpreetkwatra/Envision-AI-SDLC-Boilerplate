# Envision AI-SDLC Boilerplate

Multi-disciplinary, multi-team, spec-driven AI software development lifecycle (SDLC) framework for enterprise applications.

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
└── src/                          # Shared application shell / source code
```

## How It Works

1. **BA Team** works in `features/Feature-N/ba/` — produces BSR docs, React mockups, and mock JSON data
2. **Dev Team** works in `features/Feature-N/dev/eng/` — reads BA outputs, writes technical design docs, SQL scripts, and production code
3. **QC Team** works in `features/Feature-N/qc/tst/` — reads BA + Dev, writes test suites
4. **IDG Team** works in `features/Feature-N/idg/doc/` — reads BA + Dev, writes release notes, context-sensitive help, and manuals

Each discipline writes exclusively to its own folder. Upstream folders are read-only. Living Context Ledgers (`*_context.md`) ensure every output folder is 100% reproducible.

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


