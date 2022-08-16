import * as util from '../index'

test('adds 1 + 2 to equal 3', () => {
  expect(util.sum(10, 2)).toBe(12);
});
test('hasKey', () => {
  const obj = {
    aa: 33,
    bb: 66
  }
  expect(util.hasKey(obj, 'cc')).toBe(false);
})

test('getNanoid', () => {
  expect(util.getNanoid()).toHaveLength(21);
})

test('getType', () => {
  const obj = {}, arr = [], num = 1, str = "1", bool = false, isNull = null, isUndefined = undefined;
  expect(util.getType(obj)).toBe('Object');
  expect(util.getType(arr)).toBe('Array');
  expect(util.getType(num)).toBe('Number');
  expect(util.getType(str)).toBe('String');
  expect(util.getType(bool)).toBe('Boolean');
  expect(util.getType(isNull)).toBe('Null');
  expect(util.getType(isUndefined)).toBe('Undefined');
})

test('isDef', () => {
  expect(util.isDef('')).toBe(true);
  expect(util.isDef('0')).toBe(true);
  expect(util.isDef('11')).toBe(true);
  expect(util.isDef(0)).toBe(true);
  expect(util.isDef(1)).toBe(true);
  expect(util.isDef({})).toBe(true);
  expect(util.isDef(null)).toBe(false);
  expect(util.isDef(undefined)).toBe(false);
})

test('isObject', () => {
  expect(util.isObject({})).toBe(true);
  expect(util.isObject({ aa: '11' })).toBe(true);
  expect(util.isObject('')).toBe(false);
})

test('isArray', () => {
  expect(util.isArray([])).toBe(true);
  expect(util.isArray([1, 2, 3])).toBe(true);
  expect(util.isArray({})).toBe(false);
})

test('isString', () => {
  expect(util.isString('')).toBe(true);
  expect(util.isString(0)).toBe(false);
})


test('getUrlParam', () => {
  expect(util.getUrlParam('pid')).toBe('37289');
})