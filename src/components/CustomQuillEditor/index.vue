<template>
  <div class="quill-editor">
    <QuillEditor
      @ready="quillEditorReady"
      :options="editorOption"
      theme="snow"
      v-model:content="model"
      contentType="html"
    >
      <template #toolbar>
        <div id="toolbar">
          <el-tooltip :hide-after="0" effect="dark" content="文字颜色" placement="top">
            <span class="ql-item">
              <span class="ql-color-picker ql-picker ql-custom-picker">
                <el-color-picker
                  show-alpha
                  :predefine="predefineColors"
                  size="small"
                  @active-change="pickerColor"
                  v-model="customColor"
                />
              </span>
            </span>
          </el-tooltip>

          <!-- <el-tooltip :hide-after="0" effect="dark" content="文字颜色" placement="top">
            <span class="ql-item">
              <span class="ql-color ql-picker ql-color-picker">
                <span
                  class="ql-picker-label"
                  tabindex="0"
                  role="button"
                  aria-expanded="false"
                  aria-controls="ql-picker-options-0"
                  ><svg viewBox="0 0 18 18">
                    <line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"></line>
                    <polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"></polyline>
                    <line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"></line></svg
                ></span>
              </span>
            </span>
          </el-tooltip> -->

          <!-- <select class="ql-color"></select>
          <select class="ql-background"></select> -->

          <!-- <el-tooltip :hide-after="0" effect="dark" content="文字背景" placement="top">
            <span class="ql-item">
              <svg viewBox="0 0 18 18">
                <g class="ql-fill ql-color-label">
                  <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon>
                  <rect height="1" width="1" x="4" y="4"></rect>
                  <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon>
                  <rect height="1" width="1" x="2" y="6"></rect>
                  <rect height="1" width="1" x="3" y="5"></rect>
                  <rect height="1" width="1" x="4" y="7"></rect>
                  <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon>
                  <rect height="1" width="1" x="2" y="12"></rect>
                  <rect height="1" width="1" x="2" y="9"></rect>
                  <rect height="1" width="1" x="2" y="15"></rect>
                  <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon>
                  <rect height="1" width="1" x="3" y="8"></rect>
                  <path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"></path>
                  <path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"></path>
                  <path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"></path>
                  <rect height="1" width="1" x="12" y="2"></rect>
                  <rect height="1" width="1" x="11" y="3"></rect>
                  <path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"></path>
                  <rect height="1" width="1" x="2" y="3"></rect>
                  <rect height="1" width="1" x="6" y="2"></rect>
                  <rect height="1" width="1" x="3" y="2"></rect>
                  <rect height="1" width="1" x="5" y="3"></rect>
                  <rect height="1" width="1" x="9" y="2"></rect>
                  <rect height="1" width="1" x="15" y="14"></rect>
                  <polygon
                    points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"
                  ></polygon>
                  <rect height="1" width="1" x="13" y="7"></rect>
                  <rect height="1" width="1" x="15" y="5"></rect>
                  <rect height="1" width="1" x="14" y="6"></rect>
                  <rect height="1" width="1" x="15" y="8"></rect>
                  <rect height="1" width="1" x="14" y="9"></rect>
                  <path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"></path>
                  <rect height="1" width="1" x="14" y="3"></rect>
                  <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon>
                  <rect height="1" width="1" x="15" y="2"></rect>
                  <rect height="1" width="1" x="12" y="5"></rect>
                  <rect height="1" width="1" x="13" y="4"></rect>
                  <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon>
                  <rect height="1" width="1" x="9" y="14"></rect>
                  <rect height="1" width="1" x="8" y="15"></rect>
                  <path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"></path>
                  <rect height="1" width="1" x="5" y="15"></rect>
                  <path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"></path>
                  <rect height="1" width="1" x="11" y="15"></rect>
                  <path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"></path>
                  <rect height="1" width="1" x="14" y="15"></rect>
                  <rect height="1" width="1" x="15" y="11"></rect>
                </g>
                <polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"></polyline>
                <line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"></line>
              </svg>
            </span>
          </el-tooltip> -->

          <el-tooltip :hide-after="0" effect="dark" content="文字背景" placement="top">
            <span class="ql-item">
              <span class="ql-color-picker ql-picker ql-custom-picker">
                <el-color-picker
                  show-alpha
                  :predefine="predefineColors"
                  size="small"
                  @active-change="pickerBackground"
                  v-model="customBackground"
                />
              </span>
            </span>
          </el-tooltip>

          <el-tooltip :hide-after="0" effect="dark" content="加粗" placement="top">
            <button class="ql-bold"></button>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="斜体" placement="top">
            <button class="ql-italic"></button>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="文字大小" placement="top">
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
          <el-tooltip :hide-after="0" effect="dark" content="对齐方式" placement="top">
            <span class="ql-item">
              <select class="ql-align"></select>
            </span>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="行高" placement="top">
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
          <el-tooltip :hide-after="0" effect="dark" content="缩进" placement="top">
            <span class="ql-item">
              <select class="ql-textIndent ql-custom-picker">
                <option value="0em"></option>
                <option value="1em"></option>
                <option value="2em"></option>
                <option value="3em"></option>
                <option value="4em"></option>
                <option value="5em"></option>
              </select>
            </span>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="下划线" placement="top">
            <button class="ql-underline"></button>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="删除线" placement="top">
            <button class="ql-strike"></button>
          </el-tooltip>
          <el-tooltip :hide-after="0" effect="dark" content="链接" placement="top">
            <button class="ql-link"></button>
          </el-tooltip>
        </div>
      </template>
    </QuillEditor>
  </div>
</template>

<script lang="ts" setup>
import './formats';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/pinia';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import { computed, reactive, ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './quill-editor.styl';

const mainStore = useMainStore();
const { predefineColors } = storeToRefs(mainStore);

const props = defineProps({
  modelValue: String,
});

const customColor = ref('');
const customBackground = ref('');

const emit = defineEmits(['update:modelValue']);

let quillEditor: Quill | null = null;

const editorOption = reactive({
  placeholder: '请输入文本',
  modules: {
    toolbar: {
      container: '#toolbar',
      handlers: {
        link: function (value: string) {
          if (value) {
            var href = prompt('请输入链接');
            if (quillEditor) quillEditor.format('link', href);
          } else {
            if (quillEditor) quillEditor.format('link', false);
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
  quillEditor = quill;
}

function pickerColor(v: string) {
  if (v && quillEditor) quillEditor.format('color', v);
}
function pickerBackground(v: string) {
  if (v && quillEditor) quillEditor.format('background', v);
}
</script>

<style></style>
