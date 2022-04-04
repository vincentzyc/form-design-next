import { computed, defineComponent, reactive } from "vue";
import WidgetFormList from './index';
import Draggable from 'vuedraggable'
import { hasKey } from "@/utils";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: "WgTabs",
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
      mainStore.setSelectWg(item.tabsList[0].list[newIndex])
      mainStore.setConfigTab("widget")
    }
    // const wrapStyle = computed(() => {
    //   return { backgroundColor: item.backgroundColor, backgroundImage: `url(${item.backgroundImage || ''})` }
    // })
    return () => (
      <div class="wg-tabs clearfix" style={item.style}>
        <ul class="flex tab-bar-wrap">
          {item.tabsList.map((tab, key) => (
            <li class={['tab-bar flex-auto text-center', { 'active': key === 0 }]}>{tab.title}</li>
          ))}
        </ul>
        <Draggable
          v-model={item.tabsList[0].list}
          group={{ name: 'widget', put: !hasKey(dragWg.value, 'list') }}
          ghostClass="ghost"
          swapThreshold={0.6}
          animation={100}
          item-key="key"
          onAdd={handleWidgetAdd}
          class={['widget-form-list wg-padding', { 'widget-empty': item.tabsList[0].list.length === 0 }]}
          v-slots={{
            item: ({ element, index }) => <WidgetFormList v-model={[item.tabsList[0].list, 'data']} data={item.tabsList[0].list} index={index} item={element} />
          }}
        >
        </Draggable>
      </div >
    )
  }
})