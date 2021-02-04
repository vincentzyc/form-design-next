<template>
  <el-form-item label="轮播图片设置">
    <Draggable
      :group="{ name:'slideList'}"
      :list="selectWg.value"
      ghostClass="ghost"
      handle=".move-icon"
      tag="ul"
    >
      <li :key="index" style="border:1px dashed #999" v-for="(item, index) in selectWg.value">
        <div class="pd10">
          <div class="relative flex flex-center">
            <FileUpload v-model:modelValue="item.image" />
            <div class="absolute-top-right">
              <i class="el-icon-menu move-icon"></i>
              <i @click="handleSlideRemove(index)" class="el-icon-delete delect-icon"></i>
            </div>
          </div>
          <div class="flex">
            <span class="flex-none">图片地址：</span>
            <el-input placeholder="请输入图片地址" size="mini" v-model="item.image"></el-input>
          </div>
          <div class="flex">
            <span class="flex-none">跳转地址：</span>
            <el-input placeholder="请输入跳转地址" size="mini" v-model="item.url"></el-input>
          </div>
        </div>
      </li>
    </Draggable>
    <div class="text-center">
      <el-button @click="handleAddSlide()" type="text">添加图片</el-button>
    </div>
  </el-form-item>
  <el-form-item label="图片高度(px)">
    <el-input-number :max="300" :min="100" size="small" v-model="selectWg.style.height" />
  </el-form-item>
  <el-form-item>
    <template #label>
      <span>播放间隔(ms)</span>
      <el-tooltip content="本页面无法看到实时效果，请点击预览查看" effect="dark" placement="top">
        <i class="el-icon-info fs12 mg-l10"></i>
      </el-tooltip>
    </template>
    <el-input-number :max="10000" :min="1000" size="small" v-model="selectWg.interval" />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Draggable from 'vuedraggable'
import { useStore } from "vuex";
import FileUpload from '@/components/base/FileUpload.vue'

export default defineComponent({
  components: {
    FileUpload, Draggable
  },
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const handleSlideRemove = (index: number) => {
      selectWg.value.splice(index, 1)
    }
    const handleAddSlide = () => {
      selectWg.value.push({
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