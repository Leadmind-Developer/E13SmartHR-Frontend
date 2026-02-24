<script>
import Vue3TagsInput from "vue3-tags-input";
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
const valueThree = ref(new Date());
const valueFour = ref(new Date());
const valueFive = ref(new Date());
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      valueOne,
      valueTwo,
      valueThree,
      valueFour,
      valueFive,
      selected: [],
      selected1: [],
      selected2: [],
      selected3: [],
      selected4: [],
      selected5: [],
      selected6: [],
      selected7: [],
      selected8: [],
      selected9: [],
      selected10: [],
      selected11: [],
      selected12: [],
      selected13: [],
      selected14: [],
      selected15: [],
      selected16: [],
      selected17: [],
      selected18: [],
      selected19: [],
      selected20: [],
      selected21: [],
      selected22: [],
      selected23: [],
      selected24: [],
      selected25: [],
      selected26: [],
      selected27: [],
      selected28: [],
      selected29: [],
      selected30: [],
      selected31: [],
      tags: ["Collab", "Promotion", "Rated"],
      tagsOne: ["Collab", "Promotion", "Rated", "Davis"],
      tagsTwo: ["Promotion", "Rated", "Davis"],
      Company: [
        { label: "Select", value: "Select" },
        { label: "BrightWave Innovations", value: "BrightWave Innovations" },
        { label: "Stellar Dynamics", value: "Stellar Dynamics" },
        { label: "Quantum Nexus", value: "Quantum Nexus" },
      ],
      Deals: [
        { label: "Select", value: "Select" },
        { label: "Collins", value: "Collins" },
        { label: "Konopelski", value: "Konopelski" },
        { label: "Adams", value: "Adams" },
      ],
      Reviews: [
        { label: "Select", value: "Select" },
        { label: "Lowest", value: "Lowest" },
        { label: "Highest", value: "Highest" },
      ],
      Owner: [
        { label: "Select", value: "Select" },
        { label: "Hendry", value: "Hendry" },
        { label: "Guillory", value: "Guillory" },
        { label: "jami", value: "jami" },
      ],
      Industry: [
        { label: "Select", value: "Select" },
        { label: "Barry Cuda", value: "Barry Cuda" },
        { label: "Tressa Wexler", value: "Tressa Wexler" },
      ],
      Currency: [
        { label: "Select", value: "Select" },
        { label: "USD", value: "USD" },
        { label: "Euro", value: "Euro" },
      ],
      Language: [
        { label: "Select", value: "Select" },
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
      ],
      Source: [
        { label: "Select", value: "Select" },
        { label: "Phone Calls", value: "Phone Calls" },
        { label: "Social Media", value: "Social Media" },
        { label: "Refferal Sites", value: "Refferal Sites" },
        { label: "Web Analytics", value: "Web Analytics" },
        { label: "Previous Purchase", value: "Previous Purchase" },
      ],
      State: [
        { label: "Select", value: "Select" },
        { label: "USA", value: "USA" },
        { label: "Canada", value: "Canada" },
      ],
      Country: [
        { label: "Select", value: "Select" },
        { label: "Indonesia", value: "Indonesia" },
        { label: "Cuba", value: "Cuba" },
      ],
      Status: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      Dealsname: [
        { label: "Select", value: "Select" },
        { label: "Collins", value: "Collins" },
        { label: "Konopelski", value: "Konopelski" },
        { label: "Adams", value: "Adams" },
      ],
      Pipeline: [
        { label: "Select", value: "Select" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "Calls", value: "Calls" },
      ],
      Statusone: [
        { label: "Select", value: "Select" },
        { label: "Open", value: "Open" },
        { label: "Won", value: "Won" },
        { label: "Lost", value: "Lost" },
      ],
      Dealvalue: [
        { label: "Select", value: "Select" },
        { label: "$4,50,000", value: "$4,50,000" },
        { label: "$3,15,000", value: "$3,15,000" },
        { label: "$8,40,000", value: "$8,40,000" },
      ],
      Currencyvalue: [
        { label: "Select", value: "Select" },
        { label: "$4,50,000", value: "$4,50,000" },
        { label: "$3,15,000", value: "$3,15,000" },
        { label: "$8,40,000", value: "$8,40,000" },
      ],
      Contact: [
        { label: "Select", value: "Select" },
        { label: "Darlee Robertson", value: "Darlee Robertson" },
        { label: "Sharon Roy", value: "Sharon Roy" },
        { label: "Vaughan Lewis", value: "Vaughan Lewis" },
      ],
      Project: [
        { label: "Select", value: "Select" },
        { label: "Office Management App", value: "Office Management App" },
        { label: "Clinic Management", value: "Clinic Management" },
        { label: "Educational Platform", value: "Educational Platform" },
      ],
      Assignee: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      Sourcename: [
        { label: "Select", value: "Select" },
        { label: "Barry Cuda", value: "Barry Cuda" },
        { label: "Tressa Wexler", value: "Tressa Wexler" },
      ],
      Priority: [
        { label: "Select", value: "Select" },
        { label: "High", value: "High" },
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/crm/contacts");
    },
    submitForm() {
      this.$router.push("/crm/pipeline");
    },
    submitFormTwo() {
      this.$router.push("/crm/deals-grid");
    },
  },
};
</script>

