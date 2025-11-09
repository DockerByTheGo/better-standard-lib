import { describe, test, expectTypeOf } from 'vitest';
import { Afterfix, AfterfixKeysOfRecord, FirstArg, NeverWithDefault, WithDefault, SharedProperties } from '../../../src/type-level-functions/string/afterfix';

describe('Afterfix', () => {
  test('should append suffix to string', () => {
    type Result = Afterfix<'hello', 'World'>;
    type Expected = 'helloWorld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty suffix', () => {
    type Result = Afterfix<'test', ''>;
    type Expected = 'test';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty string', () => {
    type Result = Afterfix<'', 'suffix'>;
    type Expected = 'suffix';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with special characters', () => {
    type Result = Afterfix<'item', '_id'>;
    type Expected = 'item_id';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('AfterfixKeysOfRecord', () => {
  test('should add suffix to all keys', () => {
    type Input = { name: string; age: number };
    type Result = AfterfixKeysOfRecord<Input, 'Prop'>;
    type Expected = { nameProp: string; ageProp: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single key', () => {
    type Input = { koko: string };
    type Result = AfterfixKeysOfRecord<Input, 'j'>;
    type Expected = { kokoj: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve value types', () => {
    type Input = { 
      str: string;
      num: number;
      bool: boolean;
      obj: { nested: true };
    };
    type Result = AfterfixKeysOfRecord<Input, 'Field'>;
    
    expectTypeOf<Result>().toMatchTypeOf<{
      strField: string;
      numField: number;
      boolField: boolean;
      objField: { nested: true };
    }>();
  });

  test('should work with empty suffix', () => {
    type Input = { value: string };
    type Result = AfterfixKeysOfRecord<Input, ''>;
    type Expected = { value: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('FirstArg', () => {
  test('should extract first argument type', () => {
    type Fn = (x: number, y: string) => void;
    type Result = FirstArg<Fn>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return never for no-arg function', () => {
    type Fn = () => void;
    type Result = FirstArg<Fn>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single argument', () => {
    type Fn = (arg: string) => number;
    type Result = FirstArg<Fn>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex argument types', () => {
    type Fn = (arg: { id: number; name: string }, other: boolean) => void;
    type Result = FirstArg<Fn>;
    type Expected = { id: number; name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('NeverWithDefault', () => {
  test('should return Default when T is never', () => {
    type Result = NeverWithDefault<never, string>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return T when T is not never', () => {
    type Result = NeverWithDefault<number, string>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = NeverWithDefault<{ id: number }, { default: true }>;
    type Expected = { id: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('WithDefault', () => {
  test('should return TDefault when TInitial exactly matches TMatch', () => {
    type Result = WithDefault<string, string, number>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return TInitial when types do not match', () => {
    type Result = WithDefault<string, number, boolean>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle any type correctly', () => {
    type Result = WithDefault<any, any, string>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('SharedProperties', () => {
  test('should extract shared properties with same types', () => {
    type A = { name: string; age: number; id: string };
    type B = { name: string; email: string; id: string };
    type Result = SharedProperties<A, B>;
    type Expected = { name: string; id: string };
    
    expectTypeOf<Result>().toMatchTypeOf<Expected>();
  });

  test('should return empty object when no shared properties', () => {
    type A = { a: string };
    type B = { b: number };
    type Result = SharedProperties<A, B>;
    
    expectTypeOf<Result>().toMatchTypeOf<{}>();
  });

  test('should filter out properties with different types', () => {
    type A = { name: string; age: number };
    type B = { name: string; age: string };
    type Result = SharedProperties<A, B>;
    
    expectTypeOf<Result>().toMatchTypeOf<{ name: string }>();
  });
});
