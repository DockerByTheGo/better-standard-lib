import { describe, test, expectTypeOf } from 'vitest';
import { Last } from '../../../src/type-level-functions/tuple/getLast';

describe('Last', () => {
  test('should extract last element from tuple', () => {
    type Input = [string, number, boolean];
    type Result = Last<Input>;
    type Expected = boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single element tuple', () => {
    type Input = [number];
    type Result = Last<Input>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return never for empty tuple', () => {
    type Input = [];
    type Result = Last<Input>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with readonly tuple', () => {
    type Input = readonly [string, number, boolean];
    type Result = Last<Input>;
    type Expected = boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = [string, boolean, { id: number; name: string }];
    type Result = Last<Input>;
    type Expected = { id: number; name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types in last position', () => {
    type Input = [boolean, string | number];
    type Result = Last<Input>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with const assertions', () => {
    const tuple = ['g', 'g2'] as const;
    type Result = Last<typeof tuple>;
    type Expected = 'g2';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve literal types', () => {
    type Input = [true, 123, 'literal'];
    type Result = Last<Input>;
    type Expected = 'literal';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with two element tuple', () => {
    type Input = [string, number];
    type Result = Last<Input>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with long tuples', () => {
    type Input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    type Result = Last<Input>;
    type Expected = 10;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
