export type Class<TConstructorArgs extends unknown[],TInstanceType = unknown> = new (...args: TConstructorArgs) => TInstanceType

