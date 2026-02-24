<template>
  <!-- Add New Event -->
  <div class="modal fade" id="add_event">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Event</h4>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Type</label>
                  <vue3-select :options="TypeSel" v-model="selected" placeholder="Select" />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Event Name</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Event Date</label>
                  <div class="input-icon-end position-relative">
                    <input type="text" class="form-control datetimepicker" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Start Time</label>
                  <div class="input-icon-end position-relative">
                    <a-time-picker class="form-control timepicker" placeholder="-- : -- : --" use12-hours
                      format="h:mm a" type="text" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">End Time</label>
                  <div class="input-icon-end position-relative">
                    <a-time-picker class="form-control timepicker" placeholder="-- : -- : --" use12-hours
                      format="h:mm a" type="text" />
                    <span class="input-icon-addon">
                      <i class="ti ti-calendar text-gray-7"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Event Location</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="mb-0">
                  <label class="form-label">Descriptions</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add New Event -->

  <!-- Event -->
  <div class="modal fade" id="event_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark modal-bg">
          <div class="modal-title text-white">
            <span id="eventTitle"></span>
          </div>
          <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <p class="d-flex align-items-center fw-medium text-black mb-3">
            <i class="ti ti-calendar-check text-default me-2"></i>26 July,2024
            to 31 July,2024
          </p>
          <p class="d-flex align-items-center fw-medium text-black mb-3">
            <i class="ti ti-calendar-check text-default me-2"></i>11:00 AM to
            12:15 PM
          </p>
          <p class="d-flex align-items-center fw-medium text-black mb-3">
            <i class="ti ti-map-pin-bolt text-default me-2"></i>Las Vegas, US
          </p>
          <p class="d-flex align-items-center fw-medium text-black mb-0">
            <i class="ti ti-calendar-check text-default me-2"></i>A recurring or
            repeating event is simply any event that you will occur more than
            once on your calendar.
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- /Event -->
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      TypeSel: [
        { label: "Select", value: "Select" },
        { label: "Pending", value: "Pending" },
        { label: "Onhold", value: "Onhold" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Done", value: "Done" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/applications/events");
    },
  },
};
</script>
