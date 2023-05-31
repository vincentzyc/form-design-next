import { Tabs } from '@/assets/js/widget/widgets-types';
import { getNanoid } from '@/utils';
import { deepClone } from '@/utils/deep-clone';

const CustomWidgets = 'Custom_Widgets';

/**
 * 获取 list 中指定组件类型的组件
 * @param {Array} list 组件数组列表
 * @param {String} wgType 组件类型
 * @param {Boolean} isAllWg 是否获取这种组件类型的全部组件
 * @return 单个组件obj || false || 组件列表 [obj]
 */
export function pageHasWidget(
  list: Record<string, any>[],
  wgType: string,
  isAllWg = false
): Record<string, any> | Record<string, any>[] | false {
  if (!Array.isArray(list) || list.length === 0) return false;
  let temWg: any[] = [];
  for (const item of list) {
    if (item.type === wgType) {
      if (!isAllWg) return item;
      temWg.push(item);
      continue;
    }
    if (Array.isArray(item.list) && item.list.length > 0) {
      const hasWidget =
        item.type === Tabs
          ? pageHasWidget(item.list[item.value]?.list || [], wgType)
          : pageHasWidget(item.list, wgType);
      if (hasWidget) {
        if (isAllWg) {
          temWg = temWg.concat(hasWidget);
          continue;
        } else {
          return hasWidget;
        }
      } else continue;
    }
    if (Array.isArray(item.popupList) && item.popupList.length > 0) {
      const hasWidget = pageHasWidget(item.popupList, wgType);
      if (hasWidget) {
        if (isAllWg) {
          temWg = temWg.concat(hasWidget);
          continue;
        } else {
          return hasWidget;
        }
      } else continue;
    }
  }
  if (isAllWg && temWg.length > 0) return temWg;
  return false;
}

/**
 * 在对象 obj 中根据指定的键名 objKey 获取对应的值
 * @param {Object} obj 对象
 * @param {String} objKey 键名字符串，例如 'a.b.2.c'
 * @return {any} 返回获取的值
 */
export function getValueByKey(obj, objKey) {
  const keyList = objKey.split('.');
  return keyList.reduce((pre, item) => pre[item], obj);
}
/**
 * 在对象 obj 中根据指定的键名 objKey 设置对应的属性值
 * @param {Object} obj 待修改的对象
 * @param {String} objKey 键名字符串，例如 'a.b.2.c'
 * @param {*} value 要修改为的属性值
 * @return {Boolean} 返回修改结果
 */
export function setValueByKey(obj, objKey, value) {
  const keyList = objKey.split('.');
  const lastKey = keyList.pop();
  const targetObj = keyList.reduce((pre, item) => pre[item], obj);
  if (!Object.prototype.hasOwnProperty.call(targetObj, lastKey)) {
    return false;
  }
  targetObj[lastKey] = value;
  return true;
}
/**
 * 自定义组件替换到组件列表
 * @param {Array} list 组件列表
 * @param {Number} index 替换的组件index
 */
export function widgetsMerge(list, index) {
  const newWgs = list[index];
  if (newWgs.type === CustomWidgets) list.splice(index, 1, ...newWgs.customList);
  return list;
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
/**
 * 修改拖拽后自定义组件数据
 * @param {Object} obj 自定义组件obj
 * @returns 更新后自定义组件数据
 */
export function customWidgetsCloneData(obj) {
  obj.customList = updateWgKey(obj.customList);
  obj.type = CustomWidgets;
  return deepClone(obj);
}

/**
 * 判断是否允许自定义组件拖入
 * @param {Object} dragWg 选择的自定义组件
 * @param {Array} arr 组件有哪些keys禁止拖入
 * @returns {Boolean}
 */
export function allowCustomWgPut(dragWg, arr = ['list']) {
  if (dragWg.type === CustomWidgets) {
    const isListWg = dragWg.customList.find(v => {
      for (const key of arr) {
        if (Array.isArray(v[key]) && v[key].length > 0) return true;
      }
      return false;
    });
    if (isListWg) return false;
  }
  return true;
}
