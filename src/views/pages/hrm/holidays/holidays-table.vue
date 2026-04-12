<script>
import api from "@/services/api";

export default {
  data() {
    return {
      holidays: [],
      loading: false,
      error: null,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      total: 0,

      rowSelection: {
        onChange: () => {},
        onSelect: () => {},
        onSelectAll: () => {},
      },
    };
  },

  computed: {
    filteredHolidays() {
      const q = this.searchQuery.toLowerCase();

      return this.holidays.filter((h) => {
        return (
          h.title?.toLowerCase().includes(q) ||
          h.date?.toLowerCase().includes(q) ||
          h.type?.toLowerCase().includes(q) ||
          h.status?.toLowerCase().includes(q)
        );
      });
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredHolidays.slice(start, start + this.pageSize);
    },
  },

  watch: {
    pageSize() {
      this.currentPage = 1;
      this.fetchHolidays();
    },
    searchQuery() {
      this.currentPage = 1;
    },
  },

  mounted() {
    this.fetchHolidays();
  },

  methods: {
    // =========================
    // FETCH HOLIDAYS (API)
    // =========================
    async fetchHolidays() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/holidays", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery || undefined,
          },
        });

        const payload = res.data;

        this.holidays = payload.data || [];
        this.total = payload.meta?.total || 0;
        this.totalPages = payload.meta?.pages || 1;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to load holidays";
      } finally {
        this.loading = false;
      }
    },

    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.fetchHolidays();
    },

    formatStatus(status) {
      const map = {
        draft: "badge-warning",
        approved: "badge-info",
        published: "badge-success",
      };
      return map[status] || "badge-secondary";
    },
  },

  watch: {
    currentPage() {
      this.fetchHolidays();
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- HEADER CONTROLS -->
    <div class="row mb-2">
      <div class="col-md-6">
        <label>
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search holidays..."
        />
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="loading" class="p-3 text-center">
      Loading holidays...
    </div>

    <!-- ERROR STATE -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- TABLE -->
    <div v-if="!loading" class="table-responsive">
      <a-table
        class="table"
        :columns="[
          { title: 'Title', dataIndex: 'title', key: 'title' },
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Type', dataIndex: 'type', key: 'type' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          { title: '', key: 'action' },
        ]"
        :data-source="paginatedData"
        :pagination="false"
        :row-selection="rowSelection"
      >

        <template #bodyCell="{ column, record }">

          <!-- TITLE -->
          <template v-if="column.key === 'title'">
            <strong>{{ record.title }}</strong>
          </template>

          <!-- DATE -->
          <template v-if="column.key === 'date'">
            {{ new Date(record.date).toLocaleDateString() }}
          </template>

          <!-- STATUS -->
          <template v-if="column.key === 'status'">
            <span
              class="badge"
              :class="formatStatus(record.status)"
            >
              {{ record.status }}
            </span>
          </template>

          <!-- ACTIONS -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">

              <a
                href="javascript:void(0)"
                class="text-primary"
                data-bs-toggle="modal"
                data-bs-target="#edit_holiday"
              >
                Edit
              </a>

              <a
                href="javascript:void(0)"
                class="text-danger"
                data-bs-toggle="modal"
                data-bs-target="#delete_modal"
              >
                Delete
              </a>

            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- PAGINATION -->
    <div class="row mt-3">
      <div class="col-md-6">
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, total) }}
        of {{ total }}
      </div>

      <div class="col-md-6 text-end">
        <ul class="pagination justify-content-end">

          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="changePage(currentPage - 1)">
              Prev
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
              Next
            </a>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>
