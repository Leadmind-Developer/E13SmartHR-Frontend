<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content pb-4">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="head-icons">
          <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <div class="row">

        <!-- Call -->
        <div class="col-xxl-12">
          <div class="card incoming-call mb-0">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <div class="voice-call-img mb-3">
                <img src="@/assets/img/users/user-32.jpg" class="img-fluid rounded-circle" alt="img">
              </div>
              <h4 class="fs-20 fw-bold">Anthony Lewis</h4>
              <p>Calling...</p>
              <div class="d-flex align-items-center justify-content-center">
                <a href="#"
                  class="btn btn-success call-item p-0 d-flex align-items-center justify-content-center me-3"><i
                    class="ti ti-phone fs-20"></i></a>
                <a href="#" class="btn btn-danger call-item p-0 d-flex align-items-center justify-content-center"><i
                    class="ti ti-phone-off fs-20"></i></a>
              </div>
            </div>
          </div>
        </div>
        <!-- /Call -->

      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Incoming Call",
      text: "Applications",
      text1: "Incoming Call",
    };
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>
