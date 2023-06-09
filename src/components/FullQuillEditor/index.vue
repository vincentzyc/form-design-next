<template>
  <div class="quill-editor">
    <QuillEditor :toolbar="fullToolBar" theme="snow" v-model:content="model" contentType="html"> </QuillEditor>
  </div>
</template>

<script lang="ts" setup>
import '@/plugins/quill';
import { QuillEditor } from '@vueup/vue-quill';
import { computed, ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './quill-editor.styl';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const fullToolBar = ref([
  'bold',
  'italic',
  'underline',
  'strike',
  { color: [] },
  { background: [] },
  { header: [1, 2, 3, 4, 5, 6, false] },
  'blockquote',
  { font: [] },
  { list: 'ordered' },
  { list: 'bullet' },
  { script: 'sub' },
  { script: 'super' },
  { indent: '-1' },
  { indent: '+1' },
  { direction: 'rtl' },
  { align: [] },
  { size: ['small', false, 'large', 'huge'] },
  'code-block',
  'link',
  'video',
  'image',
  'clean',
]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>
