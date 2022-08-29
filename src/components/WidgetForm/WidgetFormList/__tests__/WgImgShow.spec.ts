import { mount } from '@vue/test-utils'
import WgImgShow from '../WgImgShow'

const item = {
  type: "ImgShow",
  name: "图片展示",
  positionFixed: 'auto',
  fixedTypes: ['auto', 'top', 'bottom'], // auto--正常 top--顶部悬浮  custom--自定义位置悬浮  bottom--底部悬浮
  scrollHeight: 0,
  styleType: "col1",
  styleTypes: [{
    value: "col1",
    label: "单列"
  }, {
    value: "col2",
    label: "双列"
  }],
  imglist: [{
    img: "",
    link: ""
  }, {
    img: "",
    link: ""
  }],
  style: {
    margin: "0px 0px 0px 0px"
  }
}

test('WgImgShow.vue', async () => {
  const wrapper = mount(WgImgShow, {
    props: { item }
  })

  expect(wrapper.find('img').exists()).toBe(true)
  expect(wrapper.find('.col-12').exists()).toBe(true)
  expect(wrapper.findAll('li')).toHaveLength(2)
  await wrapper.setProps({ item: { ...item, styleType: "col2" } });
  expect(wrapper.find('.col-12').exists()).toBe(false)
  expect(wrapper.find('.col-6').exists()).toBe(true)
})