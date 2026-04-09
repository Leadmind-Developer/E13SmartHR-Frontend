<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
          <h2 class="mb-1">Shift Swap Requests</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">
                  <i class="ti ti-smart-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">Attendance</li>
              <li class="breadcrumb-item active">Shift Swap Requests</li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-3 align-items-center">

          <!-- Search -->
          <input
            v-model="filters.search"
            type="text"
            class="form-control w-auto"
            placeholder="Search..."
            @input="debouncedFetch"
          />

          <!-- Status -->
          <select v-model="filters.status" class="form-select w-auto" @change="fetchData">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED_BY_MANAGER">Approved (Manager)</option>
            <option value="APPROVED_BY_HR">Approved (HR)</option>
            <option value="APPROVED_FINAL">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <!-- Designation -->
          <select v-model="filters.designation" class="form-select w-auto" @change="fetchData">
            <option value="">All Designations</option>
            <option>Accountant</option>
            <option>App Developer</option>
            <option>Technician</option>
            <option>Web Developer</option>
          </select>

          <!-- Date Range -->
          <input
            type="text"
            class="form-control w-auto"
            ref="dateRangeInput"
            placeholder="Date Range"
          />

          <!-- Refresh -->
          <button class="btn btn-primary" @click="fetchData">
            Refresh
          </button>

        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body">

          <div v-if="loading" class="text-center py-4">
            Loading...
          </div>

          <a-table
            v-else
            :columns="columns"
            :data-source="requests"
            :pagination="false"
            row-key="id"
          >
            <template #bodyCell="{ column, record }">

              <template v-if="column.key === 'employee'">
                {{ record.employee?.name || '-' }}
              </template>

              <template v-if="column.key === 'designation'">
                {{ record.employee?.designation || '-' }}
              </template>

              <template v-if="column.key === 'currentShift'">
                {{ record.currentShiftId }}
              </template>

              <template v-if="column.key === 'requestedShift'">
                {{ record.requestedShiftId }}
              </template>

              <template v-if="column.key === 'status'">
                <span class="badge"
                  :class="statusClass(record.status)">
                  {{ record.status }}
                </span>
              </template>

              <template v-if="column.key === 'action'">
                <button class="btn btn-sm btn-outline-primary me-2"
                  @click="viewRequest(record)">
                  View
                </button>

                <button
                  v-if="canApprove"
                  class="btn btn-sm btn-success me-2"
                  @click="updateStatus(record.id, 'APPROVED')"
                >
                  Approve
                </button>

                <button
                  v-if="canApprove"
                  class="btn btn-sm btn-danger"
                  @click="updateStatus(record.id, 'REJECTED')"
                >
                  Reject
                </button>
              </template>

            </template>
          </a-table>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {{ pagination.page }} of {{ pagination.totalPages }}
            </div>

            <div>
              <button
                class="btn btn-sm btn-secondary me-2"
                :disabled="pagination.page === 1"
                @click="changePage(pagination.page - 1)"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-secondary"
                :disabled="pagination.page === pagination.totalPages"
                @click="changePage(pagination.page + 1)"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

export default {
  data() {
    return {
      requests: [],
      loading: false,

      filters: {
        status: "",
        designation: "",
        startDate: "",
        endDate: "",
        search: ""
      },

      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1
      },

      columns: [
        { title: "Employee", key: "employee" },
        { title: "Designation", key: "designation" },
        { title: "Current Shift", key: "currentShift" },
        { title: "Requested Shift", key: "requestedShift" },
        { title: "Status", key: "status" },
        { title: "Action", key: "action" }
      ]
    };
  },

  computed: {
    canApprove() {
      const role = localStorage.getItem("role");
      return ["MANAGER", "HR", "ADMIN"].includes(role);
    }
  },

  mounted() {
    this.initDateRange();
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true;

        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          status: this.filters.status || undefined,
          designation: this.filters.designation || undefined,
          startDate: this.filters.startDate || undefined,
          endDate: this.filters.endDate || undefined
        };

        const res = await api.get("/shift-swap-requests", { params });

        this.requests = res.data.data;
        this.pagination.totalPages = res.data.pagination.totalPages;

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    changePage(page) {
      this.pagination.page = page;
      this.fetchData();
    },

    async updateStatus(id, status) {
      try {
        await api.patch(`/shift-swap-requests/${id}/status`, { status });
        this.fetchData();
      } catch (err) {
        console.error(err);
      }
    },

    viewRequest(record) {
      this.$router.push(`/attendance/shift-swap/${record.id}`);
    },

    statusClass(status) {
      switch (status) {
        case "PENDING":
          return "bg-info";
        case "APPROVED_BY_MANAGER":
        case "APPROVED_BY_HR":
          return "bg-primary";
        case "APPROVED_FINAL":
          return "bg-success";
        case "REJECTED":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },

    initDateRange() {
      const el = this.$refs.dateRangeInput;
      if (!el) return;

      const start = moment().subtract(6, "days");
      const end = moment();

      const self = this;

      new DateRangePicker(el, {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()]
        }
      }, function (start, end) {
        self.filters.startDate = start.format("YYYY-MM-DD");
        self.filters.endDate = end.format("YYYY-MM-DD");
        self.fetchData();
      });
    },

    debouncedFetch: (() => {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.fetchData();
        }, 500);
      };
    })()
  }
};
</script>
