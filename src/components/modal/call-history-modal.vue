<template>
  <!-- Edit Employee -->
  <div class="modal fade" id="call_history">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <h4 class="modal-title">Caller Details</h4>
          </div>
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
          <div class="modal-body">
            <div class="card bg-light-500">
              <div class="card-body">
                <div class="text-center">
                  <div class="avatar avatar-xxxl mb-3">
                    <img
                      src="@/assets/img/users/user-32.jpg"
                      alt="img"
                      class="rounded-circle"
                    />
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <router-link
                    to="/calls/video-call"
                    class="btn btn-gray call-item p-0 d-flex align-items-center justify-content-center me-3"
                    ><i class="ti ti-video fs-20"></i
                  ></router-link>
                  <router-link
                    to="/applications/chat"
                    class="btn btn-gray call-item p-0 d-flex align-items-center justify-content-center me-3"
                    ><i class="ti ti-message fs-20"></i
                  ></router-link>
                  <router-link
                    to="/calls/voice-call"
                    class="btn btn-gray call-item p-0 d-flex align-items-center justify-content-center"
                    ><i class="ti ti-phone fs-20"></i
                  ></router-link>
                </div>
              </div>
            </div>
            <div class="row g-4">
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Name</p>
                  <h6 class="fw-medium">Anthony Lewis</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Total Calls</p>
                  <h6 class="fw-medium">20</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Phone</p>
                  <h6 class="fw-medium">(123) 4567 890</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Average Call Timing</p>
                  <h6 class="fw-medium">00:30</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Email</p>
                  <h6 class="fw-medium">anthony@example.com</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <p class="mb-1">Average Waiting Time</p>
                  <h6 class="fw-medium">00:05</h6>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Employee -->

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
            <router-link to="/calls/call-history" class="btn btn-danger"
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
    return {};
  },
  methods: {
    submitForm() {
      this.$router.push("/applications/call-history");
    },
  },
};
</script>
