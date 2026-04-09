<template>
  <div class="card-body p-0">
    <!-- Top Controls -->
    <div class="row mb-3">
      <div class="col-sm-12 col-md-6">
        <label>
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </label>
      </div>

      <div class="col-sm-12 col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search appraisals..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="paginatedData"
        :row-key="(record) => record.id"
        :loading="loading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">

          <!-- Employee -->
          <template v-if="column.key === 'employee'">
            <div class="d-flex align-items-center">
              <div class="ms-2">
                <h6 class="mb-0">
                  {{ record.User?.name || "N/A" }}
                </h6>
                <small>{{ record.User?.email }}</small>
              </div>
            </div>
          </template>

          <!-- Department -->
          <template v-if="column.key === 'department'">
            {{ record.departmentId }}
          </template>

          <!-- Score -->
          <template v-if="column.key === 'score'">
            <span class="fw-bold">
              {{ record.overallScore?.toFixed(2) || "0.00" }}
            </span>
          </template>

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span :class="statusClass(record.status)">
              {{ record.status }}
            </span>
          </template>

          <!-- Approval Stage -->
          <template v-if="column.key === 'stage'">
            <span class="badge bg-info">
              {{ record.approvalStage }}
            </span>
          </template>

          <!-- Date -->
          <template v-if="column.key === 'date'">
            {{ formatDate(record.createdAt) }}
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-primary"
                @click="viewAppraisal(record.id)"
              >
                View
              </button>

              <button
                v-if="record.status !== 'COMPLETED'"
                class="btn btn-sm btn-success"
                @click="approve(record.id)"
              >
                Approve
              </button>

              <button
                v-if="record.status !== 'REJECTED'"
                class="btn btn-sm btn-danger"
                @click="reject(record.id)"
              >
                Reject
              </button>
            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between mt-3">
      <div>
        Showing {{ startItem }} - {{ endItem }} of {{ filteredData.length }}
      </div>

      <div>
        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <span class="mx-2">
          Page {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "IndicatorTable",

  data() {
    return {
      appraisals: [],
      loading: false,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      columns: [
        { title: "Employee", key: "employee" },
        { title: "Department", key: "department" },
        { title: "Score", key: "score" },
        { title: "Status", key: "status" },
        { title: "Stage", key: "stage" },
        { title: "Created", key: "date" },
        { title: "Actions", key: "action" },
      ],
    };
  },

  computed: {
    filteredData() {
      const q = this.searchQuery.toLowerCase();

      return this.appraisals.filter((a) => {
        return (
          a.User?.name?.toLowerCase().includes(q) ||
          a.status?.toLowerCase().includes(q) ||
          a.approvalStage?.toLowerCase().includes(q)
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

    startItem() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },

    endItem() {
      return Math.min(
        this.currentPage * this.pageSize,
        this.filteredData.length
      );
    },
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    pageSize() {
      this.currentPage = 1;
    },
  },

  methods: {
    async fetchAppraisals() {
      this.loading = true;
      try {
        const res = await api.get("/performance/appraisals");
        this.appraisals = res.data.data || [];
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
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

    viewAppraisal(id) {
      this.$router.push(`/hrm/performance/appraisals/${id}`);
    },

    statusClass(status) {
      switch (status) {
        case "COMPLETED":
          return "badge bg-success";
        case "IN_REVIEW":
          return "badge bg-warning";
        case "REJECTED":
          return "badge bg-danger";
        default:
          return "badge bg-secondary";
      }
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },

  mounted() {
    this.fetchAppraisals();
  },
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>
