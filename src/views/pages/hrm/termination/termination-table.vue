<template>
  <div class="card-body p-0">

    <!-- TOP BAR -->
    <div class="row align-items-center mb-2">
      <div class="col-md-6">
        <div class="dataTables_length">
          <label>
            Rows per page
            <select v-model="pageSize" class="form-select form-select-sm">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </label>
        </div>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search termination..."
        />
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center p-4">
      Loading terminations...
    </div>

    <!-- ERROR -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- TABLE -->
    <div v-if="!loading" class="table-responsive custom-datatable-filter">
      <a-table
        class="table datatable thead-light"
        :columns="columns"
        :data-source="paginatedData"
        row-key="id"
        :pagination="false"
      >

        <template #bodyCell="{ column, record }">

          <!-- EMPLOYEE -->
          <template v-if="column.key === 'employee'">
            <div class="d-flex align-items-center">
              <img
                :src="record.user?.avatar || defaultAvatar"
                class="rounded-circle me-2"
                width="32"
                height="32"
              />
              <div>
                <div class="fw-medium">
                  {{ record.user?.name || 'Unknown' }}
                </div>
                <small class="text-muted">{{ record.user?.email }}</small>
              </div>
            </div>
          </template>

          <!-- STATUS BADGE -->
          <template v-if="column.key === 'status'">
            <span :class="statusClass(record.status)">
              {{ record.status }}
            </span>
          </template>

          <!-- ACTIONS -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex gap-2">

              <button
                class="btn btn-sm btn-success"
                v-if="canApprove(record)"
                @click="approve(record.id, 'APPROVE')"
              >
                Approve
              </button>

              <button
                class="btn btn-sm btn-danger"
                v-if="canApprove(record)"
                @click="approve(record.id, 'REJECT')"
              >
                Reject
              </button>

              <button
                class="btn btn-sm btn-outline-primary"
                @click="view(record.id)"
              >
                View
              </button>

            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- PAGINATION -->
    <div class="row mt-3">
      <div class="col-md-6">
        Showing {{ start }} - {{ end }} of {{ filtered.length }}
      </div>

      <div class="col-md-6 text-end">
        <button class="btn btn-sm btn-light" @click="prevPage" :disabled="page === 1">
          Prev
        </button>

        <button class="btn btn-sm btn-light ms-1" @click="nextPage" :disabled="page === totalPages">
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      terminations: [],
      loading: false,
      error: null,

      searchQuery: "",
      page: 1,
      pageSize: 10,

      defaultAvatar: "/src/assets/img/users/user.jpg",
    };
  },

  computed: {

    filtered() {
      const q = this.searchQuery.toLowerCase();

      return this.terminations.filter((t) => {
        return (
          t.user?.name?.toLowerCase().includes(q) ||
          t.status?.toLowerCase().includes(q) ||
          t.reason?.toLowerCase().includes(q) ||
          t.type?.toLowerCase().includes(q)
        );
      });
    },

    totalPages() {
      return Math.ceil(this.filtered.length / this.pageSize) || 1;
    },

    paginatedData() {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },

    start() {
      return (this.page - 1) * this.pageSize + 1;
    },

    end() {
      return Math.min(this.page * this.pageSize, this.filtered.length);
    },

    columns() {
      return [
        {
          title: "Employee",
          key: "employee",
        },
        {
          title: "Department",
          dataIndex: "department",
        },
        {
          title: "Type",
          dataIndex: "type",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Notice Date",
          dataIndex: "noticeDate",
        },
        {
          title: "Reason",
          dataIndex: "reason",
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },
  },

  mounted() {
    this.fetchTerminations();
  },

  methods: {

    async fetchTerminations() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/termination");
        this.terminations = res.data.data || [];
      } catch (err) {
        this.error = err?.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    async approve(id, action) {
      try {
        await api.patch(`/termination/${id}/approve`, { action });
        await this.fetchTerminations();
      } catch (err) {
        alert(err?.response?.data?.message || "Action failed");
      }
    },

    view(id) {
      this.$router.push(`/hrm/termination/${id}`);
    },

    canApprove(record) {
      return ["PENDING_MANAGER", "PENDING_HR", "PENDING_PAYROLL"].includes(record.status);
    },

    statusClass(status) {
      const map = {
        PENDING_MANAGER: "badge bg-warning",
        PENDING_HR: "badge bg-info",
        PENDING_PAYROLL: "badge bg-primary",
        EXIT_CHECKLIST: "badge bg-secondary",
        APPROVED: "badge bg-success",
        REJECTED: "badge bg-danger",
      };

      return map[status] || "badge bg-light";
    },

    prevPage() {
      if (this.page > 1) this.page--;
    },

    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
  },
};
</script>
