
<template>
     <NavBar />  <!-- pascal case -->
     <RouterView /> 
     <TheFooter/>
</template>

<script>

import NavBar from "@/components/NavBar.vue";
import TheFooter from "@/components/TheFooter.vue";


export default {
     name: "App",
     components : {
          NavBar,
          TheFooter
         
     },
     data(){
          return {
               
          }
     }

}
</script>


<style>
</style>