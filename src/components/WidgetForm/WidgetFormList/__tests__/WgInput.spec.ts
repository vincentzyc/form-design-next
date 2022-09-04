import { mount } from '@vue/test-utils'
import WgInput from '../WgInput'

const item = {
  type: "Input",
  name: "输入框",
  placeholder: "请输入姓名",
  isTextarea: false,
  showLabel: false,
  label: {
    labelTitle: "姓名",
    labelPosition: "left",
    labelwidth: 50,
    labelWidth: "50px"
  },
  value: "",
  apiKey: "name",
  fieldTypes: "inputTypes",
  style: {
    margin: "0px 0px 0px 0px"
  }
}

test('WgInput.vue', async () => {
  const wrapper = mount(WgInput, {
    props: { item }
  })

  expect(wrapper.html()).toContain(item.label.labelTitle)
  expect(wrapper.find('.wg-item').attributes('style')).toContain('margin: 0px 0px 0px 0px')
  expect(wrapper.find('.wg-input').exists()).toBeTruthy()
  await wrapper.find('.wg-input').setValue('haha')
  expect(item.value).toBe('haha')
})