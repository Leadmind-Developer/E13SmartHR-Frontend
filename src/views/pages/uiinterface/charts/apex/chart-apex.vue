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
          <h5 class="fw-bold mb-0">Apex Chart</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Charts</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Apex Chart</li>
          </ol>
        </nav>
      </div>
      <!-- /Page Header -->

      <!-- start row -->
      <div class="row">
        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Apex Simple</h5>
            </div>
            <div class="card-body">
              <apexchart type="line" height="350" :options="basicAreaChart.sline" :series="basicAreaChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Area Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="area" height="350" :options="splineAreaChart.slinearea" :series="splineAreaChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Column Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="350" :options="scolAreaChart.scol" :series="scolAreaChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Column Stacked Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="350" :options="scolstackedAreaChart.scolstacked"
                :series="scolstackedAreaChart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Bar Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="350" :options="sbarAreaChart.sbar" :series="sbarAreaChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Mixed Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="line" height="350" :options="mixedchartAreaChart.mixedchart"
                :series="mixedchartAreaChart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Donut Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="donut" height="350" :options="donutAreaChart.donutchart" :series="donutAreaChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Radial Chart</h5>
            </div>
            <div class="card-body">
              <apexchart type="radialBar" height="350" :options="radialAreaChart.radialchart"
                :series="radialAreaChart.series"></apexchart>
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
  basicAreaChart,
  splineAreaChart,
  scolAreaChart,
  scolstackedAreaChart,
  sbarAreaChart,
  mixedchartAreaChart,
  donutAreaChart,
  radialAreaChart,
} from "./data";
export default {
  data() {
    return {
      basicAreaChart: basicAreaChart,
      splineAreaChart: splineAreaChart,
      scolAreaChart: scolAreaChart,
      scolstackedAreaChart: scolstackedAreaChart,
      sbarAreaChart: sbarAreaChart,
      mixedchartAreaChart: mixedchartAreaChart,
      donutAreaChart: donutAreaChart,
      radialAreaChart: radialAreaChart,
    };
  },
};
</script>
