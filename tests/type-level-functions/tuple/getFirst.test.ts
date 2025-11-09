import { describe, test, expectTypeOf } from 'vitest';
import { First } from '../../../src/type-level-functions/tuple/getFirst';

describe('First', () => {
  test('should extract first element from tuple', () => {
    type Input = [string, number, boolean];
    type Result = First<Input>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single element tuple', () => {
    type Input = [number];
    type Result = First<Input>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return null for empty tuple', () => {
    type Input = [];
    type Result = First<Input>;
    type Expected = null;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with readonly tuple', () => {
    type Input = readonly [string, number];
    type Result = First<Input>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = [{ id: number; name: string }, boolean, string[]];
    type Result = First<Input>;
    type Expected = { id: number; name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types in first position', () => {
    type Input = [string | number, boolean];
    type Result = First<Input>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with const assertions', () => {
    const tuple = ['hello', 42, true] as const;
    type Result = First<typeof tuple>;
    type Expected = 'hello';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with array types', () => {
    type Input = string[];
    type Result = First<Input>;
    
    expectTypeOf<Result>().toMatchTypeOf<string | undefined>();
  });

  test('should preserve literal types', () => {
    type Input = ['literal', 123, true];
    type Result = First<Input>;
    type Expected = 'literal';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
