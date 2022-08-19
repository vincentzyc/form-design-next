import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import ComponentTest from '@/components/base/ComponentTest.vue'


export function later(delay = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

test('ComponentTest.vue', async () => {
  const wrapper = mount(ComponentTest,{
    slots: {
      header: '<div>Header</div>',
      default: 'Main Content'
    }
  })
  expect(wrapper.html()).toContain('<div>Header</div>')
  expect(wrapper.html()).toContain('Main Content')
  expect(wrapper.html()).toContain('Count: 0')
  expect(wrapper.html()).not.toContain('hello')

  wrapper.setData({ count: 1, show: true })
  await later();

  expect(wrapper.html()).toContain('Count: 1')
  expect(wrapper.find('.my-test').exists()).toBe(true)
})