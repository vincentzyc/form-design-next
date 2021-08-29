<template>
  <section>
    <PopupConfig />
    <FixedConfig />
    <Common />
    <component :is="selectWg.type" v-if="hadComponent" />
  </section>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { hasKey } from "@/utils/index";
import Common from "./Common.vue";
import FixedConfig from "./FixedConfig.vue"
import PopupConfig from "./PopupConfig.vue"
import MarqueeSingle from "./MarqueeSingle.vue"
import Marquee from "./Marquee.vue"
import Wechat from "./Wechat.vue"
import Agreement from "./Agreement.vue"
import ImgShow from "./ImgShow.vue"
import ImgSlide from "./ImgSlide.vue"
import Sms from "./Sms.vue"
import VideoPlay from "./VideoPlay.vue"



    //按需加载
    // Common: () => import('./Common.vue'),
  
    const vm: any = getCurrentInstance()?.proxy

    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)

    const hadComponent = computed(() => hasKey(vm.$options.components, selectWg.value.type))
</script>