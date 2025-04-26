<template>
  <div>
    <suspense>
      <template #fallback>
        <content-box>
          <template #header>
            صبر کنید
          </template>
        </content-box>
      </template>
      <AddressListView/>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import AddressListView from "@/components/AddressListView.vue";
import ContentBox from "@/components/ContentBox.vue";
</script>

<style scoped>

</style>