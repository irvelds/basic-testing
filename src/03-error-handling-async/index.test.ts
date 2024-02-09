// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Testvalue';
    const data = await resolveValue(value);
    expect(data).toBe(value);
  });
  
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Some kind of message';
    expect(() => throwError(message)).toThrowError(message);
  });
  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });

});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    //expect(() => throwCustomError()).toThrow(new MyAwesomeError().message);
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    //expect(async() => await rejectCustomError()).rejects.toThrow(new MyAwesomeError().message);
    expect(async() => await rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
