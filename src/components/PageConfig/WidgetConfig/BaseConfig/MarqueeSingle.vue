<template>
  <el-form-item label="滚动间隔（秒）" v-if="selectWg.hasOwnProperty('durationTime')">
    <el-input-number
      :max="6"
      :min="1"
      :step="0.5"
      size="small"
      step-strictly
      v-model="selectWg.durationTime"
    />
  </el-form-item>

  <el-form-item label="选项" v-if="selectWg.hasOwnProperty('textList')">
    <Draggable
      :group="{ name:'options'}"
      ghostClass="ghost"
      handle=".move-icon"
      item-key="index"
      tag="ul"
      v-model="selectWg.textList"
    >
      <template #item="{index}">
        <li>
          <div class="flex align-middle mg-b10">
            <el-input size="small" v-model="selectWg.textList[index].text"></el-input>
            <el-radio-group class="flex-none mg-l5" size="mini" v-model="selectWg.textList[index].sex">
              <el-radio-button label="man">男</el-radio-button>
              <el-radio-button label="woman">女</el-radio-button>
            </el-radio-group>
            <i class="el-icon-menu move-icon"></i>
            <i @click="handleOptionsRemove(index)" class="el-icon-delete delect-icon"></i>
          </div>
        </li>
      </template>
    </Draggable>
    <div class="mg-l10">
      <el-button @click="handleAddOption()" type="text">添加</el-button>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Draggable from 'vuedraggable'
import { useStore } from "vuex";
import { deepClone } from "@/utils/deep-clone";

export default defineComponent({
  components: {
    Draggable
  },
  setup() {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)

    const handleOptionsRemove = (index: number) => {
      selectWg.value.textList.splice(index, 1)
    }
    const handleAddOption = () => {
      let arrLength = selectWg.value.textList.length;
      let newItem =
        arrLength > 0
          ? deepClone(selectWg.value.textList[arrLength - 1])
          : ''
      selectWg.value.textList.push(newItem)
    }

    return {
      selectWg,
      handleOptionsRemove, handleAddOption
    }
  }
})
</script>