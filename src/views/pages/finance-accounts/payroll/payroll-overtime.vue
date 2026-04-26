<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="me-2 mb-2">
            <div class="dropdown">
              <a class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                 data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i>Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a class="dropdown-item"><i class="ti ti-file-type-pdf me-1"></i>Export PDF</a></li>
                <li><a class="dropdown-item"><i class="ti ti-file-type-xls me-1"></i>Export Excel</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="d-flex justify-content-between my-4">
        <div class="payroll-btns">
          <router-link to="/payroll/payroll-additions" class="btn btn-white border me-2">Additions</router-link>
          <router-link to="/payroll/payroll-overtime" class="btn btn-primary border me-2">Overtime</router-link>
          <router-link to="/payroll/payroll-deduction" class="btn btn-white border">Deductions</router-link>
        </div>

        <button class="btn btn-primary d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_overtime">
          <i class="ti ti-circle-plus me-2"></i> Add Overtime
        </button>
      </div>

      <!-- Table Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Overtime Rules</h5>

          <input v-model="searchQuery"
                 class="form-control form-control-sm w-25"
                 placeholder="Search overtime..." />
        </div>

        <div class="card-body p-0">

          <a-table
            :columns="columns"
            :data-source="filteredData"
            :loading="loading"
            row-key="id"
          >
            <template #bodyCell="{ column, record }">

              <template v-if="column.key === 'name'">
                <strong>{{ record.name }}</strong>
              </template>

              <template v-if="column.key === 'rate'">
                <span>{{ record.unitAmount }}x multiplier</span>
              </template>

              <template v-if="column.key === 'action'">
                <div class="action-icon d-inline-flex">
                  <a @click="editItem(record)" class="me-2">
                    <i class="ti ti-edit"></i>
                  </a>
                  <a @click="deleteItem(record.id)">
                    <i class="ti ti-trash"></i>
                  </a>
                </div>
              </template>

            </template>
          </a-table>

        </div>
      </div>

    </div>
  </div>

  <!-- Modal -->
  <payroll-overtime-modal
    @created="fetchOvertime"
  />
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Payroll Items",
      text: "Payroll",
      text1: "Overtime",

      loading: false,
      searchQuery: "",

      overtimeItems: [],

      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Rate",
          dataIndex: "unitAmount",
          key: "rate"
        },
        {
          title: "Action",
          key: "action"
        }
      ]
    };
  },

  computed: {
    filteredData() {
      const q = this.searchQuery.toLowerCase();

      return this.overtimeItems.filter((item) =>
        item.name?.toLowerCase().includes(q)
      );
    }
  },

  methods: {
    // -------------------------
    // FETCH OVERTIME ITEMS
    // -------------------------
    async fetchOvertime() {
      this.loading = true;

      try {
        // NOTE: backend currently has POST /items
        // You should add GET /items?type=OVERTIME in backend for full production parity
        const res = await api.get("/payroll/items", {
          params: { type: "OVERTIME" }
        });

        this.overtimeItems = res.data?.data || [];
      } catch (err) {
        console.error("Failed to load overtime:", err);
      } finally {
        this.loading = false;
      }
    },

    // -------------------------
    // DELETE ITEM
    // -------------------------
    async deleteItem(id) {
      try {
        await api.delete(`/payroll/items/${id}`);
        await this.fetchOvertime();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    },

    // -------------------------
    // EDIT ITEM (placeholder)
    // -------------------------
    editItem(record) {
      this.$emit("edit-overtime", record);
    }
  },

  mounted() {
    this.fetchOvertime();
  }
};
</script>
