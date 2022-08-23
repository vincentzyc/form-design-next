import { mount } from '@vue/test-utils'
import WgStaticText from '../WgStaticText'

const item = {
  type: "StaticText",
  name: "文本描述",
  value: "这是一段文本",
  link: "",
  popupList: [],
  showPopup: false,
  backgroundImage: "",
  backgroundColor: "",
  style: {
    margin: "0px 0px 0px 0px"
  }
}

test('WgStaticText.vue', async () => {
  const wrapper = mount(WgStaticText, {
    props: { item }
  })
  expect(wrapper.html()).toContain('这是一段文本')
  expect(wrapper.html()).toContain('margin: 0px 0px 0px 0px;');
})