<template>
  <el-tooltip
    effect="dark"
    content="所有组件必须是正常显示位置的组件，有自定义、底部悬浮、吸顶悬浮的组件无法保存"
    placement="top"
    :disabled="!disabledBtn"
  >
    <span style="margin-right: 12px">
      <el-button @click="handleCustomWidget()" :icon="Star" type="text" :disabled="disabledBtn"
        >保存为自定义组件</el-button
      >
    </span>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Star } from '@element-plus/icons-vue';
import { getCurrentInstance, computed } from 'vue';

interface TypeCustomWidgetItem {
  name: string;
  customList: Record<string, any>;
}

interface Props {
  pageData: Record<string, any> | null;
}

const CustomWidgetsKey = 'CustomWidgets';

const vm = getCurrentInstance()?.proxy;

const props = withDefaults(defineProps<Props>(), {
  pageData: () => ({}),
});

const emit = defineEmits(['success']);

defineExpose({ deleteLocalWg });

const disabledBtn = computed(() => {
  if (props.pageData && Array.isArray(props.pageData.list) && props.pageData.list.length > 0) {
    const hadSticky = props.pageData.list.some(v => v.positionSticky);
    if (hadSticky) return true;
    if (Array.isArray(props.pageData.fixedBottom) && props.pageData.fixedBottom.length > 0) return true;
    if (Array.isArray(props.pageData.fixedCustom) && props.pageData.fixedCustom.length > 0) return true;
    return false;
  } else {
    return true;
  }
});

function handleCustomWidget() {
  vm?.$bus.emit('formDesign_savePage');
  if (props.pageData && Array.isArray(props.pageData.list) && props.pageData.list.length > 0) {
    ElMessageBox.prompt('请输入自定义组件名称', '提示', {
      inputPlaceholder: '支持输入中文、英文、数字、横杠和下划线,长度不超过20',
      showClose: false,
      inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,20}$/,
      inputErrorMessage: '格式不正确,支持中文、英文、数字、横杠和下划线,长度不超过20',
    })
      .then(({ value }) => {
        saveCustomWidget(value);
      })
      .catch(() => null);
  } else {
    ElMessage({
      type: 'error',
      message: '请拖入正常显示位置的组件，自定义、底部悬浮、吸顶悬浮的组件不支持',
    });
  }
}
function saveCustomWidget(name: string) {
  if (!props.pageData) return;
  const customWidgetItem: TypeCustomWidgetItem = {
    name: name,
    customList: props.pageData.list,
  };
  save2Local(customWidgetItem);
}
function deleteLocalWg(index: number) {
  let customWidgets = getLocalStorage(CustomWidgetsKey);
  if (customWidgets) {
    if (Array.isArray(customWidgets) && customWidgets.length > 0) {
      customWidgets.splice(index, 1);
      setLocalStorage(CustomWidgetsKey, customWidgets);
      return true;
    } else {
      return false;
    }
  }
  return false;
}
async function save2Local(customWidgetItem: TypeCustomWidgetItem) {
  let customWidgets: TypeCustomWidgetItem[] = getLocalStorage(CustomWidgetsKey);
  if (customWidgets) {
    if (Array.isArray(customWidgets) && customWidgets.length > 0) {
      const newWgs = await uniWidgets(customWidgets, customWidgetItem);
      if (newWgs) {
        customWidgets = newWgs;
      } else {
        return;
      }
    } else {
      customWidgets = [customWidgetItem];
    }
  } else {
    customWidgets = [customWidgetItem];
  }
  setLocalStorage(CustomWidgetsKey, customWidgets);
  ElMessage({
    type: 'success',
    message: '保存成功!',
  });
  emit('success');
}
function uniWidgets(
  customWidgets: TypeCustomWidgetItem[],
  customWidgetItem: TypeCustomWidgetItem
): TypeCustomWidgetItem[] | Promise<TypeCustomWidgetItem[] | false> {
  const wgsIndex = customWidgets.findIndex(v => v.name === customWidgetItem.name);
  if (wgsIndex > -1) {
    return new Promise(resolve => {
      ElMessageBox.confirm('已存在相同名称的自定义组件, 是否覆盖?', '提示', {
        type: 'warning',
      })
        .then(() => {
          customWidgets[wgsIndex] = customWidgetItem;
          resolve(customWidgets);
        })
        .catch(() => resolve(false));
    });
  } else {
    customWidgets.push(customWidgetItem);
    return customWidgets;
  }
}
</script>
