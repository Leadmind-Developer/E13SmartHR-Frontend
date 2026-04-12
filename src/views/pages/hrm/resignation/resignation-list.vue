<script>
import { ref, reactive, onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

import api from "@/services/api";

export default {
  name: "ResignationList",

  setup() {
    const dateRangeInput = ref(null);

    const state = reactive({
      loading: false,
      error: null,
      resignations: [],
      filters: {
        startDate: null,
        endDate: null,
      },
    });

    /**
     * =========================
     * FETCH RESIGNATIONS
     * =========================
     */
    const fetchResignations = async () => {
      state.loading = true;
      state.error = null;

      try {
        const { data } = await api.get("/resignation", {
          params: {
            startDate: state.filters.startDate,
            endDate: state.filters.endDate,
          },
        });

        state.resignations = data?.data || [];
      } catch (err) {
        state.error =
          err?.response?.data?.message || "Failed to load resignations";
      } finally {
        state.loading = false;
      }
    };

    /**
     * =========================
     * WORKFLOW ACTION
     * =========================
     */
    const runWorkflow = async (id, action) => {
      try {
        await api.post(`/resignation/${id}/workflow`, { action });
        await fetchResignations();
      } catch (err) {
        console.error(err);
      }
    };

    /**
     * =========================
     * LEGACY STATUS UPDATE
     * =========================
     */
    const updateStatus = async (id, status) => {
      try {
        await api.patch(`/resignation/${id}/status`, { status });
        await fetchResignations();
      } catch (err) {
        console.error(err);
      }
    };

    /**
     * =========================
     * DATE RANGE INIT
     * =========================
     */
    onMounted(() => {
      fetchResignations();

      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        const applyRange = (s, e) => {
          state.filters.startDate = s.format("YYYY-MM-DD");
          state.filters.endDate = e.format("YYYY-MM-DD");
          fetchResignations();
        };

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
            },
          },
          applyRange
        );

        applyRange(start, end);
      }
    });

    /**
     * =========================
     * UI HELPERS
     * =========================
     */
    const getStatusClass = (status) => {
      switch (status) {
        case "PENDING":
          return "badge bg-warning";
        case "HR_REVIEW":
          return "badge bg-info";
        case "APPROVED":
          return "badge bg-success";
        case "REJECTED":
          return "badge bg-danger";
        case "COMPLETED":
          return "badge bg-dark";
        default:
          return "badge bg-secondary";
      }
    };

    return {
      dateRangeInput,
      state,
      runWorkflow,
      updateStatus,
      getStatusClass,
    };
  },

  data() {
    return {
      title: "Resignation",
      text: "HRM",
      text1: "Resignation",
    };
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center">
          <a
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#new_resignation"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Resignation
          </a>

          <a
            class="ms-2"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">
          <h5>Resignation List</h5>

          <div class="d-flex align-items-center">
            <input
              ref="dateRangeInput"
              class="form-control me-2"
              placeholder="Filter date range"
            />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="state.loading" class="p-3">
          Loading resignations...
        </div>

        <!-- Error -->
        <div v-if="state.error" class="alert alert-danger m-3">
          {{ state.error }}
        </div>

        <!-- Table -->
        <div v-if="!state.loading">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Approver</th>
                <th>Date</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in state.resignations" :key="item.id">
                <td>{{ item.employeeName || "N/A" }}</td>
                <td>{{ item.reason || "-" }}</td>

                <td>
                  <span :class="getStatusClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>

                <td>{{ item.currentApproverRole || "-" }}</td>

                <td>
                  {{ moment(item.createdAt).format("YYYY-MM-DD") }}
                </td>

                <td>
                  <!-- Workflow Actions -->
                  <button
                    class="btn btn-sm btn-success me-1"
                    @click="runWorkflow(item.id, 'APPROVE_MANAGER')"
                  >
                    Approve
                  </button>

                  <button
                    class="btn btn-sm btn-warning me-1"
                    @click="runWorkflow(item.id, 'SEND_TO_PAYROLL')"
                  >
                    Payroll
                  </button>

                  <button
                    class="btn btn-sm btn-danger me-1"
                    @click="runWorkflow(item.id, 'REJECT')"
                  >
                    Reject
                  </button>

                  <!-- Legacy fallback -->
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="updateStatus(item.id, 'COMPLETED')"
                  >
                    Close
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-flex justify-content-between p-3 border-top">
      <p>{{ new Date().getFullYear() }} © SmartHR</p>
      <p>Designed & Developed By Dreams</p>
    </div>
  </div>

  <resignation-modal />
</template>
