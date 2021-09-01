<template>
  <el-drawer :with-header="false" direction="ltr" size="36%" v-model="model">
    <div class="drawer-content">
      <el-upload
        :auto-upload="false"
        :before-upload="beforeUpload"
        :multiple="false"
        :on-change="changeFile"
        :on-error="uploadError"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :show-file-list="false"
        action="https://jsonplaceholder.typicode.com/posts/"
        drag
        ref="elUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将图片拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div style="width:100%;height:80px">
        <div class="flex">
          <span>压缩率：{{ state.quality }}%</span>
          <div class="flex-auto mg-l20">
            <el-slider @change="compressorFile" v-model="state.quality"></el-slider>
          </div>
        </div>
        <div class="flex" v-if="state.file">
          <span class="flex-auto">
            源文件大小：
            <span class="cred">{{ state.fileSize.before }}</span>
          </span>
          <span class="flex-auto">
            压缩后大小：
            <span class="cgreen">{{ state.fileSize.after }}</span>
          </span>
        </div>
      </div>
      <div class="preview-body">
        <div v-if="state.file">
          <p>
            压缩后
            <i class="el-icon-bottom"></i>
          </p>
          <el-image
            :preview-src-list="state.srcList"
            :src="state.compressUrl"
            style="width: 100%;"
            v-if="state.compressUrl"
          ></el-image>
          <hr />
          <p>
            源文件
            <i class="el-icon-bottom"></i>
          </p>
          <el-image
            :preview-src-list="state.srcList"
            :src="state.sourceUrl"
            style="width: 100%;"
            v-if="state.sourceUrl"
          ></el-image>
        </div>
      </div>
      <div class="drawer-footer flex">
        <el-button @click="model = false" class="flex-auto">取 消</el-button>
        <el-button :disabled="!state.file" @click="submitUpload(true)" class="flex-auto" type="danger">上传源文件</el-button>
        <el-button :disabled="!state.compressFile" @click="submitUpload(false)" class="flex-auto" type="primary">上传压缩文件</el-button>
      </div>
    </div>
    <transition name="el-fade-in-linear" v-if="state.uploading">
      <div class="flex flex-column flex-center uploader-progress">
        <el-progress :percentage="state.uploadPercentage" :width="100" class="progress" type="circle"></el-progress>
        <el-button @click.stop="cancelUpload()" class="mg-t10" type="text">取消上传</el-button>
      </div>
    </transition>
  </el-drawer>
</template>

<script lang="ts" setup>
import Compressor from 'compressorjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ref, reactive } from "vue";

const imgTypeList = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

type StateType = {
  uploading: boolean
  file: any
  compressFile: any
  isUploadSource: boolean
  quality: number
  uploadPercentage: number
  compressUrl: string
  srcList: string[]
  sourceUrl: string
  fileSize: {
    before: string,
    after: string
  }
}

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'success', 'fail'])

// export default defineComponent({
// props: {
//   modelValue: Boolean
// },
// emits: ['update:modelValue', 'success', 'fail'],
// setup(props, { emit }) {
const elUpload = ref()
const getInitalState: () => StateType = () => {
  return {
    uploading: false,
    file: null,
    compressFile: null,
    isUploadSource: false,
    quality: 80,
    uploadPercentage: 0,
    compressUrl: '',
    srcList: [],
    sourceUrl: '',
    fileSize: {
      before: '0KB',
      after: '0KB'
    }
  }
}
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
})

const state = reactive(getInitalState())

const resetState = () => Object.assign(state, getInitalState())

const resetUpload = () => {
  elUpload.value.clearFiles();
  setTimeout(() => {
    resetState()
  }, 300);
}
const startUpload = () => {
  state.uploading = true;
}
const submitUpload = (uploadSource: boolean) => {
  if (!state.file) return
  if (!state.compressFile) return
  state.isUploadSource = uploadSource
  const realFile = state.isUploadSource ? state.file.raw : state.compressFile
  const isImg = imgTypeList.includes(realFile.type)
  const isLimit = realFile.size / 1024 <= 50;
  if (!isImg) {
    ElMessage.error('请上传图片');
    return false
  }
  if (isLimit) {
    elUpload.value.submit();
  } else {
    ElMessage.error('上传图片大小不能超过 30 K !');
    return false
  }
}
const changeFile = (nfile: any) => {
  state.file = nfile
  compressorFile(state.quality)
}
const uploadError = () => {
  // console.log(err);
  resetUpload()
  ElMessageBox.alert('网络繁忙，请稍后重试');
}
const handleProgress = (event, nfile: any) => {
  state.uploadPercentage = parseInt(nfile.percentage, 10);
}
const handleSuccess = () => {
  emit('success', state.compressUrl)
  if (state.uploadPercentage !== 100) state.uploadPercentage = 100;
  resetUpload()
  model.value = false
}
const cancelUpload = () => {
  if (!state.uploading) return;
  elUpload.value.abort();
  ElMessage({
    message: '已取消上传',
    type: 'warning'
  });
  return resetUpload();
}
const compressorFile = (v: number) => {
  if (!state.file) return
  state.srcList = []
  state.fileSize.before = Math.round(state.file.size / 1024 * 10) / 10 + 'KB';
  state.sourceUrl = URL.createObjectURL(state.file.raw);
  new Compressor(state.file.raw, {
    quality: v / 100,
    convertSize: 51200,  // png图片超过50KB时启用压缩，压缩后会转成jpg图片，失去透明度
    success: res => {
      state.compressFile = res
      state.compressUrl = URL.createObjectURL(res);
      state.fileSize.after = Math.round(res.size / 1024 * 10) / 10 + 'KB';
      state.srcList = [state.compressUrl, state.sourceUrl]
    },
    error: err => {
      state.compressUrl = ''
      state.compressFile = null
      state.fileSize.after = '0KB'
      emit('fail', err)
      console.log(err.message);
    },
  });
}
const beforeUpload = () => {
  if (!state.file) return
  if (!state.compressFile) return
  const realFile = state.isUploadSource ? state.file.raw : state.compressFile
  startUpload()
  return new Promise(resolve => {
    resolve(realFile)
  })
}
//     return {
//       elUpload, model, state,
//       submitUpload, beforeUpload, compressorFile, cancelUpload, handleSuccess, handleProgress, uploadError, changeFile
//     }
//   }
// })
</script>

<style scoped>
.drawer-content {
  padding: 20px;
  height: 100vh;
}
.drawer-content:deep(.el-upload.el-upload--text),
.drawer-content:deep(.el-upload-dragger) {
  width: 100%;
  height: 120px;
}

.drawer-content:deep(.el-upload-dragger .el-icon-upload) {
  margin: 0;
  line-height: 1;
}
.drawer-content:deep(.el-icon-circle-close) {
  color: #fff;
}
.preview-body {
  overflow-y: scroll;
  height: calc(100% - 275px);
}
.drawer-footer {
  width: 100%;
  padding: 20px;
}
.cred {
  color: #ff0000;
}
.cgreen {
  color: #38b03f;
}
</style>