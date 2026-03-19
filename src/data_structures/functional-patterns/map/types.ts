export type IMapable<V> = {
  raw: V
  map: <F>(func: (v: V) => F) => IMapable<F>;
};

export type SimpleMap<T> = {
  simpleMap: <F>(func: (v: T) => F) => F;
};
