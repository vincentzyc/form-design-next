<template>
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

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    return {
      selectWg
    }
  }
})
</script>