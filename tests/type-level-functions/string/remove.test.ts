import { describe, test, expectTypeOf } from 'vitest';
import { RemoveNonAlphabetic } from '../../../src/type-level-functions/string/remove';

describe('RemoveNonAlphabetic', () => {
  test('should remove numbers from string', () => {
    type Result = RemoveNonAlphabetic<'hello123world'>;
    type Expected = 'helloworld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove special characters', () => {
    type Result = RemoveNonAlphabetic<'hello@world!'>;
    type Expected = 'helloworld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove spaces', () => {
    type Result = RemoveNonAlphabetic<'hello world'>;
    type Expected = 'helloworld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve alphabetic characters', () => {
    type Result = RemoveNonAlphabetic<'abcXYZ'>;
    type Expected = 'abcXYZ';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should return empty string when no alphabetic characters', () => {
    type Result = RemoveNonAlphabetic<'123!@#'>;
    type Expected = '';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle empty string', () => {
    type Result = RemoveNonAlphabetic<''>;
    type Expected = '';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove underscores and hyphens', () => {
    type Result = RemoveNonAlphabetic<'hello_world-test'>;
    type Expected = 'helloworldtest';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should handle mixed content', () => {
    type Result = RemoveNonAlphabetic<'user123@email.com'>;
    type Expected = 'useremailcom';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should preserve both cases', () => {
    type Result = RemoveNonAlphabetic<'HeLLo123WoRLd'>;
    type Expected = 'HeLLoWoRLd';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  test('should remove all punctuation', () => {
    type Result = RemoveNonAlphabetic<'Hello, World!'>;
    type Expected = 'HelloWorld';
    
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });
});
