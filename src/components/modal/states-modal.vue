<script>
export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      Countryname: [{label: "Select", value: "Select"}, {label: "United States", value: "United States"}, {label: "Germany", value: "Germany"}, {label:"Canada", value: "Canada"}],
      Status: [{label: "Select", value: "Select"}, {label: "Active", value: "Active"}, {label: "Inactive", value: "Inactive"}],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/location/states");
    },
  },
};
</script>

<template>
  <!-- Add City -->
  <div class="modal fade" id="add_state">
    <div class="modal-dialog modal-dialog-centered modal-mg w-100">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add State</h4>
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
                <div class="mb-3">
                  <label class="form-label">State Name</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Country Name</label>
                  <vue3-select
                    :options="Countryname"
                    v-model="selected"
                    placeholder="Selact"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selectedOne" placeholder="Selact" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add State</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add City -->

  <!-- Edit City -->
  <div class="modal fade" id="edit_state">
    <div class="modal-dialog modal-dialog-centered modal-mg w-100">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit State</h4>
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
                <div class="mb-3">
                  <label class="form-label">State Name</label>
                  <input type="text" class="form-control" value="California" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Country Name</label>
                  <vue3-select
                    :options="Countryname"
                    v-model="selectedTwo"
                    placeholder="United States"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select
                    :options="Status"
                    v-model="selectedThree"
                    placeholder="Active"
                  />
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
  <!-- /Edit City -->

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
            <router-link to="/location/states" class="btn btn-danger"
              >Yes, Delete</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
