import { mount } from '@vue/test-utils'
import WgRandomCode from '../WgRandomCode'

const item = {
  type: "RandomCode",
  name: "随机码",
  placeholder: "请输入验证码",
  showLabel: false,
  label: {
    labelTitle: "验证码",
    labelPosition: "left",
    labelwidth: 66,
    labelWidth: "66px"
  },
  value: "",
  apiKey: "randomCode",
  codeValue: "",
  style: {
    margin: "0px 0px 0px 0px",
    btnStyle: {
      fontFamily: 'Helvetica Neue',
      backgroundColor: "#409EFF",
      color: "#fff",
      fontSize: "20px",
      fontsize: 20,
      borderRadius: '5px',
      borderradius: 5,
    }
  }
}

// const newOptions = ["北京", "三亚"]

test('WgRandomCode.vue', async () => {
  const wrapper = mount(WgRandomCode, {
    props: { item }
  })
  expect(wrapper.html()).toContain(item.label.labelTitle)
  expect(wrapper.find('.random-code').attributes('style')).toContain('font-family: Helvetica Neue')
  expect(wrapper.find('.wg-input').exists()).toBeTruthy()
  await wrapper.find('.wg-input').setValue('aabb')
  expect(item.value).toBe('aabb')
})