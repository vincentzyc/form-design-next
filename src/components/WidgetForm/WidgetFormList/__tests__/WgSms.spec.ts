import { mount } from '@vue/test-utils'
import WgSms from '../WgSms'

const item = {
  type: "Sms",
  name: "短信",
  isImgBtn: false,
  dialog: {
    title: "提示",
    message: "点击确定将提示发送短信",
    messageAlign: "center",
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "确认",
    confirmButtonColor: "#1989fa",
    cancelButtonText: "取消",
    cancelButtonColor: "#333"
  },
  styleType: "col1",
  styleTypes: [{
    value: "col1",
    label: "单按钮"
  }, {
    value: "col2",
    label: "双按钮"
  }],
  smslist: [{
    addressee: "10086",
    content: "短信内容1",
    btnText: "发送短信1",
    img: ""
  }, {
    addressee: "10086",
    content: "短信内容2",
    btnText: "发送短信2",
    img: ""
  }, {
    addressee: "10086",
    content: "短信内容3",
    btnText: "发送短信3",
    img: ""
  }],
  style: {
    margin: "0px 0px 0px 0px",
    btnPadding: "5px",
    pxBtnPadding: 5,
    btnStyle: {
      borderRadius: '20px',
      borderradius: 20,
      backgroundColor: "#409EFF",
      color: "#fff"
    }
  }
}

test('WgSms.vue', async () => {
  const wrapper = mount(WgSms, {
    props: { item }
  })
  // expect(wrapper.find('.flex .flex-wrap').text()).toBe(item.label.labelTitle)
  expect(wrapper.find('.flex.flex-wrap').exists()).toBe(true)
  expect(wrapper.findAll('.col-12')).toHaveLength(item.smslist.length)

  // await wrapper.setProps({ item: { ...item, showLabel: false } });
  // expect(wrapper.find('.wg-title').attributes('style')).toContain('display: none')
})