const { $, BtnMenu } = window.wangEditor

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class ColorPicker extends BtnMenu {
  constructor(editor: any) {
    const $elem = $(
      `<div class="w-e-menu">
              <i class="w-e-icon-pencil2"></i>
          </div>`
    )
    super($elem, editor)
  }
  /**
   * 执行命令
   * @param value value
   */
  public command(value: string): void {
    const editor = this.editor
    const isEmptySelection = editor.selection.isSelectionEmpty()
    const $selectionElem = editor.selection.getSelectionContainerElem()?.elems[0]
    const isFont = $selectionElem?.nodeName.toLowerCase() !== 'p'
    const isSameColor = $selectionElem?.getAttribute('color') === value

    if (isEmptySelection) {
      if (isFont && !isSameColor) {
        const $elems = editor.selection.getSelectionRangeTopNodes(editor)
        editor.selection.createRangeByElem($elems[0])
        editor.selection.moveCursor($elems[0].elems[0])
      }
      // 插入空白选区
      editor.selection.createEmptyRange()
    }

    editor.cmd.do('foreColor', value)

    if (isEmptySelection) {
      // 需要将选区范围折叠起来
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  /**
   * 尝试修改菜单 active 状态
   */
  public tryChangeActive(): void {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    // this.active()

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}
export default ColorPicker