import { describe, test, expectTypeOf } from 'vitest';
import { valuesOf } from '../../../src/type-level-functions/record/valuesOf';

describe('valuesOf', () => {
  test('should extract union of all value types', () => {
    type Input = { name: string; age: number };
    type Result = valuesOf<Input>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single property', () => {
    type Input = { value: boolean };
    type Result = valuesOf<Input>;
    type Expected = boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should deduplicate same types', () => {
    type Input = { a: string; b: string; c: string };
    type Result = valuesOf<Input>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with mixed types', () => {
    type Input = {
      str: string;
      num: number;
      bool: boolean;
      arr: string[];
    };
    type Result = valuesOf<Input>;
    type Expected = string | number | boolean | string[];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with nested objects', () => {
    type Input = {
      user: { name: string; id: number };
      active: boolean;
    };
    type Result = valuesOf<Input>;
    type Expected = { name: string; id: number } | boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle optional properties', () => {
    type Input = {
      required: string;
      optional?: number;
    };
    type Result = valuesOf<Input>;
    
    expectTypeOf<Result>().toMatchTypeOf<string | number | undefined>();
  });

  test('should work with literal types', () => {
    type Input = {
      status: 'active' | 'inactive';
      priority: 1 | 2 | 3;
    };
    type Result = valuesOf<Input>;
    type Expected = 'active' | 'inactive' | 1 | 2 | 3;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with function types', () => {
    type Input = {
      handler: () => void;
      processor: (x: number) => string;
    };
    type Result = valuesOf<Input>;
    type Expected = (() => void) | ((x: number) => string);
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union value types', () => {
    type Input = {
      value1: string | number;
      value2: boolean;
    };
    type Result = valuesOf<Input>;
    type Expected = string | number | boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
