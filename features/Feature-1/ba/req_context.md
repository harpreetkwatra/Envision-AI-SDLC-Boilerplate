# BA Living Context Ledger

Chronological log of all BA prompt steps, decisions, and requirement changes.
This file enables full reproduction of `./req/` from scratch at any time.
Feature name = basename of the parent feature folder (`../`).

---

## Initialization — 2026-07-11

- **Action**: BA workspace scaffolded per AI-SDLC protocol
- **State**: Empty `./req/` — awaiting first requirements session
- **Next**: Create `{FeatureName}BSR.md` using the `write-bsr` skill

---

## 2026-07-13 — Generic path AGENTS.md

- **Intent**: Remove hardcoded `Feature-1` paths so this mandate copies cleanly to any feature folder
- **Decision**: Bound writes to `.` / `./req/`; resolve feature name from `../` basename; use `{FeatureName}*` artifact names
- **Changed**: `./AGENTS.md`, `./req_context.md` (and sibling discipline AGENTS/context files under this feature)
