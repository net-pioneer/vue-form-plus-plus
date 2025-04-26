import { defineStore } from "pinia";
import { reactive, ref, shallowRef } from "vue";
import type { formError } from "@/composables/pouyalib/types";

export const useErrorStore = defineStore('useErrorStore',()=>{
  const storedErrors = ref<formError[]>([]);

  return {
    storedErrors
  }
})