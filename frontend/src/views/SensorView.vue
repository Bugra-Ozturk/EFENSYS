<template>
     <section class="full-section-height">
          <div class="container-fluid px-5">
               <SectionHeader title = "Operasyonlar" text = "Tamamlanan Operasyonlar Gösterilmektedir.." class ="mb-5" />
               <SensorList :sensors = 'paginatedSensors'/>
               <Pagination :currentPage ="currentPage" :totalPages = "totalPages" @page-changed = "updatePage"/>
          </div>
     </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import SensorList from '@/components/SensorList.vue';
import Pagination from '@/components/Pagination.vue';
import { useSensorStore } from '@/stores/sensorStore.js';
import { mapState } from 'pinia';
export default {
     name : "SensorsView ",
     components : {
          SectionHeader,
          SensorList,
          Pagination
          },
     data(){
          return {
               currentPage : 1 ,
               itemsPerPage : 4
               
          }
     },
     computed : {
          ...mapState(useSensorStore, ['sensors']),
          totalPages(){
               return Math.ceil(this.sensors.length / this.itemsPerPage)
          },
          paginatedSensors(){
               const startIndex = (this.currentPage -1) * this.itemsPerPage;
               const endIndex = startIndex + this.itemsPerPage;
               return this.sensors.slice().reverse().slice(startIndex, endIndex);
          }
     },
     methods : {
          updatePage(page){
               this.currentPage = page
          },
           },
     }
</script>

<style scoped>
     .auth-box{
          margin-top : -30px;
     }

</style>