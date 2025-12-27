type Constructor<T = any> = new (...args: any[]) => T;

function addStaticConstrcutors<
  TClass extends Constructor,
  TConstructors extends Record<string, (...args: any[]) => InstanceType<TClass>>,
>(
  Base: TClass,
  config: TConstructors,
) {
  return class H extends Base {
    static cons = config;
  };
}
