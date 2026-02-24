<template>
  <!-- Add Assets -->
  <div class="modal fade" id="add_assets">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Asset</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Asset Name</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Purchased Date</label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueOne" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Purchase From</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Manufacture</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Serial Number</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Model</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Warranty</label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Asset User</label>
                  <vue3-select :options="Headrick" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="StaInactive" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Asset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Assets -->

  <!-- Edit Assets -->
  <div class="modal fade" id="edit_assets">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Asset</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Asset Name</label>
                  <input type="text" class="form-control" value="Dell Laptop" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Purchased Date</label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueThree" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Purchase From</label>
                  <input type="text" class="form-control" value="Dell" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Manufacture</label>
                  <input type="text" class="form-control" value="Dell" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Serial Number</label>
                  <input type="text" class="form-control" value="423237" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Model</label>
                  <input type="text" class="form-control" value="534AS34" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Warranty</label>
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
                  <label class="form-label">Asset User</label>
                  <vue3-select :options="EditHeadrick" v-model="selectedTwo" placeholder="Anthony Lewis" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="EditStaInactive" v-model="selectedThree" placeholder="Active" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Asset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Assets -->

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
            You want to delete all the marked items, this cant be undone once
            you delete.
          </p>
          <div class="d-flex justify-content-center">
            <a href="javascript:void(0);" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
            <router-link to="/asset/assets" class="btn btn-danger">Yes, Delete</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
<script>
import { ref } from 'vue';
const valueOne = ref(null);
const valueTwo = ref(null);
const valueThree = ref(null);
const valueFour = ref(null);
export default {
  data() {
    return {
      valueOne,
      valueTwo,
      valueThree,
      valueFour,
      selected: [],
      selectedOne: [],
      selectedTwo: "Antony Lewis",
      selectedThree: "Active",
      StaInactive: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      Headrick: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Sophie Headrick", value: "Sophie Headrick" },
      ],
      EditStaInactive: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      EditHeadrick: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Sophie Headrick", value: "Sophie Headrick" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/asset/assets");
    },
  },
};
</script>
