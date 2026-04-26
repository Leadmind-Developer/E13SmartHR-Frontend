<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex right-content align-items-center flex-wrap">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_deduction">
            <i class="ti ti-circle-plus me-1"></i>
            Add Deduction
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="d-flex justify-content-between my-3">
        <div class="payroll-btns">
          <router-link to="/payroll/payroll-additions" class="btn btn-white border me-2">
            Additions
          </router-link>
          <router-link to="/payroll/payroll-overtime" class="btn btn-white border me-2">
            Overtime
          </router-link>
          <router-link to="/payroll/payroll-deduction" class="btn btn-primary">
            Deductions
          </router-link>
        </div>
      </div>

      <!-- Table Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">
          <h5>Deductions</h5>

          <input
            v-model="searchQuery"
            class="form-control w-auto"
            placeholder="Search deductions..."
          />
        </div>

        <div class="card-body p-0">

          <div v-if="loading" class="p-4 text-center">
            <div class="spinner-border text-primary"></div>
          </div>

          <a-table
            v-else
            :columns="columns"
            :data-source="paginatedData"
            row-key="id"
            :pagination="false"
          >

            <template #bodyCell="{ column, record }">

              <!-- Name -->
              <template v-if="column.key === 'name'">
                <strong>{{ record.name }}</strong>
              </template>

              <!-- Amount -->
              <template v-if="column.key === 'amount'">
                ₦{{ formatMoney(record.unitAmount) }}
              </template>

              <!-- Action -->
              <template v-if="column.key === 'action'">
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-light" @click="openEdit(record)">
                    Edit
                  </button>

                  <button class="btn btn-sm btn-danger" @click="removeItem(record.id)">
                    Delete
                  </button>
                </div>
              </template>

            </template>
          </a-table>

          <!-- Pagination -->
          <div class="p-3 d-flex justify-content-between">
            <div>
              Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filtered.length }}
            </div>

            <div>
              <button class="btn btn-sm btn-light" :disabled="page === 1" @click="page--">
                Prev
              </button>

              <button class="btn btn-sm btn-light ms-2"
                      :disabled="page >= totalPages"
                      @click="page++">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="footer p-3 border-top bg-white">
      <small>© {{ new Date().getFullYear() }} SmartHR Payroll System</small>
    </div>
  </div>

  <!-- Add Modal -->
  <div class="modal fade" id="add_deduction">
    <div class="modal-dialog">
      <div class="modal-content p-3">

        <h5>Add Deduction</h5>

        <input v-model="form.name" class="form-control my-2" placeholder="Name" />
        <input v-model.number="form.unitAmount" class="form-control my-2" placeholder="Amount" />

        <button class="btn btn-primary w-100" @click="createDeduction">
          Save
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
      title: "Payroll Items",
      text: "Payroll",
      text1: "Deductions",

      items: [],
      loading: false,

      searchQuery: "",
      page: 1,
      pageSize: 10,

      form: {
        name: "",
        unitAmount: 0,
        type: "DEDUCTION",
      },

      columns: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Amount", dataIndex: "unitAmount", key: "amount" },
        { title: "Action", key: "action" },
      ],
    };
  },

  computed: {
    filtered() {
      const q = this.searchQuery.toLowerCase();

      return this.items.filter((i) =>
        (i.name || "").toLowerCase().includes(q)
      );
    },

    paginatedData() {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filtered.length / this.pageSize) || 1;
    },

    startIndex() {
      return (this.page - 1) * this.pageSize;
    },

    endIndex() {
      return Math.min(this.page * this.pageSize, this.filtered.length);
    },
  },

  watch: {
    searchQuery() {
      this.page = 1;
    },
  },

  mounted() {
    this.fetchDeductions();
  },

  methods: {
    async fetchDeductions() {
      this.loading = true;

      try {
        const res = await api.get("/payroll/items", {
          params: { type: "DEDUCTION" },
        });

        this.items = res.data?.data || [];
      } catch (err) {
        console.error("Failed to load deductions", err);
      } finally {
        this.loading = false;
      }
    },

    async createDeduction() {
      try {
        await api.post("/payroll/items", this.form);

        this.form.name = "";
        this.form.unitAmount = 0;

        await this.fetchDeductions();
      } catch (err) {
        console.error("Create failed", err);
      }
    },

    openEdit(record) {
      this.form = { ...record };
    },

    async removeItem(id) {
      try {
        await api.delete(`/payroll/items/${id}`);
        await this.fetchDeductions();
      } catch (err) {
        console.error("Delete failed", err);
      }
    },

    formatMoney(val) {
      return Number(val || 0).toLocaleString();
    },
  },
};
</script>
