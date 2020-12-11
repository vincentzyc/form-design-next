<template>
  <el-container>
    <el-header class="flex" height="45px">
      <div
        :class="{active: configTab==='widget'}"
        @click="handleConfigSelect('widget')"
        class="config-tab flex-auto"
      >组件配置</div>
      <div
        :class="{active: configTab==='page'}"
        @click="handleConfigSelect('page')"
        class="config-tab flex-auto"
      >页面配置</div>
    </el-header>
    <!-- <el-main class="config-content">
      <widget-config v-show="configTab=='widget'"></widget-config>
      <page-config v-show="configTab=='page'"></page-config>
    </el-main>-->
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: 'ConfigArea',
  setup() {
    const store = useStore()
    const configTab = computed(() => store.state.configTab)
    function handleConfigSelect(value) {
      store.commit('setConfigTab', value)
    }
    return {
      configTab,
      handleConfigSelect
    }
  }
});
</script>