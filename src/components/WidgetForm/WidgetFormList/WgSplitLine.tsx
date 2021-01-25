import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgSplitLine",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    return () => (
      <div class="wg-splitLine wg-padding">
        <hr class="splitLine-hr" style={item.style} />
      </div>
    )
  }
})
