import { describe, test, expectTypeOf } from 'vitest';
import { ExtractValueTypesFromRecord } from '../../../src/type-level-functions/record/extractValueTypesFromRecord';

describe('ExtractValueTypesFromRecord', () => {
  test('should extract union of all value types', () => {
    type Input = { name: string; age: number };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single property', () => {
    type Input = { value: boolean };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should deduplicate same types', () => {
    type Input = { a: string; b: string; c: string };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = { 
      user: { name: string };
      count: number;
      active: boolean;
    };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = { name: string } | number | boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with mixed types', () => {
    type Input = { 
      str: string;
      num: number;
      bool: boolean;
      arr: string[];
      obj: { nested: true };
    };
    type Result = ExtractValueTypesFromRecord<Input>;
    
    expectTypeOf<Result>().toMatchTypeOf<string | number | boolean | string[] | { nested: true }>();
  });

  test('should work with union value types', () => {
    type Input = { 
      value1: string | number;
      value2: boolean;
    };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = string | number | boolean;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle optional properties', () => {
    type Input = { 
      required: string;
      optional?: number;
    };
    type Result = ExtractValueTypesFromRecord<Input>;
    
    expectTypeOf<Result>().toMatchTypeOf<string | number | undefined>();
  });

  test('should work with literal types', () => {
    type Input = { 
      status: 'active' | 'inactive';
      count: 1 | 2 | 3;
    };
    type Result = ExtractValueTypesFromRecord<Input>;
    type Expected = 'active' | 'inactive' | 1 | 2 | 3;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
