<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Notice Period Tracker</h2>
          <p class="text-muted">HR → Payroll → Exit Workflow Engine</p>
        </div>

        <button class="btn btn-primary" @click="fetchNotices">
          Refresh
        </button>
      </div>

      <!-- TABLE CARD -->
      <div class="card">
        <div class="card-body">

          <!-- SEARCH -->
          <div class="d-flex justify-content-between mb-3">
            <input
              v-model="searchQuery"
              class="form-control w-25"
              placeholder="Search employee..."
            />
          </div>

          <!-- TABLE -->
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Total</th>
                  <th>Progress</th>
                  <th>Remaining</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in filteredData" :key="item.id">
                  <td>
                    <strong>{{ item.employeeName || "N/A" }}</strong>
                  </td>

                  <td>{{ formatDate(item.startDate) }}</td>
                  <td>{{ formatDate(item.endDate) }}</td>

                  <td>{{ item.totalDays }}</td>

                  <td>
                    {{ item.completedDays || 0 }} / {{ item.totalDays }}
                  </td>

                  <td>
                    <span :class="getRemainingClass(item.remainingDays)">
                      {{ item.remainingDays }}
                    </span>
                  </td>

                  <td>
                    <span class="badge bg-info">
                      {{ item.currentStage }}
                    </span>
                  </td>

                  <td>
                    <span :class="getStatusClass(item.status)">
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="d-flex gap-2">

                    <!-- UPDATE PROGRESS -->
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="updateProgress(item)"
                    >
                      Progress
                    </button>

                    <!-- APPROVE -->
                    <button
                      class="btn btn-sm btn-success"
                      @click="approveStage(item)"
                    >
                      Approve
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- LOADING -->
          <div v-if="loading" class="text-center py-3">
            Loading...
          </div>

          <!-- EMPTY -->
          <div v-if="!loading && filteredData.length === 0" class="text-center py-3 text-muted">
            No notice periods found
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      notices: [],
      searchQuery: "",
      loading: false,
    };
  },

  computed: {
    filteredData() {
      const q = this.searchQuery.toLowerCase();

      return this.notices.filter((n) => {
        return (
          (n.employeeName || "").toLowerCase().includes(q) ||
          (n.status || "").toLowerCase().includes(q) ||
          (n.currentStage || "").toLowerCase().includes(q)
        );
      });
    },
  },

  mounted() {
    this.fetchNotices();
  },

  methods: {
    /**
     * FETCH LIST (REDIS CACHED BACKEND)
     */
    async fetchNotices() {
      try {
        this.loading = true;

        const res = await api.get("/notice-periods");
        this.notices = res.data.data || [];
      } catch (err) {
        console.error(err);
        alert("Failed to load notice periods");
      } finally {
        this.loading = false;
      }
    },

    /**
     * APPROVAL ENGINE (HR → PAYROLL → EXIT)
     */
    async approveStage(item) {
      try {
        await api.patch(`/notice-periods/${item.id}/approve`);

        this.fetchNotices();
      } catch (err) {
        alert(err?.response?.data?.message || "Approval failed");
      }
    },

    /**
     * UPDATE PROGRESS (REAL TIME TRACKING)
     */
    async updateProgress(item) {
      const completed = prompt("Enter completed days:", item.completedDays || 0);

      if (completed === null) return;

      try {
        await api.patch(`/notice-periods/${item.id}/progress`, {
          completedDays: Number(completed),
        });

        this.fetchNotices();
      } catch (err) {
        alert("Failed to update progress");
      }
    },

    /**
     * FORMAT DATE
     */
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    /**
     * STATUS UI
     */
    getStatusClass(status) {
      return {
        badge: true,
        "bg-success": status === "COMPLETED",
        "bg-warning": status === "CLOSING_SOON",
        "bg-primary": status === "INITIATED",
        "bg-info": status === "HR_APPROVED" || status === "PAYROLL_APPROVED",
      };
    },

    /**
     * REMAINING DAYS UI
     */
    getRemainingClass(days) {
      if (days <= 0) return "text-danger fw-bold";
      if (days <= 5) return "text-warning fw-bold";
      return "text-dark";
    },
  },
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}

.badge {
  padding: 6px 10px;
  font-size: 12px;
}
</style>
