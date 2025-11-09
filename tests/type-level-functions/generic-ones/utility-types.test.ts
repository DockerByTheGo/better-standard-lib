import { describe, test, expectTypeOf } from 'vitest';
import { OptionalPromise, OPromise, URecord, VoidCallback, IfNotUndefinedWithDefault } from '../../../src/type-level-functions/generic-ones/utility-types';

describe('OptionalPromise', () => {
  test('should be a Promise of Optionable<T>', () => {
    type Result = OptionalPromise<string>;
    
    expectTypeOf<Result>().toMatchTypeOf<Promise<any>>();
  });

  test('should work with different types', () => {
    type StringOptPromise = OptionalPromise<string>;
    type NumberOptPromise = OptionalPromise<number>;
    
    expectTypeOf<StringOptPromise>().toMatchTypeOf<Promise<any>>();
    expectTypeOf<NumberOptPromise>().toMatchTypeOf<Promise<any>>();
  });
});

describe('OPromise', () => {
  test('should be an alias for OptionalPromise', () => {
    expectTypeOf<OPromise<string>>().toEqualTypeOf<OptionalPromise<string>>();
  });

  test('should work with complex types', () => {
    type Result = OPromise<{ id: number; name: string }>;
    
    expectTypeOf<Result>().toMatchTypeOf<Promise<any>>();
  });
});

describe('URecord', () => {
  test('should be Record<string, unknown>', () => {
    type Expected = Record<string, unknown>;
    
    expectTypeOf<URecord>().toEqualTypeOf<Expected>();
  });

  test('should accept any object with string keys', () => {
    const obj1: URecord = { a: 1, b: 'test', c: true };
    const obj2: URecord = { nested: { value: 42 } };
    
    expectTypeOf(obj1).toMatchTypeOf<URecord>();
    expectTypeOf(obj2).toMatchTypeOf<URecord>();
  });

  test('should be assignable to object', () => {
    const record: URecord = {};
    
    expectTypeOf(record).toMatchTypeOf<object>();
  });
});

describe('VoidCallback', () => {
  test('should be a function that returns void', () => {
    type Expected = () => void;
    
    expectTypeOf<VoidCallback>().toEqualTypeOf<Expected>();
  });

  test('should accept functions with no parameters', () => {
    const callback: VoidCallback = () => {};
    
    expectTypeOf(callback).toMatchTypeOf<VoidCallback>();
  });

  test('should not accept functions with parameters', () => {
    // @ts-expect-error - should not accept parameters
    const callback: VoidCallback = (x: number) => {};
  });

  test('should not accept functions that return values', () => {
    // This will still compile because void is a valid return type
    // but the function should not return anything meaningful
    const callback: VoidCallback = () => undefined;
    
    expectTypeOf(callback).toMatchTypeOf<VoidCallback>();
  });
});

describe('IfNotUndefinedWithDefault', () => {
  test('should return Default when T is undefined', () => {
    type Result = IfNotUndefinedWithDefault<undefined, string>;
    type Expected = string;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return T when T is not undefined', () => {
    type Result = IfNotUndefinedWithDefault<number, string>;
    type Expected = number;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should work with complex types', () => {
    type Result = IfNotUndefinedWithDefault<{ value: string }, { default: true }>;
    type Expected = { value: string };
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle null as not undefined', () => {
    type Result = IfNotUndefinedWithDefault<null, string>;
    type Expected = null;
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
