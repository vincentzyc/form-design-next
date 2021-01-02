<template>
  <div :style="item.style" class="wg-phone wg-padding">
    <div :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']" class="wg-item">
      <div
        :style="{width:item.label.labelWidth}"
        class="wg-title"
        v-show="item.showLabel"
      >{{item.label.labelTitle}}</div>
      <div class="flex-auto">
        <input :placeholder="item.placeholder" :value="item.value" class="wg-input" />
      </div>
    </div>
    <div
      :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']"
      class="wg-item"
      v-if="item.showCode"
    >
      <div :style="{width:item.label.labelWidth}" class="wg-title flex-none" v-show="item.showLabel">验证码</div>
      <div class="flex flex-auto">
        <input class="wg-input" placeholder="验证码" />
        <button :style="item.style.btnStyle" class="getVerCode-btn">获取验证码</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>