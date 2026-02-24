<template>
  <!-- Add New Fields -->
  <div class="modal fade" id="new-field">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Custom Field</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Module</label>
                  <vue3-select :options="UsrMod" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Label</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Default Value</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Input Type</label>
                  <vue3-select :options="InpSel" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex mb-3">
                  <label class="form-label me-3">Required</label>
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="required" id="required1" checked />
                    <label class="form-check-label" for="required1">Yes</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" name="required" type="radio" id="required2" />
                    <label class="form-check-label" for="required2">No</label>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Cussta" v-model="selectedTwo" placeholder="Active" />
                </div>
              </div>
            </div>
            <div class="row g-3">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-outline-primary w-100" data-bs-dismiss="modal"
                  aria-label="Close">Cancel</a>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-primary w-100">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add New Fields -->

  <!-- Edit New Fields -->
  <div class="modal fade" id="edit-field">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Custom Field</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Module</label>
                  <vue3-select :options="EditUsrMod" v-model="selectedThree" placeholder="User" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Label</label>
                  <input class="form-control" type="text" value="Middle Name" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Default Value</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Input Type</label>
                  <vue3-select :options="EditInpSel" v-model="selectedFour" placeholder="Text" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex mb-3">
                  <label class="form-label me-3">Required</label>
                  <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="required" id="required3" checked />
                    <label class="form-check-label" for="required3">Yes</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" name="required" type="radio" id="required4" />
                    <label class="form-check-label" for="required4">No</label>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="EditCussta" v-model="selectedFive" placeholder="Active" />
                </div>
              </div>
            </div>
            <div class="row g-3">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-outline-primary w-100" data-bs-dismiss="modal"
                  aria-label="Close">Cancel</a>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-primary w-100">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Edit New Fields -->
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      UsrMod: [
        { label: "Select", value: "Select" },
        { label: "Employee", value: "Employee" },
        { label: "Project", value: "Project" },
        { label: "Tasks", value: "Tasks" }
      ],
      InpSel: [
        { label: "Select", value: "Select" },
        { label: "Text", value: "Text" }
      ],
      Cussta: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" }
      ],
      EditUsrMod: [
        { label: "Select", value: "Select" },
        { label: "User", value: "User" }
      ],
      EditInpSel: [
        { label: "Select", value: "Select" },
        { label: "Text", value: "Text" }
      ],
      EditCussta: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" }
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/app-settings/custom-fields");
    },
  },
};
</script>
