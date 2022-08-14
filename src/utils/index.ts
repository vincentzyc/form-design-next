import { nanoid } from 'nanoid'

type StringObj = { [k: string]: string }
type UrlParamBack = null | string | StringObj

/**
 * 判断是否存在 key
 * @param obj 判断对象
 * @param key 判断 key值
 * @return {Boolean} 是否存在标识
 */
export function hasKey(obj: any, key: string): boolean {
  if (!obj) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 生成唯一id
 */
export function getUuid() {
  const randomNum = Number(Math.random().toString().slice(2, -1)) + Date.now()
  return randomNum.toString(36)
}
/**
 * 生成唯一id
 */
export function getNanoid() {
  return nanoid() //=> "nyO3cyhqEjQ3vzCLdfAjb"
}

/**
 * 获取数据类型
 * @param {any} value 需要判断的值
 * @return "String","Object","Array"...
 */
export function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isDef(val: unknown): boolean {
  return val !== undefined && val !== null;
}

export function isObject(val: unknown): val is Record<any, any> {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
}

export function isArray(val: unknown): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Array';
}

export function isString(val: unknown): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'String';
}

/**
 * 获取url参数值
 * @param {String} name 参数名称(不传则返回一个全部参数对象)
 */
export function getUrlParam(name = ''): UrlParamBack {
  const href = window.location.href, i = href.indexOf("?");
  if (i < 0) return null;
  const str = href.slice(i);
  if (!str) return null;
  const arr = str.match(/([^?&=#]+)=([^?&=#/]*)/g);
  if (!arr) return null;
  const obj = {}
  arr.forEach(v => {
    const temp = v.split('=');
    if (temp.length > 0) {
      obj[temp[0]] = temp[1];
    }
  })
  if (name) return obj[name]
  return obj
}
export function sum(a: number, b: number) {
  return a + b;
}