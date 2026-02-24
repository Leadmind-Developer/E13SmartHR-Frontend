<template>
  <layout-sidebar></layout-sidebar>
  <layout-header></layout-header>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="head-icons ms-2">
          <a
            href="javascript:void(0);"
            class=""
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Collapse"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="card">
        <div class="card-body">
          <div class="border-bottom mb-3 pb-3">
            <h4>Profile</h4>
          </div>
          <form action="#">
            <div class="border-bottom mb-3">
              <div class="row">
                <div class="col-md-12">
                  <div>
                    <h6 class="mb-3">Basic Information</h6>
                    <div
                      class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4"
                    >
                      <div
                        class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames"
                      >
                        <i class="ti ti-photo text-gray-3 fs-16"></i>
                      </div>
                      <div class="profile-upload">
                        <div class="mb-2">
                          <h6 class="mb-1">Profile Photo</h6>
                          <p class="fs-12">Recommended image size is 40px x 40px</p>
                        </div>
                        <div class="profile-uploader d-flex align-items-center">
                          <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                            Upload
                            <input
                              type="file"
                              class="form-control image-sign"
                              multiple=""
                            />
                          </div>
                          <a href="javascript:void(0);" class="btn btn-light btn-sm"
                            >Cancel</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">First Name</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">Last Name</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">Email</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">Phone</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-bottom mb-3">
              <h6 class="mb-3">Address Information</h6>
              <div class="row">
                <div class="col-md-12">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-2">
                      <label class="form-label mb-md-0">Address</label>
                    </div>
                    <div class="col-md-10">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">City</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">State</label>
                    </div>
                    <div class="col-md-8">
                      <div>
                        <vue3-select :options="IndukF" v-model="selected" placeholder="Select" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">Country</label>
                    </div>
                    <div class="col-md-8">
                      <div>
                        <vue3-select
                          :options="TurkPro"
                          v-model="selectedOne"
                          placeholder="Select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-4">
                      <label class="form-label mb-md-0">Postal Code</label>
                    </div>
                    <div class="col-md-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-bottom mb-3">
              <h6 class="mb-3">Change Password</h6>
              <div class="row">
                <div class="col-md-4">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-5">
                      <label class="form-label mb-md-0">Current Password</label>
                    </div>
                    <div class="col-md-7">
                      <div class="pass-group">
                        <input
                          :type="showPassword ? 'text' : 'password'"
                          class="pass-input form-control"
                        />
                        <span
                          @click="toggleShow"
                          class="ti toggle-password"
                          :class="{
                            'ti-eye': showPassword,
                            'ti-eye-off': !showPassword,
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-5">
                      <label class="form-label mb-md-0">New Password</label>
                    </div>
                    <div class="col-md-7">
                      <div class="pass-group">
                        <input
                          :type="showPassword1 ? 'text' : 'password'"
                          class="pass-inputs form-control"
                          placeholder="New Password"
                        />
                        <span
                          @click="toggleShow1"
                          class="ti toggle-passwords"
                          :class="{
                            'ti-eye': showPassword1,
                            'ti-eye-off': !showPassword1,
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="row align-items-center mb-3">
                    <div class="col-md-5">
                      <label class="form-label mb-md-0">Confirm Password</label>
                    </div>
                    <div class="col-md-7">
                      <div class="pass-group">
                        <input
                          :type="showPassword2 ? 'text' : 'password'"
                          class="pass-inputs form-control"
                          placeholder="Confirm Password"
                        />
                        <span
                          @click="toggleShow2"
                          class="ti toggle-passwords"
                          :class="{
                            'ti-eye': showPassword2,
                            'ti-eye-off': !showPassword2,
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <button type="button" class="btn btn-outline-light border me-3">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">{{new Date().getFullYear()}} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
</template>
<script>
export default {
  data() {
    return {
      title: "Profile",
      text: "Pages",
      text1: "Profile",
      selected: [],
      selectedOne: [],
      TurkPro: [{label: "Select", value: "Select"}, {label: "Belgium", value: "Belgium"}, {label: "Turkey", value: "Turkey"}, {label: "Ukraine", value: "Ukraine"}],
      IndukF: [{label: "Select", value: "Select"}, {label: "France", value: "France"}, {label: "India", value: "India"}, {label: "UK", value: "UK"}],
      showPassword: false,
      showPassword1: false,
      showPassword2: false,
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
    buttonLabel1() {
      return this.showPassword1 ? "Hide" : "Show";
    },
    buttonLabel2() {
      return this.showPassword2 ? "Hide" : "Show";
    },
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },
    toggleShow2() {
      this.showPassword2 = !this.showPassword2;
    },
  },
};
</script>
