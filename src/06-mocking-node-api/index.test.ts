// Uncomment the code below and write your tests
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callbackFn = jest.fn();

    doStuffByTimeout(callbackFn, 1000);
    expect(setTimeout).toBeCalledWith(callbackFn, 1000);
  });

  test('should call callback only after timeout', () => {
    const callbackFn = jest.fn();

    doStuffByTimeout(callbackFn, 1000);
    expect(callbackFn).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callbackFn).toHaveBeenCalled();
    expect(callbackFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callbackFn = jest.fn();

    doStuffByInterval(callbackFn, 1000);
    expect(setInterval).toBeCalledWith(callbackFn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackFn = jest.fn();
    const callsCount = 5;
    doStuffByInterval(callbackFn, 1000);

    for (let i = 1; i <= callsCount; i++) {
      jest.advanceTimersByTime(1000);
      expect(callbackFn).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {

  const FILE_PATH = '/path/some-file.js';
  const FILE_CONTENT = 'some-content';

  test('should call join with pathToFile', async () => {
    const spyPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(FILE_PATH);
    expect(spyPath).toBeCalledWith(__dirname, FILE_PATH);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(FILE_CONTENT);
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBe(FILE_CONTENT)

  });
});