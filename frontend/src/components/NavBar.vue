<template>
     <nav class="navbar navbar-expand-lg custom-nav ">
       <div class="container">
                 <RouterLink class="navbar-brand" :to="{ name: 'home' }">EFENSYS</RouterLink>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav  ms-2  ms-auto ">
           <li class="nav-item">
             <RouterLink :to="{ name: 'home' }" class="nav-link">Ana Sayfa</RouterLink>
           </li>
           <li class="nav-item" v-if = "isLoggedIn">
             <RouterLink :to="{ name: 'books' }" class="nav-link">Migfer-s2</RouterLink>
           </li>
           <li class="nav-item" v-if = "isLoggedIn">
             <RouterLink :to="{ name: 'sensors' }" class="nav-link">Gözet <span class="lead"><em><small>(yakında)</small></em></span></RouterLink>
           </li>
           <li class="nav-item" v-if = "!isLoggedIn">
             <RouterLink :to="{ name: 'contact' }" class="nav-link">İletişim</RouterLink>
           </li>
           <li class="nav-item" v-if = "isLoggedIn">
             <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Panel</RouterLink>
           </li>
           <li class="nav-item" v-if = "!isLoggedIn">
             <RouterLink :to="{ name: 'login' }" class="nav-link">Giriş Yap</RouterLink>
           </li>
           <li class="nav-item" v-if = "!isLoggedIn">
             <RouterLink :to="{ name: 'register' }" class="nav-link">Kayıt Ol</RouterLink>
           </li>
           <li class="nav-item d-flex justify-content-center" v-if = "isLoggedIn">
                <button class = "nav-link " @click ="logoutUser">
                  <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
                </button>
              </li>    
         </ul>

         </div>

       </div>
     </nav>
   </template>
   
   <script>
   import { useAuthStore } from '@/stores/authStore.js';
   import { mapState,mapActions } from 'pinia';
   import { useToast } from "vue-toastification";
   export default {
     name: "NavBar",
     methods: {
     },
     computed :{
        ...mapState(useAuthStore, ['isLoggedIn']),
     },
     methods : {
      ...mapActions(useAuthStore, ['logout']),
      logoutUser(){
        const toast = useToast();
        toast.success("Giriş Sayfasına Yönlendiriliyorsunuz", {
          position: "top-right",
          timeout: 2000,
          closeButton: "button",
          icon: true,
        });

        setTimeout(() => {
          this.logout();
        },1500)
        
      }
     }
   };
   </script>
   
   <style scoped>


  
   .custom-nav {
     background-color: var(--primary-color);
     padding: 22px 0;
     z-index: 999; /*To prevent the Blackout in Login Register from appearing on top of the Navbar.*/
   }
   
   .navbar-brand {
     padding: 0;
     margin: 0;
     color: #fff;
     font-size: 37px;
     font-weight: bold;
   }
   
   .nav-link {
     padding: 10px 35px !important;
     font-size: 22px;
     color: #fff;
     text-align: center;
   }
   
   .nav-link:hover {
     color: var(--secondary-color);
     transition: all 0.5s ease;
   }
   
   .active-link {
     color: var(--secondary-color);
   }
   .navbar-toggler {
    background-color: #fff;
    
   }
   </style>
   