<template>
  <el-tooltip
    effect="dark"
    content="所有组件必须是正常显示位置的组件，有自定义、底部悬浮、吸顶悬浮的组件无法保存"
    placement="top"
    :disabled="!disabledBtn"
  >
    <span>
      <el-button @click="handleCustomWidget()" icon="el-icon-star-off" size="medium" type="text" :disabled="disabledBtn"
        >保存为自定义组件</el-button
      >
    </span>
  </el-tooltip>
</template>

<script>
const CustomWidgetsKey = 'CustomWidgets';

export default {
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    disabledBtn() {
      if (Array.isArray(this.pageData.list) && this.pageData.list.length > 0) {
        const hadSticky = this.pageData.list.some(v => v.positionSticky);
        if (hadSticky) return true;
        if (Array.isArray(this.pageData.fixedBottom) && this.pageData.fixedBottom.length > 0) return true;
        if (Array.isArray(this.pageData.fixedCustom) && this.pageData.fixedCustom.length > 0) return true;
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    handleCustomWidget() {
      this.$root.$emit('createh5_savePage');
      if (Array.isArray(this.pageData.list) && this.pageData.list.length > 0) {
        this.$prompt('请输入自定义组件名称', '提示', {
          inputPlaceholder: '支持输入中文、英文、数字、横杠和下划线,长度不超过20',
          showClose: false,
          inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,20}$/,
          inputErrorMessage: '格式不正确,支持中文、英文、数字、横杠和下划线,长度不超过20',
        })
          .then(({ value }) => {
            this.saveCustomWidget(value);
          })
          .catch(() => {});
      } else {
        this.$message({
          type: 'error',
          message: '请拖入正常显示位置的组件，自定义、底部悬浮、吸顶悬浮的组件不支持',
        });
      }
    },
    saveCustomWidget(name) {
      const industry = this.pageData.industry;
      const customWidgetItem = {
        name: name,
        customList: this.pageData.list,
      };
      this.save2Local(customWidgetItem, industry);
    },
    deleteLocalWg(industry, index) {
      let customWidgets = this.$util.getLStorage(CustomWidgetsKey);
      if (customWidgets) {
        const industryCustomWidgets = customWidgets[industry];
        if (Array.isArray(industryCustomWidgets) && industryCustomWidgets.length > 0) {
          industryCustomWidgets.splice(index, 1);
          this.$util.setLStorage(CustomWidgetsKey, customWidgets);
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    async save2Local(customWidgetItem, industry) {
      let customWidgets = this.$util.getLStorage(CustomWidgetsKey);
      if (customWidgets) {
        const industryCustomWidgets = customWidgets[industry];
        if (Array.isArray(industryCustomWidgets) && industryCustomWidgets.length > 0) {
          const newWgs = await this.uniWidgets(industryCustomWidgets, customWidgetItem);
          if (newWgs) {
            customWidgets[industry] = newWgs;
          } else {
            return;
          }
        } else {
          customWidgets[industry] = [customWidgetItem];
        }
      } else {
        customWidgets = {
          [industry]: [customWidgetItem],
        };
      }
      this.$util.setLStorage(CustomWidgetsKey, customWidgets);
      this.$message({
        type: 'success',
        message: '保存成功!',
      });
      this.$emit('success');
    },
    uniWidgets(industryCustomWidgets, customWidgetItem) {
      const wgsIndex = industryCustomWidgets.findIndex(v => v.name === customWidgetItem.name);
      if (wgsIndex > -1) {
        return new Promise(resolve => {
          this.$confirm('已存在相同名称的自定义组件, 是否覆盖?', '提示', {
            type: 'warning',
          })
            .then(() => {
              industryCustomWidgets[wgsIndex] = customWidgetItem;
              resolve(industryCustomWidgets);
            })
            .catch(() => resolve(false));
        });
      } else {
        industryCustomWidgets.push(customWidgetItem);
        return industryCustomWidgets;
      }
    },
  },
};
</script>
