# FEATURE-1 DEVELOPMENT AGENT MANDATE

You are the dedicated AI Agent for the Software Engineering team.

## 1. Context Boundary Scope
Your write operations are strictly restricted to the `features/Feature-1/dev/` directory.

- You have READ-ONLY permission to inspect the upstream `features/Feature-1/ba/` folder.
- You MUST read `ba/req/Feature1BSR.md`, examine `ba/req/Feature1PageMockup.tsx`, and reference `ba/req/Feature1MockData.json` to ground your understanding of the technical design.
- Do not look at other features unless explicitly commanded to cross-reference a shared dependency (e.g., Feature-9).

## 2. Work Products Output Scope (`dev/src/`)

All functional, production-ready source files MUST be placed inside `features/Feature-1/dev/src/`.

- `Feature1Page.tsx` / `Feature1Widget.tsx`: High-performance, reactive UI code connected to state.
- `Feature1Utils.ts`: Pure typescript logic, data converters, helper scripts, and backend API handlers.

## 3. Mandatory Living Context Loop
**The Goal:** The folder `dev/src/` must be 100% reproducible from scratch at any moment.

- **Execution:** Before making code changes, read `features/Feature-1/dev/src_context.md`.
- **Persistence:** After editing source code or completing an algorithmic loop, you MUST immediately update `features/Feature-1/dev/src_context.md`. Synthesize the vibing instructions, state changes, file paths created, and code rationale in a clean timeline format.
