<script>
import api from "@/services/api";

export default {
  name: "TrainersTable",

  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,

      // Server-side controls
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",

      // debounce
      searchTimeout: null,
    };
  },

  computed: {
    columns() {
      return [
        {
          title: "Training",
          dataIndex: ["title"],
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
          title: "Created",
          key: "createdAt",
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },
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

        const result = data?.data;

        this.tableData = result?.rows || [];
        this.total = result?.count || 0;
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      } finally {
        this.loading = false;
      }
    },

    handleTableChange(pagination) {
      this.currentPage = pagination.current;
      this.pageSize = pagination.pageSize;

      this.fetchTrainings();
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchTrainings();
      }, 400);
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- Header Controls -->
    <div class="row p-3">
      <div class="col-md-6">
        <select
          v-model="pageSize"
          class="form-select form-select-sm"
          @change="fetchTrainings"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search trainings..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true
        }"
        rowKey="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          
          <!-- Training Title -->
          <template v-if="column.key === 'title'">
            <div>
              <h6 class="fw-medium mb-0">
                {{ record.title }}
              </h6>
            </div>
          </template>

          <!-- Trainer -->
          <template v-if="column.key === 'trainer'">
            <div>
              {{ record.Trainer?.name || "—" }}
            </div>
          </template>

          <!-- Type -->
          <template v-if="column.key === 'type'">
            <span class="badge bg-info">
              {{ record.TrainingType?.name || "—" }}
            </span>
          </template>

          <!-- Created -->
          <template v-if="column.key === 'createdAt'">
            {{ formatDate(record.createdAt) }}
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <a
                href="javascript:void(0);"
                class="text-primary"
                title="Edit"
              >
                <i class="ti ti-edit"></i>
              </a>

              <a
                href="javascript:void(0);"
                class="text-danger"
                title="Delete"
              >
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && tableData.length === 0" class="text-center p-4">
      <p class="text-muted mb-0">No trainings found</p>
    </div>
  </div>
</template>
