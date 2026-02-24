<script>
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
const currentDateTwo = ref(new Date());

export default {
  data() {
    return {
      selected: [],
      selectedOne: [],
      selectedTwo: [],
      ClockSch: [{ label: "Select", value: "Select" }, { label: "10'o clock Shift", value: "10'o clock Shift" }, { label: "10:30 shift", value: "10:30 shift" }, { label: "Daily Shift", value: "Daily Shift" }, { label: "New Shift", value: "New Shift" }],
      ITechSel: [
        { label: "Select", value: "Select" },
        { label: "Development", value: "Development" },
        { label: "Finance", value: "Finance" },
        { label: "Finance and Management", value: "Finance and Management" },
        { label: "Hr & Finance", value: "Hr & Finance" },
        { label: "ITech", value: "ITech" },
      ],
      EmploSch: [
        { label: "Select", value: "Select" },
        { label: "Richard Miles", value: "Richard Miles" },
        { label: "John Smith", value: "John Smith" },
        { label: "Mike Litorus", value: "Mike Litorus" },
        { label: "Wilmer Deluna", value: "Wilmer Deluna" },
      ],
      startdate: currentDate,
      startdateOne: currentDateOne,
      startdateTwo: currentDateTwo,
      dateFormat: "dd-MM-yyyy",
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/attendance/schedule-timing");
    },
  },
};
</script>

<template>
  <!-- Add Schedule Modal -->
  <div id="schedule_timing" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Schedule</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-6">
                <div class="input-block mb-3">
                  <label class="form-label">Department <span class="text-danger">*</span></label>
                  <vue3-select :options="ITechSel" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-block mb-3">
                  <label class="form-label">Employee Name <span class="text-danger">*</span></label>
                  <vue3-select :options="EmploSch" v-model="selectedOne" placeholder="Select" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-block mb-3">
                  <label class="form-label">Date</label>
                  <div class="cal-icon">
                    <input class="form-control datetimepicker" type="text" />
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input-block mb-3">
                  <label class="form-label">Shifts <span class="text-danger">*</span></label>
                  <vue3-select :options="ClockSch" v-model="selectedTwo" placeholder="Select" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Min Start Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Start Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Max Start Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Min End Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">End Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Max End Time <span class="text-danger">*</span></label>
                  <div class="input-group time">
                    <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                      type="text" /><span class="input-group-text"><i class="fa-regular fa-clock"></i></span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="input-block mb-3">
                  <label class="form-label">Break Time <span class="text-danger">*</span></label>
                  <a-time-picker class="form-control timepicker" placeholder="Choose" use12-hours format="h:mm a"
                    type="text" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="input-block mb-3">
                  <label class="form-label">Accept Extra Hours </label>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="customSwitch1" checked="" />
                    <label class="form-check-label" for="customSwitch1"></label>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="input-block mb-3">
                  <label class="form-label">Publish </label>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="customSwitch2" checked="" />
                    <label class="form-check-label" for="customSwitch2"></label>
                  </div>
                </div>
              </div>
            </div>

            <div class="submit-section">
              <button class="btn btn-primary submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Schedule Modal -->
</template>