<template>
  <!-- Add Contact -->
  <div class="modal fade" id="add_contact">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Contact</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="contact-grids-tab">
            <ul class="nav nav-underline" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#basic-info"
                  type="button" role="tab" aria-selected="true">
                  Basic Information
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address" type="button"
                  role="tab" aria-selected="false">
                  Address
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="social-profile-tab" data-bs-toggle="tab" data-bs-target="#social-profile"
                  type="button" role="tab" aria-selected="false">
                  Social Profiles
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="access-tab" data-bs-toggle="tab" data-bs-target="#access" type="button"
                  role="tab" aria-selected="false">
                  Access
                </button>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab"
              tabindex="0">
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
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Name <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Last Name</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Job Title <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Company Name <span class="text-danger"> *</span></label>
                      <vue3-select :options="Company" v-model="selected" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Phone Number 2<span class="text-danger">
                          *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Fax</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-block mb-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <label class="form-label">Deals <span class="text-danger"> *</span></label>
                        <a href="javascript:void(0);" class="add-new text-primary" data-bs-target="#add_deals"
                          data-bs-toggle="modal"><i class="ti ti-plus text-primary me-1"></i>Add
                          New</a>
                      </div>
                      <vue3-select :options="Deals" v-model="selected1" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Date of Birth <span class="text-danger"> *</span>
                      </label>
                      <div class="input-icon-end position-relative">
                        <a-date-picker v-model="valueOne" class="form-control datetimepicker"
                          placeholder="dd/mm/yyyy" />
                        <span class="input-icon-addon">
                          <i class="ti ti-calendar text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Reviews <span class="text-danger"> *</span></label>
                      <vue3-select :options="Reviews" v-model="selected2" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Owner <span class="text-danger"> *</span></label>
                      <vue3-select :options="Owner" v-model="selected3" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Industry <span class="text-danger"> *</span></label>
                      <vue3-select :options="Industry" v-model="selected4" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Currency <span class="text-danger"> *</span></label>
                      <vue3-select :options="Currency" v-model="selected5" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Language <span class="text-danger"> *</span></label>
                      <vue3-select :options="Language" v-model="selected6" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Tags <span class="text-danger"> *</span>
                      </label>
                      <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                        data-role="tagsinput" name="Label" value="Tag1" :tags="tags" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Source <span class="text-danger"> *</span>
                      </label>
                      <vue3-select :options="Source" v-model="selected7" placeholder="Select" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab" tabindex="0">
              <div class="modal-body pb-0">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Address <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Name <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">State <span class="text-danger"> *</span></label>
                      <vue3-select :options="State" v-model="selected8" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Country <span class="text-danger"> *</span></label>
                      <vue3-select :options="Country" v-model="selected9" placeholder="Select" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Zipcode <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="social-profile" role="tabpanel" aria-labelledby="social-profile-tab"
              tabindex="0">
              <div class="modal-body pb-0">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Facebook</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Twitter</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Linked in</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Skype</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Whatsapp</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Instagram</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="access" role="tabpanel" aria-labelledby="access-tab" tabindex="0">
              <div class="modal-body pb-0">
                <div class="mb-4">
                  <h6 class="fs-14 fw-medium mb-1">Visibility</h6>
                  <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label class="form-check-label text-dark" for="flexRadioDefault1">
                        Public
                      </label>
                    </div>
                    <div class="form-check me-3">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        checked />
                      <label class="form-check-label text-dark" for="flexRadioDefault2">
                        Private
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                        checked />
                      <label class="form-check-label text-dark" for="flexRadioDefault3">
                        Select People
                      </label>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-light br-5 mb-4">
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-6" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-01.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Michael Walker</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-7" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-02.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Sophie Headrick</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-8" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-03.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Cameron Drake</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-9" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-04.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Doris Crowley</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-10" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/profiles/avatar-12.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Thomas Bordelon</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    <a href="javascript:void(0);" class="btn btn-primary">Confirm</a>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selected10" placeholder="Select" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#success_compay">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Contact -->

  <!-- Edit Contact -->
  <div class="modal fade" id="edit_contact">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Contact</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="contact-grids-tab">
            <ul class="nav nav-underline" id="myTab2" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="info-tab2" data-bs-toggle="tab" data-bs-target="#basic-info2"
                  type="button" role="tab" aria-selected="true">
                  Basic Information
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="address-tab2" data-bs-toggle="tab" data-bs-target="#address2" type="button"
                  role="tab" aria-selected="false">
                  Address
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="social-profile-tab2" data-bs-toggle="tab" data-bs-target="#social-profile2"
                  type="button" role="tab" aria-selected="false">
                  Social Profiles
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="access-tab2" data-bs-toggle="tab" data-bs-target="#access2" type="button"
                  role="tab" aria-selected="false">
                  Access
                </button>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="myTabContent2">
            <div class="tab-pane fade show active" id="basic-info2" role="tabpanel" aria-labelledby="info-tab2"
              tabindex="0">
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
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Name <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="Darlee" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Last Name</label>
                      <input type="text" class="form-control" value="Robertson" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Job Title <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="Facility Manager" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Company Name <span class="text-danger"> *</span></label>
                      <vue3-select :options="Company" v-model="selected11" placeholder="BrightWave Innovations" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input type="text" class="form-control" value="darlee@example.com" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Phone Number <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="(163) 2459 315" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Phone Number 2<span class="text-danger">
                          *</span></label>
                      <input type="text" class="form-control" value="(146) 1249 296" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Fax</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-block mb-3">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <label class="form-label p-0">Deals <span class="text-danger"> *</span></label>
                        <a href="javascript:void(0);" class="add-new text-primary" data-bs-target="#add_deals"
                          data-bs-toggle="modal"><i class="ti ti-plus text-primary me-1"></i>Add New</a>
                      </div>
                      <vue3-select :options="Deals" v-model="selected12" placeholder="Collins" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Date of Birth <span class="text-danger"> *</span>
                      </label>
                      <div class="input-icon-end position-relative">
                        <a-date-picker v-model="valueTwo" class="form-control datetimepicker"
                          placeholder="dd/mm/yyyy" />
                        <span class="input-icon-addon">
                          <i class="ti ti-calendar text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Reviews <span class="text-danger"> *</span></label>
                      <vue3-select :options="Reviews" v-model="selected13" placeholder="Lowest" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Owner <span class="text-danger"> *</span></label>
                      <vue3-select :options="Owner" v-model="selected14" placeholder="Hendry" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Industry <span class="text-danger"> *</span></label>
                      <vue3-select :options="Industry" v-model="selected15" placeholder="Barry Cuda" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Currency <span class="text-danger"> *</span></label>
                      <vue3-select :options="Currency" v-model="selected16" placeholder="Dollar" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">Language <span class="text-danger"> *</span></label>
                      <vue3-select :options="Language" v-model="selected17" placeholder="English" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Tags <span class="text-danger"> *</span>
                      </label>
                      <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                        data-role="tagsinput" name="Label" value="Tag1" :tags="tagsOne" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Source <span class="text-danger"> *</span>
                      </label>
                      <vue3-select :options="Source" v-model="selected18" placeholder="Web Analytics" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="address2" role="tabpanel" aria-labelledby="address-tab2" tabindex="0">
              <div class="modal-body pb-0">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Address <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="Germany" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Name <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">State <span class="text-danger"> *</span></label>
                      <vue3-select :options="State" v-model="selected19" placeholder="USA" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Country <span class="text-danger"> *</span></label>
                      <vue3-select :options="Country" v-model="selected20" placeholder="Indonesia" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Zipcode <span class="text-danger"> *</span></label>
                      <input type="text" class="form-control" value="65" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="social-profile2" role="tabpanel" aria-labelledby="social-profile-tab2"
              tabindex="0">
              <div class="modal-body pb-0">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Facebook</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Twitter</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Linked in</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Skype</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Whatsapp</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Instagram</label>
                      <input type="text" class="form-control" value="Darlee Robertson" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div class="tab-pane fade" id="access2" role="tabpanel" aria-labelledby="access-tab2" tabindex="0">
              <div class="modal-body pb-0">
                <div class="mb-4">
                  <h6 class="fs-14 fw-medium mb-1">Visibility</h6>
                  <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                      <label class="form-check-label text-dark" for="flexRadioDefault4">
                        Public
                      </label>
                    </div>
                    <div class="form-check me-3">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5"
                        checked />
                      <label class="form-check-label text-dark" for="flexRadioDefault5">
                        Private
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" />
                      <label class="form-check-label text-dark" for="flexRadioDefault6">
                        Select People
                      </label>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-light br-5 mb-4">
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-1" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-01.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Michael Walker</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-2" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-02.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Sophie Headrick</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-3" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-03.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Cameron Drake</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-4" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/reports/user-04.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Doris Crowley</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <input class="form-check-input me-1" type="checkbox" value="" id="user-5" />
                    <div class="d-flex align-items-center file-name-icon">
                      <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                        <img src="@/assets/img/profiles/avatar-12.jpg" class="img-fluid" alt="img" />
                      </a>
                      <div class="ms-2">
                        <h6 class="fw-normal">
                          <a href="javascript:void(0);">Thomas Bordelon</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    <a href="javascript:void(0);" class="btn btn-primary">Confirm</a>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selected21" placeholder="Select" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#success_compay">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Contact -->

  <!-- Success Company -->
  <div class="modal fade" id="success_compay">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-body">
          <div class="p-4 pb-1">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex flex-column align-items-center justify-content-center mb-3">
                  <img src="@/assets/img/reports-img/check-icon.svg" alt="icon" class="mb-3" />
                  <h5>Contact Added Successfully</h5>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <router-link to="/crm/contacts" class="btn btn-dark d-flex justify-content-center">Back to
                    List</router-link>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <router-link to="/crm/contact-details"
                    class="btn btn-primary bg-primary-gradient d-flex justify-content-center">Detail Page</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Success Company -->

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
            <router-link to="/crm/contacts" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->

  <!-- Add Deals -->
  <div class="modal fade" id="add_deals">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Deals</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormTwo">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Deal Name <span class="text-danger"> *</span></label>
                  <vue3-select :options="Dealsname" v-model="selected22" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-block mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label">Pipeline <span class="text-danger"> *</span></label>
                    <a href="javascript:void(0);" class="add-new text-primary" data-bs-toggle="modal"
                      data-bs-target="#add_pipeline"><i class="ti ti-plus text-primary me-1"></i>Add New</a>
                  </div>
                  <vue3-select :options="Pipeline" v-model="selected23" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Status <span class="text-danger"> *</span></label>
                  <vue3-select :options="Statusone" v-model="selected24" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Deal Value <span class="text-danger"> *</span></label>
                  <vue3-select :options="Dealvalue" v-model="selected25" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Currency<span class="text-danger"> *</span></label>
                  <vue3-select :options="Currencyvalue" v-model="selected26" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Period <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Period Value <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Contact <span class="text-danger"> *</span></label>
                  <vue3-select :options="Contact" v-model="selected27" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Project * <span class="text-danger"> *</span></label>
                  <vue3-select :options="Project" v-model="selected28" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Due Date <span class="text-danger"> *</span>
                  </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueThree" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Expected Closing Date <span class="text-danger"> *</span>
                  </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueFour" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Assignee <span class="text-danger"> *</span></label>
                  <vue3-select :options="Assignee" v-model="selected29" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tags <span class="text-danger"> *</span></label>
                  <vue3-tags-input class="input-tags form-control" placeholder="Add new" type="text"
                    data-role="tagsinput" name="Label" value="Tag1" :tags="tagsTwo" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Followup Date <span class="text-danger"> *</span></label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueFive" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Source <span class="text-danger"> *</span></label>
                  <vue3-select :options="Sourcename" v-model="selected30" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Priority <span class="text-danger"> *</span></label>
                  <vue3-select :options="Priority" v-model="selected31" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Description <span class="text-danger"> *</span></label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Deal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Deals -->

  <!-- Add Pipeline -->
  <div class="modal fade" id="add_pipeline">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Pipeline</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Pipeline Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="input-block mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label">Pipeline Stages
                      <span class="text-danger"> *</span></label>
                    <a href="javascript:void(0);" class="add-new text-primary" data-bs-toggle="modal"
                      data-bs-target="#add_stage"><i class="ti ti-plus text-primary me-1"></i>Add New</a>
                  </div>
                  <div class="p-3 border border-gray br-5 mb-2">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Inpipline</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default" data-bs-toggle="modal"
                          data-bs-target="#edit_stage"><span class="me-2"><i class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default" data-bs-toggle="modal"
                          data-bs-target="#delete_modal"><span><i class="ti ti-trash"></i></span></a>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 border border-gray br-5 mb-2">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Follow Up</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default" data-bs-toggle="modal"
                          data-bs-target="#edit_stage"><span class="me-2"><i class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default" data-bs-toggle="modal"
                          data-bs-target="#delete_modal"><span><i class="ti ti-trash"></i></span></a>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 border border-gray br-5">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Schedule Service</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default" data-bs-toggle="modal"
                          data-bs-target="#edit_stage"><span class="me-2"><i class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default"><span><i class="ti ti-trash"
                              data-bs-toggle="modal" data-bs-target="#delete_modal"></i></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Access</label>
                  <div class="d-flex access-item nav">
                    <div class="d-flex align-items-center">
                      <div class="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#all">
                        <input type="radio" class="status-radio me-2" id="all" name="status" checked />
                        <label for="all">All</label>
                      </div>
                      <div class="radio-btn d-flex align-items-center" data-bs-toggle="tab"
                        data-bs-target="#select-person">
                        <input type="radio" class="status-radio me-2" id="select" name="status" />
                        <label for="select">Select Person</label>
                      </div>
                    </div>
                  </div>
                  <div class="tab-content">
                    <div class="tab-pane fade" id="select-person">
                      <div class="access-wrapper">
                        <div class="p-3 border border-gray br-5 mb-2">
                          <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center file-name-icon">
                              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                <img src="@/assets/img/profiles/avatar-20.jpg" class="img-fluid" alt="img" />
                              </a>
                              <div class="ms-2">
                                <h6 class="fw-medium">
                                  <a href="javascript:void(0);">Sharon Roy</a>
                                </h6>
                              </div>
                            </div>
                            <div class="d-flex align-items-center">
                              <a href="javascript:void(0);" class="text-danger">Remove</a>
                            </div>
                          </div>
                        </div>
                        <div class="p-3 border border-gray br-5 mb-2">
                          <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center file-name-icon">
                              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                <img src="@/assets/img/profiles/avatar-21.jpg" class="img-fluid" alt="img" />
                              </a>
                              <div class="ms-2">
                                <h6 class="fw-medium">
                                  <a href="javascript:void(0);">Sharon Roy</a>
                                </h6>
                              </div>
                            </div>
                            <div class="d-flex align-items-center">
                              <a href="javascript:void(0);" class="text-danger">Remove</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pipeline-access">
              Add Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Pipeline -->

  <!-- Edit Pipeline -->
  <div class="modal fade" id="edit_pipeline">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Pipeline</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Pipeline Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="Marketing" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="input-block mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label">Pipeline Stages
                      <span class="text-danger"> *</span></label>
                    <a href="javascript:void(0);" class="add-new text-primary" data-bs-toggle="modal"
                      data-bs-target="#add_stage"><i class="ti ti-plus text-primary me-1"></i>Add New</a>
                  </div>
                  <div class="p-3 border border-gray br-5 mb-2">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Inpipline</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default"><span class="me-2"><i
                              class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default"><span><i class="ti ti-trash"></i></span></a>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 border border-gray br-5 mb-2">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Follow Up</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default"><span class="me-2"><i
                              class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default"><span><i class="ti ti-trash"></i></span></a>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 border border-gray br-5">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="me-2"><i class="ti ti-grip-vertical"></i></span>
                        <h6 class="fs-14 fw-normal">Schedule Service</h6>
                      </div>
                      <div class="d-flex align-items-center">
                        <a href="javascript:void(0);" class="text-default"><span class="me-2"><i
                              class="ti ti-edit"></i></span></a>
                        <a href="javascript:void(0);" class="text-default"><span><i class="ti ti-trash"></i></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Access</label>
                  <div class="d-flex access-item nav">
                    <div class="d-flex align-items-center">
                      <div class="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#all2">
                        <input type="radio" class="status-radio me-2" id="all2" name="status" checked />
                        <label for="all2">All</label>
                      </div>
                      <div class="radio-btn d-flex align-items-center" data-bs-toggle="tab"
                        data-bs-target="#select-person2">
                        <input type="radio" class="status-radio me-2" id="select2" name="status" />
                        <label for="select2">Select Person</label>
                      </div>
                    </div>
                  </div>
                  <div class="tab-content">
                    <div class="tab-pane fade" id="select-person2">
                      <div class="access-wrapper">
                        <div class="p-3 border border-gray br-5 mb-2">
                          <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center file-name-icon">
                              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                <img src="@/assets/img/profiles/avatar-20.jpg" class="img-fluid" alt="img" />
                              </a>
                              <div class="ms-2">
                                <h6 class="fw-medium">
                                  <a href="javascript:void(0);">Sharon Roy</a>
                                </h6>
                              </div>
                            </div>
                            <div class="d-flex align-items-center">
                              <a href="javascript:void(0);" class="text-danger">Remove</a>
                            </div>
                          </div>
                        </div>
                        <div class="p-3 border border-gray br-5 mb-2">
                          <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center file-name-icon">
                              <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                                <img src="@/assets/img/profiles/avatar-21.jpg" class="img-fluid" alt="img" />
                              </a>
                              <div class="ms-2">
                                <h6 class="fw-medium">
                                  <a href="javascript:void(0);">Sharon Roy</a>
                                </h6>
                              </div>
                            </div>
                            <div class="d-flex align-items-center">
                              <a href="javascript:void(0);" class="text-danger">Remove</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pipeline-access">
              Add Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Pipeline -->

  <!-- Pipeline Access -->
  <div class="modal fade" id="pipeline-access">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Pipeline Access</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <div class="input-icon-end position-relative">
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="input-icon-addon">
                      <i class="ti ti-search text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <div class="p-2 border br-5">
                    <div class="pipeline-access-items">
                      <div class="d-flex align-items-center p-2">
                        <div class="form-check form-check-md me-2">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                        <div class="d-flex align-items-center file-name-icon">
                          <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/profiles/avatar-19.jpg" class="img-fluid" alt="img" />
                          </a>
                          <div class="ms-2">
                            <h6 class="fw-medium fs-12">
                              <a href="javascript:void(0);">Darlee Robertson</a>
                            </h6>
                            <span class="fs-10 fw-normal">Darlee Robertson</span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center p-2">
                        <div class="form-check form-check-md me-2">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                        <div class="d-flex align-items-center file-name-icon">
                          <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/profiles/avatar-20.jpg" class="img-fluid" alt="img" />
                          </a>
                          <div class="ms-2">
                            <h6 class="fw-medium fs-12">
                              <a href="javascript:void(0);">Sharon Roy</a>
                            </h6>
                            <span class="fs-10 fw-normal">Installer</span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center p-2">
                        <div class="form-check form-check-md me-2">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                        <div class="d-flex align-items-center file-name-icon">
                          <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/profiles/avatar-21.jpg" class="img-fluid" alt="img" />
                          </a>
                          <div class="ms-2">
                            <h6 class="fw-medium fs-12">
                              <a href="javascript:void(0);">Vaughan Lewis</a>
                            </h6>
                            <span class="fs-10 fw-normal">Senior Manager</span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center p-2">
                        <div class="form-check form-check-md me-2">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                        <div class="d-flex align-items-center file-name-icon">
                          <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-33.jpg" class="img-fluid" alt="img" />
                          </a>
                          <div class="ms-2">
                            <h6 class="fw-medium fs-12">
                              <a href="javascript:void(0);">Jessica Louise</a>
                            </h6>
                            <span class="fs-10 fw-normal">Test Engineer</span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center p-2">
                        <div class="form-check form-check-md me-2">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                        <div class="d-flex align-items-center file-name-icon">
                          <a href="javascript:void(0);" class="avatar avatar-md border avatar-rounded">
                            <img src="@/assets/img/users/user-34.jpg" class="img-fluid" alt="img" />
                          </a>
                          <div class="ms-2">
                            <h6 class="fw-medium fs-12">
                              <a href="javascript:void(0);">Test Engineer</a>
                            </h6>
                            <span class="fs-10 fw-normal">UI /UX Designer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Pipeline Access -->

  <!-- Add New Stage -->
  <div class="modal fade" id="add_stage">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Stage</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Stage Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Stage</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add New Stage -->

  <!-- Edit Stage -->
  <div class="modal fade" id="edit_stage">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Stage</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitFormOne">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Edit Name <span class="text-danger"> *</span></label>
                  <input type="text" class="form-control" value="Inpipeline" />
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
  <!-- /Edit Stage -->
</template>
