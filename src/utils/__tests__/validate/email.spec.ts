import { isEmail } from '../../validate/email'

test('isEmail', () => {
  expect(isEmail('abc@gmail.com')).toBeTruthy();
  expect(isEmail(' abc@gmail.com ')).toBeTruthy();
  expect(isEmail('abc@@gmail.com')).toBeFalsy();
  expect(isEmail('@gmail.com')).toBeFalsy();
  expect(isEmail('aa@bb.cc')).toBeTruthy();
  expect(isEmail('abc@')).toBeFalsy();
});
