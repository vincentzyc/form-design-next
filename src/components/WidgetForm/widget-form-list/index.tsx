
import { defineComponent, computed, nextTick, resolveComponent } from "vue";
import { useStore } from 'vuex';
import { deepClone } from '@/utils/deep-clone';

import WgStaticText from './WgStaticText'
import WgButton from './WgButton'

export default defineComponent({
  name: "WidgetFormList",
  components: {
    WgStaticText,
    WgButton

    //下面是按需加载，组件多的话可选择此方式
    // WgStaticText: () => import('./WgStaticText'),
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isPopup: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:data', 'emptied'],
  setup(props, { emit }) {
    const store = useStore()
    const selectWg = computed(() => store.state.selectWg)
    const clonebtn = computed(() => {
      if (selectWg.value.positionFixed && selectWg.value.positionFixed !== 'auto') return false;
      if (selectWg.value.fixedBottom) return false;
      if (Array.isArray(selectWg.value.list)) return false;
      if (selectWg.value.key === props.item.key) return true;
      return false;
    })
    const wgViewStyle = computed(() => {
      if (Array.isArray(props.item.list)) return { ...props.item.style, backgroundImage: `url(${props.item.backgroundImage})` };
      return {}
    })
    const wgViewClass = computed(() =>
      [props.item.wgClassName ? props.item.wgClassName : 'widget-view', { active: selectWg.value.key === props.item.key }]
    )
    function handleSelectWidget(event) {
      event.stopPropagation();
      store.commit('setSelectWg', props.data[props.index]);
      store.commit('setConfigTab', "widget");
    }
    async function handleWidgetDelete(event) {
      event.stopPropagation();
      if (props.data.length - 1 === props.index) {
        if (props.index === 0) {
          props.isPopup ? emit('emptied') : store.commit('setSelectWg', {})
        } else {
          store.commit('setSelectWg', props.data[props.index - 1])
        }
      } else {
        store.commit('setSelectWg', props.data[props.index + 1])
      }
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 1)
      emit('update:data', newData)
    }
    async function handleWidgetClone(event) {
      event.stopPropagation();
      const cloneData = deepClone(props.data[props.index] as Record<string, any>[])
      cloneData.key = cloneData.type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 0, cloneData)
      emit('update:data', newData)
      store.commit('setSelectWg', props.data[props.index + 1])
    }

    const renderDragIcon = () => Array.isArray(props.item.list) && <i class="el-icon-rank"></i>

    const renderDeleteIcon = () => selectWg.value.key === props.item.key && (
      <span
        onClick={handleWidgetDelete}
        class="widget-action-btn widget-action-delete el-icon-delete"
        title="删除"
      ></span>
    )

    const renderCloneIcon = () => clonebtn.value && (
      <span
        onClick={handleWidgetClone}
        class="widget-action-btn widget-action-clone el-icon-document-copy"
        title="复制"
      ></span>
    )

    return () => {
      const Widget: any = resolveComponent('Wg' + props.item.type)

      return (
        <div
          class={wgViewClass.value}
          style={wgViewStyle.value}
          onClick={handleSelectWidget}
        >
          {renderDragIcon()}
          <Widget item={props.item} />
          {renderDeleteIcon()}
          {renderCloneIcon()}
        </div>
      )
    }
  }
})