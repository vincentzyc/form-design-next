<template>
  <div class="home">
    <el-container class="form-edit-wrapper">
      <el-aside style="min-width: 300px; width: 20vw">
        <ComponentsList />
      </el-aside>
      <el-container class="center-container" direction="vertical">
        <el-header class="btn-bar" style="height: 45px">
          <!-- @success="saveSuccess" -->
          <CustomWidget :pageData="pageData" ref="customWidget" />
          <el-button @click="handleReset()" :icon="Refresh" type="text">重置</el-button>
          <el-button @click="handlePreview()" :icon="View" type="text">预览</el-button>
          <el-button @click="handleSave()" :icon="Document" type="text">保存</el-button>
        </el-header>
        <el-main>
          <WidgetForm />
        </el-main>
      </el-container>
      <el-aside class="widget-config-container" style="min-width: 300px; width: 20vw">
        <PageConfig />
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/pinia';
import { storeToRefs } from 'pinia';
import { getCurrentInstance } from 'vue';
import ComponentsList from './ComponentsList/index.vue';
import CustomWidget from './PageConfig/WidgetConfig/CustomWidget.vue';
import WidgetForm from './WidgetForm/index.vue';
import PageConfig from './PageConfig/index.vue';
import pageConfigData from '@/assets/js/page-config';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { deepClone } from '@/utils/deep-clone';
import { previewUrl, previewOrigin } from '@/api';
import { Refresh, View, Document } from '@element-plus/icons-vue';

const vm: any = getCurrentInstance()?.proxy;
const mainStore = useMainStore();
const { pageData } = storeToRefs(mainStore);

const handleReset = () => {
  mainStore.setSelectWg({});
  mainStore.setPageData(deepClone(pageConfigData.pageConfig));
};
const handleSave = () => {
  vm.$bus.emit('formDesign_savePage');
  setLocalStorage('pageData', pageData.value);
  vm.$alert('保存成功', { showClose: false });
};
const handlePreview = () => {
  vm.$bus.emit('formDesign_savePage');
  let newWin = window.open(previewUrl());
  let timer = setInterval(() => {
    if (newWin && pageData.value) newWin.postMessage(deepClone(pageData.value), previewUrl());
  }, 300);
  window.addEventListener(
    'message',
    event => {
      if (event.origin !== previewOrigin()) return;
      if (event.data === 'Received') clearInterval(timer);
    },
    false
  );
};

const getLocalPageData = () => {
  const localPageData = getLocalStorage('pageData');
  if (localPageData) mainStore.setPageData(localPageData);
};
getLocalPageData();
</script>
