import { mount } from '@vue/test-utils'
import WgSplitLine from '../WgSplitLine'

// export function later(delay = 0): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

const item = {
  type: "SplitLine",
  name: "分割线",
  value: "solid",
  style: {
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    borderTopWidth: "1px",
    margin: "20px 0px 20px 0px"
  }
}

test('WgSplitLine.vue', async () => {
  const wrapper = mount(WgSplitLine, {
    props: { item }
  })

  expect(wrapper.find('.splitLine-hr').exists()).toBe(true)
  expect(wrapper.find('.splitLine-hr').attributes('style')).toContain('margin: 20px 0px 20px 0px;');
})