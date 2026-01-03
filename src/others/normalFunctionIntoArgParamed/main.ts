type FunctionParams<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

function greet(name: string, age: number, isActive: boolean) {
  return `Hello ${name}`;
}

type GreetParams = FunctionParams<typeof greet>; // [name: string, age: number, isActive: boolean]





function transformFunc<T extends Function>(v: T): (arg: {[K in FunctionParams<T>[number]] : number}) => ReturnType<T> {
    return ;
}



transformFunc(greet)()