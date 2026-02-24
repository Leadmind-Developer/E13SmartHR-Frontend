<template>
  <!-- Add Budgets -->
  <div class="modal fade" id="add_budgets">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Budget</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Budget Title</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Choose Budget respect type</label>
                  <div class="d-flex align-items-center">
                    <div class="form-check me-2">
                      <input class="form-check-input" type="radio" name="flexRadio" id="budget" />
                      <label class="form-label" for="budget"> Project </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadio" id="budget1" />
                      <label class="form-label" for="budget1"> Category </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Start Date </label>
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
                  <label class="form-label">End Date </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mb-0">
                <label class="form-label">Expected Revenues</label>
              </div>
              <div class="revenues-content">
                <div class="row align-items-end">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Revenue Title</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                      <div>
                        <label class="form-label">Revenue Amount</label>
                        <div class="d-flex align-items-center">
                          <input type="text" class="form-control" />
                          <div class="ms-2">
                            <a href="javascript:void(0);"
                              class="btn btn-icon add-revenue btn-sm btn-primary rounded-circle"><i
                                class="ti ti-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Overall Revenue (A)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="mb-0">
                <label class="form-label">Expected Expenses</label>
              </div>
              <div class="expenses-content">
                <div class="row align-items-end">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Expenses Title</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                      <div>
                        <label class="form-label">Expenses Amount</label>
                        <div class="d-flex align-items-center">
                          <input type="text" class="form-control" />
                          <div class="ms-2">
                            <a href="javascript:void(0);"
                              class="btn btn-icon add-expenses btn-sm btn-primary rounded-circle"><i
                                class="ti ti-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Overall Expense (B)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Expected Profit (C=A-B) </label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tax (D) </label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Budget Amount (E=C-D)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Budget</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Budgets -->

  <!-- Edit Budgets -->
  <div class="modal fade" id="edit_budgets">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Budget</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Budget Title</label>
                  <input type="text" class="form-control" value="Office Supplies" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Choose Budget respect type</label>
                  <div class="d-flex align-items-center">
                    <div class="form-check me-2">
                      <input class="form-check-input" type="radio" name="flexRadio" id="budget3" />
                      <label class="form-label" for="budget3"> Project </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadio" id="budget2" checked />
                      <label class="form-label" for="budget2"> Category </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Start Date </label>
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
                  <label class="form-label">End Date </label>
                  <div class="input-icon-end position-relative">
                    <a-date-picker v-model="valueTwo" class="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mb-0">
                <label class="form-label">Expected Revenues</label>
              </div>
              <div class="revenues-content">
                <div class="row align-items-end">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Revenue Title</label>
                      <input type="text" class="form-control" value="Office Supplies" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                      <div>
                        <label class="form-label">Revenue Amount</label>
                        <div class="d-flex align-items-center">
                          <input type="text" class="form-control" value="250000" />
                          <div class="ms-2">
                            <a href="javascript:void(0);"
                              class="btn btn-icon add-revenue btn-sm btn-primary rounded-circle"><i
                                class="ti ti-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Overall Revenue (A)</label>
                  <input type="text" class="form-control" value="250000" />
                </div>
              </div>
              <div class="mb-0">
                <label class="form-label">Expected Expenses</label>
              </div>
              <div class="expenses-content">
                <div class="row align-items-end">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Expenses Title</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                      <div>
                        <label class="form-label">Expenses Amount</label>
                        <div class="d-flex align-items-center">
                          <input type="text" class="form-control" />
                          <div class="ms-2">
                            <a href="javascript:void(0);"
                              class="btn btn-icon add-expenses btn-sm btn-primary rounded-circle"><i
                                class="ti ti-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Overall Expense (B)</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Expected Profit (C=A-B) </label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tax (D) </label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Budget Amount (E=C-D)</label>
                  <input type="text" class="form-control" />
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
  <!-- /Edit Budgets -->

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
            <router-link to="/accounting/budgets" class="btn btn-danger">Yes, Delete</router-link>
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
export default {
  data() {
    return {
      valueOne,
      valueTwo,
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/accounting/budgets");
    },
  },
};
</script>
