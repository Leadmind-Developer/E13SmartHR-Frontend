<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap gap-2">

          <button
            class="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#new_termination"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Termination
          </button>

          <button class="btn btn-light" @click="fetchTerminations">
            <i class="ti ti-refresh me-1"></i> Refresh
          </button>

          <a
            href="javascript:void(0);"
            class="head-icons"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>

        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-3 align-items-center">

          <input
            v-model="search"
            type="text"
            class="form-control w-auto"
            placeholder="Search employee / status..."
          />

          <select v-model="statusFilter" class="form-select w-auto">
            <option value="">All Status</option>
            <option>PENDING_MANAGER</option>
            <option>PENDING_HR</option>
            <option>PENDING_PAYROLL</option>
            <option>EXIT_CHECKLIST</option>
            <option>APPROVED</option>
            <option>REJECTED</option>
          </select>

        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Termination Workflow</h5>
        </div>

        <div class="card-body p-0">

          <div v-if="loading" class="p-4 text-center">
            <div class="spinner-border"></div>
          </div>

          <table v-else class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Initiated By</th>
                <th>Date</th>
                <th width="200">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in filteredList" :key="item.id">

                <td>
                  <strong>{{ item.employeeName || "N/A" }}</strong>
                </td>

                <td>{{ item.reason || "-" }}</td>

                <td>
                  <span :class="statusClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>

                <td>{{ item.initiatedBy || "-" }}</td>

                <td>{{ formatDate(item.createdAt) }}</td>

                <td class="d-flex gap-2">

                  <button
                    v-if="canApprove(item)"
                    class="btn btn-success btn-sm"
                    @click="approve(item.id, 'APPROVE')"
                  >
                    Approve
                  </button>

                  <button
                    v-if="canApprove(item)"
                    class="btn btn-danger btn-sm"
                    @click="approve(item.id, 'REJECT')"
                  >
                    Reject
                  </button>

                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="viewItem(item)"
                  >
                    View
                  </button>

                </td>
              </tr>

              <tr v-if="filteredList.length === 0">
                <td colspan="6" class="text-center py-4">
                  No termination records found
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
    </div>

    <!-- MODAL -->
    <termination-modal />
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      title: "Termination",
      text: "HRM",
      text1: "Termination",

      list: [],
      loading: false,

      search: "",
      statusFilter: "",
    };
  },

  computed: {
    filteredList() {
      return this.list.filter((item) => {
        const matchesSearch =
          !this.search ||
          item.employeeName?.toLowerCase().includes(this.search.toLowerCase());

        const matchesStatus =
          !this.statusFilter || item.status === this.statusFilter;

        return matchesSearch && matchesStatus;
      });
    },
  },

  mounted() {
    this.fetchTerminations();
  },

  methods: {
    /**
     * UI toggle
     */
    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    /**
     * Fetch list (Redis cached backend)
     */
    async fetchTerminations() {
      this.loading = true;

      try {
        const res = await api.get("/termination");

        this.list = res.data?.data || [];
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Workflow approval engine
     */
    async approve(id, action) {
      try {
        await api.patch(`/termination/${id}/approve`, { action });

        await this.fetchTerminations();
      } catch (err) {
        console.error("Approval error:", err);
      }
    },

    /**
     * Permission gate (simple role-based UI guard)
     */
    canApprove(item) {
      const role = localStorage.getItem("role");

      if (item.status === "APPROVED" || item.status === "REJECTED") {
        return false;
      }

      if (role === "SUPER_ADMIN") return true;

      if (role === "MANAGER" && item.status === "PENDING_MANAGER") return true;

      if (role === "HR" && item.status === "PENDING_HR") return true;

      if (role === "PAYROLL" && item.status === "PENDING_PAYROLL") return true;

      return false;
    },

    /**
     * View detail (hook for modal / drawer)
     */
    viewItem(item) {
      this.$emit("view", item);
    },

    /**
     * Status UI
     */
    statusClass(status) {
      return {
        badge: true,
        "bg-warning": status === "PENDING_MANAGER" || status === "PENDING_HR",
        "bg-info": status === "PENDING_PAYROLL" || status === "EXIT_CHECKLIST",
        "bg-success": status === "APPROVED",
        "bg-danger": status === "REJECTED",
      };
    },

    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped>
.badge {
  padding: 6px 10px;
  border-radius: 8px;
  color: white;
}
</style>
