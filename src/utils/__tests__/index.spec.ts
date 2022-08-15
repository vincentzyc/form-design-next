import { sum, hasKey, getType, getUrlParam } from '../index'

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
test('getType', () => {
  const obj = {}, arr = [], num = 1, str = "1", bool = false, isNull = null, isUndefined = undefined;
  expect(getType(obj)).toBe('Object');
  expect(getType(arr)).toBe('Array');
  expect(getType(num)).toBe('Number');
  expect(getType(str)).toBe('String');
  expect(getType(bool)).toBe('Boolean');
  expect(getType(isNull)).toBe('Null');
  expect(getType(isUndefined)).toBe('Undefined');
})

test('getUrlParam', () => {
  expect(getUrlParam('pid')).toBe('37289');
})
