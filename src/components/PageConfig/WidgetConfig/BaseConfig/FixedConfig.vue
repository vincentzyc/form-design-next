<template>
  <div>
    <el-form-item label="显示位置" v-if="hasKey(selectWg,'positionFixed')">
      <el-radio-group size="mini" v-model="selectWg.positionFixed">
        <el-radio-button :key="type" :label="type" v-for="type in fixedTypeList">{{fixedName[type]}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <div v-if="hasKey(selectWg,'position')">
      <el-form-item label="悬浮位置">
        <el-radio-group size="small" v-model="selectWg.position.side">
          <el-radio-button label="left">左悬浮</el-radio-button>
          <el-radio-button label="right">右悬浮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="左边距(%)" v-show="selectWg.position.side==='left'">
        <el-slider class="pd-l10 pd-r10" v-model="selectWg.position.left"></el-slider>
      </el-form-item>
      <el-form-item label="右边距(%)" v-show="selectWg.position.side==='right'">
        <el-slider class="pd-l10 pd-r10" v-model="selectWg.position.right"></el-slider>
      </el-form-item>
      <el-form-item label="上边距(px)">
        <el-input-number :min="0" :precision="0" :step="5" size="small" v-model="selectWg.position.top" />
      </el-form-item>
    </div>
    <el-form-item label="设置页面滑动距离显示悬浮内容" v-if="setScrollHeight">
      <p class="lh24 c999 fs12">请预览查看具体效果（0则一直显示）</p>
      <el-input-number
        :max="1000"
        :min="0"
        :step="1"
        size="small"
        step-strictly
        v-model="selectWg.scrollHeight"
      />
      <span class="mg-l10">px</span>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import { hasKey } from "@/utils"

const TOP_NAME = 'top',
  BOTTOM_NAME = 'bottom',
  CUSTOM_NAME = 'custom',
  AUTO_NAME = 'auto';

export default defineComponent({
  name: "FixedConfig",
  setup() {
    const vm = getCurrentInstance()
    const fixedTypes = ref([AUTO_NAME, TOP_NAME, BOTTOM_NAME, CUSTOM_NAME])
    const listKey = reactive({
      [TOP_NAME]: 'fixedTop',
      [BOTTOM_NAME]: 'fixedBottom',
      [CUSTOM_NAME]: 'fixedCustom',
      [AUTO_NAME]: 'list',
    })
    const fixedName = reactive({
      [TOP_NAME]: '顶部悬浮',
      [BOTTOM_NAME]: '底部悬浮',
      [CUSTOM_NAME]: '自定义悬浮',
      [AUTO_NAME]: '正常'
    })

    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const pageData = computed(() => store.state.pageData)

    const fixedTypeList = computed(() => {
      if (!Array.isArray(selectWg.value.fixedTypes)) return fixedTypes.value;
      return selectWg.value.fixedTypes.filter(v => fixedTypes.value.includes(v))
    })
    const setScrollHeight = computed(() => {
      return [TOP_NAME, BOTTOM_NAME].includes(selectWg.value.positionFixed) && Object.prototype.hasOwnProperty.call(selectWg.value, 'scrollHeight')
    })


    watch(() => selectWg.value.positionFixed, (newValue, oldValue) => {
      if (newValue && oldValue) {
        if (newValue === AUTO_NAME) return setPositionAuto(oldValue)
        setFixedPosition(newValue, oldValue)
      }
    }, { immediate: true })

    function positionConfig(p: string) {
      if (!vm) return
      if (p === CUSTOM_NAME) {
        if (selectWg.value.style?.margin) delete selectWg.value.style.margin;
        selectWg.value.position = { side: 'left', top: 100, left: 0 }
        return
      }
      if (p === TOP_NAME || p === BOTTOM_NAME) {
        selectWg.value.scrollHeight = 0
      }
      if (selectWg.value.style) selectWg.value.style.margin = '0px 0px 0px 0px';
      if (selectWg.value.position) delete selectWg.value.position;
    }
    function deleteArrayEle(array: Record<string, any>, key: string) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.key === key) return array.splice(index, 1);
        if (Array.isArray(element.list) && element.list.length > 0) deleteArrayEle(element.list, key)
      }
    }
    function setPageFixed(key: string, oldPosition: string) {
      let oldListKey = listKey[oldPosition];
      if (!oldListKey) return
      deleteArrayEle(pageData.value[oldListKey], selectWg.value.key);
      pageData.value[key] = [];
      pageData.value[key].push(selectWg.value)
    }
    function setFixedPosition(newPosition: string, oldPosition: string) {
      if (pageData.value[listKey[newPosition]]?.length > 0) {
        if (pageData.value[listKey[newPosition]].some(v => v.key === selectWg.value.key)) return
        // 可支持多个组件悬浮，目前未开放，限制一个 
        ElMessageBox.confirm(`当前页面已有${fixedName[newPosition]}组件，为保证视觉效果，是否替换当前组件？`, fixedName[newPosition]).then(() => {
          positionConfig(newPosition);
          setPageFixed(listKey[newPosition], oldPosition)
        }).catch(() => {
          selectWg.value.positionFixed = oldPosition
        });
        return
      }
      positionConfig(newPosition);
      setPageFixed(listKey[newPosition], oldPosition)
    }
    function setPositionAuto(oldPosition) {
      let oldListKey = listKey[oldPosition];
      if (!oldListKey) return
      if (pageData.value[oldListKey].some(v => v.key === selectWg.value.key)) {
        positionConfig(AUTO_NAME);
        pageData.value.list.push(selectWg.value)
        pageData.value[oldListKey] = []
        return;
      }
    }
    return {
      selectWg,
      fixedTypeList, fixedName,
      setScrollHeight,
      hasKey
    }
  }
})
</script>