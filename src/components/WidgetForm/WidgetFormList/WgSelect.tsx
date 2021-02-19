import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgSelect",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapClass = computed(() => ['wg-item wg-padding', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'])
    return () => (
      <div class={wrapClass.value} style={item.style}>
        <div class="wg-title" style={{ width: item.label.labelWidth }} v-show={item.showLabel}>{item.label.labelTitle}</div>
        <div class="flex-auto">
          <select v-model={item.value} class="wg-select flex-auto">
            <option value="" disabled selected hidden>{item.placeholder}</option>
          </select>
        </div>
      </div>
    )
  }
})
