import { describe, test, expectTypeOf } from 'vitest';
import { BooleanPromise, BPromise } from '../../../src/type-level-functions/boolean/promise';

describe('BooleanPromise', () => {
  test('should be a Promise of boolean', () => {
    type Expected = Promise<boolean>;
    
    expectTypeOf<BooleanPromise>().toEqualTypeOf<Expected>();
  });

  test('should be assignable to Promise<boolean>', () => {
    const promise: BooleanPromise = Promise.resolve(true);
    expectTypeOf(promise).toMatchTypeOf<Promise<boolean>>();
  });

  test('should resolve to boolean', async () => {
    const promise: BooleanPromise = Promise.resolve(false);
    const result = await promise;
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });
});

describe('BPromise', () => {
  test('should be an alias for BooleanPromise', () => {
    expectTypeOf<BPromise>().toEqualTypeOf<BooleanPromise>();
  });

  test('should be a Promise of boolean', () => {
    type Expected = Promise<boolean>;
    
    expectTypeOf<BPromise>().toEqualTypeOf<Expected>();
  });

  test('should be interchangeable with BooleanPromise', () => {
    const promise1: BooleanPromise = Promise.resolve(true);
    const promise2: BPromise = promise1;
    
    expectTypeOf(promise2).toEqualTypeOf<BooleanPromise>();
  });
});
