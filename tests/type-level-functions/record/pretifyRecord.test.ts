import { describe, test, expectTypeOf } from 'vitest';
import { PretifyRecord } from '../../../src/type-level-functions/record/pretifyRecord';

describe('PretifyRecord', () => {
  test('should prettify simple record', () => {
    type Input = { name: string; age: number };
    type Result = PretifyRecord<Input>;
    type Expected = { name: string; age: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should flatten intersection types', () => {
    type Base = { id: number };
    type Extended = Base & { name: string };
    type Result = PretifyRecord<Extended>;
    type Expected = { id: number; name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty object', () => {
    type Input = {};
    type Result = PretifyRecord<Input>;
    type Expected = {};
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve optional properties', () => {
    type Input = { required: string; optional?: number };
    type Result = PretifyRecord<Input>;
    type Expected = { required: string; optional?: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve readonly properties', () => {
    type Input = { readonly id: number; name: string };
    type Result = PretifyRecord<Input>;
    type Expected = { readonly id: number; name: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with nested objects', () => {
    type Input = {
      user: { name: string; email: string };
      settings: { theme: string; notifications: boolean };
    };
    type Result = PretifyRecord<Input>;
    
    expectTypeOf<Result>().toEqualTypeOf<Input>();
  });

  test('should work with union types in values', () => {
    type Input = { value: string | number | boolean };
    type Result = PretifyRecord<Input>;
    type Expected = { value: string | number | boolean };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle complex intersection types', () => {
    type A = { a: string };
    type B = { b: number };
    type C = { c: boolean };
    type Input = A & B & C;
    type Result = PretifyRecord<Input>;
    type Expected = { a: string; b: number; c: boolean };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with function properties', () => {
    type Input = {
      name: string;
      greet: (name: string) => string;
    };
    type Result = PretifyRecord<Input>;
    
    expectTypeOf<Result>().toEqualTypeOf<Input>();
  });
});
