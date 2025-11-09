import { describe, test, expectTypeOf } from 'vitest';
import { Filter } from '../../../src/type-level-functions/union/filter';

describe('Filter', () => {
  test('should remove specified types from union', () => {
    type Input = string | number | boolean;
    type Result = Filter<Input, [boolean]>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove multiple types from union', () => {
    type Input = string | number | boolean | null | undefined;
    type Result = Filter<Input, [null, undefined]>;
    type Expected = string | number | boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove undefined from union', () => {
    type Input = undefined | string | number;
    type Result = Filter<Input, [undefined]>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return never when all types are filtered', () => {
    type Input = string | number;
    type Result = Filter<Input, [string, number]>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return original type when nothing is filtered', () => {
    type Input = string | number;
    type Result = Filter<Input, [boolean]>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single type union', () => {
    type Input = string;
    type Result = Filter<Input, [number]>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove null from union', () => {
    type Input = string | null;
    type Result = Filter<Input, [null]>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = { id: number } | string | null;
    type Result = Filter<Input, [null]>;
    type Expected = { id: number } | string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with literal types', () => {
    type Input = 'active' | 'inactive' | 'pending' | null;
    type Result = Filter<Input, [null]>;
    type Expected = 'active' | 'inactive' | 'pending';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle empty filter array', () => {
    type Input = string | number;
    type Result = Filter<Input, []>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with nested unions', () => {
    type Input = string | (number | boolean);
    type Result = Filter<Input, [boolean]>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should filter undefined and null together', () => {
    type Input = string | number | undefined | null;
    type Result = Filter<Input, [undefined, null]>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
