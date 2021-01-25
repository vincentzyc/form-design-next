import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgCheckbox",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapClass = computed(() => ['wg-item flex-wrap wg-checkbox wg-padding', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'])
    return () => (
      <div style={item.style} class={wrapClass.value}>
        <div
          style={{ width: item.label.labelWidth }}
          class="wg-title"
          v-show={item.showLabel}
        >{item.label.labelTitle}</div>
        <div class="flex-auto">
          {item.options.map((optionsItem, key) => (
            <label class="label" key={optionsItem + key}>
              <input
                class="wg-checkbox-input"
                type={item.isRadio ? 'radio' : 'checkbox'}
                value={optionsItem}
                v-model={item.value}
                style="display:none"
              />
              <span>{optionsItem}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }
})
