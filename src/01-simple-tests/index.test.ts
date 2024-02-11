// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const obj = { a: 10, b: 5, action: Action.Add };
    expect(simpleCalculator(obj)).toEqual(15);
  });

  test('should subtract two numbers', () => {
    const obj = { a: 10, b: 5, action: Action.Subtract };
    expect(simpleCalculator(obj)).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const obj = { a: 10, b: 5, action: Action.Multiply };
    expect(simpleCalculator(obj)).toEqual(50);
  });

  test('should divide two numbers', () => {
    const obj = { a: 10, b: 5, action: Action.Divide };
    expect(simpleCalculator(obj)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const obj = { a: 10, b: 5, action: Action.Exponentiate };
    expect(simpleCalculator(obj)).toEqual(100000);
  });

  test('should return null for invalid action', () => {
    const obj = { a: 10, b: 5, action: 'invalid action' };
    expect(simpleCalculator(obj)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const obj1 = { a: 10, b: '5', action: Action.Exponentiate };
    const obj2 = { a: '10', b: 5, action: Action.Exponentiate };
    expect(simpleCalculator(obj1)).toBeNull();
    expect(simpleCalculator(obj2)).toBeNull();
  });
});