import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgDatePicker",
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
        <div class="wg-title" style={{ width: item.label.labelWidth }}>{item.label.labelTitle}</div>
        <div class="flex-auto">
          <input type="date" value={item.value} class="wg-input flex-auto" />
        </div>
      </div>
    )
  }
})
