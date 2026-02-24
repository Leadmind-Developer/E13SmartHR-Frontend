<template>
  <!-- Add Company -->
  <div class="modal fade" id="add_company">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Company</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                    <img src="@/assets/img/profiles/avatar-30.jpg" alt="img" class="rounded-circle" />
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Upload Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Account URL</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword ? 'text' : 'password'" class="pass-input form-control" />
                    <span @click="toggleShow" class="ti toggle-password" :class="{
                      'ti-eye': showPassword,
                      'ti-eye-off': !showPassword,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Confirm Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword1 ? 'text' : 'password'" class="pass-inputs form-control" />
                    <span @click="toggleShow1" class="ti toggle-passwords" :class="{
                      'ti-eye': showPassword1,
                      'ti-eye-off': !showPassword1,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="AdvanSelc" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Type <span class="text-danger"> *</span></label>
                  <vue3-select :options="SelMonth" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Currency <span class="text-danger"> *</span></label>
                  <vue3-select :options="DollarSel" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Language <span class="text-danger"> *</span></label>
                  <vue3-select :options="EnglishSele" v-model="selectedThree" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="InActiveSele" v-model="selectedFour" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Company</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Company -->

  <!-- Edit Company -->
  <div class="modal fade" id="edit_company">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Company</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                    <img src="@/assets/img/profiles/avatar-30.jpg" alt="img" class="rounded-circle" />
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Upload Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple="" />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="Stellar Dynamics" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" value="sophie@example.com" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Account URL</label>
                  <input type="text" class="form-control" value="sd.example.com" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="+1 895455450" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input type="text" class="form-control" value="Admin Website" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword ? 'text' : 'password'" class="pass-input form-control" />
                    <span @click="toggleShow" class="ti toggle-password" :class="{
                      'ti-eye': showPassword,
                      'ti-eye-off': !showPassword,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Confirm Password <span class="text-danger"> *</span></label>
                  <div class="pass-group">
                    <input :type="showPassword1 ? 'text' : 'password'" class="pass-inputs form-control" />
                    <span @click="toggleShow1" class="ti toggle-passwords" :class="{
                      'ti-eye': showPassword1,
                      'ti-eye-off': !showPassword1,
                    }"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditAdvanSelc" v-model="selectedFive" placeholder="Advanced" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Type <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditSelMonth" v-model="selectedSix" placeholder="Monthly" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Currency <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditDollarSel" v-model="selectedSeven" placeholder="Dollar" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Language <span class="text-danger"> *</span></label>
                  <vue3-select :options="EditEnglishSele" v-model="selectedEight" placeholder="English" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="EditInActiveSele" v-model="selectedNine" placeholder="Active" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Company -->

  <!-- Upgrade Information -->
  <div class="modal fade" id="upgrade_info">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Upgrade Package</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="p-3 mb-1">
          <div class="rounded bg-light p-3">
            <h5 class="mb-3">Current Plan Details</h5>
            <div class="row align-items-center">
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Company Name</p>
                  <p class="text-gray-9">BrightWave Innovations</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Plan Name</p>
                  <p class="text-gray-9">Advanced</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Plan Type</p>
                  <p class="text-gray-9">Monthly</p>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Price</p>
                  <p class="text-gray-9">200</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Register Date</p>
                  <p class="text-gray-9">12 Sep 2024</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <p class="fs-12 mb-0">Expiring On</p>
                  <p class="text-gray-9">11 Oct 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <h5 class="mb-4">Change Plan</h5>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Name <span class="text-danger">*</span></label>
                  <vue3-select :options="OneAdvanSelc" v-model="selectedTen" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plan Type <span class="text-danger">*</span></label>
                  <vue3-select :options="OneSelMonth" v-model="selectedEleven" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Ammount<span class="text-danger">*</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Payment Date <span class="text-danger">*</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Next Payment Date <span class="text-danger">*</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Expiring On <span class="text-danger">*</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueThree" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Upgrade Information -->

  <!-- Company Detail -->
  <div class="modal fade" id="company_detail">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Company Detail</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="moday-body">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center rounded bg-light p-3">
              <div class="file-name-icon d-flex align-items-center">
                <a href="javascript:void(0);" class="avatar avatar-md border rounded-circle flex-shrink-0 me-2">
                  <img src="@/assets/img/company/company-01.svg" class="img-fluid" alt="img" />
                </a>
                <div>
                  <p class="text-gray-9 fw-medium mb-0">
                    BrightWave Innovations
                  </p>
                  <p>michael@example.com</p>
                </div>
              </div>
              <span class="badge badge-success"><i class="ti ti-point-filled"></i>Active</span>
            </div>
          </div>
          <div class="p-3">
            <p class="text-gray-9 fw-medium">Basic Info</p>
            <div class="pb-1 border-bottom mb-4">
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Account URL</p>
                    <p class="text-gray-9">bwi.example.com</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Phone Number</p>
                    <p class="text-gray-9">(163) 2459 315</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Website</p>
                    <p class="text-gray-9">www.exmple.com</p>
                  </div>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Currency</p>
                    <p class="text-gray-9">United Stated Dollar (USD)</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Language</p>
                    <p class="text-gray-9">English</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Addresss</p>
                    <p class="text-gray-9">
                      3705 Lynn Avenue, Phelps, WI 54554
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-gray-9 fw-medium">Plan Details</p>
            <div>
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Plan Name</p>
                    <p class="text-gray-9">Advanced</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Plan Type</p>
                    <p class="text-gray-9">Monthly</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Price</p>
                    <p class="text-gray-9">$200</p>
                  </div>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Register Date</p>
                    <p class="text-gray-9">12 Sep 2024</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <p class="fs-12 mb-0">Expiring On</p>
                    <p class="text-gray-9">11 Oct 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Company Detail -->

  <!-- Delete Modal -->
  <div class="modal fade" id="delete_modal">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-body text-center">
          <span class="avatar avatar-xl bg-transparent-danger text-danger mb-3">
            <i class="ti ti-trash-x fs-36"></i>
          </span>
          <h4 class="mb-1">Confirm Delete</h4>
          <p class="mb-3">
            You want to delete all the marked items, this cant be undone once
            you delete.
          </p>
          <div class="d-flex justify-content-center">
            <a href="javascript:void(0);" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
            <router-link to="/super-admin/companies" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
