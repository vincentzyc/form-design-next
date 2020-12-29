<template>
  <el-form-item label="宽度(%)" v-if="nStyle.hasOwnProperty('percentWidth')">
    <el-slider
      :format-tooltip="formatTooltip"
      @input="val=>updateStyle('width', `${val}%`)"
      class="pd-l10 pd-r10"
      v-model="nStyle.percentWidth"
    ></el-slider>
  </el-form-item>
  <el-form-item label="宽度(px)" v-if="nStyle.hasOwnProperty('pxWidth')">
    <el-input-number
      :max="375"
      :min="0"
      :precision="0"
      :step="5"
      @change="val=>updateStyle('width', `${val}px`)"
      size="small"
      step-strictly
      v-model="nStyle.pxWidth"
    />
  </el-form-item>
  <el-form-item label="高度(px)" v-if="nStyle.hasOwnProperty('pxHeight')">
    <el-input-number
      :min="0"
      :precision="0"
      :step="5"
      @change="v=>updateStyle('height',v+'px')"
      size="small"
      v-model="nStyle.pxHeight"
    />
  </el-form-item>
  <el-form-item label="左边距(px)" v-if="nStyle.hasOwnProperty('marginleft')">
    <el-input-number
      :min="0"
      :step="1"
      @change="val=>updateStyle('marginLeft',`${val}px`)"
      size="small"
      step-strictly
      v-model="nStyle.marginleft"
    />
  </el-form-item>
  <el-form-item label="上边距(px)" v-if="nStyle.hasOwnProperty('margintop')">
    <el-input-number
      :min="0"
      :step="1"
      @change="val=>updateStyle('marginTop', `${val}px`)"
      size="small"
      step-strictly
      v-model="nStyle.margintop"
    />
  </el-form-item>
  <el-form-item label="外边距（上 右 下 左 、空格隔开）">
    <el-input @input="v=>updateStyle('margin',v)" v-model="nStyle.margin"></el-input>
  </el-form-item>
  <el-form-item label="内边距（上 右 下 左 、空格隔开）" v-if="nStyle.hasOwnProperty('padding')">
    <el-input @input="v=>updateStyle('padding',v)" v-model="nStyle.padding"></el-input>
  </el-form-item>
</template>

<script>
// import { defineComponent } from "vue";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  props: {
    style: {
      required: true,
      type: Object,
    }
  },
  emits: ['update:style'],
  // data() {
  //   return {
  //     nStyle: {}
  //   }
  // },
  // watch: {
  //   style: {
  //     handler(newVal) {
  //       this.nStyle = newVal
  //     },
  //     immediate: true
  //   }
  // },
  // methods: {
  //   updateStyle(key, v) {
  //     this.nStyle[key] = v
  //     this.$emit("update:style", this.nStyle)
  //   }
  // }
  setup(props, { emit }) {
    const nStyle = ref({})
    watch(() => props.style, newVal => nStyle.value = newVal, { immediate: true })

    function updateStyle(key, v) {
      nStyle.value[key] = v
      emit("update:style", nStyle.value)
    }

    return {
      nStyle,
      updateStyle
    }
  }
})
</script>