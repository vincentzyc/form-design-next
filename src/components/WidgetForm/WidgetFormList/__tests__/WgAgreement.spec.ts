import { mount } from '@vue/test-utils'
import WgAgreement from '../WgAgreement'

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

test('WgImgShow.vue', async () => {
  const wrapper = mount(WgAgreement, {
    props: { item }
  })

  expect(wrapper.html()).toContain(item.tipText)
  expect(wrapper.find('p').attributes('style')).toContain('color: rgb(51, 51, 51)')
  expect(wrapper.findAll('.agreement-item')).toHaveLength(item.titleTexts.length)
  // await wrapper.setProps({ item: { ...item, styleType: "col2" } });
  // expect(wrapper.find('.col-12').exists()).toBe(false)
  // expect(wrapper.find('.col-6').exists()).toBe(true)
})