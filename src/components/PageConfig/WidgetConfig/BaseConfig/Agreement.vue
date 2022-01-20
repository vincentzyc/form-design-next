<template>
  <div class="wg-col-config" v-if="selectWg">
    <p class="lh24 c999 fs12">请预览查看具体效果</p>
    <el-form-item label="默认选中">
      <el-switch v-model="selectWg.value"></el-switch>
    </el-form-item>
    <el-form-item label="文字描述">
      <el-input placeholder="请输入文字描述" v-model="selectWg.tipText"></el-input>
    </el-form-item>

    <el-form-item label="协议列表">
      <Draggable
        :group="{ name: 'options' }"
        ghostClass="ghost"
        handle=".move-icon"
        item-key="index"
        tag="ul"
        v-model="selectWg.titleTexts"
      >
        <template #item="{ element, index }">
          <li>
            <div class="col-itemlist">
              <i class="el-icon-menu move-icon"></i>
              <i @click="handleRemove(index)" class="el-icon-delete delect-icon"></i>

              <el-form-item label="协议名称">
                <el-input placeholder="请输入协议名称" v-model="element.title"></el-input>
              </el-form-item>
              <el-form-item label="协议内容（支持链接页面）">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 16 }"
                  placeholder="请输入协议内容"
                  type="textarea"
                  v-model="element.text"
                ></el-input>
              </el-form-item>
            </div>
          </li>
        </template>
      </Draggable>
      <div style="margin-left: 22px;">
        <el-button @click="handleAdd()" type="text">添加选项</el-button>
      </div>
    </el-form-item>

    <el-form-item label="协议文字颜色">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.agreementColor" />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { deepClone } from "@/utils/deep-clone";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { predefineColors, selectWg } = storeToRefs(mainStore)
const handleRemove = (index: number) => {
  selectWg.value?.titleTexts.splice(index, 1)
}
const handleAdd = () => {
  let newItem =
    selectWg.value?.titleTexts.length > 0
      ? deepClone(selectWg.value?.titleTexts[selectWg.value?.titleTexts.length - 1])
      : {
        title: "《协议名称》",
        text: ""
      }
  selectWg.value?.titleTexts.push(newItem)
}

</script>