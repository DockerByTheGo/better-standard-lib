import { describe, test, expectTypeOf } from 'vitest';
import { ContainsAtTheEnd, ContainsAtTheStart } from '../../../src/type-level-functions/string/contains';

describe('ContainsAtTheEnd', () => {
  test('should return true when string ends with suffix', () => {
    type Result = ContainsAtTheEnd<'hello_world', 'world'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return false when string does not end with suffix', () => {
    type Result = ContainsAtTheEnd<'hello_world', 'hello'>;
    type Expected = false;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return true for empty suffix', () => {
    type Result = ContainsAtTheEnd<'test', ''>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return true when suffix equals entire string', () => {
    type Result = ContainsAtTheEnd<'test', 'test'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should be case sensitive', () => {
    type Result1 = ContainsAtTheEnd<'Hello', 'hello'>;
    type Result2 = ContainsAtTheEnd<'Hello', 'Hello'>;
    
    expectTypeOf<Result1>().toEqualTypeOf<false>();
    expectTypeOf<Result2>().toEqualTypeOf<true>();
  });

  test('should work with special characters', () => {
    type Result = ContainsAtTheEnd<'file.txt', '.txt'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return false for partial matches not at end', () => {
    type Result = ContainsAtTheEnd<'hello_world_test', 'world'>;
    type Expected = false;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('ContainsAtTheStart', () => {
  test('should return true when string starts with prefix', () => {
    type Result = ContainsAtTheStart<'hello_world', 'hello'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return false when string does not start with prefix', () => {
    type Result = ContainsAtTheStart<'hello_world', 'world'>;
    type Expected = false;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return true for empty prefix', () => {
    type Result = ContainsAtTheStart<'test', ''>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return true when prefix equals entire string', () => {
    type Result = ContainsAtTheStart<'test', 'test'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should be case sensitive', () => {
    type Result1 = ContainsAtTheStart<'Hello', 'hello'>;
    type Result2 = ContainsAtTheStart<'Hello', 'Hell'>;
    
    expectTypeOf<Result1>().toEqualTypeOf<false>();
    expectTypeOf<Result2>().toEqualTypeOf<true>();
  });

  test('should work with special characters', () => {
    type Result = ContainsAtTheStart<'@username', '@'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return false for partial matches not at start', () => {
    type Result = ContainsAtTheStart<'test_hello_world', 'hello'>;
    type Expected = false;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with numbers in strings', () => {
    type Result = ContainsAtTheStart<'123abc', '123'>;
    type Expected = true;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
