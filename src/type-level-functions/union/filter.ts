export type Filter<T, ThingsToRemove extends unknown[]> = T extends ThingsToRemove[number] ? never : T;

type ggg = undefined | string | number;

type hhh = Filter<ggg, [undefined]>;
