import { describe, test, expectTypeOf } from 'vitest';
import { KeyOfOnlyStringKeys } from '../../../src/type-level-functions/record/keyofOnlyStringKeys';

describe('KeyOfOnlyStringKeys', () => {
  test('should extract only string keys', () => {
    type Input = { name: string; age: number };
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = 'name' | 'age';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should filter out symbol keys', () => {
    const sym = Symbol('test');
    type Input = { name: string; [sym]: number };
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = 'name';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should filter out number keys', () => {
    type Input = { [key: string]: any; [key: number]: any };
    type Result = KeyOfOnlyStringKeys<Input>;
    
    expectTypeOf<Result>().toEqualTypeOf<string>();
  });

  test('should work with array types (filtering out number indices)', () => {
    type Input = string[];
    type Result = KeyOfOnlyStringKeys<Input>;
    
    // Arrays have string method names like 'length', 'push', etc.
    expectTypeOf<Result>().toMatchTypeOf<string>();
  });

  test('should work with empty object', () => {
    type Input = {};
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve literal string types', () => {
    type Input = { readonly id: number; readonly name: string };
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = 'id' | 'name';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with Record types', () => {
    type Input = Record<string, unknown>;
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle complex objects', () => {
    type Input = {
      name: string;
      age: number;
      address: { street: string; city: string };
      hobbies: string[];
    };
    type Result = KeyOfOnlyStringKeys<Input>;
    type Expected = 'name' | 'age' | 'address' | 'hobbies';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
