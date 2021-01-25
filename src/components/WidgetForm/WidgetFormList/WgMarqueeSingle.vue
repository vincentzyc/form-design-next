<template>
  <div class="wg-marquee-single flex flex-center">
    <ul :style="{ ...item.style, borderRadius: item.style.height }" class="scroll-wrapper">
      <li
        :class="{'anim' : animate&&i===0 }"
        :key="i"
        :style="{marginTop:animate&&i===0?`-${item.style.height}`:''}"
        class="flex align-middle scroll-item"
        v-for="(text, i) in scrollList"
      >
        <!-- 如需要支持自定义头像，使用 img 标签方式 -->
        <!-- <img
          :src="require(`@/assets/img/${text.sex==='man'?'manhead.png':'womanhead.png'}`)"
          alt="头像"
          class="userimg flex-none"
        />-->
        <span
          :class="text.sex==='man'?'man':'woman'"
          :style="{width:item.style.height}"
          class="userimg flex-none"
        ></span>
        <span class="scroll-text txtover white-space-pre">{{ text.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { deepClone } from '@/utils/deep-clone';
export default defineComponent({
  name: "WgMarqueeSingle",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const scrollList = ref([])
    const scrollTimeId = ref(0)
    const animateTimeId = ref(0)
    const animate = ref(false)

    const scroll = () => {
      if (animate.value) return;
      clearTimeout(animateTimeId.value);
      animate.value = true;
      animateTimeId.value = window.setTimeout(() => {
        scrollList.value.push(scrollList.value[0]);
        scrollList.value.shift();
        animate.value = false;
      }, 500);
    }

    watch(() => props.item.textList, (newValue) => {
      scrollList.value = deepClone(newValue) as []
    }, { immediate: true, deep: true })

    watch(() => props.item.durationTime, (newValue) => {
      clearInterval(scrollTimeId.value);
      scrollTimeId.value = window.setInterval(scroll, newValue * 1000);
    }, { immediate: true, deep: true })
    onMounted(async () => {
      await nextTick(() => {
        scrollTimeId.value = window.setInterval(scroll, props.item.durationTime * 1000);
      })
    })
    onBeforeUnmount(() => {
      window.clearInterval(scrollTimeId.value);
      window.clearTimeout(animateTimeId.value);
    })
    return {
      animate, scrollList
    }
  }
})
</script>