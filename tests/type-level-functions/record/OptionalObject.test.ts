import { describe, test, expectTypeOf } from 'vitest';

// Note: OptionalObject.ts imports from a path that may need adjustment
// Assuming the Optional type is exported or we test it inline

type Optionable<T> = T | undefined | null;

type Optional<T extends Record<string, unknown>> = {
    [Entry in keyof T]: Optionable<T[Entry]>
};

describe('Optional (OptionalObject)', () => {
  test('should make all properties optional with Optionable wrapper', () => {
    type Input = { name: string; age: number };
    type Result = Optional<Input>;
    type Expected = {
      name: string | undefined | null;
      age: number | undefined | null;
    };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single property object', () => {
    type Input = { value: boolean };
    type Result = Optional<Input>;
    type Expected = {
      value: boolean | undefined | null;
    };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve property names', () => {
    type Input = { hi: string; koko: number };
    type Result = Optional<Input>;
    
    const obj: Result = {
      hi: 'test',
      koko: 42
    };
    
    expectTypeOf(obj.hi).toEqualTypeOf<string | undefined | null>();
    expectTypeOf(obj.koko).toEqualTypeOf<number | undefined | null>();
  });

  test('should work with complex nested types', () => {
    type Input = { 
      user: { name: string; id: number };
      active: boolean;
    };
    type Result = Optional<Input>;
    
    expectTypeOf<Result>().toMatchTypeOf<{
      user: { name: string; id: number } | undefined | null;
      active: boolean | undefined | null;
    }>();
  });

  test('should work with empty object', () => {
    type Input = {};
    type Result = Optional<Input>;
    type Expected = {};
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should allow undefined and null values', () => {
    type Input = { value: string };
    type Result = Optional<Input>;
    
    const obj1: Result = { value: 'test' };
    const obj2: Result = { value: undefined };
    const obj3: Result = { value: null };
    
    expectTypeOf(obj1).toMatchTypeOf<Result>();
    expectTypeOf(obj2).toMatchTypeOf<Result>();
    expectTypeOf(obj3).toMatchTypeOf<Result>();
  });
});
