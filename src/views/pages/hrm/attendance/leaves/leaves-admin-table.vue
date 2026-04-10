<template>
  <div class="leave-admin">
    <!-- HEADER -->
    <div class="page-header">
      <h2>Leave Management</h2>

      <div class="actions">
        <input
          v-model="filters.search"
          placeholder="Search leave type..."
          @input="debouncedFetch"
        />

        <select v-model="filters.status" @change="fetchLeaves">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select v-model="filters.type" @change="fetchLeaves">
          <option value="">All Types</option>
          <option value="ANNUAL">Annual</option>
          <option value="SICK">Sick</option>
          <option value="CASUAL">Casual</option>
        </select>

        <input type="date" v-model="filters.from" @change="fetchLeaves" />
        <input type="date" v-model="filters.to" @change="fetchLeaves" />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Anomaly</th>
            <th>Created</th>
            <th v-if="canApprove">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="leave in leaves" :key="leave.id">
            <td>{{ leave.employee?.email }}</td>
            <td>{{ leave.type }}</td>

            <td>
              {{ formatDate(leave.startDate) }} →
              {{ formatDate(leave.endDate) }}
            </td>

            <td>
              <span :class="statusClass(leave.status)">
                {{ leave.status }}
              </span>
            </td>

            <td>
              <span v-if="leave.isAnomaly" class="badge warn">
                ⚠ AI Flagged
              </span>
              <span v-else>-</span>
            </td>

            <td>{{ formatDate(leave.createdAt) }}</td>

            <!-- ACTIONS -->
            <td v-if="canApprove">
              <button
                v-if="leave.status === 'PENDING'"
                @click="approveLeave(leave.id)"
              >
                Approve
              </button>
            </td>
          </tr>

          <tr v-if="!leaves.length">
            <td colspan="7" class="empty">No leave records found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="pagination">
      <button :disabled="page === 1" @click="changePage(page - 1)">
        Prev
      </button>

      <span>Page {{ page }} of {{ totalPages }}</span>

      <button
        :disabled="page === totalPages"
        @click="changePage(page + 1)"
      >
        Next
      </button>
    </div>

    <!-- AI INSIGHT PANEL -->
    <div class="ai-panel" v-if="aiPredictions.length">
      <h3>AI Leave Predictions</h3>

      <ul>
        <li v-for="p in aiPredictions" :key="p.employeeId">
          Employee {{ p.employeeId }} likely to take leave in month
          <b>{{ p.likelyMonth }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { debounce } from "lodash";

export default {
  name: "LeavesAdminTable",

  data() {
    return {
      leaves: [],
      aiPredictions: [],

      page: 1,
      limit: 10,
      totalPages: 1,

      filters: {
        search: "",
        status: "",
        type: "",
        from: "",
        to: ""
      },

      loading: false
    };
  },

  computed: {
    /**
     * RBAC (simple frontend guard)
     */
    canApprove() {
      const role = localStorage.getItem("role");
      return ["ADMIN", "HR", "MANAGER"].includes(role);
    }
  },

  mounted() {
    this.fetchLeaves();
    this.fetchAI();
  },

  methods: {
    /**
     * FETCH LEAVES (BACKEND ALIGNED)
     */
    async fetchLeaves() {
      this.loading = true;

      try {
        const { data } = await api.get("/leaves", {
          params: {
            page: this.page,
            limit: this.limit,
            ...this.filters
          }
        });

        this.leaves = data.data || [];
        this.totalPages = data.meta?.pages || 1;
      } catch (err) {
        console.error("Fetch leaves error:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * APPROVE LEAVE
     */
    async approveLeave(id) {
      try {
        await api.patch(`/leaves/${id}/approve`);

        this.$toast?.success("Leave approved");

        this.fetchLeaves();
      } catch (err) {
        this.$toast?.error(err.response?.data?.message || "Error approving leave");
      }
    },

    /**
     * AI PREDICTIONS
     */
    async fetchAI() {
      try {
        const { data } = await api.get("/leaves/ai/predictions");
        this.aiPredictions = data.data || [];
      } catch (err) {
        console.error("AI error:", err);
      }
    },

    /**
     * PAGE CHANGE
     */
    changePage(p) {
      this.page = p;
      this.fetchLeaves();
    },

    /**
     * FORMAT DATE
     */
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    /**
     * STATUS STYLING
     */
    statusClass(status) {
      return {
        badge: true,
        pending: status === "PENDING",
        approved: status === "APPROVED",
        rejected: status === "REJECTED"
      };
    },

    /**
     * DEBOUNCED SEARCH
     */
    debouncedFetch: debounce(function () {
      this.page = 1;
      this.fetchLeaves();
    }, 400)
  }
};
</script>

<style scoped>
.leave-admin {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.table-wrapper {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.pending {
  background: #fff3cd;
}

.approved {
  background: #d4edda;
}

.rejected {
  background: #f8d7da;
}

.warn {
  background: #ffeeba;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.ai-panel {
  margin-top: 30px;
  padding: 15px;
  background: #f9f9f9;
}
</style>
