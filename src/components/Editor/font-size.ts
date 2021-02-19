export const fontSizes = {
  'x-small': { name: '10px', value: '1' },
  'small': { name: '12px', value: '2' },
  'normal': { name: '14px', value: '3' },
  'large': { name: '18px', value: '4' },
  'x-large': { name: '24px', value: '5' },
  'xx-large': { name: '36px', value: '6' },
  'xxx-large': { name: '48px', value: '7' },
}

const fontSizesMap = {
  'x-small': '10px',
  'small': '12px',
  'normal': '14px',
  'medium': '14px',
  'large': '18px',
  'x-large': '24px',
  'xx-large': '36px',
  'xxx-large': '48px',
}

export function changeFontSize(html: string) {
  const reg = new RegExp(`font-size:\\s(${Object.keys(fontSizesMap).join('|')})`, "g");
  const newHtml = html.replace(reg, (_a, b) => {
    return `font-size:${fontSizesMap[b] || ''}`
  })
  return newHtml
}

export default changeFontSize