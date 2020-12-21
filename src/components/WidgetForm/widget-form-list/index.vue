<template>
  <div
    :class="[item.wgClassName?item.wgClassName:'widget-view',{active: selectWg.key === item.key}]"
    :style="wgViewStyle"
    @click.stop="handleSelectWidget()"
  >
    <i class="el-icon-rank" v-if="Array.isArray(item.list)"></i>
    <component :is="'Wg'+item.type" :item="item" />
    <span
      @click.stop="handleWidgetDelete()"
      class="widget-action-btn widget-action-delete el-icon-delete"
      title="删除"
      v-if="selectWg.key === item.key"
    ></span>
    <span
      @click.stop="handleWidgetClone()"
      class="widget-action-btn widget-action-clone el-icon-document-copy"
      title="复制"
      v-if="clonebtn"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick } from "vue";
import { useStore } from 'vuex';
import { deepClone } from '@/utils/deep-clone';

import WgStaticText from './WgStaticText'
import WgButton from './WgButton'

export default defineComponent({
  name: "WidgetFormList",
  components: {
    WgStaticText,
    WgButton

    //下面是按需加载，组件多的话可选择此方式
    // WgStaticText: () => import('./WgStaticText'),
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isPopup: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:data', 'emptied'],
  setup(props, { emit }) {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const clonebtn = computed(() => {
      if (selectWg.value.positionFixed && selectWg.value.positionFixed !== 'auto') return false;
      if (selectWg.value.fixedBottom) return false;
      if (Array.isArray(selectWg.value.list)) return false;
      if (selectWg.value.key === props.item.key) return true;
      return false;
    })
    const wgViewStyle = computed(() => {
      if (Array.isArray(props.item.list)) return { ...props.item.style, backgroundImage: `url(${props.item.backgroundImage})` };
      return {}
    })
    function handleSelectWidget() {
      store.commit('setSelectWg', props.data[props.index]);
      store.commit('setConfigTab', "widget");
    }
    async function handleWidgetDelete() {
      if (props.data.length - 1 === props.index) {
        if (props.index === 0) {
          props.isPopup ? emit('emptied') : store.commit('setSelectWg', {})
        } else {
          store.commit('setSelectWg', props.data[props.index - 1])
        }
      } else {
        store.commit('setSelectWg', props.data[props.index + 1])
      }
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 1)
      emit('update:data', newData)
    }
    async function handleWidgetClone() {
      const cloneData = deepClone(props.data[props.index] as Record<string, any>[])
      cloneData.key = cloneData.type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 0, cloneData)
      emit('update:data', newData)
      store.commit('setSelectWg', props.data[props.index + 1])
    }
    return {
      selectWg,
      clonebtn, wgViewStyle,
      handleSelectWidget, handleWidgetDelete, handleWidgetClone
    }
  }
})
</script>
