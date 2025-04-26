<template>
  <div class="contentbox" :class="{'no-slot':!hasBody}">
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="body" v-if="hasBody">
      <slot name="body"/>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from "vue";

const slots = useSlots()
const hasBody = !!slots.body
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/contentBox.scss";
</style>