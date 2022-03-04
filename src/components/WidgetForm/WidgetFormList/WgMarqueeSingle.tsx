import { defineComponent, watch, ref, onMounted, reactive, nextTick, onBeforeUnmount } from "vue";
import { deepClone } from '@/utils/deep-clone';
export default defineComponent({
  name: "WgMarqueeSingle",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)

    let scrollTimeId = 0
    let animateTimeId = 0

    const scrollList = ref([])
    const animate = ref(false)

    const scroll = () => {
      if (animate.value) return;
      clearTimeout(animateTimeId);
      animate.value = true;
      animateTimeId = window.setTimeout(() => {
        scrollList.value.push(scrollList.value[0]);
        scrollList.value.shift();
        animate.value = false;
      }, 500);
    }

    watch(() => item.textList, (newValue) => {
      scrollList.value = deepClone(newValue) as []
    }, { immediate: true, deep: true })

    watch(() => item.durationTime, (newValue: number) => {
      clearInterval(scrollTimeId);
      scrollTimeId = window.setInterval(scroll, newValue * 1000);
    })

    const renderScrollList = () => scrollList.value.map((text: Record<string, any>, i) => (
      <li
        key={i}
        class={['flex align-middle scroll-item', { 'anim': animate.value && i === 0 }]}
        style={{ marginTop: animate.value && i === 0 ? `-${item.style.height}` : '' }}
      >
        {/* 如需要支持自定义头像，使用 img 标签方式 */}
        {/* <img
          src={require(`@/assets/img/${text.sex==='man'?'manhead.png':'womanhead.png'}`)}
          alt="头像"
          class="userimg flex-none"
        /> */}
        <span
          class={['userimg flex-none', text.sex === 'man' ? 'man' : 'woman']}
          style={{ width: item.style.height }}
        ></span>
        <span class="scroll-text txtover white-space-pre">{text.text}</span>
      </li>
    ))

    onMounted(async () => {
      await nextTick()
      scrollTimeId = window.setInterval(scroll, item.durationTime * 1000);
    })
    onBeforeUnmount(() => {
      window.clearInterval(scrollTimeId);
      window.clearTimeout(animateTimeId);
    })
    return () => (
      <div class="wg-marquee-single flex flex-center">
        <ul style={{ ...item.style, borderRadius: item.style.height }} class="scroll-wrapper">
          {renderScrollList()}
        </ul>
      </div>
    )
  }
})