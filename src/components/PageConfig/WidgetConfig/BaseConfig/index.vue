<template>
  <section>
    <PopupConfig />
    <FixedConfig />
    <Common />
    <component :is="selectWg.type" v-if="selectWg && hadComponent" />
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, getCurrentInstance } from "vue";
import { hasKey } from "@/utils/index";
import Common from "./Common.vue";
import FixedConfig from "./FixedConfig.vue"
import PopupConfig from "./PopupConfig.vue"
import MarqueeSingle from "./MarqueeSingle.vue"
import Marquee from "./Marquee.vue"
// import Wechat from "./Wechat.vue"
import Agreement from "./Agreement.vue"
import ImgShow from "./ImgShow.vue"
import ImgSlide from "./ImgSlide.vue"
import Sms from "./Sms.vue"
import VideoPlay from "./VideoPlay.vue"

import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

export default defineComponent({
  name: 'BaseConfig',
  components: {
    Common,
    MarqueeSingle,
    Marquee,
    FixedConfig,
    PopupConfig,
    // Wechat,
    Agreement,
    ImgShow,
    ImgSlide,
    Sms,
    VideoPlay,
    //按需加载
    Wechat: defineAsyncComponent(() => import('./Wechat.vue'))
  },
  setup() {
    const vm: any = getCurrentInstance()?.proxy
    const mainStore = useMainStore()
    const { selectWg } = storeToRefs(mainStore)
    const hadComponent = computed(() => selectWg.value ? hasKey(vm.$options.components, selectWg.value.type) : false)
    return {
      selectWg, hadComponent
    }
  }
})
</script>