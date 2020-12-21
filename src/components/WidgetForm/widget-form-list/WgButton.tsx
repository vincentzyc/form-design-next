import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgButton",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapStyle = computed(() => {
      if (!item.animation) return item.style
      return {
        ...item.style,
        ...item.animation
      }
    })
    const animteStyle = computed(() => {
      if (!item.animation?.className) return { display: 'none' }
      return {
        ...item.animation,
        animationName: item.animation.className
      }
    })
    const wrapClass = computed(() => {
      if (!item.animation) return 'flex flex-center'
      return `flex flex-center ${item.animation.className}`
    })

    const getButtonDom = () => item.style.isImgBtn
      ? (
        <div class={{ 'img-placeholder': !item.style.value }}>
          {
            item.style.value
              ? <img src={item.style.value} alt="图片按钮" width="100%" />
              : <img alt="图片展示" src={require('@/assets/img/img-placeholder.png')} />
          }
        </div>
      ) : (
        <button style={item.style.btnStyle} class="wg-button">{item.btnText}</button>
      )

    return () => (
      <div class={wrapClass.value} style={wrapStyle.value}>
        <span style={animteStyle.value} class="animte-el"></span>
        {getButtonDom()}
      </div>
    )
  }
})
