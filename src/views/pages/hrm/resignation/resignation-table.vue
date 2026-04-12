<script>
import api from "@/services/api";

export default {
  name: "ResignationTable",

  data() {
    return {
      resignations: [],
      loading: false,
      error: null,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      selectedRowKeys: [],
    };
  },

  computed: {
    filteredData() {
      const q = this.searchQuery.toLowerCase();

      return this.resignations.filter((r) => {
        return (
          r?.User?.name?.toLowerCase().includes(q) ||
          r?.department?.toLowerCase().includes(q) ||
          r?.reason?.toLowerCase().includes(q) ||
          r?.status?.toLowerCase().includes(q)
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
    /**
     * =========================
     * FETCH RESIGNATIONS (API)
     * =========================
     */
    async fetchResignations() {
      this.loading = true;

      try {
        const res = await api.get("/resignations");

        this.resignations = res.data?.data || [];
      } catch (err) {
        this.error = err.message || "Failed to load resignations";
      } finally {
        this.loading = false;
      }
    },

    /**
     * =========================
     * APPROVE (ROLE BASED)
     * =========================
     */
    async approve(id) {
      try {
        await api.post(`/resignations/${id}/approve`);

        await this.fetchResignations();
      } catch (err) {
        alert(err.message);
      }
    },

    /**
     * =========================
     * ADVANCE WORKFLOW ENGINE
     * =========================
     */
    async advanceWorkflow(id, action) {
      try {
        await api.post(`/resignations/${id}/workflow`, {
          action,
        });

        await this.fetchResignations();
      } catch (err) {
        alert(err.message);
      }
    },

    /**
     * =========================
     * LEGACY STATUS UPDATE
     * =========================
     */
    async updateStatus(id, status) {
      try {
        await api.patch(`/resignations/${id}/status`, {
          status,
        });

        await this.fetchResignations();
      } catch (err) {
        alert(err.message);
      }
    },

    /**
     * =========================
     * UTIL: USER IMAGE
     * =========================
     */
    getImageUrl(image) {
      if (!image) return "/default-avatar.png";
      return new URL(`/src/assets/img/users/${image}`, import.meta.url).href;
    },

    /**
     * =========================
     * STATUS BADGE STYLE
     * =========================
     */
    getStatusClass(status) {
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
    },
  },

  mounted() {
    this.fetchResignations();
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- ===================== SEARCH / PAGINATION CONTROL ===================== -->
    <div class="row p-3">
      <div class="col-md-6">
        <label>
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search resignations..."
        />
      </div>
    </div>

    <!-- ===================== LOADING ===================== -->
    <div v-if="loading" class="p-4 text-center">
      Loading resignations...
    </div>

    <div v-if="error" class="alert alert-danger m-3">
      {{ error }}
    </div>

    <!-- ===================== TABLE ===================== -->
    <div class="table-responsive" v-if="!loading">
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Approver</th>
            <th>Created</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">

            <!-- EMPLOYEE -->
            <td class="d-flex align-items-center gap-2">
              <img
                :src="getImageUrl(item.User?.image)"
                class="rounded-circle"
                width="35"
              />
              <div>
                <strong>{{ item.User?.name || "Unknown" }}</strong>
              </div>
            </td>

            <!-- DEPARTMENT -->
            <td>{{ item.department || "-" }}</td>

            <!-- REASON -->
            <td>{{ item.reason || "-" }}</td>

            <!-- STATUS -->
            <td>
              <span :class="getStatusClass(item.status)">
                {{ item.status }}
              </span>
            </td>

            <!-- APPROVER -->
            <td>{{ item.currentApproverRole || "-" }}</td>

            <!-- DATE -->
            <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>

            <!-- ACTIONS -->
            <td class="text-end">

              <!-- APPROVE -->
              <button
                class="btn btn-sm btn-success me-1"
                @click="approve(item.id)"
              >
                Approve
              </button>

              <!-- ADVANCE WORKFLOW -->
              <button
                class="btn btn-sm btn-primary me-1"
                @click="advanceWorkflow(item.id, 'SEND_TO_MANAGER')"
              >
                Send
              </button>

              <!-- EXIT FLOW -->
              <button
                class="btn btn-sm btn-warning me-1"
                @click="advanceWorkflow(item.id, 'START_EXIT_CHECKLIST')"
              >
                Exit
              </button>

              <!-- REJECT -->
              <button
                class="btn btn-sm btn-danger"
                @click="advanceWorkflow(item.id, 'REJECT')"
              >
                Reject
              </button>

            </td>
          </tr>

          <tr v-if="paginatedData.length === 0">
            <td colspan="7" class="text-center text-muted">
              No resignations found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ===================== PAGINATION ===================== -->
    <div class="d-flex justify-content-between align-items-center p-3">
      <div>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, filteredData.length) }}
        of {{ filteredData.length }}
      </div>

      <div>
        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>

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
