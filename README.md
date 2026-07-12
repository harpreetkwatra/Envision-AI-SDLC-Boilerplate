# Envision AI-SDLC Boilerplate

Multi-disciplinary, multi-team spec-driven AI software development lifecycle (SDLC) protocol for enterprise applications.

## Repository/Directory Structure

```
├── .cursor/
│   ├── rules/global_standards/   # Global Cursor rules (product, tech, patterns, design)
│   └── skills/                   # Agent skills (write-bsr, write-test-cases)
├── features/
│   └── Feature-1/
│       ├── ba/                   # Business Analysis (requirements, mockups, BSR)
│       ├── dev/                  # Development (production source code)
│       ├── qc/                   # Quality Control (test cases, automation)
│       └── idg/                  # Information Development (release notes, help, manuals)
```



## How It Works

1. **BA Team** works in `features/Feature-N/ba/` — produces BSR docs, React mockups, and mock JSON data
2. **Dev Team** works in `features/Feature-N/dev/` — reads BA outputs, writes production code
3. **QC Team** works in `features/Feature-N/qc/` — reads BA + Dev, writes test suites
4. **IDG Team** works in `features/Feature-N/idg/` — reads BA + Dev, writes release notes, online help, and manuals

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


| Skill              | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| `write-bsr`        | Standardized Business & System Requirements documents |
| `write-test-cases` | Standardized test case matrices and automation        |


