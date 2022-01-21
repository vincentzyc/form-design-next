<template>
  <template v-if="selectWg">
    <el-form-item label="视频地址">
      <el-input size="small" v-model="selectWg.videoAttr.src" />
    </el-form-item>
    <el-form-item label="封面图片地址">
      <el-input size="small" v-model="selectWg.videoAttr.poster" />
    </el-form-item>
    <el-form-item label="是否自动播放">
      <el-switch v-model="selectWg.videoAttr.autoplay"></el-switch>
    </el-form-item>
    <el-form-item label="是否循环播放">
      <el-switch v-model="selectWg.videoAttr.loop"></el-switch>
    </el-form-item>
  </template>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

const mainStore = useMainStore()
const { selectWg } = storeToRefs(mainStore)
</script>