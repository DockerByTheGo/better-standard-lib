export interface IWithShape<T> {
    shape: T
}

export abstract class Shape {
    static getShape: unknown
}