import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgWechat",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const renderImgBtn = () => (
      <div class={['flex flex-center', { 'img-placeholder': !item.style.value }]} style={item.style}>
        {item.style.value ?
          <img src={item.style.value} alt="图片按钮" style="width:100%" /> :
          <img src={require("@/assets/img/img-placeholder.png")} alt="图片展示" />}
      </div>
    )
    const renderLogo = () => (
      <div class="flex align-middle pd10" style={item.style}>
        {item.showLogo &&
          <div class="wechat-avatar flex-none">
            {item.logo ?
              <img src={item.logo} alt="公众号logo" style="width:100%" /> :
              <img src={require("@/assets/img/wxlogo.png")} alt="公众号logo" style="width:100%" />
            }
          </div>
        }
        {item.showName && <div class="flex-auto">{item.value}</div>}
        <div class={['wechat-btn', item.showName ? 'flex-none' : 'flex-auto']} style={item.style.btnStyle} >{item.btnText}</div>
      </div >
    )
    return () => (
      <div class="wg-wechat clearfix" style={{ backgroundColor: item.backgroundColor }}>
        {item.style.isImgBtn ? renderImgBtn() : renderLogo()}
      </div>
    )
  }
})
