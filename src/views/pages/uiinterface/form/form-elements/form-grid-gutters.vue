<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content pb-0">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Grid System</h5>
        </div>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center"><router-link to="/dashboard/"><i
                  class="ti ti-home me-1"></i>Home</router-link></li>
            <li class="breadcrumb-item d-flex align-items-center"><a href="javascript:void(0);">Forms</a></li>
            <li class="breadcrumb-item active" aria-current="page">Grid System</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <!-- start row -->
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Form Grid</h5>
            </div>
            <div class="card-body">
              <!-- start row -->
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="First Name" />
                </div>
                <!-- end col -->
                <div class="col-md-6 mb-3">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="Last Name" />
                </div>
                <!-- end col -->
                <div class="col-md-6 mb-3">
                  <label class="form-label">Address</label>

                  <!-- start row -->
                  <div class="row">
                    <div class="col-xl-12 mb-3">
                      <input type="text" class="form-control" placeholder="Street" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-12 mb-3">
                      <input type="text" class="form-control" placeholder="Landmark" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-6 mb-3">
                      <input type="text" class="form-control" placeholder="City" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-6 mb-3">
                      <select id="inputState1" class="form-select">
                        <option selected="">State</option>
                        <option>...</option>
                      </select>
                    </div>
                    <!-- end col -->
                    <div class="col-xl-6 mb-3">
                      <input type="text" class="form-control" placeholder="Postal/Zip code" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-6 mb-3">
                      <select id="inputCountry" class="form-select">
                        <option selected="">Country</option>
                        <option>...</option>
                      </select>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                </div>
                <!-- end col -->
                <div class="col-md-6 mb-3">
                  <!-- start row -->
                  <div class="row">
                    <div class="col-xl-12 mb-3">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" placeholder="Email" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-12 mb-3">
                      <label class="form-label">DOB</label>
                      <input type="date" class="form-control" />
                    </div>
                    <!-- end col -->
                    <div class="col-xl-12 mb-3">
                      <!-- start row -->
                      <div class="row">
                        <label class="form-label mb-1">Maritial Status</label>
                        <div class="col-xl-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="status-married" required="" />
                            <label class="form-check-label" for="status-married">
                              Married
                            </label>
                          </div>
                        </div>
                        <div class="col-xl-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="status-unmarried"
                              required="" />
                            <label class="form-check-label" for="status-unmarried">
                              Single
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- end row -->
                    </div>
                    <!-- end col -->
                    <div class="col-xl-12"></div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                </div>
                <!-- end col -->
                <div class="col-md-6 mb-3">
                  <label class="form-label">Contact Number</label>
                  <input type="number" class="form-control" placeholder="Phone Number" />
                </div>
                <!-- end col -->
                <div class="col-md-6 mb-3">
                  <label class="form-label">Alternative Contact</label>
                  <input type="number" class="form-control" placeholder="Phone Number" />
                </div>
                <!-- end col -->
                <div class="col-md-12">
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="gridCheck" />
                    <label class="form-check-label" for="gridCheck"> Check me out </label>
                  </div>
                </div>
                <!-- end col -->
                <div class="col-md-12">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Gutters</h5>
            </div>
            <div class="card-body">
              <!-- start row -->
              <form class="row g-3 mt-0">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="First Name" />
                </div>
                <!-- end col -->
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="Last Name" />
                </div>
                <!-- end col -->
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" />
                </div>
                <!-- end col -->
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                </div>
                <!-- end col -->
                <div class="col-12">
                  <label for="inputAddress" class="form-label">Address</label>
                  <input type="text" class="form-control" id="inputAddress" />
                </div>
                <!-- end col -->
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">Address 2</label>
                  <input type="text" class="form-control" id="inputAddress2" />
                </div>
                <!-- end col -->
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">City</label>
                  <input type="text" class="form-control" id="inputCity" />
                </div>
                <!-- end col -->
                <div class="col-md-4">
                  <label for="inputState" class="form-label">State</label>
                  <select id="inputState" class="form-select">
                    <option selected="">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <!-- end col -->
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">Zip</label>
                  <input type="text" class="form-control" id="inputZip" />
                </div>
                <!-- end col -->
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck3" />
                    <label class="form-check-label" for="gridCheck3">
                      Check me out
                    </label>
                  </div>
                </div>
                <!-- end col -->
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
                <!-- end col -->
              </form>
              <!-- end row -->
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- End Content -->

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- End Page content -->
  <!-- ============================================================== -->
</template>
<script>
export default {
  data() {
    return {
      title: "Home",
      text: "Grid Gutters",
    };
  },
};
</script>
