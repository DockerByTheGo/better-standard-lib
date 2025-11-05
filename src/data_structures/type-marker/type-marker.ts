export class TypeMarker<T extends string> {
    constructor(public readonly type: T) {
        
    }

    getType(): T {
        return this.type;
    }

    TGetType: T

}