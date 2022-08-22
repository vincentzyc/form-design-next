
import { isLink } from '../../validate/link'

test('isEmail', () => {
  expect(isLink('weixin://xxx')).toBeTruthy();
  expect(isLink('abc@gmail.com')).toBeFalsy();
  expect(isLink('192.168.1.1')).toBeFalsy();
  expect(isLink('https://www.baidu.com')).toBeTruthy();
  expect(isLink('//www.baidu.com')).toBeFalsy();
  expect(isLink('www.baidu.com')).toBeTruthy();
  expect(isLink('http:xxx.abc')).toBeFalsy();
  expect(isLink('http://xxx.abc')).toBeTruthy();
  expect(isLink('ftp://xxx.abc')).toBeTruthy();
});
