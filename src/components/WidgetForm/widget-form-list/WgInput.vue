<template>
  <div
    :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']"
    :style="item.style"
    class="wg-item wg-padding"
  >
    <div
      :style="{width:item.label.labelWidth}"
      class="wg-title"
      v-show="item.showLabel"
    >{{item.label.labelTitle}}</div>
    <div class="flex-auto">
      <input :placeholder="item.placeholder" :value="item.value" class="wg-input" />
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