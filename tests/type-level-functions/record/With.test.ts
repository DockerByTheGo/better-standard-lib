import { describe, test, expectTypeOf } from 'vitest';
import { With } from '../../../src/type-level-functions/record/With';

describe('With', () => {
  test('should add new key to object', () => {
    type Input = { name: string };
    type Result = With<Input, 'age', number>;
    type Expected = { name: string; age: number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return never when key already exists', () => {
    type Input = { name: string; age: number };
    type Result = With<Input, 'name', string>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should add multiple properties sequentially', () => {
    type Input = { id: number };
    type Step1 = With<Input, 'name', string>;
    type Step2 = With<Step1, 'active', boolean>;
    type Expected = { id: number; name: string; active: boolean };
    
    expectTypeOf<Step2>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Input = { id: number };
    type Result = With<Input, 'user', { name: string; email: string }>;
    type Expected = { 
      id: number; 
      user: { name: string; email: string };
    };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types as value', () => {
    type Input = { status: string };
    type Result = With<Input, 'value', string | number>;
    type Expected = { status: string; value: string | number };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with optional types', () => {
    type Input = { required: string };
    type Result = With<Input, 'optional', number | undefined>;
    type Expected = { required: string; optional: number | undefined };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should add key to empty object', () => {
    type Input = {};
    type Result = With<Input, 'first', boolean>;
    type Expected = { first: boolean };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with array types', () => {
    type Input = { name: string };
    type Result = With<Input, 'items', string[]>;
    type Expected = { name: string; items: string[] };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with function types', () => {
    type Input = { data: string };
    type Result = With<Input, 'handler', (x: number) => void>;
    type Expected = { data: string; handler: (x: number) => void };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
