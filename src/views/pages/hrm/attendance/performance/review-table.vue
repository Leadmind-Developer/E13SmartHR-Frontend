<script>
import api from "@/services/api";

export default {
  name: "PerformanceReviewTable",

  data() {
    return {
      appraisals: [],
      loading: false,
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
    };
  },

  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase();

      return this.appraisals.filter((item) => {
        const employee = item.User?.name || "";
        const department = item.departmentId || "";
        const status = item.status || "";
        const stage = item.approvalStage || "";

        return (
          employee.toLowerCase().includes(query) ||
          department.toString().toLowerCase().includes(query) ||
          status.toLowerCase().includes(query) ||
          stage.toLowerCase().includes(query)
        );
      });
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredData.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize) || 1;
    },
  },

  methods: {
    async fetchAppraisals() {
      this.loading = true;

      try {
        const res = await api.get("/performance/appraisals");
        this.appraisals = res.data?.data || [];
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    getStatusClass(status) {
      switch (status) {
        case "COMPLETED":
          return "badge-success";
        case "IN_REVIEW":
          return "badge-warning";
        case "REJECTED":
          return "badge-danger";
        default:
          return "badge-secondary";
      }
    },

    getStageLabel(stage) {
      return stage || "-";
    },

    async approve(id) {
      try {
        await api.patch(`/performance/appraisals/${id}/status`, {
          action: "APPROVE",
        });
        this.fetchAppraisals();
      } catch (err) {
        console.error(err);
      }
    },

    async reject(id) {
      try {
        await api.patch(`/performance/appraisals/${id}/status`, {
          action: "REJECT",
        });
        this.fetchAppraisals();
      } catch (err) {
        console.error(err);
      }
    },
  },

  mounted() {
    this.fetchAppraisals();
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-3">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search employee, status, stage..."
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4">
      <span class="spinner-border"></span>
    </div>

    <!-- Table -->
    <div v-else class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>KPI Score</th>
            <th>Status</th>
            <th>Stage</th>
            <th>Date</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-2">
                  <h6 class="mb-0">
                    {{ item.User?.name || "N/A" }}
                  </h6>
                  <small class="text-muted">
                    {{ item.User?.email }}
                  </small>
                </div>
              </div>
            </td>

            <td>{{ item.departmentId }}</td>

            <td>
              <span class="badge bg-info">
                {{ item.overallScore?.toFixed(2) || "-" }}
              </span>
            </td>

            <td>
              <span :class="['badge', getStatusClass(item.status)]">
                {{ item.status }}
              </span>
            </td>

            <td>{{ getStageLabel(item.approvalStage) }}</td>

            <td>{{ formatDate(item.appraisalDate) }}</td>

            <td class="text-end">
              <button
                class="btn btn-sm btn-success me-2"
                @click="approve(item.id)"
              >
                Approve
              </button>

              <button
                class="btn btn-sm btn-danger me-2"
                @click="reject(item.id)"
              >
                Reject
              </button>

              <router-link
                class="btn btn-sm btn-primary"
                :to="`/hrm/performance/${item.id}`"
              >
                View
              </router-link>
            </td>
          </tr>

          <tr v-if="paginatedData.length === 0">
            <td colspan="7" class="text-center py-4">
              No appraisals found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, filteredData.length) }}
        of {{ filteredData.length }}
      </div>

      <ul class="pagination mb-0">
        <li :class="['page-item', { disabled: currentPage === 1 }]">
          <a class="page-link" @click.prevent="currentPage--">Prev</a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          :class="['page-item', { active: page === currentPage }]"
        >
          <a class="page-link" @click.prevent="currentPage = page">
            {{ page }}
          </a>
        </li>

        <li
          :class="['page-item', { disabled: currentPage === totalPages }]"
        >
          <a class="page-link" @click.prevent="currentPage++">Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>
