<template>
  <div>
    <div class="custom-radio">
      <input
        type="radio"
        :id="'payment' + selectid"
        :name="'payment' + selectid"
        :value="selectid"
        v-model="modelValue"
      >
      <label :for="'payment' + selectid">{{$t(`form.gender.${selectid}`)}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, defineProps } from "vue";

const props = defineProps({
  selectid: {
    required: true
  }
})
const modelValue = defineModel('field',{
  required:true
})
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/select.scss";
</style>
