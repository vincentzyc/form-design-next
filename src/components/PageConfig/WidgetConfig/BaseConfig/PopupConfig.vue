<template>
  <el-form-item v-if="showConfigBtn">
    <el-button @click="openPopup" size="small" type="primary">配置弹窗内容</el-button>
  </el-form-item>
  <BuilderPopup @close="closePopup" v-model:modelValue="showPopup">
    <Draggable
      :animation="100"
      :class="{'widget-empty': popupList.length === 0}"
      :group="{ name:'widget',put:!hasKey(dragWg,'list')}"
      :swapThreshold="0.6"
      @add="handleWidgetAdd"
      class="widget-form-list wg-padding"
      ghostClass="ghost"
      item-key="key"
      v-model="popupList"
    >
      <template #item="{element,index}">
        <WidgetFormList
          :index="index"
          :isPopup="true"
          :item="element"
          @emptied="closePopup"
          v-model:data="popupList"
        />
      </template>
    </Draggable>
  </BuilderPopup>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { hasKey } from "@/utils"
import Draggable from 'vuedraggable'
import WidgetFormList from '@/components/WidgetForm/WidgetFormList'
import BuilderPopup from '@/components/base/BuilderPopup'

export default defineComponent({
  components: {
    Draggable,
    WidgetFormList,
    BuilderPopup
  },
  setup() {
    const vm: any = getCurrentInstance()?.proxy

    //监听保存操作，组件赋值popupList
    vm.$bus.on("formDesign_savePage", () => setWgPopupList(pageData.value.list))

    const showPopup = ref(false)
    const wgId = ref(null)
    const popupList = ref([])

    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const pageData = computed(() => store.state.pageData)
    const dragWg = computed(() => store.state.dragWg)

    const showConfigBtn = () => {
      if (showPopup.value) return false
      return hasKey(selectWg.value, 'popupList')
    }

    const setWgPopupList = list => {
      if (!Array.isArray(list) || list.length === 0) return;
      for (const item of list) {
        if (Array.isArray(item.list) && item.list.length > 0) {
          setWgPopupList(item.list)
        }
        if (item.key === wgId.value) {
          item.popupList = popupList.value
          return item
        }
      }
    }
    const closePopup = () => {
      const newWgData = setWgPopupList(pageData.value.list)
      if (newWgData && wgId.value !== selectWg.value.key) {
        store.commit('setSelectWg', newWgData)
        store.commit('setConfigTab', "widget");
        if (showPopup.value === false) wgId.value = null
      }
    }
    const openPopup = () => {
      if (showPopup.value) return
      if (selectWg.value.popupList.length > 0) popupList.value = selectWg.value.popupList
      wgId.value = selectWg.value.key
      showPopup.value = true;
    }
    const handleWidgetAdd = (evt: any) => {
      const newIndex = evt.newIndex;
      store.commit('setSelectWg', popupList.value[newIndex])
      store.commit('setConfigTab', "widget");
    }

    return {
      popupList, dragWg, showPopup,
      hasKey, showConfigBtn, openPopup, closePopup, handleWidgetAdd
    }
  }
})
</script>