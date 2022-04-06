<template>
  <div class="wg-col-config" v-if="selectWg">
    <!-- <p class="lh24 c999 fs12">请预览查看具体效果</p>
    <el-form-item label="默认选中">
      <el-switch v-model="selectWg.value"></el-switch>
    </el-form-item>
    <el-form-item label="文字描述">
      <el-input placeholder="请输入文字描述" v-model="selectWg.tipText"></el-input>
    </el-form-item>-->

    <el-form-item label="Tabs列表">
      <Draggable
        :group="{ name: 'options' }"
        ghostClass="ghost"
        handle=".move-icon"
        item-key="index"
        tag="ul"
        v-model="selectWg.tabsList"
        class="row"
      >
        <template #item="{ element, index }">
          <li>
            <div class="col-itemlist">
              <el-icon @click="handleRemove(index)" class="el-icon-menu move-icon">
                <Menu />
              </el-icon>
              <el-icon @click="handleRemove(index)" class="el-icon-delete delect-icon">
                <Delete />
              </el-icon>

              <div class="flex mg-t5">
                <span class="flex-none item-label">Tab名称：</span>
                <el-input placeholder="请输入Tabs名称" v-model="element.title"></el-input>
                <el-button type="text" class="mg-l5" @click="tabConfig(index)" v-show="selectWg.value !== index">配置内容</el-button>
              </div>
            </div>
          </li>
        </template>
      </Draggable>
      <div class="flex row justify-end">
        <el-button @click="handleAdd()" type="text">添加Tab</el-button>
      </div>
    </el-form-item>

    <!-- <el-form-item label="协议文字颜色">
      <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.agreementColor" />
    </el-form-item>-->
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { deepClone } from "@/utils/deep-clone";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'
import { Delete, Menu } from '@element-plus/icons-vue'

const mainStore = useMainStore()
// const { predefineColors, selectWg } = storeToRefs(mainStore)
const { selectWg } = storeToRefs(mainStore)
const handleRemove = (index: number) => {
  if (selectWg.value?.value) selectWg.value.value = 0
  selectWg.value?.tabsList.splice(index, 1)
}
const handleAdd = () => {
  let newItem =
    selectWg.value?.tabsList.length > 0
      ? deepClone(selectWg.value?.tabsList[selectWg.value?.tabsList.length - 1])
      : {
        title: "《Tabs名称》",
        list: []
      }
  selectWg.value?.tabsList.push(newItem)
}

const tabConfig = (index: number) => {
  if (selectWg.value) selectWg.value.value = index
}
</script>