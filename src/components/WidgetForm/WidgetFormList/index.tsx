import { defineComponent, computed, nextTick, resolveComponent } from "vue";
import { useMainStore } from '@/pinia'
import { storeToRefs } from "pinia";
import { deepClone } from '@/utils/deep-clone';
import { getUuid } from "@/utils";
import { Delete, DocumentCopy, Rank } from '@element-plus/icons-vue'

import WgStaticText from './WgStaticText'
import WgButton from './WgButton'
import WgVideoPlay from './WgVideoPlay'
import WgImgShow from './WgImgShow'
import WgImgSlide from './WgImgSlide'
import WgSplitLine from './WgSplitLine'
import WgPhone from './WgPhone'
import WgInput from './WgInput'
import WgSelect from './WgSelect'
import WgAgreement from './WgAgreement'
import WgRandomCode from './WgRandomCode'
import WgSwitch from './WgSwitch'
import WgCheckbox from './WgCheckbox'
import WgSms from './WgSms'
import WgWechat from './WgWechat'
import WgChildList from './WgChildList'
import WgMarquee from './WgMarquee'
import WgMarqueeSingle from './WgMarqueeSingle'
import WgHPicker from './WgHPicker'

export default defineComponent({
  name: "WidgetFormList",
  components: {
    WgStaticText,
    WgButton,
    WgVideoPlay,
    WgImgShow,
    WgImgSlide,
    WgSplitLine,
    WgDatePicker: WgSelect,
    WgPhone,
    WgInput,
    WgSelect,
    WgAgreement,
    WgRandomCode,
    WgSwitch,
    WgCheckbox,
    WgSms,
    WgWechat,
    WgChildList,
    WgMarquee,
    WgMarqueeSingle,
    WgHPicker

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
    const mainStore = useMainStore()
    const { selectWg } = storeToRefs(mainStore)

    const clonebtn = computed(() => {
      if (selectWg.value?.positionFixed && selectWg.value?.positionFixed !== 'auto') return false;
      if (selectWg.value?.fixedBottom) return false;
      if (Array.isArray(selectWg.value?.list)) return false;
      if (selectWg.value?.key === props.item.key) return true;
      return false;
    })
    const wgViewStyle = computed(() => {
      if (Array.isArray(props.item.list)) return { ...props.item.style, backgroundImage: `url(${props.item.backgroundImage})` };
      return {}
    })
    const wgViewClass = computed(() =>
      [props.item.wgClassName ? props.item.wgClassName : 'widget-view', { active: selectWg.value?.key === props.item.key }]
    )
    function handleSelectWidget(event: Event) {
      event.stopPropagation();
      mainStore.setSelectWg(props.data[props.index] as Record<string, any>)
      mainStore.setConfigTab("widget")
    }
    async function handleWidgetDelete(event: Event) {
      event.stopPropagation();
      if (props.data.length - 1 === props.index) {
        if (props.index === 0) {
          props.isPopup ? emit('emptied') : mainStore.setSelectWg({})
        } else {
          mainStore.setSelectWg(props.data[props.index - 1] as Record<string, any>)
        }
      } else {
        mainStore.setSelectWg(props.data[props.index + 1] as Record<string, any>)
      }
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 1)
      emit('update:data', newData)
    }
    async function handleWidgetClone(event: Event) {
      event.stopPropagation();
      const cloneData = deepClone(props.data[props.index] as Record<string, any>[])
      // cloneData.key = cloneData.type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      cloneData.key = cloneData.type + '_' + getUuid()
      await nextTick()
      const newData = props.data
      newData.splice(props.index, 0, cloneData)
      emit('update:data', newData)
      mainStore.setSelectWg(props.data[props.index + 1] as Record<string, any>)
    }

    const renderDragIcon = () => Array.isArray(props.item.list) && (
      <el-icon class="el-icon-rank">
        <Rank />
      </el-icon>
    )

    const renderDeleteIcon = () => selectWg.value?.key === props.item.key && (
      <el-icon size={20} onClick={handleWidgetDelete} title="删除" class="widget-action-btn widget-action-delete el-icon-delete">
        <Delete />
      </el-icon>
    )

    const renderCloneIcon = () => clonebtn.value && (
      <el-icon size={20} onClick={handleWidgetClone} title="复制" class="widget-action-btn widget-action-clone el-icon-document-copy">
        <DocumentCopy />
      </el-icon>

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