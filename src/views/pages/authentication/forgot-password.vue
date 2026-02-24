<script>
export default {
  mounted() {
    this.updateBodyClass();
  },
  watch: {
    // Watch for route changes
    $route() {
      this.updateBodyClass();
    },
  },
  methods: {
    updateBodyClass() {
      if (this.$route.path.includes("/forgot-password")) {
        document.body.classList.add("bg-white");
      } else {
        document.body.classList.remove("bg-white");
      }
    },
    submitForm() {
      this.$router.push("/email-verification");
    },
  },
};
</script>

<template>
  <div class="container-fuild">
    <div class="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
      <div class="row">
        <div class="col-lg-5">
          <div
            class="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
            <div class="bg-overlay-img">
              <img src="@/assets/img/bg/bg-01.png" class="bg-1" alt="" />
              <img src="@/assets/img/bg/bg-02.png" class="bg-2" alt="" />
              <img src="@/assets/img/bg/bg-03.png" class="bg-3" alt="" />
            </div>
            <div class="authentication-card w-100">
              <div class="authen-overlay-item border w-100">
                <h1 class="text-white fs-40">
                  Empowering people <br />
                  through seamless HR <br />
                  management.
                </h1>
                <div class="my-4 mx-auto authen-overlay-img">
                  <img src="@/assets/img/bg/authentication-bg-01.png" alt="" />
                </div>
                <div>
                  <p class="text-white fs-20 fw-semibold text-center">
                    Efficiently manage your workforce, streamline <br />
                    operations effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-md-12 col-sm-12">
          <div class="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div class="col-md-7 mx-auto p-4">
              <form @submit.prevent="submitForm">
                <div>
                  <div class="mx-auto mb-5 text-center">
                    <img src="@/assets/img/logo.jpeg" class="img-fluid" alt="Logo" />
                  </div>
                  <div class="">
                    <div class="text-center mb-3">
                      <h2 class="mb-2">Forgot Password?</h2>
                      <p class="mb-0">
                        If you forgot your password, well, then we'll email you
                        instructions to reset your password.
                      </p>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Email Address</label>
                      <div class="input-group">
                        <input type="text" value="" class="form-control border-end-0" />
                        <span class="input-group-text border-start-0">
                          <i class="ti ti-mail"></i>
                        </span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <button type="submit" class="btn btn-primary w-100">Submit</button>
                    </div>
                    <div class="text-center">
                      <h6 class="fw-normal text-dark mb-0">
                        Return to
                        <router-link to="/login" class="hover-a">Sign In</router-link>
                      </h6>
                    </div>
                  </div>
                  <div class="mt-5 text-center">
                    <p class="mb-0 text-gray-9">
                      Copyright &copy; {{ new Date().getFullYear() }} - Smarthr
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
