import {createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import ContactView from "@/views/ContactView.vue";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookDetailView from "@/views/BookDetailView.vue";
import SensorView from "@/views/SensorView.vue";
import SensorDetailView from "@/views/SensorDetailView.vue";
const router = createRouter({
     history : createWebHistory(),
     routes : [
          {
               path : "/",
               name : "home",
               component : HomeView
          },
          {
               path : "/books",
               name : "books",
               component : BooksView,
               meta :{requiresAuth : true}
          },
          {
               path : "/books/:id",
               name : "book-detail",
               component : BookDetailView,
               meta :{requiresAuth : true}
          },
          {
               path : "/sensors",
               name : "sensors",
               component : SensorView,
               meta :{requiresAuth : true}
          },
          {
               path : "/sensors/:id",
               name : "sensor-detail",
               component : SensorDetailView,
               meta :{requiresAuth : true}
          },
          {
               path : "/contact",
               name : "contact",
               component : ContactView
          },
          {
               path : "/dashboard",
               name : "dashboard",
               component : DashboardView,
               meta :{requiresAuth : true}
          },
          {
               path : "/login",
               name : "login",
               component : LoginView
          },
          {
               path : "/register",
               name : "register",
               component : RegisterView
          },
     ],
     linkActiveClass : "active-link"
});


//The code below checks whether we have the authority to view each page we are navigating through on the site.
router.beforeEach((to,from,next) => {
     const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
     const isLoggedIn = localStorage.getItem('user');

     if(requiresAuth && !isLoggedIn) {
          next({name : 'login'});
     }
     else {
          next();
     }
})

export default router;