import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "WgAgreement",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    return () => (
      <div class="wg-agreement clearfix wg-padding">
        <el-checkbox style={item.style} value={item.value}>
          <p style={{ color: item.style.color }}>
            <span>{item.tipText}</span>
            {item.titleTexts.map((titleText, key) => (
              <span key={key}>
                {key > 0 && <span>和</span>}
                {titleText.title && <span style={{ color: item.agreementColor }}>{titleText.title}</span>}
              </span>
            ))}
          </p>
        </el-checkbox>
      </div>
    )
  }
})
