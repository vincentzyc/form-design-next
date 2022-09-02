import { mount } from '@vue/test-utils'
import WgHPicker from '../WgHPicker'

const item = {
  type: "HPicker",
  name: "横向滑动单选",
  value: "20",
  options: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"],
  label: {
    labelTitle: "年龄",
    labelPosition: "left",
    labelwidth: 50,
    labelWidth: "50px"
  },
  fieldTypes: "hPickerTypes",
  apiKey: "age",
  itemWidth: 50,
  showNumber: 5,
  pickerStyle: {
    color: "#409eff",
    fontsize: 18,
    fontSize: "18px"
  },
  style: {
    margin: "0px 0px 0px 0px"
  }
}

const newOptions = ["20", "21", "22", "23", "24", "25"]

test('WgHPicker.vue', async () => {
  const wrapper = mount(WgHPicker, {
    props: { item }
  })

  expect(wrapper.html()).toContain(item.label.labelTitle)
  expect(wrapper.find('.wg-item').attributes('style')).toContain('margin: 0px 0px 0px 0px')
  expect(wrapper.findAll('.picker-item')).toHaveLength(item.options.length)
  await wrapper.setProps({ item: { ...item, options: newOptions } });
  expect(wrapper.findAll('.picker-item')).toHaveLength(item.options.length)
})