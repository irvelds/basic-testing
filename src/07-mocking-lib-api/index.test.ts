
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const URL = 'https://jsonplaceholder.typicode.com';
const PATH = '/users/1';

describe('throttledGetDataFromApi', () => {
  const axiosClient = axios.create({ baseURL: URL });
  
  let spyGet: jest.SpyInstance;
  let spyCreate: jest.SpyInstance;

  beforeEach(() => {
    spyCreate = jest
      .spyOn(axios, 'create')
      .mockImplementation(() => axiosClient);
    spyGet = jest
      .spyOn(axiosClient, 'get')
      .mockImplementation(() => Promise.resolve({ data: URL }));
  });

  afterAll(() => jest.useRealTimers());
  beforeAll(() => jest.useFakeTimers());


  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(PATH);
    expect(spyCreate).toBeCalledWith({ baseURL: URL });
  });

  test('should perform request to correct provided url', async () => {
    jest.advanceTimersByTime(5000);

    await throttledGetDataFromApi(PATH);
    expect(spyGet).toBeCalledWith(PATH);
  });

  test('should return response data', async () => {
    jest.advanceTimersByTime(5000);
    const data = await throttledGetDataFromApi(PATH);
    expect(data).toBe(data);
  });
});