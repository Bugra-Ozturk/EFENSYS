import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user : null,
  }),
  
getters :{
      isLoggedIn:(state) => {
        return !!state.user; //The two exclamation marks make this expression boolean.

;      }
},
  actions: {
     async register(newUserData) {
           try {
               const response = await axios.post('http://localhost:3000/api/v1/auth/register',newUserData);
               return response.data;
           } catch (error) {
                throw error.response.data;
          }
          },
      async login(userData) {
        try {
          const response = await axios.post('http://localhost:3000/api/v1/auth/login',userData);
          
          const token = response.data.token;

          this.user = response.data.user;
          localStorage.setItem('user',JSON.stringify(response.data)); //Converts js object to json object.
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          //I create user token in AuthController and send it.
        } catch (error) {
            throw error.response.data;
          
        }
      },
      logout() { 
        this.user = null;
        localStorage.removeItem('user');
        location.reload();
      }
  }
});
