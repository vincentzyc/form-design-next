import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgRandomCode",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const wrapClass = computed(() => ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'])
    return () => (
      <div class="wg-random-code wg-padding" style={item.style}>
        <div class={wrapClass.value}>
          <div class="wg-title" style={{ width: item.label.labelWidth }} v-show={item.showLabel}>{item.label.labelTitle}</div>
          <div class="flex flex-auto align-middle">
            <input class="wg-input" v-model={item.value} placeholder={item.placeholder} />
            <button class="random-code flex-none" style={item.style.btnStyle}>AaZ1</button>
          </div>
        </div>
      </div>
    )
  }
})
