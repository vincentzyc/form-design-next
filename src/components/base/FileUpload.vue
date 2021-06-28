<template>
  <div class="file-upload-wrapper">
    <el-upload
      :before-upload="beforeAvatarUpload"
      :data="uploadData"
      :on-error="uploadError"
      :on-progress="handleProgress"
      :on-success="handleAvatarSuccess"
      :ref="upload"
      :show-file-list="false"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="avatar-uploader"
    >
      <img :src="modelValue" :style="{height:height,width:width}" class="avatar" v-if="showImg" />
      <video :src="modelValue" :style="{height:height,width:width}" class="avatar" v-else-if="showVideo" />
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>
      <i @click.stop="removeFile()" class="el-icon-close avatar-close-icon" v-show="modelValue"></i>
    </el-upload>
    <el-button @click="drawer=true" type="primary" v-if="showImgCompressor">压缩上传</el-button>
    <ImgUpload @fail="compressFail" @success="compressSuccess" v-model:modelValue="drawer" />
    <transition name="el-fade-in-linear" v-if="uploading">
      <div class="flex flex-column flex-center uploader-progress">
        <el-progress :percentage="uploadPercentage" :width="100" class="progress" type="circle"></el-progress>
        <el-button @click.stop="cancelUpload()" class="mg-t10" type="text">取消上传</el-button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import ImgUpload from './ImgUpload/index.vue'
import { defineComponent, computed, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';

const TYPE_IMG = 'img', TYPE_VIDEO = 'video';

const videoTypeList = ['video/mp4']
const imgTypeList = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

export default defineComponent({
  name: "FileUpload",
  components: {
    ImgUpload
  },
  props: {
    modelValue: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: TYPE_IMG
    },
    height: {
      type: String,
      default: '100px'
    },
    width: {
      type: String,
      default: '100px'
    }
  },
  setup(props, { emit }) {
    const drawer = ref(false)
    const uploading = ref(false)
    const uploadPercentage = ref(0)
    const upload = ref()
    const uploadData = reactive({
      yourData: "yunyi"
    })
    const showImgCompressor = computed(() => props.type === TYPE_IMG)
    const showImg = computed(() => props.modelValue && props.type === TYPE_IMG)
    const showVideo = computed(() => props.modelValue && props.type === TYPE_VIDEO)

    const removeFile = () => {
      emit('update:modelValue', '');
    }
    const resetUpload = () => {
      uploading.value = false;
      uploadPercentage.value = 0;
    }
    const startUpload = () => {
      uploading.value = true;
    }
    const cancelUpload = () => {
      if (!uploading.value) return;
      upload.value.abort();
      ElMessage({
        message: '已取消上传',
        type: 'warning'
      });
      return resetUpload();
    }
    const handleAvatarSuccess = (res: any, file: any) => {
      emit('update:modelValue', URL.createObjectURL(file.raw));
      if (uploadPercentage.value !== 100) uploadPercentage.value = 100;
      setTimeout(() => {
        resetUpload()
      }, 500);
    }
    const handleProgress = (event: Event, file: any) => {
      uploadPercentage.value = parseInt(file.percentage, 10);
    }
    const imgUpload = (file: File) => {
      const isImg = imgTypeList.includes(file.type)
      const isLt1M = file.size / 1024 <= 50;
      if (!isImg) {
        ElMessage.error('请上传图片');
        return false
      }
      if (isLt1M) {
        startUpload()
        return true
      } else {
        ElMessage.error('上传图片大小不能超过 30 K !');
        return false
      }
    }
    const videoUpload = (file: File) => {
      const isVideo = videoTypeList.includes(file.type)
      const isLt200M = file.size / 1024 / 1024 <= 100;
      if (!isVideo) {
        ElMessage.error('请上传视频文件');
        return false
      }
      if (isLt200M) {
        startUpload()
        return true
      } else {
        ElMessage.error('上传视频大小不能超过 100 M !');
        return false
      }
    }
    const compressSuccess = (compressUrl: string) => {
      emit('update:modelValue', compressUrl);
    }
    const compressFail = (err: any) => {
      // eslint-disable-next-line
      console.log(err);
    }
    const uploadError = () => {
      // console.log(err);
      resetUpload()
      ElMessageBox.alert('网络繁忙，请稍后重试');
    }
    const beforeAvatarUpload = (file: File) => {
      if (props.type === TYPE_IMG) return imgUpload(file)
      if (props.type === TYPE_VIDEO) return videoUpload(file)
      return false
    }

    return {
      uploadData, uploading, uploadPercentage, upload, drawer,
      showImg, showVideo, showImgCompressor,
      removeFile, resetUpload, startUpload, cancelUpload, beforeAvatarUpload,
      handleProgress, imgUpload, videoUpload, handleAvatarSuccess, uploadError,
      compressSuccess, compressFail
    }
  }
})
</script>

<style lang="stylus">
.file-upload-wrapper {
  .avatar-uploader {
    width: 102px;
    height: 102px;
    margin-bottom: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;

    .avatar-close-icon {
      display: block;
    }
  }

  .uploader-progress {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.7);

    .el-progress__text {
      color: #fff;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar-close-icon {
    display: none;
    position: absolute;
    right: -8px;
    top: -8px;
    color: #409eff;
    font-size: 18px;
    border: 1px dashed #409eff;
    border-radius: 18px;
    transition: 0.3s;
    background-color: #fff;

    &:hover {
      transform: scale(1.3);
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
