<template>
  <section v-if="selectWg">
    <el-form-item label="标签名称" v-if="selectWg.label.hasOwnProperty('labelTitle')">
      <el-input v-model="selectWg.label.labelTitle"></el-input>
    </el-form-item>
    <el-form-item label="标签宽度(px)" v-if="selectWg.label.hasOwnProperty('labelwidth')">
      <el-input-number
        :max="300"
        :min="30"
        @change="(val: number) => selectWg ? selectWg.label.labelWidth = `${val}px` : null"
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

<script lang="ts" setup>
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

const mainStore = useMainStore()
const { selectWg } = storeToRefs(mainStore)

</script>