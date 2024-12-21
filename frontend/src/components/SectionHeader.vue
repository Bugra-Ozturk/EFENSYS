<template>
     <div class = 'text-center mt-3 '>
          <h1 class = "display-1 font-weight-bolder mb-3"> {{ title }}</h1>
          <p class = "lead mb-3 "> {{ text }}</p>
     </div>
</template>

<script>
     export default {
          name : 'SectionHeader',
          props: {
               title : {
                    type: String ,
                    required : true
               },
               text : {
                    type : String,
                    required : true
               },
               
          }
          
     }
</script>

<style scoped>

</style>