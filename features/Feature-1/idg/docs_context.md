# IDG Living Context Ledger

Chronological log of all documentation prompt steps, source references, and editorial decisions.
This file enables full reproduction of `./docs/` from scratch at any time.
Feature name = basename of the parent feature folder (`../`).

---

## Initialization — 2026-07-11

- **Action**: IDG workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./docs/` — awaiting BA requirements and Dev implementation
- **Upstream dependencies**: `../ba/req/` and `../dev/src/` not yet populated
- **Next**: Wait for upstream deliverables, then create release notes, online help, and user manual

---

## 2026-07-13 — Generic path AGENTS.md

- **Intent**: Remove hardcoded `Feature-1` paths so this mandate copies cleanly to any feature folder
- **Decision**: Bound writes to `.` / `./docs/`; read-only `../ba/` and `../dev/`; resolve feature name from `../` basename
- **Changed**: `./AGENTS.md`, `./docs_context.md`
