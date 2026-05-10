export function ReturnFromSubfunction<ReturnType>(func: (v: ReturnType) => unknown): ReturnType {
  const v = null;
  return func(v);
}
