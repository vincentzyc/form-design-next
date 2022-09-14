import { mount } from '@vue/test-utils'
import WgSwitch from '../WgSwitch'

const item = {
  type: "Switch",
  name: "开关",
  value: false,
  label: {
    labelTitle: "是否有信用卡",
    labelPosition: "left",
    labelwidth: 100,
    labelWidth: "100px"
  },
  fieldTypes: "switchTypes",
  apiKey: "creditCard",
  style: {
    margin: "0px 0px 0px 0px"
  }
}

test('WgSwitch.vue', async () => {
  const wrapper = mount(WgSwitch, {
    props: { item }
  })
  expect(wrapper.find('.wg-switch').exists()).toBeTruthy()
  expect(wrapper.find('.wg-switch').attributes('style')).toContain('margin: 0px 0px 0px 0px')
  expect(wrapper.find('.wg-title').text()).toBe(item.label.labelTitle)
})