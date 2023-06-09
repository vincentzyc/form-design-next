<template>
  <QuillEditor @ready="quillEditorReady" toolbar="full" theme="snow" v-model:content="model" contentType="html">
  </QuillEditor>
</template>

<script lang="ts" setup>
import '@/plugins/quill';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/pinia';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import { computed, reactive, ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// import './quill-editor.styl';

const mainStore = useMainStore();
const { predefineColors } = storeToRefs(mainStore);

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
  if (quill) quillEditor.value = quill;
}

function pickerColor(v: string) {
  if (quillEditor.value) quillEditor.value.format('color', v);
}
</script>

<style></style>
