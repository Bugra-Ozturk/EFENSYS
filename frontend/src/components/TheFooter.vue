<template>
     <footer class="text-white py-4" style="background-color: var(--primary-color);">
       <div class="container">
         <div class="row">
           <div class="col-md-3">
             <h5>About EFENSYS</h5>
             <ul class="list-unstyled">
               <li><RouterLink to="#">Overview</RouterLink></li>
               <li><RouterLink to="#">Our Mission</RouterLink></li>
               <li><RouterLink :to="{name : 'contact'}">Contact Us</RouterLink></li>
             </ul>
           </div>
           <div class="col-md-3">
             <h5>Products</h5>
             <ul class="list-unstyled">
               <li><RouterLink to="#">Fire Safety Helmets</RouterLink></li>
             </ul>
           </div>
           <div class="col-md-3">
             <h5>Resources</h5>
             <ul class="list-unstyled">
               <li><RouterLink to="#">Case Studies</RouterLink></li>
             </ul>
           </div>
           <div class="col-md-3">
             <h5>Follow Us</h5>
             <ul class="list-unstyled d-flex">
               <li><a href="#" class="me-3"><font-awesome-icon icon="fa-brands fa-facebook" /></a></li>
               <li><a href="#" class="me-3"><font-awesome-icon icon="fa-brands fa-twitter" /></a></li>
               <li><a href="#"><font-awesome-icon icon="fa-brands fa-linkedin" /></a></li>
             </ul>
           </div>
         </div>
         <div class="text-center pt-3">
           &copy; 2024 No Copyright: EFENSYS
         </div>
       </div>
     </footer>
   </template>
   
   <script>
   export default {
     name: "TheFooter"
   };
   </script>
   
   <style scoped>
   footer h5 {
     font-size: 16px;
     font-weight: bold;
   }
   
   footer ul {
     padding-left: 0;
     text-decoration: none;
   }
   
   footer ul li {
     margin-bottom: 10px;
     text-decoration: none;
   }
   
   footer ul li a {
     color: white;
     text-decoration: none;
   }
   
   footer ul li a:hover {
     text-decoration: none;
     color : var(--secondary-color)

   }
   
   footer ul li a font-awesome-icon {
     font-size: 20px;
     color: white;
   }
   </style>
   