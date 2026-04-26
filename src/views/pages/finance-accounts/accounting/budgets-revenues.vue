<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Budget Revenues</h4>

        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createRevenueModal"
        >
          <i class="ti ti-plus me-1"></i> Add Revenue
        </button>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex gap-2 flex-wrap">
          <input
            v-model="filters.search"
            class="form-control"
            placeholder="Search budgets..."
            @input="fetchBudgets"
          />

          <select v-model="filters.status" class="form-select" @change="fetchBudgets">
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>

          <input
            type="date"
            v-model="filters.startDate"
            class="form-control"
            @change="fetchBudgets"
          />

          <input
            type="date"
            v-model="filters.endDate"
            class="form-control"
            @change="fetchBudgets"
          />
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body p-0">

          <div v-if="loading" class="text-center p-4">
            <div class="spinner-border"></div>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Total Revenue</th>
                  <th>Total Expense</th>
                  <th>Profit</th>
                  <th>Utilization %</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="b in budgets" :key="b.id">
                  <td>{{ b.title }}</td>
                  <td>
                    <span class="badge bg-info">{{ b.status }}</span>
                  </td>
                  <td>{{ formatCurrency(b.totalRevenue) }}</td>
                  <td>{{ formatCurrency(b.totalExpense) }}</td>
                  <td :class="b.profit >= 0 ? 'text-success' : 'text-danger'">
                    {{ formatCurrency(b.profit) }}
                  </td>
                  <td>{{ b.utilization.toFixed(2) }}%</td>
                  <td>{{ formatDate(b.createdAt) }}</td>

                  <td class="text-end">
                    <button class="btn btn-sm btn-light me-1" @click="openRevenueModal(b)">
                      + Revenue
                    </button>

                    <button
                      class="btn btn-sm btn-danger"
                      @click="deleteBudget(b.id)"
                    >
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>

                <tr v-if="!budgets.length">
                  <td colspan="8" class="text-center p-3">No data</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- CREATE REVENUE MODAL -->
  <div class="modal fade" id="createRevenueModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>Add Revenue</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-2">
            <label>Budget</label>
            <select v-model="form.budgetId" class="form-select">
              <option v-for="b in budgets" :key="b.id" :value="b.id">
                {{ b.title }}
              </option>
            </select>
          </div>

          <div class="mb-2">
            <label>Name</label>
            <input v-model="form.name" class="form-control" />
          </div>

          <div class="mb-2">
            <label>Amount</label>
            <input v-model="form.amount" type="number" class="form-control" />
          </div>

          <div class="mb-2">
            <label>Date</label>
            <input v-model="form.revenueDate" type="date" class="form-control" />
          </div>

          <div class="mb-2">
            <label>Cash Account ID</label>
            <input v-model="form.cashAccountId" class="form-control" />
          </div>

          <div class="mb-2">
            <label>Revenue Account ID</label>
            <input v-model="form.revenueAccountId" class="form-control" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" @click="createRevenue">
            Save
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      loading: false,

      budgets: [],

      filters: {
        search: "",
        status: "",
        startDate: "",
        endDate: "",
      },

      form: {
        budgetId: "",
        name: "",
        amount: "",
        revenueDate: "",
        cashAccountId: "",
        revenueAccountId: "",
      },
    };
  },

  mounted() {
    this.fetchBudgets();
  },

  methods: {
    /**
     * ===============================
     * FETCH BUDGETS (ERP)
     * ===============================
     */
    async fetchBudgets() {
      this.loading = true;

      try {
        const { data } = await api.get("/budgets", {
          params: this.filters,
        });

        this.budgets = data.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * ===============================
     * CREATE REVENUE
     * ===============================
     */
    async createRevenue() {
      try {
        await api.post("/revenues", this.form);

        this.$toast?.success("Revenue added");

        this.fetchBudgets();

        // reset
        this.form = {
          budgetId: "",
          name: "",
          amount: "",
          revenueDate: "",
          cashAccountId: "",
          revenueAccountId: "",
        };

        document.getElementById("createRevenueModal")?.classList.remove("show");
      } catch (err) {
        this.$toast?.error(err.response?.data?.message || "Error");
      }
    },

    /**
     * ===============================
     * DELETE BUDGET
     * ===============================
     */
    async deleteBudget(id) {
      if (!confirm("Delete this budget?")) return;

      try {
        await api.delete(`/budgets/${id}`);

        this.$toast?.success("Deleted");

        this.fetchBudgets();
      } catch (err) {
        this.$toast?.error("Delete failed");
      }
    },

    /**
     * ===============================
     * HELPERS
     * ===============================
     */
    formatCurrency(val) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(val || 0);
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    openRevenueModal(budget) {
      this.form.budgetId = budget.id;
    },
  },
};
</script>
