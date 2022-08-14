import { sum, hasKey } from '../index'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(10, 2)).toBe(12);
});
test('obj hasKey', () => {
  const obj = {
    aa: 33,
    bb: 66
  }
  expect(hasKey(obj, 'cc')).toBe(false);
})