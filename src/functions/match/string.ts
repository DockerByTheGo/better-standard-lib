
/// TODO: add better intellisense on the reutrn type

export function matchStringSimple<T extends string, R>(
  value: T,
  cases: { [K in T]: (value: K) => R }
): R {
  return cases[value](value);
}
