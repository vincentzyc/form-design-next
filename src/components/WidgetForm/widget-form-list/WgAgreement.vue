<template>
  <div class="wg-agreement clearfix wg-padding">
    <el-checkbox :style="item.style" :value="item.value">
      <p :style="{color:item.style.color}">
        <span>{{item.tipText}}</span>
        <span :key="key" v-for="(titleText,key) in item.titleTexts">
          <span v-if="key>0">和</span>
          <span :style="{color:item.agreementColor}" v-if="titleText.title">{{titleText.title}}</span>
        </span>
      </p>
    </el-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
</script>