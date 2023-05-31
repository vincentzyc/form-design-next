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
          <template v-if="level2.value === 'customWidget'">
            <template v-if="customWidgets && customWidgets.length > 0">
              <p class="cred text-center">目前只对当前浏览器生效，其它浏览器需重新添加</p>
              <Draggable
                :clone="customWidgetsClone"
                :group="{ name: 'widget', pull: 'clone', put: false }"
                :list="customWidgets"
                :sort="false"
                @end="dragEnd"
                filter=".disdraggable"
                ghostClass="ghost"
                tag="ul"
              >
                <li v-for="(customWg, index) in customWidgets" :key="customWg.name" class="form-edit-widget-label">
                  {{ customWg.name }}
                  <i @click.stop="deleteCustomWg(index, customWg.name)" class="el-icon-close wg-close-icon"></i>
                </li>
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
import { getLocalStorage } from '@/utils/storage';
import { onCustomWidgetsSave } from '@/bus';
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
import { useMainStore } from '@/pinia';
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import { customWidgetsCloneData } from '@/assets/js/pageDataUtil';

const CustomWidgetsKey = 'CustomWidgets';

const mainStore = useMainStore();
const { pageData } = storeToRefs(mainStore);

const widgetLevel2 = ref(widgetLevel1[0]);

const customWidgets = ref([]);

function customWidgetsClone(obj: Record<string, unknown>) {
  const newObj = customWidgetsCloneData(obj);
  mainStore.setDragWg(newObj);
  return newObj;
}

function deleteCustomWg(index: number, name: string) {
  ElMessageBox.confirm('确认删除自定义组件' + name, '提示', {
    type: 'warning',
  })
    .then(() => {
      // if (this.$refs.customWidget) {
      //   const deleteRes = this.$refs.customWidget.deleteLocalWg(this.pageData.industry, index);
      //   if (deleteRes) {
      customWidgets.value.splice(index, 1);
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      //   } else {
      //     ElMessage({
      //       type: 'error',
      //       message: '删除失败',
      //     });
      //   }
      // }
    })
    .catch(() => null);
}

function getLocalCustomWidgets() {
  let customWidgets = getLocalStorage(CustomWidgetsKey);
  if (customWidgets) {
    customWidgets.value = customWidgets;
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

function cloneData(obj: Record<string, unknown>) {
  const newObj = deepClone(obj);
  newObj.key = newObj.type + '_' + getNanoid();
  mainStore.setDragWg(newObj);
  return newObj;
}

onMounted(() => {
  onCustomWidgetsSave(message => {
    console.log(message);
    getLocalCustomWidgets()
  });
});
</script>
