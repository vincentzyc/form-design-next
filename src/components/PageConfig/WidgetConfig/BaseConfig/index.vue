<template>
  <section>
    <!-- <PopupConfig :selectWg="selectWg" /> -->
    <!-- <FixedConfig :selectWg="selectWg" /> -->
    <Common />
    <component :is="'Wg'+selectWg.type" v-if="hadComponent"/>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { hasKey } from "@/utils/index";
import Common from "./Common.vue";
// import FixedConfig from "./fixed-config"
// import PopupConfig from "./popup-config"

export default defineComponent({
  components: {
    Common

    //按需加载
    // Common: () => import('./Common.vue'),
  },
  setup() {
    const vm: any = getCurrentInstance()?.proxy

    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)

    const hadComponent = computed(() => hasKey(vm.$options.components, selectWg.value.type))

    return {
      selectWg, hadComponent
    }
  }
})
</script>

