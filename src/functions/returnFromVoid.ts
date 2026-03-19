export function ReturnFromSubfunction<ReturnType>(func: (v: ReturnType) => unknown): ReturnType {
  const v = null;
  return func(v);
}

const f = ReturnFromSubfunction<number>((v) => {
  [1, 3, 4].forEach((h) => { if (v === 5) { v = h; } });
});
