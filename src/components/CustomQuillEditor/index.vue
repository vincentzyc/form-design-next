<template>
  <div class="quill-editor">
    <QuillEditor
      @ready="quillEditorReady"
      toolbar="#toolbar"
      :options="editorOption"
      theme="snow"
      v-model:content="model"
      contentType="html"
    >
      <template #toolbar>
        <div id="toolbar">
          <!-- <el-tooltip effect="dark" content="文字颜色" placement="top">
          <span class="ql-color-picker">
            <el-color-picker :predefine="predefineColors" size="mini" @active-change="pickerColor" />
          </span>
        </el-tooltip> -->
          <el-tooltip effect="dark" content="加粗" placement="top">
            <button class="ql-bold"></button>
          </el-tooltip>
          <el-tooltip effect="dark" content="斜体" placement="top">
            <button class="ql-italic"></button>
          </el-tooltip>
          <el-tooltip effect="dark" content="文字大小" placement="top">
            <span class="ql-item">
              <select class="ql-size ql-custom-picker">
                <option value="8px"></option>
                <option value="10px"></option>
                <option value="12px"></option>
                <option value="14px"></option>
                <option value="16px"></option>
                <option value="18px"></option>
                <option value="20px"></option>
                <option value="24px"></option>
                <option value="36px"></option>
                <option value="48px"></option>
                <option value="64px"></option>
              </select>
            </span>
          </el-tooltip>
          <el-tooltip effect="dark" content="对齐方式" placement="top">
            <span class="ql-item">
              <select class="ql-align"></select>
            </span>
          </el-tooltip>
          <el-tooltip effect="dark" content="行高" placement="top">
            <span class="ql-item">
              <select class="ql-lineHeight ql-custom-picker">
                <option value="1"></option>
                <option value="1.25"></option>
                <option value="1.5"></option>
                <option value="1.75"></option>
                <option value="2"></option>
                <option value="3"></option>
              </select>
            </span>
          </el-tooltip>
          <el-tooltip effect="dark" content="缩进" placement="top">
            <span class="ql-item">
              <select class="ql-indent ql-custom-picker">
                <option value="0em"></option>
                <option value="1em"></option>
                <option value="2em"></option>
                <option value="3em"></option>
                <option value="4em"></option>
                <option value="5em"></option>
              </select>
            </span>
          </el-tooltip>
          <!-- <el-tooltip effect="dark" content="下划线" placement="top">
            <button class="ql-underline"></button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除线" placement="top">
            <button class="ql-strike"></button>
          </el-tooltip>
          <el-tooltip effect="dark" content="链接" placement="top">
            <button class="ql-link"></button>
          </el-tooltip> -->
          <!-- <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>-->

          <!-- Add subscript and superscript buttons -->
          <!-- <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>-->
          <!-- You can also add your own -->
          <!-- <button id="custom-button">[ Click me ]</button> -->
        </div>
      </template>
    </QuillEditor>
  </div>
</template>

<script lang="ts" setup>
import '@/plugins/quill';
// import { storeToRefs } from 'pinia';
// import { useMainStore } from '@/pinia';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import { computed, reactive, ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './quill-editor.styl';

// const mainStore = useMainStore();
// const { predefineColors } = storeToRefs(mainStore);

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const quillEditor = ref<Quill | null>(null);

const editorOption = reactive({
  placeholder: '请输入文本',
  modules: {
    toolbar: {
      container: '#toolbar',
      handlers: {
        link: function (value: string) {
          if (value) {
            var href = prompt('请输入链接');
            if (quillEditor.value) quillEditor.value.format('link', href);
          } else {
            if (quillEditor.value) quillEditor.value.format('link', false);
          }
        },
        lineHeight: function (value) {
          if (value) {
            if (quillEditor.value) quillEditor.value.format('lineHeight', value);
          }
        },
      },
    },
  },
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

function quillEditorReady(quill: Quill) {
  console.log(quill);
}

// function pickerColor(v: string) {
//   if (quillEditor.value) quillEditor.value.format('color', v);
// }
</script>

<style></style>
