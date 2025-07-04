export interface Mapable<V> {
    map<F>(func: (v: V) => F): Mapable<F>
}