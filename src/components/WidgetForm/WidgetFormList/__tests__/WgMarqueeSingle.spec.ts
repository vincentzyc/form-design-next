import { mount } from '@vue/test-utils'
import WgMarqueeSingle from '../WgMarqueeSingle'

const item = {
  type: "MarqueeSingle",
  name: "跑马灯-单个",
  positionFixed: 'auto', // auto--正常 top--顶部悬浮  custom--自定义位置悬浮  bottom--底部悬浮
  durationTime: 2, //滚动间隔 单位秒
  textList: [{
    text: '李**34秒前已报名',
    sex: 'man'
  }, {
    text: '张**1分钟前已报名',
    sex: 'woman'
  }, {
    text: '周**3分钟前已报名',
    sex: 'man'
  }, {
    text: '梁**5分钟前已报名',
    sex: 'woman'
  }],
  style: {
    width: "200px",
    pxWidth: 200,
    height: '40px',
    pxHeight: 40,
    backgroundColor: "#333",
    color: "#fff",
    fontsize: 14,
    fontSize: "14px",
    margin: "0px 0px 0px 0px"
  }
}

const newTextList = [{
  text: '李**34秒前已报名',
  sex: 'man'
}, {
  text: '张**1分钟前已报名',
  sex: 'woman'
}]

test('WgMarqueeSingle.vue', async () => {
  const wrapper = mount(WgMarqueeSingle, {
    props: { item }
  })
  expect(wrapper.find('.wg-marquee-single').exists()).toBeTruthy()
  expect(wrapper.find('ul').attributes('style')).toContain('width: 200px; height: 40px')
  expect(wrapper.findAll('.scroll-item')).toHaveLength(item.textList.length)
  await wrapper.setProps({ item: { ...item, textList: newTextList } });
  expect(wrapper.findAll('.scroll-item')).toHaveLength(item.textList.length)
})