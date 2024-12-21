<template>
     <section>
       <div class="container full-section-height" v-if = "!loading">
         <SectionHeader class = "mt-5":title="sensor.title" :text="sensor.author"/>
         <font-awesome-icon :icon="['far', 'circle-left']" size="2xl"  class ="mb-3" style = " color: var(--primary-color); cursor: pointer" @click = "goToBackSensors" />
         <div class="row mb-5">
           <div class="col-lg-6 p-3">
             <img
               class="card-img-top mb-4 shadow rounded"
               style="max-height: 500px;"
               src="../assets/images/heatmap.jpg"
               alt=""  
             />
           </div>
           <div class="col-lg-6 details-wrapper">
             <p class="lead description">
                {{ sensor.description }}
             </p>
             <div class="mb-4">
              
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Operator</strong></div>
                 <div class="col-lg-6">{{sensor.author}}</div>
               </div>
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Methane</strong></div>
                 <div class="col-lg-6 text-danger">{{sensor.methane}}</div>
               </div>
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Propane</strong></div>
                 <div class="col-lg-6 text-danger">{{sensor.propane}}</div>
               </div>
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Isobutane</strong></div>
                 <div class="col-lg-6 text-success">{{sensor.isobutane}}</div>
               </div>
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Hydrogen</strong></div>
                 <div class="col-lg-6 text-warning">{{sensor.hydrogen}}</div>
               </div>
               <div class="row border-bottom p-2">
                 <div class="col-lg-6"><strong>Upload Date</strong></div>
                 <div class="col-lg-6">{{ formatDate(sensor.updatedAt) }}</div>
               </div>
             </div>
          
           </div>
         </div>
       </div>
       <div class = "container" v-else >
         <div class="d-flex justify-content-center full-section-height">
           <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
           </div>
   </div>
       </div>
     </section>
   </template>
   
   
   <script>
   import SectionHeader from "@/components/SectionHeader.vue";
   import { useSensorStore } from "@/stores/sensorStore.js";
   import { mapState } from "pinia";
   
   export default {
     name: "SensorDetailVue",
     components: {
       SectionHeader,
     },
     data() {
       return {
         sensor: null,
         loading: true,
         intervalId: null,
       };
     },
     async created() {
       const sensorStore = useSensorStore();
       await sensorStore.fetchSensors(); 
       this.selectSensor();
       this.startAutoRefresh();
     },
     beforeUnmount() {
       if (this.intervalId) {
         clearInterval(this.intervalId);
       }
     },
     methods: {
       goToBackSensors() {
         this.$router.push({ name: "sensors" });
       },
       selectSensor() {
         const sensorId = this.$route.params.id;
         const sensorStore = useSensorStore();
         this.sensor = sensorStore.selectedSensor(sensorId);
         this.loading = false;
       },
       startAutoRefresh() {
         this.intervalId = setInterval(async () => {
           console.log("Refreshing sensor data");
           const sensorStore = useSensorStore();
           await sensorStore.fetchSensors(); 
           this.selectSensor();
         }, 10000); 
       },
       formatDate(date) {
         const options = {
           year: 'numeric',
           month: '2-digit',
           day: '2-digit',
           hour: '2-digit',
           minute: '2-digit',
         };
         return new Date(date).toLocaleString('en-GB', options);
       }
     },
     computed: {
       ...mapState(useSensorStore, ['selectedSensor'])
     }
   };
   </script>
   
   
   
   <style scoped>
        .details-wrapper{
             max-height: 740px;
             display : flex;
             flex-direction: column;
        }
      
        .description {
             min-height: 120px;
             max-height: 300px;
             overflow-y: auto;   
     }
        </style>
   