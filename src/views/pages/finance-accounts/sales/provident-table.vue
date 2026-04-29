<script>
import api from "@/services/api";

export default {
  data() {
    return {
      data: [],
      loading: false,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,

      columns: [
        { title: "", key: "select" },

        {
          title: "Employee Name",
          dataIndex: "employeeName",
          key: "employeeName",
          sorter: true,
        },
        {
          title: "Provident Fund Type",
          dataIndex: "fundType",
          key: "fundType",
          sorter: true,
        },
        {
          title: "Employee Share",
          dataIndex: "employeeShare",
          key: "employeeShare",
        },
        {
          title: "Organization Share",
          dataIndex: "employerShare",
          key: "employerShare",
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
      ],

      rowSelection: {
        onChange: () => {},
      },
    };
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.fetchData();
    },

    currentPage() {
      this.fetchData();
    },

    pageSize() {
      this.currentPage = 1;
      this.fetchData();
    },
  },

  computed: {
    paginatedInfo() {
      const start = (this.currentPage - 1) * this.pageSize + 1;
      const end = Math.min(this.currentPage * this.pageSize, this.total);

      return `Showing ${start} - ${end} of ${this.total} entries`;
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true;

        const { data } = await api.get("/provident-funds", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery,
          },
        });

        this.data = data.data;
        this.total = data.total;
      } catch (err) {
        console.error("Failed to load provident funds", err);
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(id, status) {
      try {
        await api.patch(`/provident-funds/${id}/status`, { status });
        this.fetchData();
      } catch (err) {
        console.error(err);
      }
    },

    async deleteRecord(id) {
      try {
        await api.delete(`/provident-funds/${id}`);
        this.fetchData();
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(image) {
      return new URL(`/src/assets/img/users/${image}`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- FILTERS -->
    <div class="row mb-2">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search employee..."
        />
      </div>
    </div>

    <!-- TABLE -->
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      row-key="id"
      :row-selection="rowSelection"
    >
      <!-- EMPLOYEE -->
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'employeeName'">
          <div class="d-flex align-items-center">
            <img
              :src="getImageUrl(record.image)"
              class="avatar avatar-md rounded"
            />
            <div class="ms-2">
              <strong>{{ record.employeeName }}</strong>
              <div class="text-muted">{{ record.role }}</div>
            </div>
          </div>
        </template>

        <!-- STATUS -->
        <template v-if="column.key === 'status'">
          <span
            class="badge"
            :class="record.status === 'APPROVED' ? 'bg-success' : 'bg-warning'"
          >
            {{ record.status }}
          </span>
        </template>

        <!-- ACTION -->
        <template v-if="column.key === 'action'">
          <div class="d-flex gap-2">
            <a
              href="#"
              @click.prevent="updateStatus(record.id, 'APPROVED')"
            >
              Approve
            </a>

            <a
              href="#"
              class="text-danger"
              @click.prevent="deleteRecord(record.id)"
            >
              Delete
            </a>
          </div>
        </template>

      </template>
    </a-table>

    <!-- FOOTER -->
    <div class="mt-2 text-muted">
      {{ paginatedInfo }}
    </div>

  </div>
</template>
