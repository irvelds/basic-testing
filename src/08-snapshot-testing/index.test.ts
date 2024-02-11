// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(['value 1', null]);
    expect(linkedList).toStrictEqual(
      {
        value: 'value 1',
        next: { value: null, next: { value: null, next: null } }
      }
    )
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(['value 1', 'value 2']);
    expect(linkedList).toMatchSnapshot();
  });
});