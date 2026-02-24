<script>
import { ref } from "vue";
const valueOne = ref(new Date());

export default {
  data() {
    return {
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
      Jobcategory: [
        { label: "Select", value: "Select" },
        { label: "IOS", value: "IOS" },
        { label: "Web & Application", value: "Web & Application" },
        { label: "Networking", value: "Networking" }
      ],
      Jobtype: [
        { label: "Select", value: "Select" },
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" }
      ],
      Joblevel: [
        { label: "Select", value: "Select" },
        { label: "Team Lead", value: "Team Lead" },
        { label: "Manager", value: "Manager" },
        { label: "Senior", value: "Senior" },
        { label: "junior", value: "junior" }
      ],
      Experience: [
        { label: "Select", value: "Select" },
        { label: "Entry Level", value: "Entry Level" },
        { label: "Mid Level", value: "Mid Level" },
        { label: "Expert", value: "Expert" }
      ],
      Qualification: [
        { label: "Select", value: "Select" },
        { label: "Bachelore Degree", value: "Bachelore Degree" },
        { label: "Master Degree", value: "Master Degree" },
        { label: "Others", value: "Others" }
      ],
      Gender: [
        { label: "Select", value: "Select" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
      ],
      Minsalary: [
        { label: "Select", value: "Select" },
        { label: "10k - 15k", value: "10k - 15k" },
        { label: "15k -20k", value: "15k -20k" }
      ],
      Maxsalary: [
        { label: "Select", value: "Select" },
        { label: "40k - 50k", value: "40k - 50k" },
        { label: "50k - 60k", value: "50k - 60k" }
      ],
      City: [
        { label: "Select", value: "Select" },
        { label: "Los Angeles", value: "Los Angeles" },
        { label: "San Diego", value: "San Diego" },
        { label: "Fresno", value: "Fresno" },
        { label: "San Francisco", value: "San Francisco" }
      ],
      State: [
        { label: "Select", value: "Select" },
        { label: "California", value: "California" },
        { label: "New York", value: "New York" },
        { label: "Texas", value: "Texas" },
        { label: "Florida", value: "Florida" }
      ],
      Country: [
        { label: "Select", value: "Select" },
        { label: "USA", value: "USA" },
        { label: "Canada", value: "Canada" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" }
      ],
      valueOne,
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/recuritment/job-grid");
    },
  },
};
</script>

<template>
  <!-- Add Post -->
  <div class="modal fade" id="add_post">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Post Job</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="contact-grids-tab pt-0">
                <ul class="nav nav-underline" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#basic-info"
                      type="button" role="tab" aria-selected="true">
                      Basic Information
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address"
                      type="button" role="tab" aria-selected="false">
                      Location
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab"
                  tabindex="0">
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
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Job Title <span class="text-danger"> *</span></label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Job Description <span class="text-danger"> *</span></label>
                        <textarea rows="3" class="form-control"></textarea>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Job Category <span class="text-danger"> *</span></label>
                        <vue3-select :options="Jobcategory" v-model="selected" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Job Type <span class="text-danger"> *</span></label>
                        <vue3-select :options="Jobtype" v-model="selected1" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Job Level <span class="text-danger"> *</span></label>
                        <vue3-select :options="Joblevel" v-model="selected2" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Experience <span class="text-danger"> *</span></label>
                        <vue3-select :options="Experience" v-model="selected3" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Qualification <span class="text-danger"> *</span></label>
                        <vue3-select :options="Qualification" v-model="selected4" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Gender <span class="text-danger"> *</span></label>
                        <vue3-select :options="Gender" v-model="selected5" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Min. Sallary <span class="text-danger"> *</span></label>
                        <vue3-select :options="Minsalary" v-model="selected6" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Max. Sallary <span class="text-danger"> *</span></label>
                        <vue3-select :options="Maxsalary" v-model="selected7" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Job Expired Date <span class="text-danger"> *</span></label>
                        <div class="input-icon-end position-relative">
                          <a-date-picker v-model="valueOne" class="form-control datetimepicker"
                            placeholder="dd/mm/yyyy" />
                          <span class="input-icon-addon">
                            <i class="ti ti-calendar text-gray-7"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Required Skills</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#success_modal">
                      Save & Next
                    </button>
                  </div>
                </div>
                <div class="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab" tabindex="0">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Address <span class="text-danger"> *</span></label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">City <span class="text-danger"> *</span></label>
                        <vue3-select :options="City" v-model="selected8" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">State <span class="text-danger"> *</span></label>
                        <vue3-select :options="State" v-model="selected9" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Country <span class="text-danger"> *</span></label>
                        <vue3-select :options="Country" v-model="selected10" placeholder="Select" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Zip Code <span class="text-danger"> *</span></label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="map-grid mb-3">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                          style="border: 0" allowfullscreen="" loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade" class="w-100"></iframe>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#success_modal">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Post Job -->

  <!-- Add Job Success -->
  <div class="modal fade" id="success_modal" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center p-3">
            <span class="avatar avatar-lg avatar-rounded bg-success mb-3"><i class="ti ti-check fs-24"></i></span>
            <h5 class="mb-2">Job Posted Successfully</h5>
            <div>
              <div class="row g-2">
                <div class="col-12">
                  <router-link to="/recuritment/job-grid" class="btn btn-dark w-100">Back to List</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Client Success -->
</template>
