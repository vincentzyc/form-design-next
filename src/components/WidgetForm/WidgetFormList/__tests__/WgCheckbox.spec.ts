import { mount } from '@vue/test-utils'
import WgCheckbox from '../WgCheckbox'

const item = {
  type: "Checkbox",
  name: "选择框",
  value: [],
  apiKey: "shootPlace",
  isRadio: false,
  label: {
    labelTitle: "旅拍城市",
    labelwidth: 66,
    labelWidth: "66px",
    labelPosition: "left"
  },
  fieldTypes: "checkboxTypes",
  options: [
    "北京",
    "三亚",
    "丽江",
    "巴厘岛",
    "马尔代夫",
    "威尼斯",
    "其他"
  ],
  style: {
    margin: "0px 0px 0px 0px"
  }
}

const newOptions = ["北京", "三亚"]

test('WgImgShow.vue', async () => {
  const wrapper = mount(WgCheckbox, {
    props: { item }
  })

  expect(wrapper.html()).toContain(item.label.labelTitle)
  expect(wrapper.find('.wg-checkbox').attributes('style')).toContain('margin: 0px 0px 0px 0px')
  expect(wrapper.findAll('.label')).toHaveLength(item.options.length)
  await wrapper.setProps({ item: { ...item, options: newOptions } });
  expect(wrapper.findAll('.label')).toHaveLength(item.options.length)
})