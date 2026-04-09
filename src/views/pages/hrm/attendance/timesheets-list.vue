<script>
import api from "@services/api";

export default {
  data() {
    return {
      title: "Timesheets",
      text: "Attendance",
      text1: "Timesheets",

      loading: false,

      // Data
      timesheets: [],
      pagination: {
        page: 1,
        pages: 1,
        total: 0,
      },

      // Filters
      search: "",
      project: "",
      status: "",
      startDate: "",
      endDate: "",
      sortBy: "createdAt",
      order: "DESC",

      // UI
      selectedRows: [],
    };
  },

  mounted() {
    this.fetchTimesheets();
  },

  methods: {
    /**
     * 🔄 Toggle header
     */
    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    /**
     * 📡 API CALL - FETCH
     */
    async fetchTimesheets(page = 1) {
      try {
        this.loading = true;

        const response = await axios.get("/api/timesheets", {
          params: {
            page,
            limit: 10,
            search: this.search,
            project: this.project,
            status: this.status,
            startDate: this.startDate,
            endDate: this.endDate,
            sortBy: this.sortBy,
            order: this.order,
          },
        });

        this.timesheets = response.data.data;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 🔍 SEARCH
     */
    handleSearch() {
      this.fetchTimesheets(1);
    },

    /**
     * 🔄 PAGINATION
     */
    changePage(page) {
      if (page < 1 || page > this.pagination.pages) return;
      this.fetchTimesheets(page);
    },

    /**
     * 📤 EXPORT
     */
    async exportData(format = "excel") {
      try {
        const res = await axios.get("/api/timesheets/export", {
          params: { format },
        });

        console.log("Export Data:", res.data.data);

        // TODO: plug exceljs/pdfkit download here
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * 📨 SUBMIT
     */
    async submitTimesheet(id) {
      try {
        await axios.post(`/api/timesheets/${id}/submit`);
        this.fetchTimesheets();
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * ✅ APPROVE
     */
    async approveTimesheet(id) {
      try {
        await axios.post(`/api/timesheets/${id}/approve`);
        this.fetchTimesheets();
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * ❌ REJECT
     */
    async rejectTimesheet(id) {
      try {
        await axios.post(`/api/timesheets/${id}/reject`);
        this.fetchTimesheets();
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * ❌ DELETE
     */
    async deleteTimesheet(id) {
      if (!confirm("Are you sure?")) return;

      try {
        await axios.delete(`/api/timesheets/${id}`);
        this.fetchTimesheets();
      } catch (err) {
        console.error(err);
      }
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
      <div class="d-md-flex justify-content-between mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex flex-wrap gap-2">
          <!-- Export -->
          <div class="dropdown">
            <button class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Export
            </button>
            <ul class="dropdown-menu dropdown-menu-end p-2">
              <li>
                <a class="dropdown-item" @click="exportData('pdf')">PDF</a>
              </li>
              <li>
                <a class="dropdown-item" @click="exportData('excel')">Excel</a>
              </li>
            </ul>
          </div>

          <!-- Add -->
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_timesheet"
          >
            Add Work
          </button>

          <!-- Collapse -->
          <button class="btn btn-light" @click="toggleHeader">
            <i class="ti ti-chevrons-up"></i>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3 p-3">
        <div class="row g-2">
          <div class="col-md-3">
            <input
              v-model="search"
              @keyup.enter="handleSearch"
              class="form-control"
              placeholder="Search..."
            />
          </div>

          <div class="col-md-2">
            <select v-model="status" class="form-select">
              <option value="">All Status</option>
              <option>DRAFT</option>
              <option>SUBMITTED</option>
              <option>APPROVED</option>
              <option>REJECTED</option>
            </select>
          </div>

          <div class="col-md-2">
            <input v-model="startDate" type="date" class="form-control" />
          </div>

          <div class="col-md-2">
            <input v-model="endDate" type="date" class="form-control" />
          </div>

          <div class="col-md-2">
            <button class="btn btn-primary w-100" @click="fetchTimesheets">
              Apply
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Project</th>
                <th>Assigned</th>
                <th>Worked</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="text-center">Loading...</td>
              </tr>

              <tr v-for="t in timesheets" :key="t.id">
                <td>{{ t.Employee }}</td>
                <td>{{ t.Date }}</td>
                <td>{{ t.Project }}</td>
                <td>{{ t.Assigned_Hours }}</td>
                <td>{{ t.Worked_Hours }}</td>

                <td>
                  <span class="badge bg-secondary" v-if="t.Status === 'DRAFT'">Draft</span>
                  <span class="badge bg-warning" v-if="t.Status === 'SUBMITTED'">Submitted</span>
                  <span class="badge bg-success" v-if="t.Status === 'APPROVED'">Approved</span>
                  <span class="badge bg-danger" v-if="t.Status === 'REJECTED'">Rejected</span>
                </td>

                <td>
                  <div class="d-flex gap-2">
                    <!-- Submit -->
                    <button
                      v-if="t.Status === 'DRAFT'"
                      class="btn btn-sm btn-primary"
                      @click="submitTimesheet(t.id)"
                    >
                      Submit
                    </button>

                    <!-- Approve / Reject -->
                    <button
                      v-if="t.Status === 'SUBMITTED'"
                      class="btn btn-sm btn-success"
                      @click="approveTimesheet(t.id)"
                    >
                      Approve
                    </button>

                    <button
                      v-if="t.Status === 'SUBMITTED'"
                      class="btn btn-sm btn-danger"
                      @click="rejectTimesheet(t.id)"
                    >
                      Reject
                    </button>

                    <!-- Delete -->
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteTimesheet(t.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!loading && timesheets.length === 0">
                <td colspan="7" class="text-center">No data found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-3 d-flex justify-content-between">
          <span>
            Page {{ pagination.page }} of {{ pagination.pages }}
          </span>

          <div>
            <button
              class="btn btn-sm btn-light me-2"
              @click="changePage(pagination.page - 1)"
            >
              Prev
            </button>

            <button
              class="btn btn-sm btn-light"
              @click="changePage(pagination.page + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer p-3 border-top">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
    </div>
  </div>

  <timesheets-modal />
</template>
