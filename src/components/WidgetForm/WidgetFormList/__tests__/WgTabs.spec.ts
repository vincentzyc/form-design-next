import { mount } from '@vue/test-utils'
import WgTabs from '../WgTabs'
import { createTestingPinia } from '@pinia/testing'

const item = {
  type: "Tabs",
  name: "Tabs标签",
  value: 0,
  activeTab: 0,
  wgClassName: "wg-formlist widget-active",
  list: [{
    title: "标签一",
    list: []
  }, {
    title: "标签二",
    list: []
  }],
  style: {
    margin: "0px 0px 0px 0px"
  }
}

test('WgTabs.vue', async () => {
  const wrapper = mount(WgTabs, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: { item },
  })
  expect(wrapper.find('.wg-tabs').exists()).toBeTruthy()
  expect(wrapper.find('.wg-tabs').attributes('style')).toContain('margin: 0px 0px 0px 0px')
  expect(wrapper.findAll('.tab-bar')).toHaveLength(item.list.length)
})