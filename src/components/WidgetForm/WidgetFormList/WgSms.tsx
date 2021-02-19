import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgSms",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const renderSms = () => item.smslist?.map((smsBtn, index) => (
      <li class={[item.styleType === 'col1' ? 'col-12' : 'col-6']} key={index}>
        <div class="flex flex-center" style={{ padding: item.style.btnPadding }}>
          {item.isImgBtn ?
            <div class={{ 'img-placeholder': !smsBtn.img }}>
              {smsBtn.img ?
                <img src={smsBtn.img} alt="图片按钮" width="100%" /> :
                <img src={require('@/assets/img/img-placeholder.png')} alt="图片展示" />}
            </div> :
            <button class="wg-button" style={item.style.btnStyle}>{smsBtn.btnText}</button>}
        </div>
      </li>
    ))
    return () => (
      <div style={item.style}>
        <ul class="flex flex-wrap">
          {renderSms()}
        </ul>
      </div>
    )
  }
})
