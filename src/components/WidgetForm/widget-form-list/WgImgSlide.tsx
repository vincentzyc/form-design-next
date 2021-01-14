import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgImgSlide",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const renderCarouselItem = () => (
      <el-carousel interval={3000} arrow="never" style={{ width: '100%', height: item.style.height + 'px' }}>
        {
          item.value.map((list, key) => (
            <el-carousel-item key={key}>
              {
                list.image
                  ? <img src={list.image} alt="banner" style="width:100%;height:100%" />
                  : <span>{'图片' + key + 1}</span>
              }
            </el-carousel-item>
          ))
        }
      </el-carousel>
    )
    return () => (
      <div class="wg-imgslide">
        <div class="flex flex-center" style={{ margin: item.style.margin }}>
          {renderCarouselItem()}
        </div>
      </div>
    )
  }
})
