<template>
  <div class="x-view">
    <div>{{label}}</div>
    <div>{{data}}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  label:{},
  data:{}
})
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/view.scss";
</style>