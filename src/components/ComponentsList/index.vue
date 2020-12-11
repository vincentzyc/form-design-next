<template>
  <div class="flex components-list">
    <div class="flex flex-column flex-none components-title">
      <el-button
        :key="item.value"
        :type="item.value===widgetLevel2.value?'primary':'text'"
        @click="handleWidget(item)"
        round
        size="small"
        v-for="item in widgetLevel1"
      >{{item.name}}</el-button>
    </div>
    <ul class="flex-auto components-content">
      <div :key="level1.value" v-for="level1 in widgetLevel1" v-show="level1.value===widgetLevel2.value">
        <li :key="level2.value" v-for="level2 in level1.data">
          <h4 class="widget-title">{{level2.name}}</h4>
          <Draggable
            :clone="cloneData"
            :filter="level2.dragOnce?'.disdraggable':''"
            :group="{ name:'widget', pull:'clone', put:false }"
            :sort="false"
            @end="dragEnd"
            ghostClass="ghost"
            item-key="type"
            tag="ul"
            v-model="level2.data"
          >
            <template #item="{element}">
              <li :class="{disdraggable:disFormList(element)}" class="form-edit-widget-label">
                <img
                  :alt="element.name"
                  :src="BASE_URL+'static/img/widget/'+level1.value+'/'+element.type+'.jpg'"
                />
              </li>
            </template>
          </Draggable>
        </li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Draggable from 'vuedraggable'
import { useStore } from "vuex";
import { hasKey } from "@/utils/index"
import { deepClone } from "@/utils/deep-clone"
import widgetLevel1 from '@/assets/js/widget'


export default defineComponent({
  name: 'ComponentsList',
  components: { Draggable },
  setup() {
    const store = useStore()

    const pageData = computed(() => store.state.pageData)

    const widgetLevel2 = ref(widgetLevel1[0])

    function handleWidget(item) {
      widgetLevel2.value = item;
    }
    function dragEnd() {
      store.commit('setDragWg', null)
    }

    function disFormList(wgItem: Record<string, unknown>) {
      // 阻止组件嵌套
      if (!hasKey(wgItem, 'list')) return false;
      if (pageData.value.list) {
        return (pageData.value.list.some(v => {
          return v.type === wgItem.type;
        }))
      }
      return false
    }

    function cloneData(obj: Record<string, unknown>) {
      const elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000);
      const newObj = deepClone(obj);
      newObj.key = newObj.type + '_' + elKey;
      store.commit('setDragWg', newObj)
      return newObj;
    }

    return {
      widgetLevel1,
      widgetLevel2,
      handleWidget,
      dragEnd,
      disFormList,
      cloneData
    }
  }
})
</script>