<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                      class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="head-icons">
            <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-original-title="Collapse" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Breadcrumb -->

      <div class="row">
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="border-bottom pb-3 mb-3">
                <div class="row align-items-center">
                  <div class="col-7">
                    <div>
                      <span class="fs-14 fw-normal text-truncate mb-1">Total Transaction</span>
                      <h5>$5,340</h5>
                    </div>
                  </div>
                  <div class="col-5">
                    <div id="total-chart">
                      <apexchart type="area" width="50" :options="totalChart.total" :series="totalChart.series">
                      </apexchart>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <p class="fs-12 fw-normal d-flex align-items-center text-truncate">
                  <span class="text-primary fs-12 d-flex align-items-center me-1">
                    <i class="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="border-bottom pb-3 mb-3">
                <div class="row align-items-center">
                  <div class="col-7">
                    <div>
                      <span class="fs-14 fw-normal text-truncate mb-1">Total Subscribers</span>
                      <h5>600</h5>
                    </div>
                  </div>
                  <div class="col-5">
                    <div id="active-chart">
                      <apexchart type="area" width="50" :options="activeChart.active" :series="activeChart.series">
                      </apexchart>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <p class="fs-12 fw-normal d-flex align-items-center text-truncate">
                  <span class="text-primary fs-12 d-flex align-items-center me-1">
                    <i class="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="border-bottom pb-3 mb-3">
                <div class="row align-items-center">
                  <div class="col-7">
                    <div>
                      <span class="fs-14 fw-normal text-truncate mb-1">Active Subscribers</span>
                      <h5>560</h5>
                    </div>
                  </div>
                  <div class="col-5">
                    <div id="inactive-chart">
                      <apexchart type="area" width="50" :options="inactiveChart.inactive"
                        :series="inactiveChart.series">
                      </apexchart>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <p class="fs-12 fw-normal d-flex align-items-center text-truncate">
                  <span class="text-primary fs-12 d-flex align-items-center me-1">
                    <i class="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="border-bottom pb-3 mb-3">
                <div class="row align-items-center">
                  <div class="col-7">
                    <div>
                      <span class="fs-14 fw-normal text-truncate mb-1">Expired Subscribers</span>
                      <h5>40</h5>
                    </div>
                  </div>
                  <div class="col-5">
                    <div id="location-chart">
                      <apexchart type="area" width="50" :options="locationChart.location"
                        :series="locationChart.series">
                      </apexchart>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <p class="fs-12 fw-normal d-flex align-items-center text-truncate">
                  <span class="text-primary fs-12 d-flex align-items-center me-1">
                    <i class="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Subscription List</h5>
          <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div class="me-3">
              <div class="input-icon-end position-relative">
                <input type="text" class="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span class="input-icon-addon">
                  <i class="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Select Plan
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Advanced (Monthly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Basic (Yearly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Enterprise (Monthly)</a>
                </li>
              </ul>
            </div>
            <div class="dropdown me-3">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Paid</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Unpaid</a>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Descending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <subscription-table></subscription-table>
      </div>
    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }}2025 &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>
  <!-- /Page Wrapper -->
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import { totalChart, activeChart, inactiveChart, locationChart } from "./data";
export default {
  data() {
    return {
      totalChart: totalChart,
      activeChart: activeChart,
      inactiveChart: inactiveChart,
      locationChart: locationChart,
      title: "Subscription",
      text: "Superadmin",
      text1: "Subscription",
    };
  },
  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
  setup() {
    const dateRangeInput = ref(null);

    // Move the function declaration outside of the onMounted callback
    function booking_range(start, end) {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    }

    onMounted(() => {
      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          booking_range
        );

        booking_range(start, end);
      }
    });

    return {
      dateRangeInput,
    };
  },
};
</script>
