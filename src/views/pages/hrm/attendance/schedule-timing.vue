<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";

import { ref, onMounted, watch } from "vue";
import moment from "moment";
import api from "@/service/api"; 
import DateRangePicker from "daterangepicker";

export default {
  name: "ScheduleTiming",

  data() {
    return {
      title: "Schedule Timing",
      text: "Attendance",
      text1: "Schedule Timing",
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

    const schedules = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const pagination = ref({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

    const filters = ref({
      startDate: null,
      endDate: null,
    });

    /**
     * Fetch schedules from API
     */
    const fetchSchedules = async () => {
      loading.value = true;
      error.value = null;

      try {
        const res = await api.get("/schedule-timings", {
          params: {
            page: pagination.value.page,
            limit: pagination.value.limit,
            startDate: filters.value.startDate,
            endDate: filters.value.endDate,
          },
        });

        schedules.value = res.data.data;
        pagination.value = res.data.pagination;
      } catch (err) {
        error.value = err.response?.data?.message || "Failed to load schedules";
      } finally {
        loading.value = false;
      }
    };

    /**
     * Handle pagination change
     */
    const changePage = (page) => {
      pagination.value.page = page;
      fetchSchedules();
    };

    /**
     * Date range picker callback
     */
    const onDateChange = (start, end) => {
      filters.value.startDate = start.format("YYYY-MM-DD");
      filters.value.endDate = end.format("YYYY-MM-DD");
      pagination.value.page = 1;
      fetchSchedules();
    };

    /**
     * Initialize DateRangePicker
     */
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
          onDateChange
        );

        // initial fetch
        filters.value.startDate = start.format("YYYY-MM-DD");
        filters.value.endDate = end.format("YYYY-MM-DD");

        fetchSchedules();
      }
    });

    return {
      dateRangeInput,
      schedules,
      loading,
      error,
      pagination,
      changePage,
    };
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="mb-2">
            <div class="dropdown">
              <a href="javascript:void(0);"
                 class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                 data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a class="dropdown-item rounded-1">
                    <i class="ti ti-file-type-pdf me-1"></i>Export as PDF
                  </a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1">
                    <i class="ti ti-file-type-xls me-1"></i>Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="head-icons ms-2">
            <a href="javascript:void(0);"
               id="collapse-header"
               @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap">

          <h5>Schedule Timing List</h5>

          <div class="d-flex align-items-center flex-wrap">

            <!-- Date Filter -->
            <div class="me-3">
              <div class="input-icon-end position-relative">
                <input
                  type="text"
                  class="form-control date-range"
                  ref="dateRangeInput"
                  placeholder="Select date range"
                />
                <span class="input-icon-addon">
                  <i class="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Content -->
        <div class="card-body">

          <!-- Loading -->
          <div v-if="loading" class="text-center py-4">
            <span class="spinner-border"></span>
          </div>

          <!-- Error -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Table -->
          <div v-if="!loading && schedules.length">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in schedules" :key="item.id">
                  <td>{{ item.user?.email || "N/A" }}</td>
                  <td>{{ item.startTime }}</td>
                  <td>{{ item.endTime }}</td>
                  <td>{{ moment(item.createdAt).format("YYYY-MM-DD") }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty -->
          <div v-if="!loading && !schedules.length" class="text-center py-4">
            No schedule records found.
          </div>

        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-between">
          <div>
            Page {{ pagination.page }} of {{ pagination.totalPages }}
          </div>

          <div>
            <button
              class="btn btn-sm btn-light me-2"
              :disabled="pagination.page <= 1"
              @click="changePage(pagination.page - 1)"
            >
              Prev
            </button>

            <button
              class="btn btn-sm btn-light"
              :disabled="pagination.page >= pagination.totalPages"
              @click="changePage(pagination.page + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed &amp; Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <schedule-time-modal />
</template>
