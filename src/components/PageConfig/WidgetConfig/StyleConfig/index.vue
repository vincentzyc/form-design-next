<template>
  <section v-if="selectWg">
    <Styles v-model:styles="selectWg.style" />

    <el-form-item label="背景颜色" v-if="selectWg.hasOwnProperty('backgroundColor')">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.backgroundColor" />
    </el-form-item>
    <el-form-item label="背景图片" v-if="selectWg.hasOwnProperty('backgroundImage')">
      <FileUpload v-model:modelValue="selectWg.backgroundImage" />
    </el-form-item>

    <el-form-item label="每项宽度" v-if="selectWg.hasOwnProperty('itemWidth')">
      <el-input-number :min="10" size="small" v-model="selectWg.itemWidth" />
    </el-form-item>
    <el-form-item label="显示个数" v-if="selectWg.hasOwnProperty('showNumber')">
      <el-input-number :min="1" size="small" v-model="selectWg.showNumber" />
    </el-form-item>
    <template v-if="selectWg.hasOwnProperty('pickerStyle')">
      <Styles labelPrefix="选中后" v-model:styles="selectWg.pickerStyle" />
    </template>

    <el-form-item label="使用图片按钮" v-if="selectWg.style.hasOwnProperty('isImgBtn')">
      <el-switch v-model="selectWg.style.isImgBtn"></el-switch>
    </el-form-item>
    <el-form-item label="按钮样式：" v-if="selectWg.style.hasOwnProperty('btnStyle')">
      <el-form-item label="上传按钮图片" v-if="selectWg.style.isImgBtn">
        <FileUpload v-model:modelValue="selectWg.style.value" />
      </el-form-item>
      <div v-else>
        <Styles labelPrefix="按钮" v-model:styles="selectWg.style.btnStyle" />
      </div>
    </el-form-item>
  </section>
</template>

<script lang="ts" setup>
import FileUpload from '@/components/base/FileUpload.vue'
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

import Styles from "./Styles.vue"
const mainStore = useMainStore()

const { predefineColors, selectWg } = storeToRefs(mainStore)

</script>