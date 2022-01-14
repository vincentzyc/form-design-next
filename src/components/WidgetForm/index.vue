<template>
  <div class="widget-form-wrapper" id="widget-form-wrapper">
    <div
      :style="{ ...pageData.style, backgroundImage: `url(${pageData.style.backgroundImage})` }"
      class="widget-form-container"
      id="widget-form-container"
    >
      <div :class="'template-' + pageData.theme">
        <div class="wg-fixed-top" v-if="Array.isArray(pageData.fixedTop) && pageData.fixedTop.length > 0">
          <!-- 可支持多个组件悬浮，目前未开放，限制一个-->
          <template :key="item.key" v-for="(item,index) in pageData.fixedTop">
            <WidgetFormList v-model:data="pageData.fixedTop" :index="index" :item="item" />
          </template>
        </div>
        <div class="wg-fixed-custom" v-if="Array.isArray(pageData.fixedCustom) && pageData.fixedCustom.length > 0">
          <!-- 可支持多个组件悬浮，目前未开放，限制一个 -->
          <template :key="item.key" v-for="(item,index) in pageData.fixedCustom">
            <WidgetFormList
              v-model:data="pageData.fixedCustom"
              :index="index"
              :item="item"
              :style="fixedCustomStyle(item)"
              class="fixed-item"
            />
          </template>
        </div>
        <Draggable
          :animation="100"
          :class="{ 'widget-empty': pageData.list.length === 0 && !pageData.style.backgroundImage }"
          :group="{ name: 'widget', put: true }"
          :swapThreshold="0.7"
          @add="handleWidgetAdd"
          @end="dragEnd"
          @start="dragStart"
          class="widget-form-list"
          filter=".disdraggable"
          ghostClass="ghost"
          item-key="key"
          v-model="pageData.list"
        >
          <template #item="{ element, index }">
            <WidgetFormList v-model:data="pageData.list" :index="index" :item="element" />
          </template>
        </Draggable>

        <div class="wg-fixed-bottom" v-if="Array.isArray(pageData.fixedBottom) && pageData.fixedBottom.length > 0">
          <!-- 可支持多个组件悬浮，目前未开放，限制一个-->
          <template :key="item.key" v-for="(item,index) in pageData.fixedBottom">
            <WidgetFormList v-model:data="pageData.fixedBottom" :index="index" :item="item" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Draggable from 'vuedraggable'
import WidgetFormList from './WidgetFormList'
import { useMainStore } from '@/pinia'

export default defineComponent({
  name: "WidgetForm",
  components: {
    WidgetFormList, Draggable
  },
  setup() {
    const mainStore = useMainStore()
    const store = useStore()
    const pageData = computed(() => store.state.pageData)

    function fixedCustomStyle(item) {
      if (item.position) {
        return {
          width: item.style.width,
          top: item.position.top + 'px',
          [item.position.side]: item.position[item.position.side] + '%'
        }
      }
    }
    function dragStart(evt: any) {
      mainStore.setDragWg(pageData.value.list[evt.oldIndex])
      // store.commit('setDragWg', pageData.value.list[evt.oldIndex])
    }
    function dragEnd() {
      mainStore.setDragWg(null)
      // store.commit('setDragWg', '')
    }
    function handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      store.commit('setSelectWg', pageData.value.list[newIndex]);
      store.commit('setConfigTab', "widget");
    }
    return {
      pageData,
      fixedCustomStyle, dragStart, dragEnd, handleWidgetAdd
    }
  }
})
</script>
