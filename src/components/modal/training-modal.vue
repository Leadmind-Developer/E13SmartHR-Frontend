<script>
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      selectedThree: [],
      selectedFour: [],
      selectedFive: [],
      selectedSix: [],
      selectedSeven: [],
      Trainingtype: [
        { label: "Select", value: "Select" },
        { label: "Git Training", value: "Git Training" },
        { label: "HTML Training", value: "HTML Training" },
        { label: "React Training", value: "React Training" }
      ],
      Trainer: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Harvey Smith", value: "Harvey Smith" }
      ],
      Employees: [
        { label: "Select", value: "Select" },
        { label: "Bernardo Galaviz", value: "Bernardo Galaviz" },
        { label: "Jeffrey Warden", value: "Jeffrey Warden" }
      ],
      Status: [
        { label: "Select", value: "Select" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" }
      ],
      valueOne,
      valueTwo,
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/training/training-list");
    },
  },
};
</script>

<template>
  <!-- Add Training -->
  <div class="modal fade" id="add_training">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Training</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Training Type</label>
                  <vue3-select :options="Trainingtype" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Trainer</label>
                  <vue3-select :options="Trainer" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Employees</label>
                  <vue3-select :options="Employees" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Training Cost</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Start Date</label>
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
                  <label class="form-label">End Date</label>
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
                  <label class="form-label">Description</label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selectedThree" placeholder="Select" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Training</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Training -->

  <!-- Edit Training -->
  <div class="modal fade" id="edit_training">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Training</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Training Type</label>
                  <vue3-select :options="Trainingtype" v-model="selectedFour" placeholder="Git Training" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Trainer</label>
                  <vue3-select :options="Trainer" v-model="selectedFive" placeholder="Anthony Lewis" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Employees</label>
                  <vue3-select :options="Employees" v-model="selectedSix" placeholder="Bernardo Galaviz" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Training Cost</label>
                  <input type="text" class="form-control" value="$200" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Start Date</label>
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
                  <label class="form-label">End Date</label>
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
                  <label class="form-label">Description</label>
                  <textarea class="form-control">
Version control and code collaboration.</textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <vue3-select :options="Status" v-model="selectedSeven" placeholder="Active" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Training</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Training -->

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
            <a href="javascript:void(0);" class="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
            <a href="/training/training-list" class="btn btn-danger">Yes, Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
