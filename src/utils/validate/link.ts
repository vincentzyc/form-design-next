export function isLink(value: string): boolean {
  if (typeof value !== 'string') return false
  if (value.includes('weixin://')) return true
  const pattern = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  const isLink = pattern.test(value);
  return isLink;
}