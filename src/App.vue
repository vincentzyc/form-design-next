<template>
  <el-config-provider :locale="locale">
    <Home />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Home from "@/components/Home.vue"

export default defineComponent({
  name: "app",
  components: {
    ElConfigProvider, Home
  },
  setup() {
    return {
      locale: zhCn,
    }
  }
})
</script>