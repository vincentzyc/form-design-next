<template>
  <el-form-item :label="getLabel('percentWidth')" v-if="nStyle.hasOwnProperty('percentWidth')">
    <el-slider
      :format-tooltip="formatTooltip"
      @input="val=>updateStyle('width', `${val}%`)"
      class="pd-l10 pd-r10"
      v-model="nStyle.percentWidth"
    ></el-slider>
  </el-form-item>
  <el-form-item :label="getLabel('pxWidth')" v-if="nStyle.hasOwnProperty('pxWidth')">
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
  <el-form-item :label="getLabel('pxHeight')" v-if="nStyle.hasOwnProperty('pxHeight')">
    <el-input-number
      :min="0"
      :precision="0"
      :step="5"
      @change="v=>updateStyle('height',v+'px')"
      size="small"
      v-model="nStyle.pxHeight"
    />
  </el-form-item>
  <el-form-item :label="getLabel('marginleft')" v-if="nStyle.hasOwnProperty('marginleft')">
    <el-input-number
      :min="0"
      :step="1"
      @change="val=>updateStyle('marginLeft',`${val}px`)"
      size="small"
      step-strictly
      v-model="nStyle.marginleft"
    />
  </el-form-item>
  <el-form-item :label="getLabel('margintop')" v-if="nStyle.hasOwnProperty('margintop')">
    <el-input-number
      :min="0"
      :step="1"
      @change="val=>updateStyle('marginTop', `${val}px`)"
      size="small"
      step-strictly
      v-model="nStyle.margintop"
    />
  </el-form-item>
  <el-form-item :label="getLabel('margin')" v-if="nStyle.hasOwnProperty('margin')">
    <el-input @input="v=>updateStyle('margin',v)" v-model="nStyle.margin"></el-input>
  </el-form-item>
  <el-form-item :label="getLabel('padding')" v-if="nStyle.hasOwnProperty('padding')">
    <el-input @input="v=>updateStyle('padding',v)" v-model="nStyle.padding"></el-input>
  </el-form-item>
  <el-form-item :label="getLabel('backgroundColor')" v-if="nStyle.hasOwnProperty('backgroundColor')">
    <el-color-picker
      :predefine="predefineColors"
      @change="v=>updateStyle('backgroundColor',v)"
      show-alpha
      v-model="nStyle.backgroundColor"
    />
  </el-form-item>
  <el-form-item :label="getLabel('color')" v-if="nStyle.hasOwnProperty('color')">
    <el-color-picker
      :predefine="predefineColors"
      @change="v=>updateStyle('color',v)"
      show-alpha
      v-model="nStyle.color"
    />
  </el-form-item>
  <el-form-item :label="getLabel('textAlign')" v-if="nStyle.hasOwnProperty('textAlign')">
    <el-radio-group @change="v=>updateStyle('textAlign',v)" size="mini" v-model="nStyle.textAlign">
      <el-radio-button label="left">左</el-radio-button>
      <el-radio-button label="center">居中</el-radio-button>
      <el-radio-button label="right">右</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item :label="getLabel('lineHeight')" v-if="nStyle.hasOwnProperty('lineHeight')">
    <el-input-number
      :max="200"
      :min="10"
      @change="v=>updateStyle('lineHeight',v+'px')"
      size="small"
      v-model="nStyle.lineheight"
    />
  </el-form-item>
  <el-form-item :label="getLabel('fontSize')" v-if="nStyle.hasOwnProperty('fontSize')">
    <el-input-number
      :max="50"
      :min="10"
      :step="1"
      @change="v=>updateStyle('fontSize',v+'px')"
      size="small"
      step-strictly
      v-model="nStyle.fontsize"
    />
  </el-form-item>
  <el-form-item :label="getLabel('borderColor')" v-if="nStyle.hasOwnProperty('borderColor')">
    <el-color-picker
      :predefine="predefineColors"
      @change="v=>updateStyle('borderColor',v)"
      show-alpha
      v-model="nStyle.borderColor"
    />
  </el-form-item>
  <el-form-item :label="getLabel('borderRadius')" v-if="nStyle.hasOwnProperty('borderRadius')">
    <el-input-number
      :max="30"
      :min="0"
      :step="1"
      @change="v=>updateStyle('borderRadius',v+'px')"
      size="small"
      step-strictly
      v-model="nStyle.borderradius"
    />
  </el-form-item>
  <el-form-item :label="getLabel('borderWidth')" v-if="nStyle.hasOwnProperty('borderWidth')">
    <el-input-number
      :max="15"
      :min="0"
      :step="1"
      @change="v=>updateStyle('borderWidth',v+'px')"
      size="small"
      step-strictly
      v-model="nStyle.borderwidth"
    />
  </el-form-item>
  <el-form-item :label="getLabel('borderStyle')" v-if="nStyle.hasOwnProperty('borderStyle')">
    <el-radio-group
      @change="v=>updateStyle('borderTopWidth',v==='double'?'3px':'1px')"
      size="mini"
      v-model="nStyle.borderStyle"
    >
      <el-radio-button label="dotted">点线</el-radio-button>
      <el-radio-button label="dashed">虚线</el-radio-button>
      <el-radio-button label="solid">实线</el-radio-button>
      <el-radio-button label="double">双实线</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import allLabelText from "./labelText"

export default defineComponent({
  name: "StyleItemConfig",
  props: {
    style: {
      required: true,
      type: Object,
    },
    labelPrefix: {
      type: String,
      default: ''
    },
    labels: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:style'],
  setup(props, { emit }) {
    const store = useStore()

    const nStyle = ref({})

    const labelText = {
      ...allLabelText,
      ...props.labels
    }

    watch(() => props.style, newVal => nStyle.value = newVal, { immediate: true })

    const predefineColors = computed(() => store.state.predefineColors)

    function getLabel(key) {
      return props.labels[key] || props.labelPrefix + labelText[key]
    }

    function updateStyle(key, v) {
      nStyle.value[key] = v
      emit("update:style", nStyle.value)
    }

    return {
      nStyle, labelText,
      predefineColors,
      getLabel, updateStyle
    }
  }
})
</script>