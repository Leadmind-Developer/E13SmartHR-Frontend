<template>
  <!-- Add Termination -->
  <div class="modal fade" id="new-employee-salary">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Employee Salary</h4>
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
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Employee Name</label>
                  <vue3-select
                    :options="EmpoyeName"
                    v-model="selected"
                    placeholder="Select"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Net Salary</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="row earning-row">
              <div class="d-flex justify-content-between mb-3">
                <label class="form-label">Earnings</label>
                <a
                  href="javascript:void(0);"
                  class="add-earnings text-primary mb-2"
                  ><i class="ti ti-plus me-2"></i>Add New</a
                >
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Basic</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">DA(40%)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">HRA(15%)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Conveyance</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Allowance </label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Medical Allowance</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Others</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row deduction-row">
              <div class="d-flex justify-content-between mb-3">
                <label class="form-label">Deductions</label>
                <a
                  href="javascript:void(0);"
                  class="add-deduction text-primary mb-2"
                  ><i class="ti ti-plus me-2"></i>Add New</a
                >
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">TDS</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">ESI</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">PF</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Leave</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Prof.Tax</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Labour Welfare</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Others</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-white border me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Add Employee Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Termination -->

  <!-- Edit Termination -->
  <div class="modal fade" id="edit-employee-salary">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Employee Salary</h4>
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
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Employee Name</label>
                  <vue3-select
                    :options="EditEmpoyeName"
                    v-model="selectedOne"
                    placeholder="Anthony Lewis"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Net Salary</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="row earning-row">
              <div class="d-flex justify-content-between mb-3">
                <label class="form-label">Earnings</label>
                <a
                  href="javascript:void(0);"
                  class="add-earnings text-primary mb-2"
                  ><i class="ti ti-plus me-2"></i>Add New</a
                >
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Basic</label>
                  <input type="text" class="form-control" value="$40000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">DA(40%)</label>
                  <input type="text" class="form-control" value="$16000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">HRA(15%)</label>
                  <input type="text" class="form-control" value="$2666" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Conveyance</label>
                  <input type="text" class="form-control" value="$2000" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Allowance </label>
                  <input type="text" class="form-control" value="$1000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Medical Allowance</label>
                  <input type="text" class="form-control" value="$2000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Others</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row deduction-row">
              <div class="d-flex justify-content-between mb-3">
                <label class="form-label">Deductions</label>
                <a
                  href="javascript:void(0);"
                  class="add-deduction text-primary mb-2"
                  ><i class="ti ti-plus me-2"></i>Add New</a
                >
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">TDS</label>
                  <input type="text" class="form-control" value="$4000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">ESI</label>
                  <input type="text" class="form-control" value="$2000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">PF</label>
                  <input type="text" class="form-control" value="$3000" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Leave</label>
                  <input type="text" class="form-control" value="$1000" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Prof.Tax</label>
                  <input type="text" class="form-control" value="$800" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Labour Welfare</label>
                  <input type="text" class="form-control" value="$500" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label class="form-label">Others</label>
                  <input type="text" class="form-control" value="$100" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-white border me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Add Employee Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Termination -->

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
            <a
              href="javascript:void(0);"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
              >Cancel</a
            >
            <router-link to="/payroll/employee-salary" class="btn btn-danger"
              >Yes, Delete</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete Modal -->
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      selectedOne: "Antony Lewis",
      EmpoyeName: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Doglas Martini", value: "Doglas Martini" },
      ],
      EditEmpoyeName: [
        { label: "Select", value: "Select" },
        { label: "Anthony Lewis", value: "Anthony Lewis" },
        { label: "Brian Villalobos", value: "Brian Villalobos" },
        { label: "Doglas Martini", value: "Doglas Martini" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/payroll/employee-salary");
    },
  },
};
</script>
