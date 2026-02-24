<template>
  <layout-header />
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content pb-0">
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Float Chart</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Charts</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Float Chart</li>
          </ol>
        </nav>
      </div>
      <!-- Page Header -->

      <!-- start row -->
      <div class="row">
        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Bar Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="300" :options="barflotChart.flotbar1" :series="barflotChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Bar Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="bar" height="300" :options="bar2flotChart.flotbar2" :series="bar2flotChart.series">
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
              <apexchart type="line" height="300" :options="lineflotChat.flotline1" :series="lineflotChat.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Line ChartPOints</div>
            </div>
            <div class="card-body">
              <apexchart type="line" height="300" :options="linepointflotChart.flotline2"
                :series="linepointflotChart.series"></apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Area Chart</div>
            </div>
            <div class="card-body">
              <apexchart type="area" height="300" :options="areaflotChart.flotarea1" :series="areaflotChart.series">
              </apexchart>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Area Chart Points</div>
            </div>
            <div class="card-body">
              <apexchart type="area" height="300" :options="areapointflotChart.flotarea2"
                :series="areapointflotChart.series"></apexchart>
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
              <apexchart type="pie" height="300" :options="pieflotChart.flotpie1" :series="pieflotChart.series">
              </apexchart>
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
              <apexchart type="donut" height="300" :options="donutflotChart.flotpie2" :series="donutflotChart.series">
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
  barflotChart,
  bar2flotChart,
  lineflotChat,
  linepointflotChart,
  areaflotChart,
  areapointflotChart,
  pieflotChart,
  donutflotChart,
} from "./data";
export default {
  data() {
    return {
      barflotChart: barflotChart,
      bar2flotChart: bar2flotChart,
      lineflotChat: lineflotChat,
      linepointflotChart: linepointflotChart,
      areaflotChart: areaflotChart,
      areapointflotChart: areapointflotChart,
      pieflotChart: pieflotChart,
      donutflotChart: donutflotChart,
    };
  },
};
</script>
