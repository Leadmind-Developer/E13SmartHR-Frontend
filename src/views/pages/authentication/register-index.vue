<script>
import api from "@/services/api";
import { TokenService } from "@/services/token.service";

export default {
  data() {
    return {
      showPassword: false,
      showPassword1: false,

      // 🔥 form state
      form: {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },

      loading: false,
      error: null,
    };
  },

  mounted() {
    this.updateBodyClass();
  },

  watch: {
    $route() {
      this.updateBodyClass();
    },
  },

  methods: {
    updateBodyClass() {
      if (this.$route.path.includes("/register-company")) {
        document.body.classList.add("bg-white");
      } else {
        document.body.classList.remove("bg-white");
      }
    },

    toggleShow() {
      this.showPassword = !this.showPassword;
    },

    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },

    async submitForm() {
      this.error = null;

      // 🔥 basic validation
      if (!this.form.companyName || !this.form.email || !this.form.password) {
        this.error = "All fields are required";
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      this.loading = true;

      try {
        console.log("Registering company...");

        const { data } = await api.post(
          "/auth/register-company",
          {
            companyName: this.form.companyName,
            email: this.form.email,
            password: this.form.password,
          },
          { withCredentials: true }
        );

        console.log("REGISTER SUCCESS:", data);

        // 🔥 store access token
        if (data?.accessToken) {
          TokenService.setAccessToken(data.accessToken);
        }

        // 🔥 redirect to dashboard
        this.$router.push("/dashboard");

      } catch (err) {
        console.error("REGISTER ERROR:", err);

        this.error =
          err.response?.data?.message ||
          "Registration failed. Check console.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row vh-100">

      <!-- LEFT SIDE -->
      <div class="col-lg-5 d-none d-lg-flex align-items-center justify-content-center bg-dark text-white">
        <div class="text-center px-4">
          <h1>Build your HR system</h1>
          <p>Create your company workspace and manage your team seamlessly.</p>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-lg-7 d-flex align-items-center justify-content-center">
        <div class="w-100" style="max-width: 400px">

          <div class="text-center mb-4">
            <img src="@/assets/img/logo.jpeg" style="height: 60px" />
            <h3 class="mt-3">Create Account</h3>
          </div>

          <!-- ERROR -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <form @submit.prevent="submitForm">

            <!-- NAME -->
            <div class="mb-3">
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="Full Name"
              />
            </div>

            <!-- COMPANY -->
            <div class="mb-3">
              <input
                v-model="form.companyName"
                type="text"
                class="form-control"
                placeholder="Company Name"
              />
            </div>

            <!-- EMAIL -->
            <div class="mb-3">
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="Email Address"
              />
            </div>

            <!-- PASSWORD -->
            <div class="mb-3 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                class="form-control"
                placeholder="Password"
              />
              <span
                class="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                @click="togglePassword"
              >
                👁
              </span>
            </div>

            <!-- CONFIRM -->
            <div class="mb-3 position-relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                class="form-control"
                placeholder="Confirm Password"
              />
              <span
                class="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                @click="toggleConfirmPassword"
              >
                👁
              </span>
            </div>

            <!-- BUTTON -->
            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="loading"
            >
              {{ loading ? "Creating account..." : "Sign Up" }}
            </button>
          </form>

          <div class="text-center mt-3">
            Already have an account?
            <router-link to="/login">Login</router-link>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
