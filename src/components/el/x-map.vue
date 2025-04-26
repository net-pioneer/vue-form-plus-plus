<template>
  <div style="width: 100%;height: 300px;text-align: left;overflow: hidden;">
    <NeshanMap
      defaultType="neshan"
      mapKey="web.51f51f4500124d54a8a0c6501d3ea14b"
      serviceKey=""
      :center="{latitude: 36.311559, longitude: 59.5870851}"
      :zoom="14"
      :poi="false"
      :traffic="false"
      @on-init="onInit"
      hide-layers
      :hide-search-container="true"
      :cluster="false"
    />
  </div>
</template>

<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Feature, Map, Overlay } from "@neshan-maps-platform/ol";
import {fromLonLat} from '@neshan-maps-platform/ol/proj'
import { Icon, Style } from "@neshan-maps-platform/ol/style";
import { Point } from "@neshan-maps-platform/ol/geom";
import VectorSource from "@neshan-maps-platform/ol/source/Vector";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import { defineEmits, ref } from "vue";
const mapObj = ref();
const emit = defineEmits()

function onInit(map:Map) {
  mapObj.value = map;
  const view = map?.getView();
  view?.animate({
    center: fromLonLat([59.5870851, 36.311559]),
    zoom: 11,
    duration: 1000,
  })
  mapObj.value.on('click', function (event) {
    const coordinate = event.coordinate // Get the clicked coordinates in projection format
    const lonLat = fromLonLat(coordinate) // Convert coordinates to lon/lat
    if(isNaN(lonLat[0]) || isNaN(lonLat[1])){
      emit('onError');
    }else{
      emit('onSelected',lonLat)
    }
  })
}

</script>

<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>