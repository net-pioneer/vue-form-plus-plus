<template>
  <div>
    One Rule Setup for Backend And Front .
    <br/>
    <button @click="testValidation">Test Validation</button>
  </div>
</template>

<script setup lang="ts">
import { reactiveForm } from "@/composables/pouyalib/useDecoration.ts";
import { SSRPayload } from "@/composables/payloads/SSRPayload.ts";
import { onMounted } from "vue";

const ssr = reactiveForm(SSRPayload);
ssr.google_code = 1235;
console.log(ssr);
const testValidation = ()=>{
  const validatecheck = ssr.validate(null);
  console.log(validatecheck);
}
</script>

<style scoped lang="scss">

</style>