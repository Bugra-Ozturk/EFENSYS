<template>
  <section class="row full-section-height align-items-center mx-auto">
    <!-- Left Side : AuthSidebar -->
    <div class="col-md-6 pe-0">
      <AuthSidebar
        imgSrc="../register.png"
        text="Kayıt Olduktan Sonra Kullanım Kılavuzu Mailinize Gönderilecektir."
      />
    </div>

    <!-- Right Side : Registration Form -->
    <div class="container form-width col-md-6 my-5">
      <div class="d-flex justify-content-center mb-4">
        <h1 class="display-5">Kayıt</h1>
      </div>

      <form @submit.prevent="submitForm">
        <div v-if="showGenericWarningMessage" class="text-center mb-2">
          <span class="text-danger small">Something happened, please try again later!</span>
        </div>

        <!-- Username Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label">Kullanıcı Adı<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model.trim="formData.username"
              required
              autocomplete="off"
              :class="{
                'is-valid': isUsernameValid,
                'is-invalid': !isUsernameValid && showUsernameWarningMessage,
              }"
              @focus="showUsernameWarningMessage = true"
              @blur="showUsernameWarningMessage = false"
            />
            <span v-if="showUsernameWarningMessage && !isUsernameValid" class="text-danger small">
              Kullanıcı adı 5 ile 20 karakter arasında olmalıdır !
            </span>
          </div>
        </div>

        <!-- Email Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="formData.email"
              required
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid': (!isEmailValid && showEmailWarningMessage) || existingEmail === formData.email,
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">
              Lütfen geçerli bir mail adresi giriniz !
            </span>
            <span v-if="existingEmail === formData.email" class="text-danger small">
              {{ `${existingEmail} is already exist` }}
            </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Şifre<span class="text-danger">*</span></label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="formData.password"
              required
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && showPasswordWarningMessage,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
            />
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small">
              Şifreniz 4 ile 10 karakter arasında olmalıdır !
            </span>
          </div>
        </div>
        <!-- Confirm Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="confirmPassword" class="form-label">Şifreyi Onayla              <span class="text-danger">*</span></label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              v-model="formData.confirmPassword"
              required
              :class="{
                   'is-valid': isConfirmPasswordValid,
                   'is-invalid': !isConfirmPasswordValid && showConfirmPasswordWarningMessage,
              }"
              @focus="showConfirmPasswordWarningMessage = true"
              @blur="showConfirmPasswordWarningMessage = false"
            />
            <span v-if="showConfirmPasswordWarningMessage && !isConfirmPasswordValid" class="text-danger small">
              Şifreler eşleşmiyor !
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button :disabled="!isFormValid" type="submit" class="btn btn-primary w-100 mt-3">
              Kayıt Ol
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapActions } from "pinia";
import AuthSidebar from "@/components/AuthSidebar.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    AuthSidebar,
  },
  name: "RegisterView",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      showUsernameWarningMessage: false,
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      showConfirmPasswordWarningMessage: false,
      existingEmail: null,
      showGenericWarningMessage: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),

    async submitForm() {
      try {
        await this.register(this.formData);

        const toast = useToast();
        toast.success("Giriş Sayfasına Yönlendiriliyorsunuz..", {
          position: "top-right",
          timeout: 2000,
          closeButton: "button",
          icon: true,
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } catch (data) {
        const { error } = data;
        if (error === "The email already exists!") {
          this.existingEmail = this.formData.email;
        } 
         else {
          this.showGenericWarningMessage = true;
        }
      }
    },
  },
  computed: {
    isFormValid() {
      return this.isUsernameValid && this.isPasswordValid && this.isEmailValid && this.isConfirmPasswordValid ;
    },
    isUsernameValid() {
      return this.formData.username.length >= 5 && this.formData.username.length <= 20;
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
    },
    isPasswordValid() {
      return this.formData.password.length >= 4 && this.formData.password.length <= 10;
    },
    isConfirmPasswordValid() {
      return this.formData.password === this.formData.confirmPassword;
    },
   
  },
};
</script>

<style scoped>
.pe-0 {
  padding-right: 0 !important;
}
.form-width {
  max-width: 100%;
}
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.col-md-6,
.col-8 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

</style>
