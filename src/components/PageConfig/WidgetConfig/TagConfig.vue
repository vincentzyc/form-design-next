<template>
  <section>
    <el-form-item label="标签名称" v-if="selectWg.label.hasOwnProperty('labelTitle')">
      <el-input v-model="selectWg.label.labelTitle"></el-input>
    </el-form-item>
    <el-form-item label="标签宽度(px)" v-if="selectWg.label.hasOwnProperty('labelwidth')">
      <el-input-number
        :max="300"
        :min="30"
        @change="val=>selectWg.label.labelWidth = `${val}px`"
        size="small"
        v-model="selectWg.label.labelwidth"
      />
    </el-form-item>
    <el-form-item label="标签对齐方式" v-if="selectWg.label.hasOwnProperty('labelPosition')">
      <el-radio-group size="mini" v-model="selectWg.label.labelPosition">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent(() => {
  const store = useStore()
  const selectWg = computed(() => store.state.selectWg)
  return {
    selectWg
  }
})
</script>