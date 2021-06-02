<template>
  <el-drawer :visible="model" :with-header="false" direction="ltr" size="36%">
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
        ref="upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将图片拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div style="width:100%;height:80px">
        <div class="flex">
          <span>压缩率：{{quality}}%</span>
          <div class="flex-auto mg-l20">
            <el-slider @change="compressorFile" v-model="quality"></el-slider>
          </div>
        </div>
        <div class="flex" v-if="file">
          <span class="flex-auto">
            源文件大小：
            <span class="cred">{{fileSize.before}}</span>
          </span>
          <span class="flex-auto">
            压缩后大小：
            <span class="cgreen">{{fileSize.after}}</span>
          </span>
        </div>
      </div>
      <div class="preview-body">
        <div v-if="file">
          <p>
            压缩后
            <i class="el-icon-bottom"></i>
          </p>
          <el-image :preview-src-list="srcList" :src="compressUrl" style="width: 100%;" v-if="compressUrl"></el-image>
          <hr />
          <p>
            源文件
            <i class="el-icon-bottom"></i>
          </p>
          <el-image :preview-src-list="srcList" :src="sourceUrl" style="width: 100%;" v-if="sourceUrl"></el-image>
        </div>
      </div>
      <div class="drawer-footer flex">
        <el-button @click="model=false" class="flex-auto">取 消</el-button>
        <el-button :disabled="!file" @click="submitUpload(true)" class="flex-auto" type="danger">上传源文件</el-button>
        <el-button
          :disabled="!compressFile"
          @click="submitUpload(false)"
          class="flex-auto"
          type="primary"
        >上传压缩文件</el-button>
      </div>
    </div>
    <transition name="el-fade-in-linear" v-if="uploading">
      <div class="flex flex-column flex-center uploader-progress">
        <el-progress :percentage="uploadPercentage" :width="100" class="progress" type="circle"></el-progress>
        <el-button @click.stop="cancelUpload()" class="mg-t10" type="text">取消上传</el-button>
      </div>
    </transition>
  </el-drawer>
</template>

<script lang="ts">
import Compressor from 'compressorjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, computed, ref, reactive } from "vue";

const imgTypeList = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

export default defineComponent({
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'success', 'fail'],
  setup(props, { emit }) {
    const elUpload = ref()
    const uploading = ref(true)
    const file: any = ref(null)
    const compressFile: any = ref(null)
    const isUploadSource = ref(false)
    const quality = ref(80)
    const uploadPercentage = ref(0)
    const compressUrl = ref('')
    const srcList = ref<string[]>([])
    const sourceUrl = ref('')
    const fileSize = reactive({
      before: '0KB',
      after: '0KB'
    })

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    })

    const resetUpload = () => {
      elUpload.value.clearFiles();
      setTimeout(() => {
        Object.assign(this.$data, this.$options.data())
      }, 300);
    }
    const startUpload = () => {
      uploading.value = true;
    }
    const submitUpload = (uploadSource: boolean) => {
      if (!file.value) return
      if (!compressFile.value) return
      isUploadSource.value = uploadSource
      const realFile = isUploadSource.value ? file.value.raw : compressFile.value
      const isImg = imgTypeList.includes(realFile.type)
      const isLimit = realFile.size / 1024 <= 50;
      if (!isImg) {
        ElMessage.error('请上传图片');
        return false
      }
      if (isLimit) {
        elUpload.value.submit();
      } else {
        ElMessage.error('上传图片大小不能超过 50 K !');
        return false
      }
    }
    const changeFile = (file) => {
      file.value = file
      compressorFile(quality.value)
    }
    const uploadError = () => {
      // console.log(err);
      resetUpload()
      ElMessageBox.alert('网络繁忙，请稍后重试');
    }
    const handleProgress = (event, file) => {
      uploadPercentage.value = parseInt(file.percentage, 10);
    }
    const handleSuccess = () => {
      emit('success', compressUrl)
      if (uploadPercentage.value !== 100) uploadPercentage.value = 100;
      resetUpload()
      model.value = false
    }
    const cancelUpload = () => {
      if (!uploading.value) return;
      elUpload.value.abort();
      ElMessage({
        message: '已取消上传',
        type: 'warning'
      });
      return resetUpload();
    }
    const compressorFile = (v) => {
      if (!file.value) return
      srcList.value = []
      fileSize.before = Math.round(file.value.size / 1024 * 10) / 10 + 'KB';
      sourceUrl.value = URL.createObjectURL(file.value.raw);
      new Compressor(file.value.raw, {
        quality: v / 100,
        convertSize: 51200,  // png图片超过50KB时启用压缩，压缩后会转成jpg图片，失去透明度
        success: res => {
          compressFile.value = res
          compressUrl.value = URL.createObjectURL(res);
          fileSize.after = Math.round(res.size / 1024 * 10) / 10 + 'KB';
          srcList.value = [compressUrl.value, sourceUrl.value]
        },
        error: err => {
          compressUrl.value = ''
          compressFile.value = null
          fileSize.after = '0KB'
          emit('fail', err)
          console.log(err.message);
        },
      });
    }
    const beforeUpload = () => {
      if (!file.value) return
      if (!compressFile.value) return
      const realFile = isUploadSource.value ? file.value.raw : compressFile
      startUpload()
      return new Promise(resolve => {
        resolve(realFile)
      })
    }
    return {
      model, quality, fileSize, srcList, compressUrl, sourceUrl, uploading, compressFile, file,
      submitUpload, beforeUpload, compressorFile, cancelUpload, handleSuccess, handleProgress, uploadError, changeFile
    }
  }
})
</script>

<style scoped>
.drawer-content {
  padding: 20px;
  height: 100vh;
}
.drawer-content >>> .el-upload.el-upload--text,
.drawer-content >>> .el-upload-dragger {
  width: 100%;
  height: 120px;
}

.drawer-content >>> .el-upload-dragger .el-icon-upload {
  margin: 0;
  line-height: 1;
}
.drawer-content >>> .el-icon-circle-close {
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