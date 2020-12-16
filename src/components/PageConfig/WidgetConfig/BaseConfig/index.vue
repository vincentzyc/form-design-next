<template>
  <section>
    <!-- <PopupConfig :selectWg="selectWg" /> -->
    <!-- <FixedConfig :selectWg="selectWg" /> -->
    <Common />
    <component :is="'Wg'+selectWg.type" :selectWg="selectWg" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Common from "./Common.vue"
// import FixedConfig from "./fixed-config"
// import PopupConfig from "./popup-config"

export default defineComponent({
  components: {
    Common

    //按需加载
    // Common: () => import('./Common.vue'),
  },
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)

    return {
      selectWg
    }
  }
})
</script>

