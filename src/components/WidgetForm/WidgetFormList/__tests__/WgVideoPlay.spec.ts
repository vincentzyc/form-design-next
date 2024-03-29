import { mount } from '@vue/test-utils'
import WgVideoPlay from '../WgVideoPlay'

const item = {
  type: "VideoPlay",
  name: "视频播放",
  videoAttr: {
    src: "https://www.runoob.com/try/demo_source/movie.mp4",
    poster: "https://www.runoob.com/images/logo.png",
    autoplay: false,
    loop: false,
    controls: true
  },
  style: {
    width: '100%',
    pxHeight: 200,
    height: '200px',
    margin: "0px 0px 0px 0px"
  }
}

test('WgVideoPlay.vue', async () => {
  const wrapper = mount(WgVideoPlay, {
    props: { item }
  })

  expect(wrapper.find('video').exists()).toBe(true)
  expect(wrapper.html()).toContain('src="https://www.runoob.com/try/demo_source/movie.mp4"')
  expect(wrapper.html()).toContain('margin: 0px 0px 0px 0px;');
})