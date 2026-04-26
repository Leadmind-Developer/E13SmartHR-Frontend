<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-md-flex justify-content-between align-items-center mb-3">
        <breadcrumb title="Budgets Expenses" text="Accounting" text1="Budgets Expenses" />

        <div class="d-flex gap-2">
          <button class="btn btn-primary" @click="openCreate">
            <i class="ti ti-circle-plus me-2"></i>Add Expense
          </button>
        </div>
      </div>

      <!-- CARD -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h5>Expenses</h5>

          <input
            v-model="filters.search"
            @input="debouncedFetch"
            placeholder="Search expenses..."
            class="form-control w-25"
          />
        </div>

        <div class="card-body p-0">

          <!-- LOADER -->
          <div v-if="loading" class="p-4 text-center">
            <div class="spinner-border"></div>
          </div>

          <!-- TABLE -->
          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Budget</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in expenses" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ formatCurrency(item.amount) }}</td>
                  <td>{{ formatDate(item.expenseDate) }}</td>
                  <td>{{ item.budgetId }}</td>

                  <td class="text-end">
                    <button class="btn btn-sm btn-light me-2" @click="edit(item)">
                      <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="remove(item.id)">
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>

                <tr v-if="!expenses.length">
                  <td colspan="5" class="text-center p-4">No expenses found</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PAGINATION -->
          <div class="p-3 d-flex justify-content-between align-items-center">
            <div>
              Page {{ page }} / {{ totalPages }}
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-light" :disabled="page === 1" @click="page--">
                Prev
              </button>

              <button class="btn btn-light" :disabled="page === totalPages" @click="page++">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div class="modal fade" id="expenseModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>{{ form.id ? "Edit Expense" : "New Expense" }}</h5>
          </div>

          <div class="modal-body">

            <input v-model="form.name" class="form-control mb-2" placeholder="Name" />

            <input v-model.number="form.amount" type="number" class="form-control mb-2" placeholder="Amount" />

            <input v-model="form.expenseDate" type="date" class="form-control mb-2" />

            <input v-model="form.budgetId" class="form-control mb-2" placeholder="Budget ID" />

            <input v-model="form.expenseAccountId" class="form-control mb-2" placeholder="Expense Account ID" />

            <input v-model="form.cashAccountId" class="form-control mb-2" placeholder="Cash Account ID" />

          </div>

          <div class="modal-footer">
            <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" @click="save">Save</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/services/api";
import { debounce } from "lodash";

export default {
  data() {
    return {
      expenses: [],
      loading: false,

      page: 1,
      limit: 10,
      totalPages: 1,

      filters: {
        search: "",
      },

      form: this.resetForm(),
    };
  },

  watch: {
    page() {
      this.fetch();
    },
  },

  created() {
    this.debouncedFetch = debounce(this.fetch, 400);
    this.fetch();
  },

  methods: {
    resetForm() {
      return {
        id: null,
        name: "",
        amount: 0,
        expenseDate: "",
        budgetId: "",
        expenseAccountId: "",
        cashAccountId: "",
      };
    },

    async fetch() {
      this.loading = true;

      try {
        const { data } = await api.get("/budgets", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.filters.search,
          },
        });

        // Backend currently returns budgets → flatten expenses if needed
        const budgets = data.data || [];

        const expenses = [];
        budgets.forEach((b) => {
          if (b.BudgetExpenses) {
            expenses.push(...b.BudgetExpenses);
          }
        });

        this.expenses = expenses;
        this.totalPages = Math.ceil(expenses.length / this.limit) || 1;

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    openCreate() {
      this.form = this.resetForm();
      new bootstrap.Modal(document.getElementById("expenseModal")).show();
    },

    edit(item) {
      this.form = { ...item };
      new bootstrap.Modal(document.getElementById("expenseModal")).show();
    },

    async save() {
      try {
        if (this.form.id) {
          await api.patch(`/expenses/${this.form.id}`, this.form);
        } else {
          await api.post("/expenses", this.form);
        }

        this.fetch();
        bootstrap.Modal.getInstance(document.getElementById("expenseModal")).hide();
      } catch (err) {
        alert(err.response?.data?.message || "Error saving expense");
      }
    },

    async remove(id) {
      if (!confirm("Delete this expense?")) return;

      try {
        await api.delete(`/expenses/${id}`);
        this.fetch();
      } catch (err) {
        alert("Delete failed");
      }
    },

    formatCurrency(val) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(val || 0);
    },

    formatDate(val) {
      if (!val) return "-";
      return new Date(val).toLocaleDateString();
    },
  },
};
</script>
