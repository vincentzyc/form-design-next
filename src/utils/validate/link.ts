export function isLink(value: string): boolean {
  const pattern = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  const isLink = pattern.test(value);
  return isLink;
}