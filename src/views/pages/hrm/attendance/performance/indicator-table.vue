<script>
import api from "@/services/api";

export default {
  name: "IndicatorTable",

  data() {
    return {
      indicators: [],
      loading: false,
      error: null,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize) || 1;
    },
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.fetchIndicators();
    },

    pageSize() {
      this.currentPage = 1;
      this.fetchIndicators();
    },
  },

  mounted() {
    this.fetchIndicators();
  },

  methods: {
    // -----------------------------
    // API Fetch (Goals as Indicators)
    // -----------------------------
    async fetchIndicators() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get("/goal", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery,
          },
        });

        // Backend returns: { success, data, count }
        this.indicators = data?.data || [];
        this.total = data?.count || 0;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    // -----------------------------
    // Pagination
    // -----------------------------
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.fetchIndicators();
    },

    // -----------------------------
    // Selection
    // -----------------------------
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    // -----------------------------
    // Helpers
    // -----------------------------
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    getStatusClass(status) {
      switch ((status || "").toLowerCase()) {
        case "active":
          return "badge-success";
        case "inactive":
          return "badge-secondary";
        case "pending":
          return "badge-warning";
        default:
          return "badge-light";
      }
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-3">
      <div class="col-sm-12 col-md-6">
        <label class="form-label">
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </label>
      </div>

      <div class="col-sm-12 col-md-6 text-md-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search goals..."
        />
      </div>
    </div>

    <!-- Loading / Error -->
    <div v-if="loading" class="text-center py-4">
      <span class="spinner-border"></span>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Table -->
    <div class="table-responsive" v-if="!loading">
      <a-table
        :data-source="indicators"
        :row-selection="{
          selectedRowKeys,
          onChange: onSelectChange,
        }"
        rowKey="id"
        :pagination="false"
      >
        <!-- Columns -->
        <a-table-column title="Goal" data-index="title" key="title" />

        <a-table-column title="Type" data-index="type" key="type" />

        <a-table-column title="Owner" key="owner">
          <template #default="{ record }">
            {{ record.user?.name || "N/A" }}
          </template>
        </a-table-column>

        <a-table-column title="Target" data-index="target" key="target" />

        <a-table-column title="Progress" key="progress">
          <template #default="{ record }">
            {{ record.progress || 0 }}%
          </template>
        </a-table-column>

        <a-table-column title="Status" key="status">
          <template #default="{ record }">
            <span :class="['badge', getStatusClass(record.status)]">
              {{ record.status || "N/A" }}
            </span>
          </template>
        </a-table-column>

        <a-table-column title="Created" key="createdAt">
          <template #default="{ record }">
            {{ formatDate(record.createdAt) }}
          </template>
        </a-table-column>

        <a-table-column title="Actions" key="actions">
          <template #default="{ record }">
            <div class="action-icon d-inline-flex">
              <a
                href="javascript:void(0);"
                class="me-2"
                data-bs-toggle="modal"
                data-bs-target="#edit_goal_modal"
              >
                <i class="ti ti-edit"></i>
              </a>

              <a
                href="javascript:void(0);"
                data-bs-toggle="modal"
                data-bs-target="#delete_goal_modal"
              >
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="row mt-3" v-if="!loading">
      <div class="col-md-5">
        <div>
          Showing
          {{ (currentPage - 1) * pageSize + 1 }}
          -
          {{ Math.min(currentPage * pageSize, total) }}
          of {{ total }}
        </div>
      </div>

      <div class="col-md-7 text-end">
        <ul class="pagination justify-content-end">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
          >
            <a class="page-link" @click.prevent="changePage(currentPage - 1)">
              ‹
            </a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" @click.prevent="changePage(currentPage + 1)">
              ›
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
