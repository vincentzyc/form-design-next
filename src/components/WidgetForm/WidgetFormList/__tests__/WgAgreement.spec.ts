import { mount } from '@vue/test-utils'
import WgAgreement from '../WgAgreement'
import ElementPlus from 'element-plus'

const item = {
  type: "Agreement",
  name: "用户协议",
  apiKey: "agreement",
  value: false,
  isRequired: true,
  tipText: "我已阅读并同意",
  titleTexts: [{
    title: "《隐私权协议》",
    text: ""
  }, {
    title: "《用户协议》",
    text: ""
  }],
  style: {
    fontsize: 12,
    fontSize: "12px",
    color: "#333333",
    margin: "10px 0px 10px 0px"
  },
  agreementColor: '#3b9cfd'
}

test('WgAgreement.vue', async () => {
  const wrapper = mount(WgAgreement, {
    props: { item },
    global: {
      plugins: [ElementPlus]
    }
  })

  expect(wrapper.html()).toContain(item.tipText)
  expect(wrapper.find('p').attributes('style')).toContain('color: rgb(51, 51, 51)')
  expect(wrapper.findAll('.agreement-item')).toHaveLength(item.titleTexts.length)
  await wrapper.setProps({ item: { ...item, tipText: "点击提交表示同意" } });
  expect(wrapper.html()).toContain(item.tipText)
})