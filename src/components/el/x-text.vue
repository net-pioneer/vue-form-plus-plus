<template>
  <div class="form-group">
    <label for="exampleInput">
      <div>
        {{ $t(`form.${translation}.label`) }}
        <small v-if="$te(`form.${translation}.label2`)">{{ $t(`form.${translation}.label2`) }}</small>
      </div>
      <span v-if="$te(`form.${translation}.note`)">{{ $t(`form.${translation}.note`) }}</span>
    </label>
    <input :maxlength="len > 0 ? len : null" :class="{errorinput:error}" type="text" id="exampleInput" v-model="modelValue" class="form-control" :placeholder="$t(`form.${translation}.placeholder`)">
    <span class="error" v-if="error">
      {{error.text}}
    </span>
  </div>

</template>

<script setup lang="ts">
import { defineModel, defineProps, PropType } from "vue";
import type { formError } from "@/composables/pouyalib/types";
const props = defineProps({
  translation:{
    type:String
  },
  error:{
    type:Object as PropType<formError>,
  },
  len:{
    type:Number,
    default:0
  },
});
const modelValue = defineModel('field',{
  required:true,
})
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/input.scss";
</style>