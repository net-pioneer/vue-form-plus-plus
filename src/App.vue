<template>
  <div>
    <AcharHeader/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AcharHeader from "@/components/AcharHeader.vue";
</script>

