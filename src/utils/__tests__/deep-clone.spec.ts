import { deepClone } from '../deep-clone'

test('deepClone', () => {
  const a = { foo: 0 };
  const b = { foo: 0, bar: 1 };
  const arr = [a, b];
  expect(deepClone(a)).toEqual(a);
  expect(deepClone(b)).toEqual(b);
  expect(deepClone(arr)).toEqual(arr);
});