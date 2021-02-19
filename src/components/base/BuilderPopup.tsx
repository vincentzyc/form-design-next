import { defineComponent, reactive, ref, watch, Transition } from "vue";

export default defineComponent({
  name: "BuilderPopup",
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit, slots }) {
    const customPopup = ref()
    let setStyle = reactive({})

    watch(() => props.modelValue, newVal => {
      if (newVal) return setClientRect()
      if (customPopup.value && customPopup.value.parentNode) {
        customPopup.value.parentNode.removeChild(customPopup.value);
      }
    })
    const close = () => {
      emit('update:modelValue', false)
      emit('close')
    }
    const setClientRect = () => {
      const domWrapper = document.getElementById('widget-form-wrapper'),
        domContainer = document.getElementById('widget-form-container'),
        domWrapperHeight = domWrapper ? domWrapper.clientHeight || domWrapper.offsetHeight : 0,
        domContainerHeight = domContainer ? domContainer.clientHeight || domContainer.offsetHeight : 0,
        fixedHeight = Math.min(domWrapperHeight, domContainerHeight);
      setStyle = {
        width: (domWrapper ? domWrapper.clientWidth || domWrapper.offsetWidth : 0) + 'px',
        height: (fixedHeight || 0) + 20 + 'px'
      }
      if (domWrapper) domWrapper.insertBefore(customPopup.value, domContainer)
    }
    return () => {
      if (slots.default) {
        return (
          <Transition name="el-fade-in-linear">
            <div style={setStyle} class="custom-popup-fixed" ref={customPopup}>
              <div onClick={close} class="custom-popup"></div>
              <div class="custom-popup-body">
                {slots.default()}
              </div>
            </div>
          </Transition>
        )
      }
    }
  }
})
