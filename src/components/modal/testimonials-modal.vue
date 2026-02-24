<script>
export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      Role: [{label: "Select", value: "Select"}, {label: "Hr Manager", value: "Hr Manager"}, {label: "Manager", value: "Manager"}, {label: "Employee", value: "Employee"}],
      EditRole: [{label: "Select", value: "Select"}, {label: "Hr Manager", value: "Hr Manager"}, {label: "Manager", value: "Manager"}, {label: "Employee", value: "Employee"}],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/content/testimonials");
    },
  },
};
</script>

<template>
  <!-- Add Testimonial -->
  <div class="modal fade" id="add_testimonials">
    <div class="modal-dialog modal-dialog-centered modal-mg w-100">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Testimonial</h4>
          <button
            type="button"
            class="btn-close custom-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div
                  class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4"
                >
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames"
                  >
                    <i class="ti ti-photo text-gray-2 fs-16"></i>
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple="" />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm"
                        >Cancel</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label"
                    >Author <span class="text-danger">*</span></label
                  >
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Select Role</label>
                  <vue3-select :options="Role" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Content</label>
                  <textarea rows="3" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Testimonial</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Testimonial -->

  <!-- Edit Testimonial -->
  <div class="modal fade" id="edit_testimonials">
    <div class="modal-dialog modal-dialog-centered modal-mg w-100">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Testimonial</h4>
          <button
            type="button"
            class="btn-close custom-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div
                  class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4"
                >
                  <div
                    class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames"
                  >
                    <img
                      src="@/assets/img/testimonials/user-10.jpg"
                      class="img-fluid rounded-circle"
                      alt="img"
                    />
                  </div>
                  <div class="profile-upload">
                    <div class="mb-2">
                      <h6 class="mb-1">Profile Image</h6>
                      <p class="fs-12">Image should be below 4 mb</p>
                    </div>
                    <div class="profile-uploader d-flex align-items-center">
                      <div class="drag-upload-btn btn btn-sm btn-primary me-2">
                        Upload
                        <input type="file" class="form-control image-sign" multiple="" />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-light btn-sm"
                        >Cancel</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label"
                    >Author <span class="text-danger">*</span></label
                  >
                  <input type="text" class="form-control" value="Ivan Lucas" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Select Role</label>
                  <vue3-select
                    :options="EditRole"
                    v-model="selectedOne"
                    placeholder="Hr Manager"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Content</label>
                  <textarea rows="3" class="form-control">
This system streamlined our HR processes, saving us time and boosting team efficiency.</textarea
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Testimonial</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Testimonial -->

  <!-- Delete Modal -->
  <div class="modal fade" id="delete_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <span class="avatar avatar-xl bg-transparent-danger text-danger mb-3">
            <i class="ti ti-trash-x fs-36"></i>
          </span>
          <h4 class="mb-1">Confirm Delete</h4>
          <p class="mb-3">
            You want to delete all the marked items, this cant be undone once you delete.
          </p>
          <div class="d-flex justify-content-center">
            <a
              href="javascript:void(0);"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
              >Cancel</a
            >
            <router-link to="/content/testimonials" class="btn btn-danger"
              >Yes, Delete</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
