<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right"/>
  </q-page>
   
  </template> 

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue';
import * as echarts from 'echarts';
import ECharts from "vue-echarts";



export default defineComponent({
  name: "Dashboard2",
  components: {
    CardSocial: defineAsyncComponent(() => import("components/cards/CardSocial.vue")),
    ECharts
  },
})
</script>

<style scoped></style>
