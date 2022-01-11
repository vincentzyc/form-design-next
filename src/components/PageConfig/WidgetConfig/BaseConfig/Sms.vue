<template>
  <div class="wg-col-config">
    <el-form-item label="显示类型">
      <el-radio-group v-model="selectWg.styleType">
        <el-radio-button :key="item.value" :label="item.value" v-for="item in selectWg.styleTypes">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="使用图片按钮">
      <el-switch v-model="selectWg.isImgBtn"></el-switch>
    </el-form-item>
    <el-form-item label="提示弹框配置" v-if="selectWg.dialog">
      <el-button @click="dialogVisible = true" size="mini" type="primary">配置弹框</el-button>
    </el-form-item>
    <el-form-item label="按钮间距" v-if="selectWg.style.hasOwnProperty('pxBtnPadding')">
      <el-input-number
        :max="30"
        :min="0"
        :step="1"
        @change="v => selectWg.style.btnPadding = v + 'px'"
        size="small"
        step-strictly
        v-model="selectWg.style.pxBtnPadding"
      />
    </el-form-item>
    <el-form-item label="按钮列表">
      <Draggable
        :group="{ name: 'options' }"
        ghostClass="ghost"
        handle=".move-icon"
        item-key="index"
        tag="ul"
        v-model="selectWg.smslist"
      >
        <template #item="{ index }">
          <li>
            <div class="col-itemlist">
              <i class="el-icon-menu move-icon"></i>
              <i @click="handleRemove(index)" class="el-icon-delete delect-icon"></i>
              <div class="flex pd5">
                <span class="width70 flex-none">收件人：</span>
                <el-input placeholder="请输入收件人" size="mini" v-model.trim.number="selectWg.smslist[index].addressee"></el-input>
              </div>
              <div class="flex pd5">
                <span class="width70 flex-none">短信内容：</span>
                <el-input
                  placeholder="请输入短信内容"
                  size="mini"
                  type="textarea"
                  v-model.trim="selectWg.smslist[index].content"
                ></el-input>
              </div>

              <div class="flex pd5" v-if="selectWg.isImgBtn">
                <span class="width70 flex-none">上传图片：</span>
                <FileUpload class="mg-t10" v-model:modelValue="selectWg.smslist[index].img" />
              </div>
              <div class="flex pd5" v-else>
                <span class="width70 flex-none">按钮文字：</span>
                <el-input placeholder="请输入按钮文字" size="mini" v-model.trim="selectWg.smslist[index].btnText"></el-input>
              </div>
            </div>
          </li>
        </template>
      </Draggable>
      <div style="margin-left: 22px;">
        <el-button @click="handleAdd()" type="text">添加选项</el-button>
      </div>
    </el-form-item>

    <el-dialog :close-on-click-modal="false" v-model="dialogVisible" width="700px">
      <div style="margin-top:-30px">
        <div class="wgbutton-dialog">
          <div class="dialog-header" v-show="selectWg.dialog.title">{{ selectWg.dialog.title }}</div>
          <div :style="{ textAlign: selectWg.dialog.messageAlign }" class="dialog-message">
            <p class="lh24">{{ selectWg.dialog.message }}</p>
            <p class="lh24 fs12" style="color:#ac242e">温馨提示：若不能自动调起短信页面，请手动发送内容"xxx"到"xxx"</p>
          </div>
          <div
            class="footer-buttons flex flex-center"
            v-if="selectWg.dialog.showCancelButton || selectWg.dialog.showConfirmButton"
          >
            <div
              :style="{ color: selectWg.dialog.cancelButtonColor }"
              class="flex-auto"
              style="border-right:1px solid #eee"
              v-if="selectWg.dialog.showCancelButton"
            >{{ selectWg.dialog.cancelButtonText }}</div>
            <div
              :style="{ color: selectWg.dialog.confirmButtonColor }"
              class="flex-auto"
              v-if="selectWg.dialog.showConfirmButton"
            >{{ selectWg.dialog.confirmButtonText }}</div>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="24" class="mg-b15">
            <p class="mg-b5">弹框内容</p>
            <el-input
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入弹框内容"
              type="textarea"
              v-model.trim="selectWg.dialog.message"
            ></el-input>
          </el-col>
          <el-col :span="12" class="mg-b15" style="height:75px">
            <p class="mg-b5">标题</p>
            <el-input placeholder="请输入标题" v-model.trim="selectWg.dialog.title"></el-input>
          </el-col>
          <el-col :span="12" class="mg-b15" style="height:75px">
            <p class="mg-b5">弹框内容对齐方式</p>
            <el-radio-group v-model="selectWg.dialog.messageAlign">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="center">居中对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="12" class="mg-b15" style="height:60px">
            <p class="mg-b5">显示确认按钮</p>
            <el-switch v-model="selectWg.dialog.showConfirmButton"></el-switch>
          </el-col>
          <el-col :span="12" class="mg-b15" style="height:60px">
            <p class="mg-b5">显示取消按钮</p>
            <el-switch v-model="selectWg.dialog.showCancelButton"></el-switch>
          </el-col>

          <template v-if="selectWg.dialog.showConfirmButton">
            <el-col :span="12" class="mg-b15" style="height:75px">
              <p class="mg-b5">确认按钮文字</p>
              <el-input placeholder="请输入确认按钮文字" v-model.trim="selectWg.dialog.confirmButtonText"></el-input>
            </el-col>
            <el-col :span="12" class="mg-b15" style="height:75px">
              <p class="mg-b5">确认按钮文字颜色</p>
              <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.dialog.confirmButtonColor" />
            </el-col>
          </template>
          <template v-if="selectWg.dialog.showCancelButton">
            <el-col :span="12" class="mg-b15" style="height:75px">
              <p class="mg-b5">取消按钮文字</p>
              <el-input placeholder="请输入取消按钮文字" v-model.trim="selectWg.dialog.cancelButtonText"></el-input>
            </el-col>
            <el-col :span="12" class="mg-b15" style="height:75px">
              <p class="mg-b5">取消按钮文字颜色</p>
              <el-color-picker :predefine="predefineColors" show-alpha v-model="selectWg.dialog.cancelButtonColor" />
            </el-col>
          </template>
        </el-row>
      </div>
      <div class="text-center mg-t20">
        <el-button @click="dialogVisible = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import FileUpload from '@/components/base/FileUpload.vue'
import Draggable from 'vuedraggable'
import { deepClone } from "@/utils/deep-clone";
import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'


const dialogVisible = ref(false)

const mainStore = useMainStore()
const store = useStore()
const selectWg = computed(() => store.state.selectWg)
const { predefineColors } = storeToRefs(mainStore)

const handleRemove = (index: number) => {
  selectWg.value.smslist.splice(index, 1)
}
const handleAdd = () => {
  const newItem =
    selectWg.value.smslist.length > 0
      ? deepClone(selectWg.value.smslist[selectWg.value.smslist.length - 1])
      : {
        addressee: "收件人1",
        content: "短信内容1",
        btnText: "发送短信1",
        img: ""
      }
  selectWg.value.smslist.push(newItem)
}

</script>

<style lang="stylus" scoped>
.wgbutton-dialog {
  width: 300px;
  margin: 0 auto 20px auto;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;

  .dialog-header {
    padding-top: 15px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }

  .dialog-message {
    padding: 15px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
  }

  .footer-buttons {
    border-top: 1px solid #eee;
    width: 100%;
    line-height: 40px;
  }
}
</style>