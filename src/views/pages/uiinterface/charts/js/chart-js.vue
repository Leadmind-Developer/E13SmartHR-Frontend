<template>
  <layout-header />
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
          <h5 class="fw-bold mb-0">Chart JS</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"><i class="ti ti-home me-1"></i>Home</router-link>
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Charts</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Chart JS</li>
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
              <div>
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...barchartjs }"></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Transparency</div>
            </div>
            <div class="card-body">
              <div>
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...transparencychartJs }"></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Gradient Bar Chart</div>
            </div>
            <div class="card-body">
              <div>
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...gradientchartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...horizontalchartJs }"></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Horizontal Bar Chart Style2</div>
            </div>
            <div class="card-body">
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...horizontal2chartJs }"></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Vertical Stacked Bar Chart</div>
            </div>
            <div class="card-body">
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...verticalchartJs }"></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
        <!-- /Chart -->

        <!-- Chart -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Horizontal Stacked Bar Chart</div>
            </div>
            <div class="card-body">
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...horizontal3ChartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...linechartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...donutchartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...piechartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...areachartJs }"></vue3-chart-js>
              </div>
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
              <div class="chartjs-wrapper-demo">
                <vue3-chart-js class="chartjs-chart" v-bind="{ ...linechartJs }"></vue3-chart-js>
              </div>
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
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import {
  barchartjs,
  transparencychartJs,
  gradientchartJs,
  horizontalchartJs,
  horizontal2chartJs,
  verticalchartJs,
  horizontal3ChartJs,
  linechartJs,
  areachartJs,
  donutchartJs,
  piechartJs,
} from "./data";
export default {
  data() {
    return {
      barchartjs: barchartjs,
      transparencychartJs: transparencychartJs,
      gradientchartJs: gradientchartJs,
      horizontalchartJs: horizontalchartJs,
      horizontal2chartJs: horizontal2chartJs,
      verticalchartJs: verticalchartJs,
      horizontal3ChartJs: horizontal3ChartJs,
      linechartJs: linechartJs,
      areachartJs: areachartJs,
      donutchartJs: donutchartJs,
      piechartJs: piechartJs,
    };
  },
  components: {
    Vue3ChartJs,
  },
};
</script>
