<template>
  <div class="form-config-container">
    <el-form label-position="top" size="small">
      <el-form-item label="页面标题">
        <el-input v-model.trim="pageData.title"></el-input>
      </el-form-item>
      <el-form-item label="页面背景色">
        <el-color-picker :predefine="predefineColors" v-model="pageData.style.backgroundColor" />
      </el-form-item>
      <!-- <el-form-item label="页面背景图片">
        <FileUpload :value.sync="pageData.style.backgroundImage" />
      </el-form-item>-->
      <el-form-item label="是否劫持返回">
        <el-switch v-model="pageData.hijackBack.isHijack"></el-switch>
      </el-form-item>
      <template v-if="pageData.hijackBack.isHijack">
        <!-- <el-form-item label="劫持返回弹窗图片">
          <FileUpload :value.sync="pageData.hijackBack.alertImg" />
        </el-form-item>-->
        <el-form-item label="点击图片跳转链接">
          <el-input
            :autosize="{ minRows: 2, maxRows: 6 }"
            @blur="checkLink"
            placeholder="请输入跳转链接"
            type="textarea"
            v-model.trim="pageData.hijackBack.alertLink"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item label="主题" v-if="themes.length > 0">
        <el-radio-group @change="setTheme" v-model="pageData.theme">
          <el-radio-button :key="item.value" :label="item.value" v-for="item in themes">{{ item.name }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="页面统计代码">
        <el-input :rows="4" placeholder="请输入统计代码" type="textarea" v-model="pageData.statsCode"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
// import { defineComponent, computed, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import pageConfigData from '@/assets/js/page-config'
import { deepClone } from '@/utils/deep-clone';
import { isLink } from '@/utils/validate/link';
import { ElMessage } from "element-plus";

// export default defineComponent({
//   name: 'CommonConfig',
//   setup() {
// const vm: any = getCurrentInstance()?.proxy
// vm.$message.error('xxx')
const store = useStore()
const themes = reactive(pageConfigData.themes)
const pageData = computed(() => store.state.pageData)
const predefineColors = computed(() => store.state.predefineColors)

function setTheme(val) {
  const i = themes.findIndex(item => item.value === val);
  store.commit("setPageData", deepClone(themes[i].pageData));
}
function checkLink() {
  if (!isLink(pageData.value.hijackBack.alertLink)) ElMessage.error('请输入正确的网址');
}

//     return {
//       themes,
//       pageData,
//       predefineColors,
//       setTheme,
//       checkLink
//     }
//   }
// })
</script>
