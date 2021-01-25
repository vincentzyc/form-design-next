import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgHPicker",
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
        <div class="wg-horizontal-picker" style={{ width: item.itemWidth * item.showNumber + 'px' }}>
          {item.options.map((optionsItem, key) => (
            <div
              class="picker-item"
              key={optionsItem + key}
              style={key === 0 ? { ...item.pickerStyle, width: item.itemWidth + 'px' } : { width: item.itemWidth + 'px' }}
            >{optionsItem}</div>
          ))}
        </div>
      </div>
    )
  }
})
