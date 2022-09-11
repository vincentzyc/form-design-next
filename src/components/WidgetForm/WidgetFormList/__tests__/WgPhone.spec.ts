import { mount } from '@vue/test-utils'
import WgPhone from '../WgPhone'

const item = {
  type: "Phone",
  name: "手机号",
  placeholder: "请输入手机号",
  showLabel: false,
  label: {
    labelTitle: "手机号",
    labelPosition: "left",
    labelwidth: 50,
    labelWidth: "50px"
  },
  value: "",
  apiKey: "phone",
  codeValue: "",
  codeKey: "verifyCode",
  showCode: true,
  style: {
    margin: "0px 0px 0px 0px",
    btnStyle: {
      backgroundColor: "#409EFF",
      color: "#fff",
      borderColor: "#409EFF",
      borderRadius: '5px',
      borderradius: 5,
    }
  }
}

test('WgPhone.vue', async () => {
  const wrapper = mount(WgPhone, {
    props: { item }
  })
  expect(wrapper.find('.wg-phone').exists()).toBe(true)
  // expect(wrapper.find('.wg-phone').text()).toBe(item.label.labelTitle)
  // await wrapper.setProps({ item: { ...item, showLabel: false } });
  // expect(wrapper.find('.wg-title').attributes('style')).toContain('display: none')
})