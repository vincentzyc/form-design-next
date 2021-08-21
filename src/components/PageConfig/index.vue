<template>
  <el-container>
    <el-header class="flex" height="45px">
      <div
        :class="{ active: configTab === 'widget' }"
        @click="handleConfigSelect('widget')"
        class="config-tab flex-auto"
      >组件配置</div>
      <div :class="{ active: configTab === 'page' }" @click="handleConfigSelect('page')" class="config-tab flex-auto">页面配置</div>
    </el-header>
    <el-main class="config-content">
      <WidgetConfig v-show="configTab == 'widget'" />
      <CommonConfig v-show="configTab == 'page'" />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import WidgetConfig from "./WidgetConfig/index.vue";
import CommonConfig from "./CommonConfig/index.vue";

const store = useStore()
const configTab = computed(() => store.state.configTab)
function handleConfigSelect(value: string) {
  store.commit('setConfigTab', value)
}

</script>