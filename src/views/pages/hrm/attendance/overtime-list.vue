<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";

import { ref, reactive, onMounted, watch } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";

import api from "@/services/api";

export default {
  setup() {
    const title = "Overtime";
    const text = "Attendance";
    const text1 = "Overtime";

    const dateRangeInput = ref(null);

    const loading = ref(false);
    const error = ref(null);

    const overtimeList = ref([]);
    const stats = ref({
      overtimeEmployees: 0,
      overtimeHours: 0,
      pendingRequests: 0,
      rejected: 0,
    });

    const filters = reactive({
      startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      employeeId: null,
      projectId: null,
      status: null,
      page: 1,
      limit: 10,
    });

    // -------------------------
    // Fetch Stats
    // -------------------------
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/overtime/stats", {
          params: {
            startDate: filters.startDate,
            endDate: filters.endDate,
          },
        });

        if (data?.success) {
          stats.value = data.data;
        }
      } catch (err) {
        console.error(err);
      }
    };

    // -------------------------
    // Fetch Overtime List
    // -------------------------
    const fetchOvertime = async () => {
      loading.value = true;
      error.value = null;

      try {
        const { data } = await api.get("/overtime", {
          params: {
            startDate: filters.startDate,
            endDate: filters.endDate,
            employeeId: filters.employeeId,
            projectId: filters.projectId,
            status: filters.status,
            page: filters.page,
            limit: filters.limit,
          },
        });

        if (data?.success) {
          overtimeList.value = data.data;
        }
      } catch (err) {
        error.value =
          err?.response?.data?.message || "Failed to load overtime data";
      } finally {
        loading.value = false;
      }
    };

    // -------------------------
    // Date Range Picker
    // -------------------------
    function initDatePicker() {
      if (!dateRangeInput.value) return;

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
        (start, end) => {
          filters.startDate = start.format("YYYY-MM-DD");
          filters.endDate = end.format("YYYY-MM-DD");

          fetchStats();
          fetchOvertime();
        }
      );
    }

    // -------------------------
    // Watch Filters
    // -------------------------
    watch(
      () => [
        filters.employeeId,
        filters.projectId,
        filters.status,
        filters.page,
      ],
      () => {
        fetchOvertime();
      }
    );

    // -------------------------
    // Header Toggle
    // -------------------------
    const toggleHeader = () => {
      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    };

    // -------------------------
    // Lifecycle
    // -------------------------
    onMounted(() => {
      initDatePicker();
      fetchStats();
      fetchOvertime();
    });

    return {
      title,
      text,
      text1,
      dateRangeInput,
      overtimeList,
      stats,
      loading,
      error,
      filters,
      toggleHeader,
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
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a class="dropdown-item rounded-1">Export as PDF</a>
                </li>
                <li>
                  <a class="dropdown-item rounded-1">Export as Excel</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-2">
            <a
              href="javascript:void(0);"
              data-bs-toggle="modal"
              data-bs-target="#add_overtime"
              class="btn btn-primary d-flex align-items-center"
            >
              <i class="ti ti-circle-plus me-2"></i>Add Overtime
            </a>
          </div>

          <div class="head-icons ms-2">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Overtime Employee</p>
              <h4>{{ stats.overtimeEmployees }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Overtime Hours</p>
              <h4>{{ stats.overtimeHours }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Pending Request</p>
              <h4>{{ stats.pendingRequests }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Rejected</p>
              <h4>{{ stats.rejected }}</h4>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters + Table -->
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center flex-wrap"
        >
          <h5>Overtime</h5>

          <div class="d-flex flex-wrap align-items-center">
            <div class="me-3">
              <input
                ref="dateRangeInput"
                type="text"
                class="form-control"
                placeholder="Select date range"
              />
            </div>

            <div class="dropdown me-3">
              <button class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
                Status
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" @click="filters.status = 'APPROVED'">
                    Approved
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" @click="filters.status = 'REJECTED'">
                    Rejected
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" @click="filters.status = 'PENDING'">
                    Pending
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-body p-0">
          <div v-if="loading" class="p-3">Loading...</div>
          <div v-else-if="error" class="p-3 text-danger">
            {{ error }}
          </div>

          <div v-else class="table-responsive">
            <overtime-table :rows="overtimeList" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
    </div>
  </div>

  <overtime-modal />
</template>
