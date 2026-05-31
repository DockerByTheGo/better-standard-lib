# Better Standard Library Onboarding

This file is for contributors changing `@blazyts/better-standard-library`. The README is for library consumers; keep implementation notes and project conventions here.

## Project Structure

- `src/data_structures` contains functional patterns and small data structures.
- `src/functions` contains runtime helper functions.
- `src/type-level-functions` contains compile-time utilities.
- `src/types` contains shared public types.
- `tests` covers both runtime and type behavior.

## Local Workflow

1. Install workspace dependencies from `project` with `bun install` unless this module has its own lockfile and you intentionally need isolated installs.
2. Make focused changes inside this module and its direct shared dependencies.
3. Run the narrowest relevant script before broad workspace checks.

## Scripts

- `bun run lint`: `bun --bun eslint .`
- `bun run node:test`: `bun x --bun vitest run --config vitest.config.ts`
- `bun run bun:test`: `bun test`
- `bun run coverage`: `bun test --coverage`

## Design Choices

- Use the functional patterns (`Optionable`, result helpers, panic/try/catch helpers) to make framework and battery code explicit about failure and absence.
- Use type-level helpers from `src/type-level-functions` when package APIs need compile-time guardrails.

## Things To Know

- Some files preserve older misspellings such as `memeberAlreadyPresent`/`unknwonString`; avoid renaming casually because imports may rely on them.
- The package currently lists Bun types in dependencies, not only dev dependencies.

## Contribution Rules

- Keep public exports routed through the package entry point.
- Prefer existing Result/Option/service contracts from workspace packages over introducing parallel abstractions.
- Add tests beside the behavior you change when the module already has a `tests` directory.
- Do not commit secrets, generated coverage, or live-service credentials.
