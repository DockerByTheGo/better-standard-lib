import { describe, test, expectTypeOf } from 'vitest';
import { TypeSafeOmit } from '../../../src/type-level-functions/record/TypeSafeOmit';

describe('TypeSafeOmit', () => {
  test('should omit single key from object', () => {
    type Input = { name: string; age: number; email: string };
    type Result = TypeSafeOmit<Input, 'email'>;
    type Expected = { name: string; age: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should omit multiple keys from object', () => {
    type Input = { a: string; b: number; c: boolean; d: symbol };
    type Result = TypeSafeOmit<Input, 'b' | 'd'>;
    type Expected = { a: string; c: boolean };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve all keys when omitting none', () => {
    type Input = { x: number; y: number };
    type Result = TypeSafeOmit<Input, never>;
    type Expected = { x: number; y: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should result in empty object when omitting all keys', () => {
    type Input = { a: string; b: number };
    type Result = TypeSafeOmit<Input, 'a' | 'b'>;
    type Expected = {};
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should only accept valid keys (type safety)', () => {
    type Input = { name: string; age: number };
    
    // This should work
    type Valid = TypeSafeOmit<Input, 'name'>;
    
    // This should cause a type error (uncomment to test)
    // type Invalid = TypeSafeOmit<Input, 'invalid'>;
  });

  test('should work with complex value types', () => {
    type Input = {
      id: number;
      user: { name: string; email: string };
      tags: string[];
      metadata: Record<string, unknown>;
    };
    type Result = TypeSafeOmit<Input, 'tags' | 'metadata'>;
    type Expected = {
      id: number;
      user: { name: string; email: string };
    };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve optional properties', () => {
    type Input = { required: string; optional?: number };
    type Result = TypeSafeOmit<Input, 'required'>;
    type Expected = { optional?: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with readonly properties', () => {
    type Input = { readonly id: number; name: string };
    type Result = TypeSafeOmit<Input, 'name'>;
    type Expected = { readonly id: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
