import { isDate } from '../../validate/date'

test('date', () => {
  const date1 = new Date()
  const date2 = new Date('2022-01-01')
  expect(isDate(date1)).toBe(true);
  expect(isDate(date2)).toBe(true);
})