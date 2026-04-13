type AnyFunction = (...args: any[]) => any;

export type FunctionParams<T extends AnyFunction> =
  T extends (...args: infer P) => any ? P : never;

function getFunctionParamNames(func: AnyFunction): string[] {
  const args = func
    .toString()
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .match(/^[^(]*\(([^)]*)\)/)?.[1];

  if (!args) {
    return [];
  }

  return args
    .split(",")
    .map(arg => arg.trim())
    .filter(Boolean);
}

export function transformFunc<
  TArgs extends Record<string, unknown>,
  TFunc extends AnyFunction,
>(
  func: TFunc,
): (arg: TArgs) => ReturnType<TFunc> {
  return (arg) => {
    const values = getFunctionParamNames(func).map(key => arg[key]);

    return func(...values as FunctionParams<TFunc>);
  };
}

function greet(name: string, age: number, isActive: boolean) {
  return `Hello ${name}, ${age}, ${isActive}`;
}

const greetFromObject = transformFunc<
  {
    name: string;
    age: number;
    isActive: boolean;
  },
  typeof greet
>(greet);

greetFromObject({ name: "John", age: 30, isActive: true });
// should expect all preoperties
greetFromObject({"age": 3, "isActive": true, name: ""});
