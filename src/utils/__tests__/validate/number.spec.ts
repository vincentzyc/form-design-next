import { isNumeric, isNaN } from '../../validate/number'

test('isNumeric', () => {
  expect(isNumeric('1')).toBeTruthy();
  expect(isNumeric('1.2')).toBeTruthy();
  expect(isNumeric('1..2')).toBeFalsy();
  expect(isNumeric('abc')).toBeFalsy();
  expect(isNumeric('1b2')).toBeFalsy();
});

test('isNaN', () => {
  expect(isNaN(1)).toBeFalsy();
  expect(isNaN(Number('a'))).toBeTruthy();
});