<template>
  <div class="home">
    <el-container class="form-edit-wrapper">
      <el-aside style="min-width:300px;width:20vw">
        <ComponentsList />
      </el-aside>
      <el-container class="center-container" direction="vertical">
        <el-header class="btn-bar" style="height: 45px;">
          <el-button class="mg-r15" icon="el-icon-refresh" size="medium" type="text">重置</el-button>
          <el-button class="mg-r15" icon="el-icon-view" size="medium" type="text">预览</el-button>
          <el-button class="mg-r15" icon="el-icon-document" size="medium" type="text">保存</el-button>
        </el-header>
        <el-main>
          <WidgetForm></WidgetForm>
        </el-main>
      </el-container>
      <el-aside class="widget-config-container" style="min-width:300px;width:20vw">Aside</el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsList from "./ComponentsList.vue"
import WidgetForm from '../WidgetForm/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ComponentsList,WidgetForm
  }
});
</script>