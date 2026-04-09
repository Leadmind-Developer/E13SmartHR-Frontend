<script>
import api from "@/services/api";

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchQuery: "",
      filters: {
        project: "",
        status: "",
      },
    };
  },

  computed: {
    columns() {
      return [
        { title: "", dataIndex: "select", width: 40 },

        {
          title: "Employee",
          dataIndex: "Employee",
          key: "Employee",
        },
        {
          title: "Date",
          dataIndex: "Date",
        },
        {
          title: "Project",
          dataIndex: "Project",
        },
        {
          title: "Assigned Hours",
          dataIndex: "Assigned_Hours",
        },
        {
          title: "Worked Hours",
          dataIndex: "Worked_Hours",
        },
        {
          title: "Status",
          dataIndex: "Status",
        },
        {
          title: "Action",
          key: "action",
        },
      ];
    },
  },

  mounted() {
    this.fetchTimesheets();
  },

  methods: {
    /**
     * 📄 Fetch Timesheets (API)
     */
    async fetchTimesheets() {
      this.loading = true;

      try {
        const { data } = await api.get("/timesheets", {
          params: {
            page: this.pagination.current,
            limit: this.pagination.pageSize,
            search: this.searchQuery,
            project: this.filters.project,
            status: this.filters.status,
          },
        });

        this.tableData = data.data;
        this.pagination.total = data.pagination.total;
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 🔍 Search
     */
    onSearch() {
      this.pagination.current = 1;
      this.fetchTimesheets();
    },

    /**
     * 📄 Pagination Change
     */
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.fetchTimesheets();
    },

    /**
     * 📨 Submit
     */
    async submit(record) {
      try {
        await api.post(`/timesheets/${record.id}/submit`);
        this.fetchTimesheets();
      } catch (err) {
        alert(err.response?.data?.message || "Submit failed");
      }
    },

    /**
     * ✅ Approve
     */
    async approve(record) {
      try {
        await api.post(`/timesheets/${record.id}/approve`);
        this.fetchTimesheets();
      } catch (err) {
        alert(err.response?.data?.message || "Approve failed");
      }
    },

    /**
     * ❌ Reject
     */
    async reject(record) {
      try {
        await api.post(`/timesheets/${record.id}/reject`);
        this.fetchTimesheets();
      } catch (err) {
        alert(err.response?.data?.message || "Reject failed");
      }
    },

    /**
     * ❌ Delete
     */
    async remove(record) {
      if (!confirm("Delete this timesheet?")) return;

      try {
        await api.delete(`/timesheets/${record.id}`);
        this.fetchTimesheets();
      } catch (err) {
        alert(err.response?.data?.message || "Delete failed");
      }
    },

    /**
     * 📤 Export
     */
    async exportData(format = "excel") {
      try {
        const { data } = await api.get("/timesheets/export", {
          params: { format },
        });

        console.log("Export data:", data);
        alert(`Export (${format}) ready. Check console.`);
      } catch (err) {
        alert("Export failed");
      }
    },

    /**
     * 🖼️ Avatar fallback
     */
    getAvatar(image) {
      return image
        ? image
        : new URL(`/src/assets/img/users/user-01.jpg`, import.meta.url).href;
    },

    /**
     * 🎨 Status badge
     */
    statusClass(status) {
      return {
        DRAFT: "badge bg-secondary",
        SUBMITTED: "badge bg-warning",
        APPROVED: "badge bg-success",
        REJECTED: "badge bg-danger",
      }[status];
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- 🔍 FILTERS -->
    <div class="row p-3">
      <div class="col-md-4">
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="search"
          class="form-control"
          placeholder="Search timesheets..."
        />
      </div>

      <div class="col-md-3">
        <select v-model="filters.status" @change="onSearch" class="form-select">
          <option value="">All Status</option>
          <option>DRAFT</option>
          <option>SUBMITTED</option>
          <option>APPROVED</option>
          <option>REJECTED</option>
        </select>
      </div>

      <div class="col-md-3">
        <button class="btn btn-outline-primary me-2" @click="exportData('excel')">
          Export Excel
        </button>
        <button class="btn btn-outline-danger" @click="exportData('pdf')">
          Export PDF
        </button>
      </div>
    </div>

    <!-- 📊 TABLE -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">

          <!-- 👤 Employee -->
          <template v-if="column.dataIndex === 'Employee'">
            <div class="d-flex align-items-center">
              <img
                :src="getAvatar(record.Image)"
                class="avatar avatar-md rounded-circle me-2"
              />
              <div>
                <div class="fw-medium">{{ record.Employee }}</div>
              </div>
            </div>
          </template>

          <!-- 📌 Status -->
          <template v-if="column.dataIndex === 'Status'">
            <span :class="statusClass(record.Status)">
              {{ record.Status }}
            </span>
          </template>

          <!-- ⚙️ Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">

              <!-- Submit -->
              <button
                v-if="record.Status === 'DRAFT'"
                class="btn btn-sm btn-warning"
                @click="submit(record)"
              >
                Submit
              </button>

              <!-- Approve / Reject -->
              <template v-if="record.Status === 'SUBMITTED'">
                <button
                  class="btn btn-sm btn-success"
                  @click="approve(record)"
                >
                  Approve
                </button>

                <button
                  class="btn btn-sm btn-danger"
                  @click="reject(record)"
                >
                  Reject
                </button>
              </template>

              <!-- Delete -->
              <button
                class="btn btn-sm btn-outline-danger"
                @click="remove(record)"
              >
                Delete
              </button>
            </div>
          </template>

        </template>
      </a-table>
    </div>

  </div>
</template>
