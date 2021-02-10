<template>
  <el-form-item label="滚动方向" v-if="selectWg.hasOwnProperty('direction')">
    <el-radio-group size="mini" v-model="selectWg.direction">
      <el-radio-button label="up">向上</el-radio-button>
      <el-radio-button label="left">向左</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="滚动时间（s）" v-if="selectWg.hasOwnProperty('durationTime')">
    <el-input-number :max="60" :min="1" size="small" v-model="selectWg.durationTime" />
  </el-form-item>
  <el-form-item label="内容高度(px)">
    <el-input-number
      :max="200"
      :min="10"
      @change="v=>selectWg.style.height=v+'px'"
      size="small"
      v-model="selectWg.style.Height"
    />
  </el-form-item>
  <el-form-item label="使用图片内容" v-if="selectWg.hasOwnProperty('isImgBtn')">
    <el-switch v-model="selectWg.isImgBtn"></el-switch>
  </el-form-item>
  <el-form-item label="上传图片" v-if="selectWg.isImgBtn&&selectWg.hasOwnProperty('imgUrl')">
    <FileUpload v-model:modelValue="selectWg.imgUrl" />
  </el-form-item>
  <el-form-item label="选项（可使用空格分列）" v-if="!selectWg.isImgBtn&&selectWg.hasOwnProperty('textList')">
    <Draggable
      :group="{ name:'options'}"
      ghostClass="ghost"
      handle=".move-icon"
      item-key="index"
      tag="ul"
      v-model="selectWg.textList"
    >
      <template #item="{index}">
        <li>
          <div class="flex align-middle mg-b10">
            <el-input size="small" v-model="selectWg.textList[index]"></el-input>
            <i class="el-icon-menu move-icon"></i>
            <i @click="handleOptionsRemove(index)" class="el-icon-delete delect-icon"></i>
          </div>
        </li>
      </template>
    </Draggable>
    <div style="margin-left: 22px;">
      <el-button @click="handleAddOption()" type="text">添加选项</el-button>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import FileUpload from '@/components/base/FileUpload.vue'
import { defineComponent, computed } from "vue";
import Draggable from 'vuedraggable'
import { useStore } from "vuex";

export default defineComponent({
  components: {
    FileUpload, Draggable
  },
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const handleOptionsRemove = (index: number) => {
      selectWg.value.textList.splice(index, 1)
    }
    const handleAddOption = () => {
      const newItem =
        selectWg.value.textList.length > 0
          ? selectWg.value.textList[selectWg.value.textList.length - 1]
          : ''
      selectWg.value.textList.push(newItem)
    }
    return {
      selectWg,
      handleOptionsRemove, handleAddOption
    }
  }
})
</script>