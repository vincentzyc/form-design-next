<template>
  <template v-if="selectWg">
    <el-form-item label="轮播图片设置">
      <Draggable
        :group="{ name: 'slideList' }"
        ghostClass="ghost"
        handle=".move-icon"
        itemKey="index"
        tag="ul"
        v-model="selectWg.value"
      >
        <template #item="{ element, index }">
          <li style="border:1px dashed #999">
            <div class="pd10">
              <div class="relative flex flex-center">
                <FileUpload v-model:modelValue="element.image" />
                <div class="absolute-top-right">
                  <i class="el-icon-menu move-icon"></i>
                  <i @click="handleSlideRemove(index)" class="el-icon-delete delect-icon"></i>
                </div>
              </div>
              <div class="flex">
                <span class="flex-none">图片地址：</span>
                <el-input placeholder="请输入图片地址" size="small" v-model="element.image"></el-input>
              </div>
              <div class="flex">
                <span class="flex-none">跳转地址：</span>
                <el-input placeholder="请输入跳转地址" size="small" v-model="element.url"></el-input>
              </div>
            </div>
          </li>
        </template>
      </Draggable>
      <div class="text-center">
        <el-button @click="handleAddSlide()" type="text">添加图片</el-button>
      </div>
    </el-form-item>
    <el-form-item label="图片高度(px)">
      <el-input-number :min="80" size="small" v-model="selectWg.style.height" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <span>播放间隔(ms)</span>
        <el-tooltip content="本页面无法看到实时效果，请点击预览查看" effect="dark" placement="top">
          <i class="el-icon-info fs12 mg-l10"></i>
        </el-tooltip>
      </template>
      <el-input-number :max="10000" :min="1000" :step="500" size="small" step-strictly v-model="selectWg.interval" />
    </el-form-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Draggable from 'vuedraggable'
import FileUpload from '@/components/base/FileUpload.vue'
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ImgSlideConfig",
  components: {
    FileUpload, Draggable
  },
  setup() {
    const mainStore = useMainStore()
    const { selectWg } = storeToRefs(mainStore)

    const handleSlideRemove = (index: number) => {
      if (selectWg.value) selectWg.value.value.splice(index, 1)
    }
    const handleAddSlide = () => {
      if (selectWg.value) selectWg.value.value.push({
        url: "https://www.baidu.com/",
        image: "https://www.baidu.com/img/bd_logo1.png"
      })
    }
    return {
      selectWg,
      handleSlideRemove, handleAddSlide
    }
  }
})
</script>