# Examples

This folder contains runnable examples for the parts of the library that still exist in `src`.

## What is covered

- `data_structures/functional-patterns/`: `Mapable`, `Optionable`, and `BasicResult`
- `data_structures/others/`: `GetSet`, `Tick`, and `TypeMarker`
- `functions/`: `map`, `entries`, `TryCatch`, `catchF`, `composeCatch`, `matchStringSimple`, and `ReturnFromSubfunction`

## Running an example

Examples import from the package entrypoint so they stay aligned with public exports.

```bash
bun examples/functions/map.ts
```

## Notes

- Stale examples for removed modules were deleted.
- If a new runtime module is added, it should get a small focused example here.
