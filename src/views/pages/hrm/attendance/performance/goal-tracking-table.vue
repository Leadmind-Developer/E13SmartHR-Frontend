<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-2">
      <div class="col-sm-12 col-md-6">
        <div class="dataTables_length">
          <label>
            Rows per page
            <select v-model="limit" @change="fetchGoals" class="form-select form-select-sm">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </label>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 text-end">
        <input
          v-model="search"
          @input="debouncedFetch"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search goals..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="goals"
        :loading="loading"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">

          <!-- Goal Type -->
          <template v-if="column.key === 'goalType'">
            {{ record.GoalType?.name || 'N/A' }}
          </template>

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span class="badge"
              :class="record.status === 'Active' ? 'bg-success' : 'bg-secondary'">
              {{ record.status }}
            </span>
          </template>

          <!-- Progress -->
          <template v-if="column.key === 'progress'">
            <div>
              <small>{{ record.progress || 0 }}%</small>
              <div class="progress" style="height:5px;">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{ width: record.progress + '%' }"
                ></div>
              </div>
            </div>
          </template>

          <!-- Dates -->
          <template v-if="column.key === 'startDate'">
            {{ formatDate(record.startDate) }}
          </template>

          <template v-if="column.key === 'endDate'">
            {{ formatDate(record.endDate) }}
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" @click="editGoal(record)">
                Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteGoal(record)">
                Delete
              </button>
            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Showing {{ paginationInfo.from }} - {{ paginationInfo.to }} of {{ paginationInfo.total }} entries
      </div>

      <a-pagination
        v-model:current="page"
        :page-size="limit"
        :total="paginationInfo.total"
        @change="fetchGoals"
      />
    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "GoalTrackingTable",

  data() {
    return {
      goals: [],
      loading: false,

      search: "",
      page: 1,
      limit: 10,

      paginationInfo: {
        total: 0,
        from: 0,
        to: 0,
      },

      columns: [
        { title: "Goal Type", key: "goalType" },
        { title: "Subject", dataIndex: "subject", key: "subject" },
        { title: "Target", dataIndex: "target", key: "target" },
        { title: "Start Date", key: "startDate" },
        { title: "End Date", key: "endDate" },
        { title: "Status", key: "status" },
        { title: "Progress", key: "progress" },
        { title: "Actions", key: "action" },
      ],
    };
  },

  mounted() {
    this.fetchGoals();
  },

  methods: {
    async fetchGoals() {
      this.loading = true;

      try {
        const { data } = await api.get("/goal", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.search,
          },
        });

        this.goals = data.data || [];
        this.paginationInfo.total = data.count || 0;

        const start = (this.page - 1) * this.limit + 1;
        const end = Math.min(this.page * this.limit, this.paginationInfo.total);

        this.paginationInfo.from = this.paginationInfo.total ? start : 0;
        this.paginationInfo.to = end;

      } catch (error) {
        console.error("Failed to fetch goals:", error.message);
      } finally {
        this.loading = false;
      }
    },

    debouncedFetch: (() => {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.page = 1;
          this.fetchGoals();
        }, 400);
      };
    })(),

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    editGoal(record) {
      this.$emit("edit-goal", record);
    },

    async deleteGoal(record) {
      if (!confirm("Are you sure you want to delete this goal?")) return;

      try {
        await api.delete(`/goal/${record.id}`);
        this.fetchGoals();
      } catch (error) {
        console.error("Delete failed:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>
