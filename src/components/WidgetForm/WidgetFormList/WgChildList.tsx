import { defineComponent, reactive } from "vue";
import WidgetFormList from './index';
import Draggable from 'vuedraggable'
import { hasKey } from "@/utils";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: "WgChildList",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)
    const mainStore = useMainStore()
    const { dragWg } = storeToRefs(mainStore)
    const handleWidgetAdd = (evt: any) => {
      const newIndex = evt.newIndex;
      mainStore.setSelectWg(item.list[newIndex])
      mainStore.setConfigTab("widget")
    }
    return () => (
      <Draggable
        v-model={item.list}
        group={{ name: 'widget', put: !hasKey(dragWg.value, 'list') }}
        ghostClass="ghost"
        swapThreshold={0.6}
        animation={100}
        item-key="key"
        onAdd={handleWidgetAdd}
        class={['widget-form-list wg-padding', { 'widget-empty': item.list.length === 0 }]}
        v-slots={{
          item: ({ element, index }) => <WidgetFormList v-model={[item.list, 'data']} data={item.list} index={index} item={element} />
        }}
      >
      </Draggable>
    )
  }
})
