
export interface IMapable<V> {
    map<F>(func: (v: V) => F): IMapable<F>
}

export interface SimpleMap<T> {
    simpleMap<F>(func: (v: T) => F): F
}
