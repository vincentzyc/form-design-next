<template>
  <template v-if="selectWg">
    <el-form-item label="微信名称">
      <el-input placeholder="请输入您的微信名称" v-model="selectWg.value"></el-input>
    </el-form-item>
    <el-form-item label="微信账号">
      <el-input placeholder="请输入您的微信账号" v-model="selectWg.wechatName"></el-input>
    </el-form-item>
    <el-form-item label="微信头像">
      <FileUpload v-model:modelValue="selectWg.logo" />
    </el-form-item>
    <el-form-item label="显示微信头像">
      <el-switch v-model="selectWg.showLogo"></el-switch>
    </el-form-item>
    <el-form-item label="显示微信名称">
      <el-switch v-model="selectWg.showName"></el-switch>
    </el-form-item>
  </template>
</template>

<script lang="ts" setup>
import FileUpload from '@/components/base/FileUpload.vue'
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

const mainStore = useMainStore()
const { selectWg } = storeToRefs(mainStore)
</script>