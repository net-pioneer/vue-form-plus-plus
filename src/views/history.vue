<template>
  <div>
    <suspense>
      <template #fallback>
        <content-box>
          <template #header>
            {{$t('please_wait')}}
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