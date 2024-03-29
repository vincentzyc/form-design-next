import { defineComponent, reactive } from "vue";
import WidgetFormList from './index';
import Draggable from 'vuedraggable'
import { hasKey } from "@/utils";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

interface TypeTabsItem {
  title: string,
  name: string,
  list: Record<any, any>[]
}

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
      mainStore.setSelectWg(item.list[item.value].list[newIndex])
      mainStore.setConfigTab("widget")
    }
    const changeTab = (key: number) => {
      item.value = key
    }
    // const wrapStyle = computed(() => {
    //   return { backgroundColor: item.backgroundColor, backgroundImage: `url(${item.backgroundImage || ''})` }
    // })
    return () => (
      <div class="wg-tabs clearfix" style={item.style}>
        <ul class="flex tab-bar-wrap">
          {item.list.map((tab: TypeTabsItem, key: number) => (
            <li class={['tab-bar flex-auto text-center', { 'active': key === item.value }]} onClick={() => changeTab(key)}>{tab.title}</li>
          ))}
        </ul>
        <Draggable
          v-model={item.list[item.value].list}
          group={{ name: 'widget', put: !hasKey(dragWg.value, 'list') }}
          ghostClass="ghost"
          swapThreshold={0.6}
          animation={100}
          item-key="key"
          onAdd={handleWidgetAdd}
          class={['widget-form-list wg-padding', { 'widget-empty': item.list[item.value].list.length === 0 }]}
          v-slots={{
            item: ({ element, index }) => <WidgetFormList v-model={[item.list[item.value].list, 'data']} data={item.list[item.value].list} index={index} item={element} />
          }}
        >
        </Draggable>
      </div >
    )
  }
})