<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Draggable
    :animation="100"
    :class="{'widget-empty': item.list.length === 0}"
    :group="{ name:'widget',put:!hasKey(dragWg,'list')}"
    :swapThreshold="0.6"
    @add="handleWidgetAdd"
    class="widget-form-list wg-padding"
    ghostClass="ghost"
    item-key="key"
    v-model="item.list"
  >
    <template #item="{element,index}">
      <WidgetFormList :index="index" :item="element" v-model:data="item.list" />
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import Draggable from 'vuedraggable'
import { hasKey } from "@/utils";

export default defineComponent({
  name: 'WgChildList',
  components: {
    Draggable,
    WidgetFormList: defineAsyncComponent(() => import('./index'))
  },
  props: {
    item: Object,
  },
  setup(props) {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const dragWg = computed(() => store.state.dragWg)

    const handleWidgetAdd = evt => {
      const newIndex = evt.newIndex;
      store.commit('setSelectWg', props.item?.list[newIndex])
      store.commit('setConfigTab', "widget");
    }
    return {
      selectWg, dragWg,
      handleWidgetAdd, hasKey
    }
  }
})
</script>