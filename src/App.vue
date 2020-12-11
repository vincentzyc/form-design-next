<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "@/components/Home.vue"

export default defineComponent({
  name: "App",
  components: {
    Home
  }
});
</script>