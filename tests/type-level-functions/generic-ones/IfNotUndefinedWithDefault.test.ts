import { describe, test, expectTypeOf } from 'vitest';
import { IfNotUndefined, DefaultWhenNever } from '../../../src/type-level-functions/generic-ones/IfNotUndefinedWithDefault';

describe('IfNotUndefined', () => {
  test('should return Default when T is undefined', () => {
    type Result = IfNotUndefined<undefined, string>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return Default when T is null', () => {
    type Result = IfNotUndefined<null, number>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return T when T is not undefined or null', () => {
    type Result = IfNotUndefined<string, number>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = IfNotUndefined<{ name: string }, { default: true }>;
    type Expected = { name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return Default for undefined | null union', () => {
    type Result = IfNotUndefined<undefined | null, boolean>;
    type Expected = boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve type when T is a union with undefined', () => {
    type Result = IfNotUndefined<string | undefined, number>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with never as default', () => {
    type Result = IfNotUndefined<undefined, never>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('DefaultWhenNever', () => {
  test('should return Default when T is never', () => {
    type Result = DefaultWhenNever<never, string>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return T when T is not never', () => {
    type Result = DefaultWhenNever<number, string>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = DefaultWhenNever<{ id: number }, { default: true }>;
    type Expected = { id: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types', () => {
    type Result = DefaultWhenNever<string | number, boolean>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle undefined correctly', () => {
    type Result = DefaultWhenNever<undefined, string>;
    type Expected = undefined;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle null correctly', () => {
    type Result = DefaultWhenNever<null, string>;
    type Expected = null;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
