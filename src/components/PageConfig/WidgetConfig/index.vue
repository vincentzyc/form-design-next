<template>
  <div v-if="selectWg && Object.keys(selectWg).length > 0">
    <el-form label-position="top">
      <el-collapse accordion v-model="wgCollapse">
        <el-collapse-item name="base" title="基础设置">
          111
          <!-- <BaseConfig :selectWg="selectWg" /> -->
        </el-collapse-item>

        <el-collapse-item name="tag" title="标签设置" v-if="selectWg.label&&selectWg.showLabel!==false">
          <TagConfig />
        </el-collapse-item>

        <el-collapse-item name="style" title="外观样式" v-if="selectWg.hasOwnProperty('style')">
          333
          <!-- <StyleConfig :selectWg="selectWg" /> -->
        </el-collapse-item>

        <el-collapse-item name="animation" title="动画设置" v-if="selectWg.hasOwnProperty('animation')">
          444
          <!-- <AnimationConfig :selectWg="selectWg" /> -->
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

// import BaseConfig from "./base-config"
import TagConfig from "./TagConfig.vue"
// import StyleConfig from "./style-config"
// import AnimationConfig from "./animation-config"
export default defineComponent({
  components: {
    // BaseConfig,
    TagConfig,
    // StyleConfig,
    // AnimationConfig
  },
  setup() {
    const store = useStore()
    const wgCollapse = computed({
      get: () => store.state.wgCollapse,
      set: val => store.commit('setWgCollapse', val)
    })
    const selectWg = computed(() => store.state.selectWg)

    return {
      wgCollapse,
      selectWg
    }
  }
})
</script>
