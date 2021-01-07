import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "WgPhone",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)

    const wrapClass = computed(() => ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'])

    const rendeVerCode = () => item.showCode && (
      <div class={wrapClass.value}>
        <div v-show={item.showLabel} style={{ width: item.label.labelWidth }} class="wg-title flex-none" >验证码</div>
        <div class="flex flex-auto">
          <input class="wg-input" placeholder="验证码" />
          <button style={item.style.btnStyle} class="getVerCode-btn">获取验证码</button>
        </div>
      </div>
    )

    const rendeInput = () => (
      <div class={wrapClass.value}>
        <div v-show={item.showLabel} style={{ width: item.label.labelWidth }} class="wg-title" >{item.label.labelTitle}</div>
        <div class="flex-auto">
          <input placeholder={item.placeholder} value={item.value} class="wg-input" />
        </div>
      </div>
    )

    return () => (
      <div class="wg-phone wg-padding" style={item.style}>
        {rendeInput()}
        {rendeVerCode()}
      </div>
    )
  }
})
