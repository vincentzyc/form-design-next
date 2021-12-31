<template>
  <div class="home">
    <el-container class="form-edit-wrapper">
      <el-aside style="min-width:300px;width:20vw">
        <ComponentsList />
      </el-aside>
      <el-container class="center-container" direction="vertical">
        <el-header class="btn-bar" style="height: 45px;">
          <el-button @click="handleReset()" class="mg-r15" icon="el-icon-refresh" size="medium" type="text">重置</el-button>
          <el-button @click="handlePreview()" class="mg-r15" icon="el-icon-view" size="medium" type="text">预览</el-button>
          <el-button @click="handleSave()" class="mg-r15" icon="el-icon-document" size="medium" type="text">保存</el-button>
        </el-header>
        <el-main>
          <WidgetForm />
        </el-main>
      </el-container>
      <el-aside class="widget-config-container" style="min-width:300px;width:20vw">
        <PageConfig />
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

const main = useMainStore()
const { counter, doubleCount } = storeToRefs(main)
console.log(counter.value, doubleCount.value);

import { computed, getCurrentInstance } from "vue";
import ComponentsList from "./ComponentsList/index.vue"
import WidgetForm from './WidgetForm/index.vue'
import PageConfig from './PageConfig/index.vue'
import pageConfigData from '@/assets/js/page-config'
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { useStore } from "vuex";
import { deepClone } from "@/utils/deep-clone";
import { previewUrl, previewOrigin } from "@/api"

const vm: any = getCurrentInstance()?.proxy
const store = useStore()
const pageData = computed(() => store.state.pageData)

const handleReset = () => {
  store.commit('setSelectWg', {});
  store.commit('setPageData', deepClone(pageConfigData.pageConfig));
}
const handleSave = () => {
  vm.$bus.emit("formDesign_savePage")
  setLocalStorage('pageData', pageData.value);
  vm.$alert('保存成功', { showClose: false });
}
const handlePreview = () => {
  vm.$bus.emit("formDesign_savePage")
  let newWin = window.open(previewUrl());
  let timer = setInterval(() => {
    newWin?.postMessage(deepClone(pageData.value), previewUrl());
  }, 300);
  window.addEventListener('message', event => {
    if (event.origin !== previewOrigin()) return;
    if (event.data === 'Received') clearInterval(timer)
  }, false);
}

const getLocalPageData = () => {
  const localPageData = getLocalStorage('pageData');
  if (localPageData) store.commit('setPageData', localPageData);
}
getLocalPageData()

</script>