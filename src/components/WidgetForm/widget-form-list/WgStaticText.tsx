import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgStaticText",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapStyle = { backgroundColor: item.backgroundColor, backgroundImage: `url(${item.backgroundImage || ''})` }
    return () => (
      <div class="wg-staticText clearfix" style={wrapStyle}>
        <p style={item.style} v-html={item.value}></p>
      </div>
    )
  }
})
