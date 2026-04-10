<script>
import api from "@/services/api";

export default {
  name: "LeavesEmployeeTable",

  data() {
    return {
      leaves: [],
      loading: false,
      error: null,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pages: 1,

      filters: {
        type: "",
        status: "",
        from: "",
        to: "",
      },
    };
  },

  computed: {
    columns() {
      return [
        {
          title: "Leave Type",
          dataIndex: "type",
          key: "type",
          sorter: true,
        },
        {
          title: "From",
          dataIndex: "startDate",
          key: "startDate",
        },
        {
          title: "To",
          dataIndex: "endDate",
          key: "endDate",
        },
        {
          title: "No of Days",
          key: "days",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },
  },

  watch: {
    currentPage() {
      this.fetchLeaves();
    },
    pageSize() {
      this.currentPage = 1;
      this.fetchLeaves();
    },
    searchQuery() {
      this.debounceFetch();
    },
    "filters.status": function () {
      this.fetchLeaves();
    },
    "filters.type": function () {
      this.fetchLeaves();
    },
  },

  created() {
    this.fetchLeaves();
  },

  methods: {
    debounceFetch: (() => {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.fetchLeaves();
        }, 400);
      };
    })(),

    async fetchLeaves() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get("/leaves", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery || undefined,
            type: this.filters.type || undefined,
            status: this.filters.status || undefined,
            from: this.filters.from || undefined,
            to: this.filters.to || undefined,
          },
        });

        if (!data.success) throw new Error(data.message || "Failed to load leaves");

        this.leaves = data.data;
        this.total = data.meta?.total || 0;
        this.pages = data.meta?.pages || 1;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    formatDays(leave) {
      if (!leave.startDate || !leave.endDate) return "-";

      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      return `${diff} Day(s)`;
    },

    statusClass(status) {
      switch (status) {
        case "APPROVED":
          return "bg-transparent-success text-success";
        case "PENDING":
          return "bg-transparent-purple text-purple";
        case "DECLINED":
          return "bg-transparent-danger text-danger";
        default:
          return "bg-light text-muted";
      }
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Filters -->
    <div class="row p-3">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search leave type..."
        />
      </div>

      <div class="col-md-3">
        <select v-model="filters.status" class="form-select form-select-sm">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="DECLINED">Declined</option>
        </select>
      </div>

      <div class="col-md-3">
        <select v-model="pageSize" class="form-select form-select-sm">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="p-3 text-center">
      Loading leaves...
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger m-3">
      {{ error }}
    </div>

    <!-- Table -->
    <div class="table-responsive" v-if="!loading">
      <a-table
        :columns="columns"
        :data-source="leaves"
        row-key="id"
        :pagination="false"
      >

        <template #bodyCell="{ column, record }">

          <!-- Leave Type -->
          <template v-if="column.key === 'type'">
            <div class="fw-medium">
              {{ record.type }}
            </div>
          </template>

          <!-- From -->
          <template v-if="column.key === 'startDate'">
            {{ new Date(record.startDate).toLocaleDateString() }}
          </template>

          <!-- To -->
          <template v-if="column.key === 'endDate'">
            {{ new Date(record.endDate).toLocaleDateString() }}
          </template>

          <!-- Days -->
          <template v-if="column.key === 'days'">
            {{ formatDays(record) }}
          </template>

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span class="badge" :class="statusClass(record.status)">
              {{ record.status }}
            </span>
          </template>

          <!-- Action -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">

              <button class="btn btn-sm btn-outline-primary">
                View
              </button>

              <button
                v-if="record.status === 'PENDING'"
                class="btn btn-sm btn-outline-danger"
              >
                Cancel
              </button>

            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center p-3">
      <div>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, total) }}
        of {{ total }}
      </div>

      <div class="pagination">
        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <span class="mx-2">
          Page {{ currentPage }} / {{ pages }}
        </span>

        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === pages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>
