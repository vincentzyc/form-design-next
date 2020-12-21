<template>
  <section class="animation-config">
    <el-form-item>
      <template #label>
        <span class="el-form-item__label mg-r10">开启动画：</span>
        <el-switch @change="handleChange" class="mg-r20" v-model="openAnimation"></el-switch>
      </template>
    </el-form-item>
    <el-form-item label="动画选择">
      <ul>
        <li :key="item.value" @click="selectAnimation(item)" class="pd10" v-for="item in animationList">
          <div :class="item.value" :style="getBtnStyle(item)" class="animation-demo">
            <span :style="getAnimteStyle(item)" class="animte-el"></span>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </el-form-item>
    <el-form-item label="动画速度">
      <div class="pd-l10 pd-r10 pd-b20">
        <el-slider
          :format-tooltip="val=> val+'秒'"
          :marks="{1:'快',2:'中等',3:'慢'}"
          :max="3"
          :min="1"
          :show-tooltip="false"
          :step="0.1"
          @change="v=>selectWg.animation.animationDuration=v+'s'"
          v-model="selectWg.animation.animationduration"
        ></el-slider>
      </div>
    </el-form-item>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "StyleConfig",
  setup() {
    const store = useStore()
    const openAnimation = ref(true)
    const animationList = reactive([{
      name: "呼吸灯",
      value: "animte-breathlamp",
      animationName: true,
      className: false
    }, {
      name: "渐变",
      value: "animte-fade",
      animationName: true,
      className: false
    }, {
      name: "闪现",
      value: "animte-flash",
      animationName: true,
      className: false
    }, {
      name: "闪亮",
      value: "animte-streak",
      animationName: false,
      className: true
    }])

    const selectWg = computed(() => store.state.selectWg)

    function handleChange(bool) {
      if (bool) return
      selectWg.value.animation.animationName = ''
      selectWg.value.animation.className = ''
    }
    function getBtnStyle(item) {
      if (!item.animationName) return {}
      return {
        animation: `${item.value} 2s linear infinite`
      }
    }
    function getAnimteStyle(item) {
      if (!item.className) return {}
      return {
        animation: `${item.value} 2s linear infinite`
      }
    }
    function selectAnimation(item) {
      openAnimation.value = true
      selectWg.value.animation.animationName = item.animationName ? item.value : ''
      selectWg.value.animation.className = item.className ? item.value : ''
    }

    return {
      openAnimation, animationList,
      selectWg,
      handleChange, getBtnStyle, getAnimteStyle, selectAnimation
    }
  }
})
</script>