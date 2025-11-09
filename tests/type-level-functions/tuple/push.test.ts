import { describe, test, expectTypeOf } from 'vitest';
import { Push } from '../../../src/type-level-functions/tuple/push';

describe('Push', () => {
  test('should append element to tuple', () => {
    type Input = [string, number];
    type Result = Push<Input, boolean>;
    type Expected = [string, number, boolean];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty tuple', () => {
    type Input = [];
    type Result = Push<Input, string>;
    type Expected = [string];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with single element tuple', () => {
    type Input = [number];
    type Result = Push<Input, string>;
    type Expected = [number, string];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with readonly tuple', () => {
    type Input = readonly [string, number];
    type Result = Push<Input, boolean>;
    type Expected = readonly [string, number, boolean];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = [string, number];
    type Result = Push<Input, { id: number; name: string }>;
    type Expected = [string, number, { id: number; name: string }];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types', () => {
    type Input = [string];
    type Result = Push<Input, string | number>;
    type Expected = [string, string | number];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve literal types', () => {
    type Input = ['hello', 42];
    type Result = Push<Input, true>;
    type Expected = ['hello', 42, true];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with const assertions', () => {
    const tuple = ['a', 'b'] as const;
    type Result = Push<typeof tuple, 'c'>;
    type Expected = readonly ['a', 'b', 'c'];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should allow multiple pushes', () => {
    type Input = [string];
    type Step1 = Push<Input, number>;
    type Step2 = Push<Step1, boolean>;
    type Expected = [string, number, boolean];
    
    expectTypeOf<Step2>().toEqualTypeOf<Expected>();
  });

  test('should work with array types', () => {
    type Input = [string];
    type Result = Push<Input, number[]>;
    type Expected = [string, number[]];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with function types', () => {
    type Input = [string];
    type Result = Push<Input, () => void>;
    type Expected = [string, () => void];
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
