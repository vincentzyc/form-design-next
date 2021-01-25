import { computed, defineComponent, reactive } from "vue";
import { useStore } from 'vuex';
import WidgetFormList from './index';
import Draggable from 'vuedraggable'
import { hasKey } from "@/utils";

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
    const store = useStore()
    const dragWg = computed(() => store.state.dragWg)
    const handleWidgetAdd = (evt: any) => {
      const newIndex = evt.newIndex;
      store.commit('setSelectWg', item.list[newIndex])
      store.commit('setConfigTab', "widget");
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
