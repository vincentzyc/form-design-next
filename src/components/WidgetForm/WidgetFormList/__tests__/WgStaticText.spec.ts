import { mount } from '@vue/test-utils'
import WgStaticText from '../WgStaticText'

const item1 = {
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

const item2 = {
  ...item1,
  value: '这是测试修改文本'
}

test('WgStaticText.vue', async () => {
  const wrapper = mount(WgStaticText, {
    props: { item: item1 }
  })
  expect(wrapper.html()).toContain('这是一段文本')
  expect(wrapper.html()).toContain('margin: 0px 0px 0px 0px;');

  await wrapper.setProps({ item: item2 });

  expect(wrapper.html()).toContain('这是测试修改文本')
})