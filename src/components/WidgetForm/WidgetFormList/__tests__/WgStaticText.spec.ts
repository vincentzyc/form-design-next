import { mount } from '@vue/test-utils'
import WgStaticText from '../WgStaticText'

export function later(delay = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
  // expect(wrapper.html()).not.toContain('hello')

  // await later();

  // expect(wrapper.find('.my-test').exists()).toBe(true)
})