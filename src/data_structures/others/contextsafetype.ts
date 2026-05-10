export class TypeSafeClassBase<T> {
  constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}
