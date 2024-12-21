import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore('userStore', {
  actions: {
    async updateUserDetails(updatedUserData) {
      try {
         const token = localStorage.getItem('token');
         console.log(token);

         if (!token) {
           throw new Error('No token found!!');
         }

        //Make the request with the Authorization header
           const response = await axios.put('http://localhost:3000/api/v1/user/updateUser', updatedUserData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  

        return response.data;
      } catch (error) {
        console.log('Error at updating user details', error);
        throw error.response?.data || error.message;
      }
    }
  }
});
