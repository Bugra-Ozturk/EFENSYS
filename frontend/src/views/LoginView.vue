<template>
  <section class="row full-section-height align-items-center mx-auto">
    <div class = "col-md-6 pe-0">
      <AuthSidebar  imgSrc="../login.png" text = "Lütfen Onaylanmış Hesabınızla Giriş Yapın" class="custom-responsive"/>
    </div>
    

    <div class="container form-width col-md-6 my-5">
      <div class="d-flex justify-content-center mb-4">
        <h1 class="display-5">Giriş</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="row justify-content-center mb-2">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
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
                'is-invalid':
                  (!isEmailValid && showEmailWarningMessage) ||
                  notFoundEmail === formData.email,
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span
              v-if="showEmailWarningMessage && !isEmailValid"
              class="text-danger small"
              >Lütfen geçerli bir mail adresi giriniz !</span
            >
            <span
              v-if="notFoundEmail === formData.email"
              class="text-danger small"
              >{{ `${notFoundEmail} is not found.` }}</span
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Şifre</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="formData.password"
              required
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid':
                  (!isPasswordValid && showPasswordWarningMessage) ||
                  !isPasswordMatch,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage =false"
              
              
            />
            <span
              v-if="showPasswordWarningMessage && !isPasswordValid"
              class="text-danger small"
              >Şifreniz 4 ile 10 karakter arasında olmalıdır !
              </span
            >
            <span v-if="!isPasswordMatch" class="text-danger small"
              >Şifreniz Yanlış !</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button :disabled = !isFormValid type="submit" class="btn btn-primary w-100 mt-3">
              Giriş Yap
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
  components: { AuthSidebar },
  name: "LoginView ",

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      notFoundEmail: null,
      isPasswordMatch: true,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async submitForm() {
      try {
        await this.login(this.formData);
        const toast = useToast();
        toast.success("Panele Yönlendiriliyorsunuz..", {
          position: "top-right",
          timeout: 2000,
          closeButton: "button",
          icon: true,
        });

        setTimeout(() => {
          this.$router.push("/books");
        },1500)
       

      } catch (data) {
        const { error } = data;
        if (error === "User not found") {
          this.notFoundEmail = this.formData.email;
        } else if (error === "Your password is not true") {
          this.isPasswordMatch = false;
        }
      }
    },
  },
  computed: {
    isFormValid() {
      return this.isPasswordValid && this.isEmailValid;
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
    },
    isPasswordValid() {
      return (
        this.formData.password.length >= 4 &&
        this.formData.password.length <= 10
      );
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
