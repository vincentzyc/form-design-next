import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgInput",
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
      <div style={item.style} class={wrapClass.value}>
        <div
          style={{ width: item.label.labelWidth }}
          class="wg-title"
          v-show={item.showLabel}
        >{item.label.labelTitle}</div>
        <div class="flex-auto">
          {item.isTextarea ?
            <textarea placeholder={item.placeholder} v-model={item.value} class="wg-input" /> :
            <input placeholder={item.placeholder} v-model={item.value} class="wg-input" />
          }
        </div>
      </div>
    )
  }
})
