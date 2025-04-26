<template>
  <div>
    <content-box>
      <template #header>
        <router-link to="/">
          <img v-if="currentStep === formStep.map"  @click="currentStep=formStep.info" src="/images/back.svg">
          {{ $t(`content.steps.${currentStep}.label`) }}
        </router-link>
      </template>
     <template #body>
       <transition-group name="list">
         <div v-if="currentStep === formStep.info">
           {{ $t(`content.steps.${currentStep}.title`) }}
           <div class="form-container mt-form ">
             <div class="col col-4 space-form">
               <x-text translation="name" :error="errors.first_name" v-model:field="payload.first_name"/>
             </div>
             <div class="col col-4 space-form">
               <x-text translation="family" :error="errors.last_name" v-model:field="payload.last_name"/>
             </div>
             <div class="col col-4 space-form">
               <x-text translation="telephone" :error="errors.coordinate_mobile" :len="11" v-model:field="payload.coordinate_mobile"/>
             </div>
             <div class="col col-4 space-form">
               <x-text translation="home_tell" :error="errors.coordinate_phone_number" :len="11" v-model:field="payload.coordinate_phone_number"/>
             </div>
             <div class="col col-8 space-form">
               <x-text translation="address" :error="errors.address" v-model:field="payload.address"/>
             </div>
             <div class="col col-4 flex-line mt-select">
               <div class="flex-line gap-10">
                 <x-select selectid="female" v-model:field="payload.gender"/>
                 <x-select selectid="male" v-model:field="payload.gender"/>
               </div>
               <span>جنسیت</span>
             </div>
           </div>
         </div>
         <div v-else-if="currentStep === formStep.map">
           <x-map @onSelected="onMapSelected" @onError="onMapSeletectedError"/>
         </div>
       </transition-group>
     </template>
    </content-box>
    <div class="button-container">
      <button @click="submit" :disabled="loading">
        <img src="/images/loading.gif" v-if="loading"/>
        <span v-else>ثبت و ادامه</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentBox from "@/components/ContentBox.vue";
import XText from "@/components/el/x-text.vue";
import { formPayload } from "@/composables/payloads/AcharPayload";
import { reactiveForm } from "@/composables/pouyalib/useDecoration";
import useFormValidation from "@/composables/pouyalib/useFormValidation";
import { reactive, ref, shallowRef } from "vue";
import type { formError } from "@/composables/pouyalib/types";
import XSelect from "@/components/el/x-select.vue";
import XMap from "@/components/el/x-map.vue";
import SrvRequest from "@/composables/SrvRequest";
import { useToast } from "vue-toast-notification";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
//----------
const enum formStep {
  info=1,map=2,done=3
}
const currentStep = shallowRef<formStep>(formStep.info);
const payload = reactiveForm(formPayload);
const FormValidation = useFormValidation(payload);
const errors = ref<formError[]>([]);
const loading = ref(false);
const http = SrvRequest();
const $toast = useToast();
const router = useRouter();
const {t} = useI18n({useScope:"global"});
const onMapSelected = (lanlat) => {
  const lan = Math.round(lanlat[0])
  const lat = Math.round(lanlat[1])
  payload.lan = lan;
  payload.lat = lat;
}
const onMapSeletectedError = ()=>{
  $toast.open({
    message: t('map.select_error'),
    type: 'error',
  });
}
const submit = async ()=>{

  const gateCheck = FormValidation.checkValidations(currentStep.value);
  console.log(gateCheck);
  if(gateCheck.len !== 0){
    errors.value = gateCheck;
    if(currentStep.value === formStep.map){
      $toast.open({
        message: t('map.select_required'),
        type: 'error',
      });
    }
  }else{
    if(currentStep.value === formStep.map){
      const submitRes = await http.signedPost("/karfarmas/address",loading,payload);
      //if submitRes.success << there is no option on API
      $toast.open({
        message: t('submit.submitted'),
        type: 'success',
      });
      router.push({name:'history'});
    }else{
      currentStep.value++;
    }
  }
}
</script>

<style scoped>

</style>