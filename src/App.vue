<template>
  <el-config-provider :locale="zhCn">
    <Home />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "app"
})
</script>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Home from "@/components/Home.vue"
</script>