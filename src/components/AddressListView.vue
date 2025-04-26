<template>
  <div>
    <content-box>
      <template #header>
        لبست
      </template>
    </content-box>
    <content-box  v-for="address in addresses" :key="address.id">
      <template #body>
        <div class="form-container view-block">
          <div class="col col-4 ">
            <x-view :label="$t('form.name.label')" :data="address.first_name" />
          </div>
          <div class="col col-4">
            <x-view :label="$t('form.family.label')" :data="address.last_name" />
          </div>
          <div class="col col-4">
            <x-view :label="$t('form.telephone.label')" :data="address.coordinate_mobile" />
          </div>
          <div class="col col-4 space-form">
            <x-view :label="$t('form.home_tell.label')" :data="address.coordinate_phone_number" />
          </div>
          <div class="col col-4 space-form">
            <x-view :label="$t('form.gender.label')" :data="address.gender" />
          </div>
          <div class="col col-4 space-form">
            <x-view :label="$t('form.address.label')" :data="address.address" />
          </div>

        </div>
      </template>
    </content-box>
  </div>
</template>

<script setup lang="ts">
import SrvRequest from "@/composables/SrvRequest";
import { AddressData } from "@/types/api";
import ContentBox from "@/components/ContentBox.vue";
import { ref } from "vue";
import XView from "@/components/el/x-view.vue";
const http = SrvRequest();
const addresses = ref();
const apiAddressList = await http.signedGet<AddressData[]>('/karfarmas/address');
if(apiAddressList.ok){
  addresses.value = apiAddressList.data;
}
console.log(apiAddressList);
</script>

<style scoped>

</style>