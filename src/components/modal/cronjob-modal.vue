<template>
  <!--Add Cronjob -->
  <div class="modal fade" id="add_cronjob">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Cronjob</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Schedule</label>
                  <vue3-select :options="ScheSel" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 d-flex align-items-center">
                    <div class="mb-3">
                      <label class="form-label">Next Run</label>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="mb-3">
                      <div class="input-icon-end position-relative">
                        <a-date-picker v-model="valueOne" class="form-control datetimepicker"
                          placeholder="dd/mm/yyyy" />
                        <span class="input-icon-addon">
                          <i class="ti ti-calendar text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="mb-3">
                      <div class="input-icon position-relative w-100">
                        <a-time-picker class="form-control timepicker" placeholder="-- : -- : --" use12-hours
                          format="h:mm a" type="text" />
                        <span class="input-icon-addon">
                          <i class="ti ti-clock-hour-3"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">URL</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Cronjob</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Cronjob -->

  <!-- Edit Cronjob -->
  <div class="modal fade" id="edit_cronjob">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Cronjob</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" value="Report Generation Cron" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Schedule</label>
                  <vue3-select :options="EditScheSel" v-model="selectedOne" placeholder="5 Minutes" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 d-flex align-items-center">
                    <div class="mb-3">
                      <label class="form-label">Next Run</label>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="mb-3">
                      <div class="input-icon-end position-relative">
                        <a-date-picker v-model="valueTwo" class="form-control datetimepicker"
                          placeholder="dd/mm/yyyy" />
                        <span class="input-icon-addon">
                          <i class="ti ti-calendar text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="mb-3">
                      <div class="input-icon position-relative w-100">
                        <a-time-picker class="form-control timepicker" placeholder="-- : -- : --" use12-hours
                          format="h:mm a" type="text" />
                        <span class="input-icon-addon">
                          <i class="ti ti-clock-hour-3"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">URL</label>
                  <input type="text" class="form-control" value="www.example.com" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Cronjob</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Cronjob -->
</template>
<script>
import { ref } from "vue";
const valueOne = ref(new Date());
const valueTwo = ref(new Date());
export default {
  data() {
    return {
      valueOne,
      valueTwo,
      selected: [],
      selectedOne: "5 Minutes",
      ScheSel: [{ label: "Select", value: "Select" }, { label: "5 Minutes", value: "5 Minutes" }, { label: "3 Minutes", value: "3 Minutes" }],
      EditScheSel: [{ label: "Select", value: "Select" }, { label: "5 Minutes", value: "5 Minutes" }, { label: "3 Minutes", value: "3 Minutes" }],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/others-settings/cronjob");
    },
  },
};
</script>
