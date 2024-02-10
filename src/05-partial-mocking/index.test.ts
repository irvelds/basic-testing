// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';
jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return { 
    __esModule: true , 
    ...originalModule, 
    mockOne: jest.fn(), 
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  }; 
});

describe('partial mocking', () => {

  afterAll(() => {
    jest.unmock('./index');;
  });

  // beforeAll(() => {
  //   global.console.log = jest.fn();
  // });

  test('mockOne, mockTwo, mockThree should not log into console', () => {  
    const spyOnConsole = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyOnConsole).toHaveBeenCalledTimes(0);
    // expect(global.console.log).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const spyOnConsole = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyOnConsole).toHaveBeenCalledTimes(1);
    expect(spyOnConsole).toHaveBeenCalledWith('I am not mocked');
  });
});




