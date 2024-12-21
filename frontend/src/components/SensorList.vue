<template>
     <div class="row">
          <div class="  col-sm-6 col-md-4 col-xl-3 mb-5" v-for = "sensor in sensors" :key = "sensor.id">
               <RouterLink :to = "/sensors/ + sensor._id">
                    <SensorItem :sensor = "sensor"/>
               </RouterLink> 
               
          </div>
     </div>
</template>

<script> 
import SensorItem from '@/components/SensorItem.vue';
export default {
     name: "SensorList",
     components : {
          SensorItem,
     },
     props: {
          sensors : {
               type : Array,
               default : () => ([])
          }
     }
}
</script>

<style scoped></style>