<script>
import { ref, onMounted, computed, watch } from "vue";
import api from "@/services/api";

export default {
  name: "ExpensesTable",

  setup() {
    /**
     * =========================
     * STATE
     * =========================
     */
    const expenses = ref([]);
    const loading = ref(false);

    const searchQuery = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);

    const selectedRowKeys = ref([]);

    /**
     * =========================
     * FETCH EXPENSES (BACKEND)
     * =========================
     */
    const fetchExpenses = async () => {
      loading.value = true;

      try {
        const { data } = await api.get("/budgets/expenses", {
          params: {
            page: currentPage.value,
            limit: pageSize.value,
            search: searchQuery.value || undefined,
          },
        });

        expenses.value = data?.data || data || [];
        total.value = data?.count || expenses.value.length;
      } catch (err) {
        console.error("Failed to fetch expenses:", err.message);
      } finally {
        loading.value = false;
      }
    };

    /**
     * =========================
     * DELETE EXPENSE
     * =========================
     */
    const deleteExpense = async (id) => {
      if (!confirm("Are you sure you want to delete this expense?")) return;

      try {
        await api.delete(`/budgets/expenses/${id}`);
        await fetchExpenses();
      } catch (err) {
        console.error("Delete failed:", err.message);
      }
    };

    /**
     * =========================
     * FORMAT DATA FOR TABLE
     * =========================
     */
    const tableData = computed(() =>
      expenses.value.map((item) => ({
        key: item.id,
        id: item.id,
        Expense_Name: item.name,
        Date: item.expenseDate
          ? new Date(item.expenseDate).toLocaleDateString()
          : "-",
        Payment_Method: item.paymentMethod || "N/A",
        Amount: item.amount ? `₦${Number(item.amount).toLocaleString()}` : "₦0",
      }))
    );

    /**
     * =========================
     * TABLE COLUMNS
     * =========================
     */
    const columns = [
      {
        title: "Expense Name",
        dataIndex: "Expense_Name",
        key: "Expense_Name",
        sorter: (a, b) =>
          a.Expense_Name.localeCompare(b.Expense_Name),
      },
      {
        title: "Date",
        dataIndex: "Date",
        key: "Date",
      },
      {
        title: "Payment Method",
        dataIndex: "Payment_Method",
        key: "Payment_Method",
      },
      {
        title: "Amount",
        dataIndex: "Amount",
        key: "Amount",
      },
      {
        title: "Action",
        key: "action",
      },
    ];

    /**
     * =========================
     * SELECTION
     * =========================
     */
    const rowSelection = {
      selectedRowKeys,
      onChange: (keys) => {
        selectedRowKeys.value = keys;
      },
    };

    /**
     * =========================
     * PAGINATION HELPERS
     * =========================
     */
    const totalPages = computed(() =>
      Math.ceil(total.value / pageSize.value) || 1
    );

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    /**
     * =========================
     * WATCHERS
     * =========================
     */
    watch([currentPage, pageSize], fetchExpenses);
    watch(searchQuery, () => {
      currentPage.value = 1;
      fetchExpenses();
    });

    /**
     * =========================
     * INIT
     * =========================
     */
    onMounted(fetchExpenses);

    return {
      expenses,
      columns,
      rowSelection,

      searchQuery,
      currentPage,
      pageSize,
      total,
      totalPages,

      tableData,
      loading,

      fetchExpenses,
      deleteExpense,
      handlePageChange,
    };
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- HEADER CONTROLS -->
    <div class="row mb-2">
      <div class="col-md-6">
        <label>
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search expenses..."
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
        :row-selection="rowSelection"
      >

        <template #bodyCell="{ column, record }">

          <!-- ACTION COLUMN -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">

              <!-- EDIT (hook modal later) -->
              <a href="javascript:void(0);" class="me-2">
                <i class="ti ti-edit"></i>
              </a>

              <!-- DELETE -->
              <a
                href="javascript:void(0);"
                @click="deleteExpense(record.id)"
              >
                <i class="ti ti-trash"></i>
              </a>

            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- PAGINATION -->
    <div class="row mt-3">
      <div class="col-md-6">
        <p>
          Showing page {{ currentPage }} of {{ totalPages }}
        </p>
      </div>

      <div class="col-md-6 text-end">
        <ul class="pagination justify-content-end">

          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="handlePageChange(currentPage - 1)">
              Prev
            </a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" @click.prevent="handlePageChange(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click.prevent="handlePageChange(currentPage + 1)">
              Next
            </a>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>
