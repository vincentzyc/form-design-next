import { defineComponent, computed, ref, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "WgMarquee",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const marqueeWidth = ref(0)
    const wgMarquee = ref()
    const wrapClass = computed(() => ['wg-marquee', { 'flex align-middle': props.item.direction === 'left' }])

    const imgStyle = computed(() => ({
      width: marqueeWidth.value + 'px',
      height: props.item.direction === 'left' ? props.item.style.height : 'auto'
    }))
    const inlineClass = computed(() => props.item.direction === 'left' ? ['wg-marquee-left', 'flex-inline'] : ['wg-marquee-up'])

    const renderImg = () => (
      <div>
        {props.item.imgUrl ?
          <img src={props.item.imgUrl} alt="图片" style={imgStyle.value} /> :
          <img src={require('@/assets/img/img-placeholder.png')} alt="图片" style={imgStyle.value} />}
        {props.item.imgUrl ?
          <img src={props.item.imgUrl} alt="图片" style={imgStyle.value} /> :
          <img src={require('@/assets/img/img-placeholder.png')} alt="图片" style={imgStyle.value} />}
      </div>
    )

    const renderText = () => (
      <div>{
        [...props.item.textList, ...props.item.textList].map((texts, key) => (
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
      <div style={props.item.style} class={wrapClass.value} ref={wgMarquee}>
        <div
          class={inlineClass}
          style={{ animation: `marquee-${props.item.direction} ${props.item.durationTime}s linear infinite` }}
        >
          {props.item.isImgBtn ? renderImg() : renderText()}
        </div>
      </div>
    )
  }
})
