<template>
  <div id="count">Count: {{ count }}</div>
  <button @click="show = !show">Toggle</button>

  <transition name="fade">
    <p v-if="show" class="my-test">hello</p>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      count: 0,
    };
  },
};
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
