# Better Standard Library

Shared TypeScript utility library with functional data structures, error/result/option patterns, object helpers, logging helpers, and type-level utilities.

## Install

`bun add @blazyts/better-standard-library`

## Usage

```ts
import { Optionable, tryCatch, objectEntries } from '@blazyts/better-standard-library';
```

- Use the functional patterns (`Optionable`, result helpers, panic/try/catch helpers) to make framework and battery code explicit about failure and absence.
- Use type-level helpers from `src/type-level-functions` when package APIs need compile-time guardrails.

## Public Surface

- Package name: `@blazyts/better-standard-library`
- Module kind: `module`
- Entry point: `index.ts`

Runtime dependencies: `@types/bun`, `bun-types`, `dotenv`, `zod`.
Peer dependencies: `typescript`.

## Scripts

- `bun run lint`: `bun --bun eslint .`
- `bun run node:test`: `bun x --bun vitest run --config vitest.config.ts`
- `bun run bun:test`: `bun test`
- `bun run coverage`: `bun test --coverage`

## Notes

- Some files preserve older misspellings such as `memeberAlreadyPresent`/`unknwonString`; avoid renaming casually because imports may rely on them.
- The package currently lists Bun types in dependencies, not only dev dependencies.
