<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/
const title = "Performance Indicator";
const text = "Performance";
const text1 = "Performance Indicator";

const loading = ref(false);
const error = ref(null);
const indicators = ref([]);

const dateRangeInput = ref(null);

/*
|--------------------------------------------------------------------------
| Fetch Indicators (Future backend endpoint)
|--------------------------------------------------------------------------
| Expected endpoint (recommended):
| GET /performance/indicators
|--------------------------------------------------------------------------
*/
const fetchIndicators = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await api.get("/performance/appraisals");

    indicators.value = data?.data || [];
  } catch (err) {
    error.value = err?.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| Date Range Picker
|--------------------------------------------------------------------------
*/
const initDateRange = () => {
  if (!dateRangeInput.value) return;

  const start = moment().subtract(6, "days");
  const end = moment();

  function booking_range(start, end) {
    return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
  }

  new DateRangePicker(
    dateRangeInput.value,
    {
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [
          moment().subtract(1, "days"),
          moment().subtract(1, "days"),
        ],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [
          moment().startOf("month"),
          moment().endOf("month"),
        ],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    booking_range
  );

  booking_range(start, end);
};

/*
|--------------------------------------------------------------------------
| Header Toggle
|--------------------------------------------------------------------------
*/
const toggleHeader = () => {
  const el = document.getElementById("collapse-header");
  if (el) el.classList.toggle("active");

  document.body.classList.toggle("header-collapse");
};

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/
onMounted(() => {
  fetchIndicators();
  initDateRange();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="mb-2">
            <a
              href="javascript:void(0);"
              data-bs-toggle="modal"
              data-bs-target="#add_performance_indicator"
              class="btn btn-primary d-flex align-items-center"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Indicator
            </a>
          </div>

          <div class="head-icons ms-2">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              class=""
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Collapse"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div
          class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3"
        >
          <h5>Performance Indicator List</h5>

          <div class="d-flex align-items-center flex-wrap row-gap-3">
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Sort By : Last 7 Days
              </a>

              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a class="dropdown-item rounded-1" href="#">Recently Added</a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1" href="#">Ascending</a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1" href="#">Descending</a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1" href="#">Last Month</a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1" href="#">Last 7 Days</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="p-4 text-center">
          Loading performance data...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="p-4 text-danger text-center">
          {{ error }}
        </div>

        <!-- Table -->
        <div v-else>
          <div v-if="indicators.length === 0" class="p-4 text-center">
            No performance data available.
          </div>

          <indicator-table v-else :data="indicators" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal -->
  <indicator-modal />
</template>
