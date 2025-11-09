import { describe, test, expectTypeOf } from 'vitest';
import { ifFalse, ifTrue, isFalse } from '../../../src/type-level-functions/boolean/isBoolean';

describe('isTrue', () => {
  test('should return IfTrue when T is true', () => {
    type Result = ifTrue<true, 'yes', 'no'>;
    type Expected = 'yes';
    
    const assertType: Result = 'yes';
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return IfFalse when T is false', () => {
    type Result = ifTrue<false, 'yes', 'no'>;
    type Expected = 'no';
    
    const assertType: Result = 'no';
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = ifTrue<true, { success: true }, { success: false }>;
    type Expected = { success: true };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with union types', () => {
    type Result = ifTrue<true, string | number, boolean>;
    type Expected = string | number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});

describe('isFalse', () => {
  test('should return IfTrue when T is false', () => {
    type Result = ifFalse<false, 'yes', 'no'>;
    type Expected = 'yes';
    
    const assertType: Result = 'yes';
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return IfFalse when T is true', () => {
    type Result = ifFalse<true, 'yes', 'no'>;
    type Expected = 'no';
    
    const assertType: Result = 'no';
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = ifFalse<false, { error: string }, { success: string }>;
    type Expected = { error: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with never type', () => {
    type Result = ifFalse<false, never, string>;
    type Expected = never;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
