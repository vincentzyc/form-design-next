import { mount } from '@vue/test-utils'
import WgSelect from '../WgSelect'

const item = {
  type: "Select",
  name: "下拉选择框",
  value: "",
  apiKey: "educationLevel",
  placeholder: "请选择教育程度",
  showLabel: true,
  label: {
    labelTitle: "教育程度",
    labelPosition: "left",
    labelwidth: 66,
    labelWidth: "66px"
  },
  fieldTypes: "selectTypes",
  options: [
    "硕士及以上",
    "本科",
    "大专",
    "中专/高中及以下"
  ],
  style: {
    "margin": "0px 0px 0px 0px"
  }
}

test('WgSelect.vue', async () => {
  const wrapper = mount(WgSelect, {
    props: { item }
  })
  expect(wrapper.find('.wg-title').text()).toBe(item.label.labelTitle)
  expect(wrapper.find('select').exists()).toBe(true)
  await wrapper.setProps({ item: { ...item, showLabel: false } });
  expect(wrapper.find('.wg-title').attributes('style')).toContain('display: none')
})