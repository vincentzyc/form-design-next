<template>
  <section>
    <Style v-model:style="selectWg.style" />

    <el-form-item label="文字颜色" v-if="selectWg.style.hasOwnProperty('color')">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.style.color" />
    </el-form-item>

    <el-form-item label="对齐方式" v-if="selectWg.style.hasOwnProperty('textAlign')">
      <el-radio-group size="mini" v-model="selectWg.style.textAlign">
        <el-radio-button label="left">左</el-radio-button>
        <el-radio-button label="center">居中</el-radio-button>
        <el-radio-button label="right">右</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文本行高(px)" v-if="selectWg.style.hasOwnProperty('lineheight')">
      <el-input-number
        :max="200"
        :min="10"
        @change="v=>selectWg.style.lineHeight=v+'px'"
        size="small"
        v-model="selectWg.style.lineheight"
      />
    </el-form-item>
    <el-form-item label="文字大小(px)" v-if="selectWg.style.hasOwnProperty('fontSize')">
      <el-input-number
        :max="50"
        :min="10"
        :step="1"
        @change="val=>selectWg.style.fontSize = `${val}px`"
        size="small"
        step-strictly
        v-model="selectWg.style.fontsize"
      />
    </el-form-item>
    <el-form-item label="线条颜色" v-if="selectWg.style.hasOwnProperty('borderColor')">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.style.borderColor" />
    </el-form-item>
    <el-form-item label="线条类型" v-if="selectWg.style.hasOwnProperty('borderStyle')">
      <el-radio-group
        @change="val=>selectWg.style.borderTopWidth=val==='double'?'3px':'1px'"
        size="mini"
        v-model="selectWg.style.borderStyle"
      >
        <el-radio-button label="dotted">点线</el-radio-button>
        <el-radio-button label="dashed">虚线</el-radio-button>
        <el-radio-button label="solid">实线</el-radio-button>
        <el-radio-button label="double">双实线</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="背景颜色" v-if="selectWg.style.hasOwnProperty('backgroundColor')">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.style.backgroundColor" />
    </el-form-item>
    <el-form-item label="背景颜色" v-if="selectWg.hasOwnProperty('backgroundColor')">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.backgroundColor" />
    </el-form-item>
    <el-form-item label="背景图片" v-if="selectWg.hasOwnProperty('backgroundImage')">
      <!-- <FileUpload :value.sync="selectWg.backgroundImage" /> -->
    </el-form-item>

    <el-form-item label="使用图片按钮" v-if="selectWg.style.hasOwnProperty('isImgBtn')">
      <el-switch v-model="selectWg.style.isImgBtn"></el-switch>
    </el-form-item>
    <el-form-item label="按钮样式：" v-if="selectWg.style.hasOwnProperty('btnStyle')">
      <el-form-item label="上传按钮图片" v-if="selectWg.style.isImgBtn">
        <!-- <FileUpload :value.sync="selectWg.style.value" /> -->
        <p>上传按钮图片</p>
      </el-form-item>
      <div v-else>
        <el-form-item label="按钮背景色" v-if="selectWg.style.btnStyle.hasOwnProperty('backgroundColor')">
          <el-color-picker
            :predefine="predefineColors"
            show-alpha
            v-model="selectWg.style.btnStyle.backgroundColor"
          />
        </el-form-item>
        <el-form-item label="按钮文字色" v-if="selectWg.style.btnStyle.hasOwnProperty('color')">
          <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.style.btnStyle.color" />
        </el-form-item>
        <el-form-item label="按钮边框色" v-if="selectWg.style.btnStyle.hasOwnProperty('borderColor')">
          <el-color-picker
            :predefine="predefineColors"
            show-alpha
            v-model="selectWg.style.btnStyle.borderColor"
          />
        </el-form-item>
        <el-form-item label="按钮文字大小(px)" v-if="selectWg.style.btnStyle.hasOwnProperty('fontSize')">
          <el-input-number
            :max="30"
            :min="10"
            :step="1"
            @change="val=>selectWg.style.btnStyle.fontSize = `${val}px`"
            size="small"
            step-strictly
            v-model="selectWg.style.btnStyle.fontsize"
          />
        </el-form-item>
        <el-form-item label="按钮圆角" v-if="selectWg.style.btnStyle.hasOwnProperty('borderradius')">
          <el-input-number
            :max="30"
            :min="0"
            :step="1"
            @change="val=>selectWg.style.btnStyle.borderRadius = `${val}px`"
            size="small"
            step-strictly
            v-model="selectWg.style.btnStyle.borderradius"
          />
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="表单边框大小" v-if="selectWg.style.hasOwnProperty('borderwidth')">
      <el-input-number
        :max="15"
        :min="0"
        :step="1"
        @change="val=>selectWg.style.borderWidth = `${val}px`"
        size="small"
        step-strictly
        v-model="selectWg.style.borderwidth"
      />
    </el-form-item>
    <el-form-item
      label="表单边框颜色"
      v-if="selectWg.style.hasOwnProperty('borderColor')&&selectWg.style.borderwidth>0"
    >
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.style.borderColor" />
    </el-form-item>
    <el-form-item label="表单区域圆角" v-if="selectWg.style.hasOwnProperty('borderradius')">
      <el-input-number
        :max="30"
        :min="0"
        :step="1"
        @change="val=>selectWg.style.borderRadius = `${val}px`"
        size="small"
        step-strictly
        v-model="selectWg.style.borderradius"
      />
    </el-form-item>

    <el-form-item label="每项宽度" v-if="selectWg.hasOwnProperty('itemWidth')">
      <el-input-number :min="10" size="small" v-model="selectWg.itemWidth" />
    </el-form-item>
    <el-form-item label="显示个数" v-if="selectWg.hasOwnProperty('showNumber')">
      <el-input-number :min="1" size="small" v-model="selectWg.showNumber" />
    </el-form-item>
    <template v-if="selectWg.hasOwnProperty('pickerStyle')">
      <el-form-item label="选中后文字颜色">
        <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.pickerStyle.color" />
      </el-form-item>
      <el-form-item label="选中后文字大小(px)">
        <el-input-number
          :max="30"
          :min="10"
          @change="val=>selectWg.pickerStyle.fontSize = `${val}px`"
          size="small"
          v-model="selectWg.pickerStyle.fontsize"
        />
      </el-form-item>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Style from "./style.vue"

export default defineComponent({
  name: "StyleConfig",
  components: {
    Style
  },
  setup() {
    const store = useStore()

    const selectWg = computed(() => store.state.selectWg)
    const predefineColors = computed(() => store.state.predefineColors)
    return {
      selectWg, predefineColors
    }
  }
})
</script>