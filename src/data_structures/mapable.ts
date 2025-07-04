export type IMapable<TypeOfValueToBeMappedOver, ReturnType> = {
    map: (func: (v: TypeOfValueToBeMappedOver) => ReturnType) => ReturnType;
};

export class Mapable<T, ReturnType> implements IMapable<T, ReturnType> {
    private v: T;
    constructor(v: T) {
        this.v = v;
    }

    map<V>(func: (v: T) => V): V {
        return func(this.v);
    }
}

export type ISimpleMapable<V> = {
    simpleMap: (func: (v: V) => V) => V;
};
