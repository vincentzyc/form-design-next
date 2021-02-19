import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgImgShow",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const renderImgList = () => item.imglist.map((imgBtn, index) => (
      <li class={[item.styleType === 'col1' ? 'col-12' : 'col-6']} key={index}>
        <div class={['flex flex-center', { 'img-placeholder': !imgBtn.img }]}>
          {
            imgBtn.img
              ? <img src={imgBtn.img} alt="图片按钮" width="100%" />
              : <img src={require('@/assets/img/img-placeholder.png')} alt="图片展示" />
          }
        </div>
      </li>
    ))
    return () => (
      <div class="wg-imgshow" style={item.style}>
        <ul class="flex flex-wrap">
          {renderImgList()}
        </ul >
      </div >
    )
  }
})
