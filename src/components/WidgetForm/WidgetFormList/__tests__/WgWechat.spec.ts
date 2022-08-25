import { mount } from '@vue/test-utils'
import WgWechat from '../WgWechat'

// export function later(delay = 0): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

const item = {
  type: "Wechat",
  name: "微信关注",
  value: "微信账号",
  wechatName: "",
  btnText: "+  关注",
  logo: "",
  showName: true,
  showLogo: true,
  backgroundColor: "",
  positionFixed: 'auto',
  fixedTypes: ['auto', 'top', 'bottom'], // auto--正常 top--顶部悬浮  custom--自定义位置悬浮  bottom--底部悬浮
  scrollHeight: 0,
  style: {
    isImgBtn: false,
    value: "",
    margin: "0px 0px 0px 0px",
    color: "#333",
    fontsize: 14,
    fontSize: "14px",
    btnStyle: {
      borderRadius: '20px',
      borderradius: 20,
      backgroundColor: "#01cd0d",
      color: "#fff",
      fontsize: 14,
      fontSize: "14px"
    }
  }
}

test('WgVideoPlay.vue', async () => {
  const wrapper = mount(WgWechat, {
    props: { item }
  })

  expect(wrapper.find('.wechat-avatar').exists()).toBe(true)
  expect(wrapper.html()).toContain('微信账号')

  // await later();

  // expect(wrapper.find('p').get(0).props.style).toHaveStyle('margin')
})