<script>
import api from "@/services/api";

export default {
  data() {
    return {
      loading: false,

      leaves: [],
      searchQuery: "",

      page: 1,
      limit: 10,
      total: 0,
      pages: 1,

      selectedRowKeys: [],

      filters: {
        type: "",
        status: "",
        from: "",
        to: "",
      },
    };
  },

  watch: {
    searchQuery() {
      this.page = 1;
      this.fetchLeaves();
    },

    page() {
      this.fetchLeaves();
    },

    limit() {
      this.page = 1;
      this.fetchLeaves();
    },
  },

  mounted() {
    this.fetchLeaves();
  },

  computed: {
    columns() {
      return [
        {
          title: "Employee",
          key: "employee",
        },
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
          title: "Status",
          key: "status",
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },
  },

  methods: {
    /**
     * FETCH LEAVES FROM BACKEND
     */
    async fetchLeaves() {
      this.loading = true;

      try {
        const { data } = await api.get("/leaves", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.searchQuery || undefined,
            type: this.filters.type || undefined,
            status: this.filters.status || undefined,
            from: this.filters.from || undefined,
            to: this.filters.to || undefined,
          },
        });

        this.leaves = data.data || [];
        this.total = data.meta?.total || 0;
        this.pages = data.meta?.pages || 1;
      } catch (err) {
        console.error("Failed to fetch leaves:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * STATUS BADGE STYLE
     */
    getStatusClass(status) {
      switch (status) {
        case "APPROVED":
          return "badge bg-success";
        case "PENDING":
          return "badge bg-warning";
        case "REJECTED":
          return "badge bg-danger";
        default:
          return "badge bg-secondary";
      }
    },

    /**
     * DATE FORMAT
     */
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    /**
     * ROW SELECTION
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    /**
     * PAGINATION
     */
    nextPage() {
      if (this.page < this.pages) this.page++;
    },

    prevPage() {
      if (this.page > 1) this.page--;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- FILTER BAR -->
    <div class="row mb-3">
      <div class="col-md-3">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search employee or leave type"
        />
      </div>

      <div class="col-md-2">
        <select v-model="filters.status" class="form-select form-select-sm" @change="fetchLeaves">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div class="col-md-2">
        <select v-model="filters.type" class="form-select form-select-sm" @change="fetchLeaves">
          <option value="">All Types</option>
          <option value="ANNUAL">Annual</option>
          <option value="SICK">Sick</option>
          <option value="CASUAL">Casual</option>
        </select>
      </div>

      <div class="col-md-2">
        <input v-model="filters.from" type="date" class="form-control form-control-sm" />
      </div>

      <div class="col-md-2">
        <input v-model="filters.to" type="date" class="form-control form-control-sm" />
      </div>

      <div class="col-md-1">
        <button class="btn btn-sm btn-primary w-100" @click="fetchLeaves">
          Filter
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <a-table
      :columns="columns"
      :data-source="leaves"
      :row-selection="{
        selectedRowKeys,
        onChange: onSelectChange
      }"
      :loading="loading"
      row-key="id"
    >

      <!-- EMPLOYEE -->
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'employee'">
          <div class="d-flex align-items-center">
            <div class="avatar avatar-sm me-2">
              <img
                src="/src/assets/img/users/user-01.jpg"
                class="rounded-circle"
              />
            </div>

            <div>
              <div class="fw-semibold">
                {{ record.employee?.email || "Unknown" }}
              </div>
              <small class="text-muted">
                ID: {{ record.employee?.id }}
              </small>
            </div>
          </div>
        </template>

        <!-- STATUS -->
        <template v-if="column.key === 'status'">
          <span :class="getStatusClass(record.status)">
            {{ record.status }}
          </span>
        </template>

        <!-- ACTION -->
        <template v-if="column.key === 'action'">
          <div class="d-flex gap-2">

            <button class="btn btn-sm btn-outline-primary">
              View
            </button>

            <button
              v-if="record.status === 'PENDING'"
              class="btn btn-sm btn-success"
            >
              Approve
            </button>

            <button
              v-if="record.status === 'PENDING'"
              class="btn btn-sm btn-danger"
            >
              Reject
            </button>

          </div>
        </template>

      </template>
    </a-table>

    <!-- PAGINATION -->
    <div class="d-flex justify-content-between align-items-center mt-3">

      <div>
        Showing {{ (page - 1) * limit + 1 }} -
        {{ Math.min(page * limit, total) }} of {{ total }}
      </div>

      <div class="d-flex gap-2">
        <button
          class="btn btn-sm btn-light"
          :disabled="page === 1"
          @click="prevPage"
        >
          Prev
        </button>

        <button
          class="btn btn-sm btn-light"
          :disabled="page === pages"
          @click="nextPage"
        >
          Next
        </button>
      </div>

    </div>

  </div>
</template>
