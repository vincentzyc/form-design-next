import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgVideoPlay",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    return () => (
      <div class="wg-video-play transition03" style={item.style}>
        <video {...item.videoAttr} style="width:100%;height:100%">您的浏览器不支持视频播放哦~</video>
      </div>
    )
  }
})
