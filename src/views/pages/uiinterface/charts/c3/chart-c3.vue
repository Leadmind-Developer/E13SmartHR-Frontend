<template>
  <layout-header />
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper cardhead">
    <!-- Start Content -->
    <div class="content">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">C3 Chart</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Charts</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">C3 Chart</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <!-- start row -->
      <div class="row">
        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Bar Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="300" :options="barc3Chart.barc3" :series="barc3Chart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Multiple Bar Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="300" :options="multic3Chart.multibarc3" :series="multic3Chart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Horizontal Bar Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="300" horizontal="true" :options="horizontalc3Chart.horizontalbarc3"
                :series="horizontalc3Chart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Line Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="area" height="300" :options="linec3Chart.linebarc3" :series="linec3Chart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Line Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="line" height="300" :options="line2c3Chart.line2barc3" :series="line2c3Chart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Line Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="area" height="300" :options="line3c3Chart.line3barc3" :series="line3c3Chart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Pie Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="pie" height="300" :options="piec3Chart.piec3" :series="piec3Chart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Donut Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="donut" height="300" :options="donutc3Chart.donutc3" :series="donutc3Chart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->
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

  <!-- ========================
End Page Content
========================= -->
</template>
<script>
import {
  barc3Chart,
  multic3Chart,
  horizontalc3Chart,
  linec3Chart,
  line2c3Chart,
  line3c3Chart,
  piec3Chart,
  donutc3Chart,
} from "./data";
export default {
  data() {
    return {
      barc3Chart: barc3Chart,
      multic3Chart: multic3Chart,
      horizontalc3Chart: horizontalc3Chart,
      linec3Chart: linec3Chart,
      line2c3Chart: line2c3Chart,
      line3c3Chart: line3c3Chart,
      piec3Chart: piec3Chart,
      donutc3Chart: donutc3Chart,
    };
  },
};
</script>
