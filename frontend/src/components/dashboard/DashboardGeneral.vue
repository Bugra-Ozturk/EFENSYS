<template>
  <div class="row">
    <div class="col-lg-6">
      <h2 class="mb-4">User Information</h2>
      <form>
        <div class="mb-3">
          <label for="username">Username</label>
          <input
            v-model="userInfo.username"
            type="text"
            id="username"
            class="form-control"
            :disabled="!editMode"
             autocomplete="username"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            v-model="userInfo.email"
            type="text"
            id="email"
            class="form-control"
            :disabled="!editMode"
             autocomplete="email"
          />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input
            v-model="userInfo.password"
            type="password"
            id="password"
            class="form-control"
            :disabled="!editMode"
          />
        </div>
        <button
          @click="!editMode ? toggleEditMode() : saveUserInfo()"
          type="button"
          class="btn btn-primary"
        >
          {{ editMode ? "Save" : "Edit" }}
        </button>

        <button
          v-if="editMode"
          @click="cancelEditMode()"
          type="button"
          class="btn btn-primary m-2"
        >
          Cancel
        </button>
      </form>
    </div>
    <div class="col-lg-6"></div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { useUserStore } from "@/stores/userStore.js";
import { mapState,mapActions } from "pinia";
export default {
  name: "DashboardGeneral",
  data() {
    return {
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
      editMode: false,
    };
  },
  created() {
  const storedUserInfo = JSON.parse(localStorage.getItem('user'));

  console.log("storedUserInfo", storedUserInfo); 

  if (storedUserInfo) {
    //If you want to get the data directly from the 'user' object
    this.userInfo.username = storedUserInfo.user.username || '';
    this.userInfo.email = storedUserInfo.user.email || '';
    this.userInfo.password = ''; 
    
  } else {
    //If there is no information in local storage, get information from current user
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;
  }
},

  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    ...mapActions(useAuthStore, ['logout']),
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveUserInfo() {
      await this.updateUserDetails(this.userInfo);
      setTimeout(() =>{
        this.logout();
      }, 3000);

    },
    cancelEditMode(){
     this.editMode = false;
     this.userInfo.username = this.user.username;
     this.userInfo.email = this.user.email;
     this.userInfo.password = '';
    }
  },
};
</script>

<style  scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}
.nav-tabs {
  border-color: var(--secondary-color);
}
.nav-link.active {
  color: #fff;
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
