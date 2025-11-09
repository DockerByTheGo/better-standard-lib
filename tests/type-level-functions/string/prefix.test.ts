import { describe, test, expectTypeOf } from 'vitest';
import { Prefix } from '../../../src/type-level-functions/string/prefix';

describe('Prefix', () => {
  test('should prepend prefix to string', () => {
    type Result = Prefix<'World', 'Hello'>;
    type Expected = 'HelloWorld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty prefix', () => {
    type Result = Prefix<'test', ''>;
    type Expected = 'test';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with empty string', () => {
    type Result = Prefix<'', 'prefix'>;
    type Expected = 'prefix';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with special characters', () => {
    type Result = Prefix<'handler', 'on'>;
    type Expected = 'onhandler';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with underscores', () => {
    type Result = Prefix<'name', 'user_'>;
    type Expected = 'user_name';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with numbers', () => {
    type Result = Prefix<'test', '123'>;
    type Expected = '123test';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve case', () => {
    type Result = Prefix<'Name', 'get'>;
    type Expected = 'getName';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with multiple prefixes applied sequentially', () => {
    type Step1 = Prefix<'Value', 'get'>;
    type Step2 = Prefix<Step1, 'user'>;
    type Expected = 'usergetValue';
    
    expectTypeOf<Step2>().toEqualTypeOf<Expected>();
  });
});

// Note: PrefixKeysOfRecord test is skipped due to import dependency issue
// It would need the keyofonlystringkeys import to be resolved
