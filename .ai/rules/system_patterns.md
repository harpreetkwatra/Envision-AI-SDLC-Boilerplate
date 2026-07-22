# System Patterns

## Repository Architecture

```
My-enterprise-app/
├── .cursor/
│   ├── rules/global_standards/     # Cursor agent rules (*.mdc)
│   └── skills/                     # Cursor agent skills (write-bsr, write-tests, write-doc)
│
├── .claude/
│   └── skills/                     # Claude agent skills (write-bsr, write-tests, write-doc)
│
├── CLAUDE.md                       # Claude agent project rules
│
├── src/                            # Shipping app (live portal — deployable today)
│
├── features/                       # New features under AI-SDLC development (pre-ship)
│   ├── Feature-1/
│   │   ├── ba/                     # Business Analysis workspace
│   │   │   ├── AGENTS.md
│   │   │   ├── req_context.md      # Living log of requirements prompt steps
│   │   │   └── req/                # BSR, mockups, mock data
│   │   ├── dev/                    # Development workspace
│   │   │   ├── AGENTS.md
│   │   │   ├── eng_context.md      # Living log of code prompt steps
│   │   │   └── eng/                # Technical design, SQL, production code
│   │   ├── qc/                     # Quality Control workspace
│   │   │   ├── AGENTS.md
│   │   │   ├── tst_context.md      # Living log of test prompt steps
│   │   │   └── tst/                # Test cases, data, automation scripts
│   │   └── idg/                    # Information Development Group workspace
│   │       ├── AGENTS.md
│   │       ├── doc_context.md      # Living log of documentation prompt steps
│   │       └── doc/                # Release notes, CSH, manuals
│   ├── Feature-2/
│   └── Feature-N/
```

### Agent rules (by IDE)

| IDE | Location | Format |
|-----|----------|--------|
| **Cursor** | `.cursor/rules/global_standards/` | `*.mdc` with `alwaysApply: true` |
| **Claude** | `CLAUDE.md` (repo root) | Concatenated project rules |

### Shipping app (`src/`)

- **`src/`** at repo root is the **shipping application** — the live portal (Vite/React app shell, routes, APIs, and feature pages when scaffolded).
- Ongoing production fixes and enhancements to already-released surfaces land here directly.
- **`src/` is not an empty compose target**; it is the authoritative codebase for what runs today.

### New feature development (`features/`)

- **`features/Feature-N/`** holds **upcoming** work developed through the AI-SDLC protocol (BA → Dev → QC → IDG) before release.
- Each feature folder is an isolated workspace: requirements in `ba/req/`, implementation drafts in `dev/eng/`, tests in `qc/tst/`, docs in `idg/doc/`.
- Scaffolds may be empty while planning starts; **`src/` may advance independently** until a feature increment is approved for composition.
- When ready to ship, approved work from `features/Feature-N/dev/eng/` is **composed into `src/`** (routing, shell wiring, shared integrations). That integration step is Dev or explicit human work outside the per-discipline write boundaries.

## Agent write boundaries (non-negotiable)

Each discipline agent may write **only** inside its own folder (`ba/`, `dev/`, `qc/`, `idg/`).
Cross-folder implementation (route wiring, Vite plugins, composition into repo-root **`src/`**) is **Dev** (or explicit human) work.
BA prototypes and temporary wired pages live in `features/*/ba/req/`, not `dev/eng/` or root `src/`.
QC and IDG may **read** repo-root `src/` when validating or documenting behavior that already ships, but must not write there.

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

## Naming Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| BSR document | `FeatureNBSR.md` | `Feature1BSR.md` |
| Page mockup | `FeatureNPageMockup.tsx` | `Feature1PageMockup.tsx` |
| Mock data | `FeatureNMockData.json` | `Feature1MockData.json` |
| Page component | `FeatureNPage.tsx` | `Feature1Page.tsx` |
| Sub-component | `FeatureNWidget.tsx` | `Feature1Widget.tsx` |
| Logic/API/helpers | `FeatureNUtils.ts` | `Feature1Utils.ts` |
| Release notes | `FeatureNReleaseNotes.md` | `Feature1ReleaseNotes.md` |
| Context-sensitive help | `FeatureN-csh.md` | `Feature1-csh.md` |
| User manual | `FeatureNManual.md` | `Feature1Manual.md` |

Do **not** create `{FeatureName}OnlineHelp.md` — CSH (`*-csh.md`) covers in-app / task-oriented help; long-form guidance belongs in the Manual.

## Parallel Sprint Rules

1. BA commits to `features/Feature-N/ba/*`
2. Dev pulls BA changes, commits to `features/Feature-N/dev/*`
3. QC pulls both, commits to `features/Feature-N/qc/*`
4. IDG pulls BA and Dev changes, commits to `features/Feature-N/idg/*`
5. Cross-feature dependencies require explicit `@` path tagging

## Agent Configuration Files

Each discipline folder contains an uppercase `AGENTS.md` that defines:
- Context boundary (read/write scope)
- Work product output locations
- Mandatory Living Context Loop requirements
