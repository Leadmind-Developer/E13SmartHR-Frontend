<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content pb-0">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 py-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Ratio Video</h5>
        </div>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Base Ui</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Ratio Video</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <!-- start row -->
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Responsive Ratio video 21:9</h5>
            </div>

            <div class="card-body">
              <p class="text-muted">
                Use class <code>.ratio-21x9</code>
                <!-- 21:9 aspect ratio -->
              </p>

              <div class="ratio ratio-21x9">
                <iframe src="https://www.youtube.com/embed/6bzTrChjEdc?autohide=0&showinfo=0&controls=0"></iframe>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->

          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Responsive Ratio video 1:1</h5>
            </div>

            <div class="card-body">
              <p class="text-muted">Use class <code>.ratio-1x1</code></p>
              <!-- 1:1 aspect ratio -->
              <div class="ratio ratio-1x1">
                <iframe src="https://www.youtube.com/embed/6bzTrChjEdc?autohide=0&showinfo=0&controls=0"></iframe>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Responsive Ratio video 16:9</h5>
            </div>

            <div class="card-body">
              <p class="text-muted">Use class <code>.ratio-16x9</code></p>
              <!-- 16:9 aspect ratio -->
              <div class="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/6bzTrChjEdc?autohide=0&showinfo=0&controls=0"></iframe>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->

          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Responsive Ratio video 4:3</h5>
            </div>

            <div class="card-body">
              <p class="text-muted">Use class <code>.ratio-4x3</code></p>
              <!-- 4:3 aspect ratio -->
              <div class="ratio ratio-4x3">
                <iframe src="https://www.youtube.com/embed/6bzTrChjEdc?autohide=0&showinfo=0&controls=0"></iframe>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- End Content -->

    <!-- Footer Start -->
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
    <!-- Footer End -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Home",
      text: "Ratio",
    };
  },
};
</script>
