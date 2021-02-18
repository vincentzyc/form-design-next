<template>
  <div class="wg-col-config">
    <el-form-item label="显示类型">
      <el-radio-group v-model="selectWg.styleType">
        <el-radio-button
          :key="item.value"
          :label="item.value"
          v-for="item in selectWg.styleTypes"
        >{{item.label}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="图片列表">
      <Draggable
        :group="{ name:'options'}"
        ghostClass="ghost"
        handle=".move-icon"
        item-key="index"
        tag="ul"
        v-model="selectWg.imglist"
      >
        <template #item="{index}">
          <li>
            <div class="col-itemlist">
              <i class="el-icon-menu move-icon"></i>
              <i @click="handleRemove(index)" class="el-icon-delete delect-icon"></i>

              <div class="flex pd5">
                <span class="width70 flex-none">上传图片：</span>
                <FileUpload class="mg-t10" v-model:modelValue="selectWg.imglist[index].img" />
              </div>
              <el-form-item label="跳转地址(空或格式错误都不会跳转)">
                <el-input @change="v=>checkLink(v)" v-model="selectWg.imglist[index].link"></el-input>
              </el-form-item>
            </div>
          </li>
        </template>
      </Draggable>
      <div style="margin-left: 22px;">
        <el-button @click="handleAdd()" type="text">添加选项</el-button>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Draggable from 'vuedraggable'
import { deepClone } from '@/utils/deep-clone';
import { isLink } from '@/utils/validate/link';
import { useStore } from "vuex";
import FileUpload from '@/components/base/FileUpload.vue'
import { ElMessage } from "element-plus";


export default defineComponent({
  name:"ImgShowConfig",
  components: {
    FileUpload, Draggable
  },
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const handleRemove = (index: number) => {
      selectWg.value.imglist.splice(index, 1)
    }
    const handleAdd = () => {
      const newItem =
        selectWg.value.imglist.length > 0
          ? deepClone(selectWg.value.imglist[selectWg.value.imglist.length - 1])
          : {
            link: "",
            img: ""
          }
      selectWg.value.imglist.push(newItem)
    }
    function checkLink(v: string) {
      if (!isLink(v)) ElMessage.error('请输入正确的网址');
    }
    return {
      selectWg,
      handleRemove, handleAdd, checkLink
    }
  }
})
</script>