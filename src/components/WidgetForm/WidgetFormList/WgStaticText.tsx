import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "WgStaticText",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const wrapStyle = computed(() => {
      return { backgroundColor: props.item.backgroundColor, backgroundImage: `url(${props.item.backgroundImage || ''})` }
    })
    return () => (
      <div class="wg-staticText clearfix" style={wrapStyle.value}>
        <p style={props.item.style} v-html={props.item.value}></p>
      </div>
    )
  }
})
