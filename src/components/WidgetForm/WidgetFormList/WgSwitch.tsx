import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgSwitch",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapClass = computed(() => ['wg-item wg-switch wg-padding', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'])
    return () => (
      <div style={item.style} class={wrapClass.value}>
        <div style={{ width: item.label.labelWidth }} class="wg-title">{item.label.labelTitle}</div>
        <label class="label">
          <input type="checkbox" class="wg-switch-input" v-model={item.value} style="display:none" />
          <span class="wg-switch-core"></span>
        </label>
      </div>
    )
  }
})
