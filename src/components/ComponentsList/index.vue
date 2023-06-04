<template>
  <div class="flex components-list">
    <div class="flex flex-column flex-none components-title">
      <el-button
        :key="item.value"
        :type="item.value === widgetLevel2.value ? 'primary' : 'text'"
        @click="handleWidget(item)"
        round
        size="small"
        v-for="item in widgetLevel1"
        >{{ item.name }}</el-button
      >
    </div>
    <div class="flex-auto components-content">
      <ul :key="level1.value" v-for="level1 in widgetLevel1" v-show="level1.value === widgetLevel2.value">
        <li :key="level2.value" v-for="level2 in level1.data">
          <template v-if="level2.value === CustomWidget">
            <template v-if="customWidgets && customWidgets.length > 0">
              <Draggable
                :clone="customWidgetsClone"
                :group="{ name: 'widget', pull: 'clone', put: false }"
                :sort="false"
                @end="dragEnd"
                ghostClass="ghost"
                item-key="name"
                tag="ul"
                v-model="customWidgets"
              >
                <template #item="{ index, element }">
                  <li class="form-edit-widget-label">
                    {{ element.name }}
                    <el-icon class="el-icon-close wg-close-icon" @click.stop="deleteCustomWg(index, element.name)">
                      <CircleClose />
                    </el-icon>
                  </li>
                </template>
              </Draggable>
            </template>
            <p v-else class="text-center"> 空空如也 </p>
          </template>
          <template v-else>
            <h4 class="widget-title">{{ level2.name }}</h4>
            <Draggable
              :clone="cloneData"
              :filter="level2.dragOnce ? '.disdraggable' : ''"
              :group="{ name: 'widget', pull: 'clone', put: false }"
              :sort="false"
              @end="dragEnd"
              ghostClass="ghost"
              item-key="type"
              tag="ul"
              v-model="level2.data"
            >
              <template #item="{ element }">
                <li :class="{ disdraggable: disFormList(element) }" class="form-edit-widget-label">
                  <img
                    :alt="element.name"
                    :src="BASE_URL + 'static/img/widget/' + level1.value + '/' + element.type + '.jpg'"
                  />
                </li>
              </template>
            </Draggable>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ComponentsList',
});
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Draggable from 'vuedraggable';
import { getNanoid, hasKey } from '@/utils/index';
import { deepClone } from '@/utils/deep-clone';
import widgetLevel1 from '@/assets/js/widget';
import { CustomWidget } from '@/assets/js/widget/widgets-types';
import { useMainStore } from '@/pinia';
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { onCustomWidgetsSave } from '@/bus';
import { CircleClose } from '@element-plus/icons-vue';

const CustomWidgetsKey = 'CustomWidgets';

interface TypeCustomWidgetItem {
  name: string;
  customList: Record<string, any>;
}

const mainStore = useMainStore();
const { pageData } = storeToRefs(mainStore);

const widgetLevel2 = ref(widgetLevel1[0]);

const customWidgets = ref<TypeCustomWidgetItem[]>([]);

function deleteCustomWg(index: number, name: string) {
  ElMessageBox.confirm('确认删除自定义组件' + name, '提示', {
    type: 'warning',
  })
    .then(() => {
      const deleteRes = deleteLocalWg(index);
      if (deleteRes) {
        customWidgets.value.splice(index, 1);
        ElMessage({
          type: 'success',
          message: '删除成功!',
        });
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败',
        });
      }
    })
    .catch(() => null);
}

function deleteLocalWg(index: number) {
  let localCustomWidgets = getLocalStorage(CustomWidgetsKey);
  if (localCustomWidgets) {
    localCustomWidgets.splice(index, 1);
    setLocalStorage(CustomWidgetsKey, localCustomWidgets);
    return true;
  } else {
    return false;
  }
}

function getLocalCustomWidgets() {
  let localCustomWidgets = getLocalStorage(CustomWidgetsKey);
  if (localCustomWidgets) {
    customWidgets.value = localCustomWidgets;
  }
}

function handleWidget(item: any) {
  widgetLevel2.value = item;
}
function dragEnd() {
  mainStore.setDragWg(null);
}

function disFormList(wgItem: Record<string, unknown>) {
  // 阻止组件嵌套
  if (!hasKey(wgItem, 'list')) return false;
  if (pageData.value?.list) {
    return pageData.value.list.some(v => {
      return v.type === wgItem.type;
    });
  }
  return false;
}
/**
 * 更新组件key
 * @param {Array} arr 组件列表
 * @returns 组件列表
 */
function updateWgKey(arr) {
  arr.forEach(wg => {
    if (wg.key) wg.key = wg.type + '_' + getNanoid();
    if (wg.list) wg.list = updateWgKey(wg.list);
    if (wg.popupList) wg.popupList = updateWgKey(wg.popupList);
  });
  return arr;
}

function customWidgetsClone(obj: Record<string, unknown>) {
  obj.customList = updateWgKey(obj.customList);
  obj.type = CustomWidget;
  const newObj = deepClone(obj);
  mainStore.setDragWg(newObj);
  return newObj;
}
function cloneData(obj: Record<string, unknown>) {
  const newObj = deepClone(obj);
  newObj.key = newObj.type + '_' + getNanoid();
  mainStore.setDragWg(newObj);
  return newObj;
}

onMounted(() => {
  getLocalCustomWidgets();
  onCustomWidgetsSave(() => getLocalCustomWidgets());
});
</script>
