<script>
import { ref, reactive, onMounted, watch } from "vue";
import moment from "moment";
import api from "@/services/api";

export default {
  name: "ExpensesList",

  setup() {
    const loading = ref(false);
    const expenses = ref([]);
    const selectedExpense = ref(null);

    const filters = reactive({
      search: "",
      startDate: "",
      endDate: "",
      page: 1,
      limit: 10,
    });

    const meta = reactive({
      total: 0,
      pages: 0,
    });

    /**
     * FETCH EXPENSES (BACKEND SYNCED)
     */
    const fetchExpenses = async () => {
      loading.value = true;

      try {
        const { data } = await api.get("/budgets/expenses", {
          params: filters,
        });

        expenses.value = data.data || [];
        meta.total = data.count || 0;
        meta.pages = data.pages || 1;
      } catch (err) {
        console.error("Failed to load expenses:", err);
      } finally {
        loading.value = false;
      }
    };

    /**
     * DELETE EXPENSE
     */
    const deleteExpense = async (id) => {
      if (!confirm("Are you sure you want to delete this expense?")) return;

      try {
        await api.delete(`/budgets/expenses/${id}`);
        await fetchExpenses();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    };

    /**
     * FORMAT CURRENCY
     */
    const formatAmount = (val) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(val || 0);
    };

    /**
     * DATE RANGE FILTER
     */
    const setDateRange = (start, end) => {
      filters.startDate = start;
      filters.endDate = end;
      fetchExpenses();
    };

    /**
     * PAGINATION
     */
    const changePage = (page) => {
      filters.page = page;
      fetchExpenses();
    };

    onMounted(() => {
      fetchExpenses();
    });

    watch(
      () => filters.search,
      () => {
        filters.page = 1;
        fetchExpenses();
      }
    );

    return {
      expenses,
      loading,
      filters,
      meta,
      selectedExpense,
      fetchExpenses,
      deleteExpense,
      formatAmount,
      setDateRange,
      changePage,
      moment,
    };
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Expenses</h4>

        <router-link
          to="/sales/expenses/create"
          class="btn btn-primary"
        >
          <i class="ti ti-circle-plus me-2"></i>
          Add Expense
        </router-link>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="filters.search"
            type="text"
            class="form-control w-auto"
            placeholder="Search expense..."
          />

          <input
            type="date"
            v-model="filters.startDate"
            class="form-control w-auto"
          />

          <input
            type="date"
            v-model="filters.endDate"
            class="form-control w-auto"
          />

          <button
            class="btn btn-outline-primary"
            @click="fetchExpenses"
          >
            Filter
          </button>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body">

          <div v-if="loading" class="text-center py-4">
            Loading expenses...
          </div>

          <table v-else class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Account</th>
                <th>Date</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="expense in expenses" :key="expense.id">

                <td>
                  {{ expense.name }}
                </td>

                <td>
                  {{ formatAmount(expense.amount) }}
                </td>

                <td>
                  {{ expense.expenseAccountId }}
                </td>

                <td>
                  {{ moment(expense.createdAt).format("DD MMM YYYY") }}
                </td>

                <td>
                  <span
                    class="badge"
                    :class="expense.status === 'APPROVED' ? 'bg-success' : 'bg-warning'"
                  >
                    {{ expense.status || 'PENDING' }}
                  </span>
                </td>

                <td class="text-end">

                  <button
                    class="btn btn-sm btn-light me-2"
                    @click="$router.push(`/sales/expenses/${expense.id}`)"
                  >
                    View
                  </button>

                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteExpense(expense.id)"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            </tbody>
          </table>

          <!-- EMPTY STATE -->
          <div v-if="!loading && expenses.length === 0" class="text-center py-5">
            No expenses found
          </div>

        </div>
      </div>

      <!-- PAGINATION -->
      <div class="d-flex justify-content-between align-items-center mt-3">

        <div>
          Showing {{ expenses.length }} of {{ meta.total }}
        </div>

        <div class="btn-group">
          <button
            class="btn btn-outline-secondary"
            :disabled="filters.page === 1"
            @click="changePage(filters.page - 1)"
          >
            Prev
          </button>

          <button class="btn btn-light">
            {{ filters.page }}
          </button>

          <button
            class="btn btn-outline-secondary"
            :disabled="filters.page >= meta.pages"
            @click="changePage(filters.page + 1)"
          >
            Next
          </button>
        </div>

      </div>

    </div>
  </div>

</template>
