# Product Context

## Product identity

## Repository layout

| Tree | Purpose |
|------|---------|
| **`features/Feature-N/`** | **New features in development** — AI-SDLC BA → Dev → QC → IDG workspaces. Dev implements in repo-root **`src/`**; `dev/eng/` holds DDL, upgrades, `tech-design.md`, and Vitest unit tests (`*.test.ts`). |

Existing shipped capability lives in `src/` once scaffolded. New capability is specified under `features/` first; Dev writes implementation in `src/`.

## Why This Exists
- Enable parallel sprints across BA, Dev, QC, and IDG without merge conflicts
- Guarantee every feature layer is 100% reproducible from Living Context Ledgers
- Maintain a verifiable history of how every requirement, line of code, test, and document was constructed

## Target Users
| Persona | Role | Workspace |
|---------|------|-----------|
| Business Analysts / Product Owners / UI/UX Designers | Requirements, mockups, BSR docs | `features/*/ba/` |
| Software Engineers | Production code in `src/`; DDL, upgrades, tech design in `dev/eng/` | `features/*/dev/` + repo-root `src/` |
| QC Analysts / Automation Testers | Test cases, data, automation scripts | `features/*/qc/` |
| Technical Writers / IDG | Release notes, context-sensitive help, user manuals | `features/*/idg/` |

## User Experience Requirements
- BAs produce high-fidelity mockups and BSR docs without touching production code
- Devs code against approved BA specifications with read-only upstream access
- QC validates against both requirements and implementation with read-only upstream access
- IDG authors documentation grounded in BA requirements and Dev implementation with read-only upstream access
- Cross-feature dependencies (e.g., Feature-9) are explicitly tagged via `@` references

## Success Criteria
- Each feature folder's work products can be destroyed and fully recreated by the Cursor Agent at any time
- Zero merge conflicts across disciplines (each layer writes exclusively to its own directory)
- Global design system tokens ensure uniform styling across BA mockups and Dev components
