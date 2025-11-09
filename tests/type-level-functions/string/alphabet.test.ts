import { describe, test, expectTypeOf } from 'vitest';
import { Alphabet } from '../../../src/type-level-functions/string/alphabet';

describe('Alphabet', () => {
  test('should include lowercase letters', () => {
    type TestA = 'a' extends Alphabet ? true : false;
    type TestZ = 'z' extends Alphabet ? true : false;
    
    expectTypeOf<TestA>().toEqualTypeOf<true>();
    expectTypeOf<TestZ>().toEqualTypeOf<true>();
  });

  test('should include uppercase letters', () => {
    type TestA = 'A' extends Alphabet ? true : false;
    type TestZ = 'Z' extends Alphabet ? true : false;
    
    expectTypeOf<TestA>().toEqualTypeOf<true>();
    expectTypeOf<TestZ>().toEqualTypeOf<true>();
  });

  test('should not include numbers', () => {
    type Test = '0' extends Alphabet ? true : false;
    
    expectTypeOf<Test>().toEqualTypeOf<false>();
  });

  test('should not include special characters', () => {
    type Test1 = '!' extends Alphabet ? true : false;
    type Test2 = '@' extends Alphabet ? true : false;
    type Test3 = ' ' extends Alphabet ? true : false;
    
    expectTypeOf<Test1>().toEqualTypeOf<false>();
    expectTypeOf<Test2>().toEqualTypeOf<false>();
    expectTypeOf<Test3>().toEqualTypeOf<false>();
  });

  test('should include all letters a-z', () => {
    const lowercase: Alphabet[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    lowercase.forEach(letter => {
      expectTypeOf(letter).toMatchTypeOf<Alphabet>();
    });
  });

  test('should include all letters A-Z', () => {
    const uppercase: Alphabet[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    uppercase.forEach(letter => {
      expectTypeOf(letter).toMatchTypeOf<Alphabet>();
    });
  });

  test('should be usable in type guards', () => {
    function isAlphabet(char: string): char is Alphabet {
      return /^[a-zA-Z]$/.test(char);
    }
    
    const validChar: Alphabet = 'a';
    expectTypeOf(validChar).toMatchTypeOf<Alphabet>();
  });
});
