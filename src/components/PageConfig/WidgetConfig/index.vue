<template>
  <div v-if="selectWg && Object.keys(selectWg).length > 0">
    <el-form label-position="top">
      <el-collapse accordion v-model="wgCollapse">
        <el-collapse-item name="base" title="基础设置">
          <BaseConfig />
        </el-collapse-item>

        <el-collapse-item name="tag" title="标签设置" v-if="selectWg.label && selectWg.showLabel !== false">
          <TagConfig />
        </el-collapse-item>

        <el-collapse-item name="style" title="外观样式" v-if="selectWg.hasOwnProperty('style')">
          <StyleConfig />
        </el-collapse-item>

        <el-collapse-item name="animation" title="动画设置" v-if="selectWg.hasOwnProperty('animation')">
          <AnimationConfig />
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseConfig from "./BaseConfig/index.vue"
import TagConfig from "./TagConfig.vue"
import StyleConfig from "./StyleConfig/index.vue"
import AnimationConfig from "./AnimationConfig.vue"
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

const mainStore = useMainStore()
const { selectWg } = storeToRefs(mainStore)

const wgCollapse = ref('base')
</script>
