# QC Living Context Ledger

Chronological log of all testing prompt steps, test setups, and automation choices.
This file enables full reproduction of `./test/` from scratch at any time.
Feature name = basename of the parent feature folder (`../`).

---

## Initialization — 2026-07-11

- **Action**: QC workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./test/` — awaiting BA requirements and Dev implementation
- **Upstream dependencies**: `../ba/req/` and `../dev/src/` not yet populated
- **Next**: Wait for upstream deliverables, then create test case matrix using `write-test-cases` skill

---

## 2026-07-13 — Generic path AGENTS.md

- **Intent**: Remove hardcoded `Feature-1` paths so this mandate copies cleanly to any feature folder
- **Decision**: Bound writes to `.` / `./test/`; read-only feature root `../`; resolve feature name from `../` basename
- **Changed**: `./AGENTS.md`, `./test_context.md`
