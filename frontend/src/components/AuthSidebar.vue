<template>
    
        <div class="image-container ">
          <img :src="imgSrc" alt="image" class="img-fluid background-image">
          <div class="overlay"></div>
          <div class ="heading display-1">EFENSYS</div>
          <p class="text mt-5 text-center" >{{ text }}</p>
          
        </div>
      
</template>

<script>
     export default {
          name : "AuthSidebar",
          props : {
            text :{
              type :String,
              required : true,
            },
            imgSrc : {
              type : String,
              required : true
            }
          }
     }
</script>

<style  scoped>
.image-container {
  position: relative;
  
}

.background-image {
  width: 100%;
  height: auto;
  display: block;
  /* max-height: 1000px; */
}

.overlay {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0, 0, 0, 0.7); 
  z-index: 1 !important;
}

.text {
  font-size: 17px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2;
}
.heading {
  font-weight: bold;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--secondary-color);
  z-index: 2;
}

</style>