<script>
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
const valueThree = ref(new Date());
export default {
  data() {
    return {
      showPassword: false,
      showPassword1: false,
      valueOne,
      valueTwo,
      valueThree,
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      selectedSix: [],
      selectedSeven: [],
      selectedEight: [],
      selectedNine: [],
      selectedTen: [],
      selectedEleven: [],
      AdvanSelc: [
        { label: "Select", value: "Select" },
        { label: "Advanced", value: "Advanced" },
        { label: "Basic", value: "Basic" },
        { label: "Enterprise", value: "Enterprise" },
      ],
      SelMonth: [
        { label: "Select", value: "Select" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
      ],
      DollarSel: [
        { label: "Select", value: "Select" },
        { label: "Dollar", value: "Dollar" },
        { label: "Euro", value: "Euro" },
      ],
      EnglishSele: [
        { label: "Select", value: "Select" },
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
      ],
      InActiveSele: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      EditAdvanSelc: [
        { label: "Select", value: "Select" },
        { label: "Advanced", value: "Advanced" },
        { label: "Basic", value: "Basic" },
        { label: "Enterprise", value: "Enterprise" },
      ],
      EditSelMonth: [
        { label: "Select", value: "Select" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
      ],
      EditDollarSel: [
        { label: "Select", value: "Select" },
        { label: "Dollar", value: "Dollar" },
        { label: "Euro", value: "Euro" },
      ],
      EditEnglishSele: [
        { label: "Select", value: "Select" },
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
      ],
      EditInActiveSele: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      OneAdvanSelc: [
        { label: "Select", value: "Select" },
        { label: "Advanced", value: "Advanced" },
        { label: "Basic", value: "Basic" },
        { label: "Enterprise", value: "Enterprise" },
      ],
      OneSelMonth: [
        { label: "Select", value: "Select" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
      ],
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
    buttonLabel1() {
      return this.showPassword1 ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },
    submitForm() {
      this.$router.push("/super-admin/companies");
    },
  },
};
</script>
