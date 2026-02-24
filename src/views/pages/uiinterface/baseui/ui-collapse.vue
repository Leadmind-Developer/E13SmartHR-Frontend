<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content pb-0">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Collapse</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Base Ui</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Collapse</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Collapse</h5>
            </div>
            <!-- end card header -->
            <div class="card-body">
              <p class="text-muted mb-3">
                Bootstrap's collapse provides the way to toggle the visibility of any
                content or element. Please read the official
                <a href="https://getbootstrap.com/docs/5.2/components/collapse/" target="_blank">Bootstrap</a>
                documentation for a full list of options.
              </p>

              <p>
                <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false"
                  aria-controls="collapseExample">
                  Link with href
                </a>
                <button class="btn btn-primary ms-1" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Button with data-bs-target
                </button>
              </p>
              <div class="collapse show" id="collapseExample">
                <div class="card card-body mb-0">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                  terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                  labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </div>
            </div>
            <!-- end card-body-->
          </div>
          <!-- end card-->
        </div>
        <!-- end col-->

        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Collapse Horizontal</h5>
            </div>
            <!-- end card header -->

            <div class="card-body">
              <p class="text-muted mb-3">
                The collapse plugin also supports horizontal collapsing. Add the
                <code>.collapse-horizontal</code> modifier class to transition the
                <code>width</code> instead of <code>height</code> and set a
                <code>width</code> on the immediate child element.
              </p>
              <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                  Toggle width collapse
                </button>
              </p>
              <div style="min-height: 105px">
                <div class="collapse collapse-horizontal" id="collapseWidthExample">
                  <div class="card card-body mb-0" style="width: 300px">
                    This is some placeholder content for a horizontal collapse. It's
                    hidden by default and shown when triggered.
                  </div>
                </div>
              </div>
            </div>
            <!-- end card-body-->
          </div>
          <!-- end card-->
        </div>
        <!-- end col-->
      </div>
      <!-- end row-->

      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Multiple Targets</h5>
            </div>
            <!-- end card header -->

            <div class="card-body">
              <p class="text-muted mb-3">
                Multiple <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show
                and hide an element if they each reference it with their
                <code>href</code> or <code>data-bs-target</code> attribute
              </p>

              <p class="mb-0">
                <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
                  aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                  data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
                  Toggle second element
                </button>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse"
                  aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                  Toggle both elements
                </button>
              </p>

              <div class="row">
                <div class="col">
                  <div class="collapse multi-collapsee mt-2" id="multiCollapseExample1">
                    <div class="card card-body mb-0">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                      terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                      labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="collapse multi-collapse mt-2" id="multiCollapseExample2">
                    <div class="card card-body mb-0">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                      terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                      labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row-->
            </div>
            <!-- end card-body-->
          </div>
          <!-- end card-->
        </div>
        <!-- end col-->
      </div>
      <!-- end row-->
    </div>
    <!--End container -->

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
      text: "Collapse",
    };
  },
};
</script>
