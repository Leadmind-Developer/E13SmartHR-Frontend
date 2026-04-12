<script>
import api from "@/services/api";

export default {
  data() {
    return {
      promotions: [],
      loading: false,

      searchQuery: "",
      statusFilter: "",

      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],
    };
  },

  mounted() {
    this.fetchPromotions();
  },

  watch: {
    searchQuery() {
      this.debounceFetch();
    },
    statusFilter() {
      this.fetchPromotions();
    },
    pageSize() {
      this.fetchPromotions();
    },
  },

  methods: {
    // =========================
    // FETCH DATA (API DRIVEN)
    // =========================
    async fetchPromotions(page = this.currentPage) {
      this.loading = true;

      try {
        const { data } = await api.get("/promotion", {
          params: {
            page,
            limit: this.pageSize,
            search: this.searchQuery,
            status: this.statusFilter,
          },
        });

        this.promotions = data.data;
        this.total = data.total;
        this.currentPage = data.page;
      } catch (error) {
        console.error("Failed to fetch promotions", error);
      } finally {
        this.loading = false;
      }
    },

    debounceFetch() {
      clearTimeout(this._t);
      this._t = setTimeout(() => {
        this.fetchPromotions(1);
      }, 400);
    },

    // =========================
    // APPROVE
    // =========================
    async approve(id) {
      try {
        await api.post(`/promotion/${id}/approve`);
        this.fetchPromotions(this.currentPage);
      } catch (error) {
        console.error("Approval failed", error);
      }
    },

    // =========================
    // REJECT
    // =========================
    async reject(id) {
      const reason = prompt("Enter rejection reason:");
      if (!reason) return;

      try {
        await api.post(`/promotion/${id}/reject`, { reason });
        this.fetchPromotions(this.currentPage);
      } catch (error) {
        console.error("Rejection failed", error);
      }
    },

    // =========================
    // UTIL
    // =========================
    getImageUrl(image) {
      if (!image) return "";
      return new URL(`/src/assets/img/users/${image}`, import.meta.url).href;
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },

  computed: {
    columns() {
      return [
        {
          title: "Employee",
          key: "employee",
        },
        {
          title: "Department",
          dataIndex: "department",
          key: "department",
          customRender: ({ record }) =>
            record.department?.name || "-",
        },
        {
          title: "From",
          key: "from",
          customRender: ({ record }) => record.designationFrom || "-",
        },
        {
          title: "To",
          key: "to",
          customRender: ({ record }) => record.designationTo || "-",
        },
        {
          title: "Status",
          key: "status",
          customRender: ({ record }) => {
            const map = {
              PENDING: "warning",
              APPROVED: "success",
              REJECTED: "error",
            };
            return `<span class="badge bg-${map[record.status] || "secondary"}">
              ${record.status}
            </span>`;
          },
        },
        {
          title: "Date",
          key: "date",
          customRender: ({ record }) => this.formatDate(record.promotionDate),
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },

    pagination() {
      return {
        total: this.total,
        pageSize: this.pageSize,
        current: this.currentPage,
        showSizeChanger: true,
      };
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- FILTER BAR -->
    <div class="row mb-2">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          class="form-control form-control-sm"
          placeholder="Search employee, department..."
        />
      </div>

      <div class="col-md-3">
        <select v-model="statusFilter" class="form-select form-select-sm">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
    </div>

    <!-- TABLE -->
    <a-table
      :columns="columns"
      :data-source="promotions"
      :loading="loading"
      row-key="id"
      :pagination="false"
    >

      <!-- EMPLOYEE SLOT -->
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'employee'">
          <div class="d-flex align-items-center">
            <img
              :src="getImageUrl(record.employee?.avatar)"
              class="avatar avatar-sm rounded-circle me-2"
            />
            <div>
              <div class="fw-semibold">
                {{ record.employee?.firstName }} {{ record.employee?.lastName }}
              </div>
              <small class="text-muted">
                {{ record.employee?.email }}
              </small>
            </div>
          </div>
        </template>

        <!-- ACTIONS -->
        <template v-if="column.key === 'action'">
          <div class="d-flex gap-2">

            <button
              v-if="record.status === 'PENDING'"
              class="btn btn-sm btn-success"
              @click="approve(record.id)"
            >
              Approve
            </button>

            <button
              v-if="record.status === 'PENDING'"
              class="btn btn-sm btn-danger"
              @click="reject(record.id)"
            >
              Reject
            </button>

            <router-link
              :to="`/hrm/promotion/${record.id}`"
              class="btn btn-sm btn-outline-primary"
            >
              View
            </router-link>

          </div>
        </template>

      </template>
    </a-table>

    <!-- PAGINATION -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Showing {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, total) }}
        of {{ total }}
      </div>

      <a-pagination
        v-model:current="currentPage"
        :total="total"
        :pageSize="pageSize"
        @change="fetchPromotions"
      />
    </div>

  </div>
</template>
