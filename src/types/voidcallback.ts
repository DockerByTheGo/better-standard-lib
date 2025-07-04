export type Callback<ReturnType, Value> = (name: Value) => ReturnType;
export type VCallback<T> = Callback<void, T>;
