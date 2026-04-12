<script>
import api from "@/services/api";

export default {
  name: "TrainingTable",

  data() {
    return {
      loading: false,
      trainings: [],
      total: 0,

      // table state
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",

      // debounce
      searchTimeout: null,

      columns: [
        {
          title: "Training",
          key: "title",
        },
        {
          title: "Trainer",
          key: "trainer",
        },
        {
          title: "Type",
          key: "type",
        },
        {
          title: "Duration",
          key: "duration",
        },
        {
          title: "Cost",
          key: "cost",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "",
          key: "action",
        },
      ],
    };
  },

  mounted() {
    this.fetchTrainings();
  },

  methods: {
    async fetchTrainings() {
      this.loading = true;

      try {
        const { data } = await api.get("/trainings", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery || undefined,
          },
        });

        const response = data?.data;

        this.trainings = response.rows || [];
        this.total = response.count || 0;
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchTrainings();
      }, 400);
    },

    handleTableChange(pagination) {
      this.currentPage = pagination.current;
      this.pageSize = pagination.pageSize;
      this.fetchTrainings();
    },

    formatDateRange(start, end) {
      if (!start || !end) return "-";

      const s = new Date(start).toLocaleDateString();
      const e = new Date(end).toLocaleDateString();

      return `${s} - ${e}`;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- Top Controls -->
    <div class="row mb-3">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select w-auto" @change="fetchTrainings">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="form-control w-50 ms-auto"
          placeholder="Search trainings..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        class="table datatable thead-light"
        :columns="columns"
        :data-source="trainings"
        :loading="loading"
        :pagination="{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: false
        }"
        rowKey="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">

          <!-- Training -->
          <template v-if="column.key === 'title'">
            <h6 class="fw-medium mb-0">
              {{ record.title }}
            </h6>
            <small class="text-muted">
              {{ record.description }}
            </small>
          </template>

          <!-- Trainer -->
          <template v-if="column.key === 'trainer'">
            {{ record.Trainer?.name || "-" }}
          </template>

          <!-- Type -->
          <template v-if="column.key === 'type'">
            {{ record.TrainingType?.name || "-" }}
          </template>

          <!-- Duration -->
          <template v-if="column.key === 'duration'">
            {{ formatDateRange(record.startDate, record.endDate) }}
          </template>

          <!-- Cost -->
          <template v-if="column.key === 'cost'">
            ₦{{ record.cost || 0 }}
          </template>

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span
              class="badge badge-xs"
              :class="{
                'badge-success': record.status === 'ACTIVE',
                'badge-secondary': record.status !== 'ACTIVE'
              }"
            >
              {{ record.status || "N/A" }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a href="#" class="me-2">
                <i class="ti ti-edit"></i>
              </a>
              <a href="#">
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>

        </template>
      </a-table>
    </div>
  </div>
</template>
