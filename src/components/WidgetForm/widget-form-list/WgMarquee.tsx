import { defineComponent, reactive, computed, ref, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "WgMarquee",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const marqueeWidth = ref(0)
    const wgMarquee = ref()
    const wrapClass = computed(() => ['wg-marquee', { 'flex align-middle': item.direction === 'left' }])

    const imgStyle = computed(() => ({
      width: marqueeWidth.value + 'px',
      height: item.direction === 'left' ? item.style.height : 'auto'
    }))
    const inlineClass = computed(() => item.direction === 'left' ? ['wg-marquee-left', 'flex-inline'] : ['wg-marquee-up'])

    const renderImg = () => (
      <div>
        {item.imgUrl ?
          <img src={item.imgUrl} alt="图片" style={imgStyle.value} /> :
          <img src={require('@/assets/img/img-placeholder.png')} alt="图片" style={imgStyle.value} />}
        {item.imgUrl ?
          <img src={item.imgUrl} alt="图片" style={imgStyle.value} /> :
          <img src={require('@/assets/img/img-placeholder.png')} alt="图片" style={imgStyle.value} />}
      </div>
    )

    const renderImg1 = () => (
      <div>{
        [...item.textList, ...item.textList].map((texts, key) => (
          <p key={key} class="flex space-around" style={{ width: marqueeWidth.value + 'px' }}>
            {texts.split(/\s+/).map((text: string, i: number) => <span key={i}>{text}</span>)}
          </p>
        ))
      }</div>
    )

    onMounted(async () => {
      await nextTick()
      marqueeWidth.value = wgMarquee.value.offsetWidth || wgMarquee?.value.clientWidth
    })

    return () => (
      <div style={item.style} class={wrapClass.value} ref={wgMarquee}>
        <div
          class={inlineClass}
          style={{ animation: `marquee-${item.direction} ${item.durationTime}s linear infinite` }}
        >
          {item.isImgBtn ? renderImg() : renderImg1()}
        </div >
      </div >
    )
  }
})
