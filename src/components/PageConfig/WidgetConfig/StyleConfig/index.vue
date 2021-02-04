<template>
  <section>
    <Style v-model:style="selectWg.style" />

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
      <Style labelPrefix="选中后" v-model:style="selectWg.pickerStyle" />
    </template>

    <el-form-item label="使用图片按钮" v-if="selectWg.style.hasOwnProperty('isImgBtn')">
      <el-switch v-model="selectWg.style.isImgBtn"></el-switch>
    </el-form-item>
    <el-form-item label="按钮样式：" v-if="selectWg.style.hasOwnProperty('btnStyle')">
      <el-form-item label="上传按钮图片" v-if="selectWg.style.isImgBtn">
        <FileUpload v-model:modelValue="selectWg.style.value" />
      </el-form-item>
      <div v-else>
        <Style labelPrefix="按钮" v-model:style="selectWg.style.btnStyle" />
      </div>
    </el-form-item>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import FileUpload from '@/components/base/FileUpload.vue'

import Style from "./Style.vue"

export default defineComponent({
  name: "StyleConfig",
  components: {
    Style,
    FileUpload
  },
  setup() {
    const store = useStore()

    const selectWg = computed(() => store.state.selectWg)
    const predefineColors = computed(() => store.state.predefineColors)
    return {
      selectWg, predefineColors
    }
  }
})
</script>