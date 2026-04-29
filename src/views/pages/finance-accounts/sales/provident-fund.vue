<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/services/api";

/**
 * =========================
 * PAGE META
 * =========================
 */
const title = "Provident Fund";
const text = "Finance Accounts";
const text1 = "Provident Fund";

/**
 * =========================
 * UI STATE
 * =========================
 */
const loading = ref(false);
const saving = ref(false);

const expenses = ref([]);
const selectedId = ref(null);

/**
 * =========================
 * FILTER STATE
 * =========================
 */
const filters = reactive({
  startDate: "",
  endDate: "",
  status: "",
  type: "PROVIDENT_FUND",
  search: "",
});

/**
 * =========================
 * MODAL STATE
 * =========================
 */
const form = reactive({
  name: "",
  amount: "",
  expenseDate: "",
  expenseAccountId: "",
  cashAccountId: "",
  status: "PENDING",
});

/**
 * =========================
 * HEADER TOGGLE
 * =========================
 */
const toggleHeader = () => {
  const el = document.getElementById("collapse-header");
  if (el) el.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

/**
 * =========================
 * FETCH LIST (BACKEND SYNC)
 * /budget/expenses
 * =========================
 */
const fetchExpenses = async () => {
  try {
    loading.value = true;

    const { data } = await api.get("/budget/expenses", {
      params: {
        ...filters,
      },
    });

    expenses.value = data?.data || [];
  } catch (err) {
    console.error("Failed to load provident fund:", err);
  } finally {
    loading.value = false;
  }
};

/**
 * =========================
 * CREATE EXPENSE (PROVIDENT FUND ENTRY)
 * =========================
 */
const createExpense = async () => {
  try {
    saving.value = true;

    await api.post("/budget/expenses", {
      ...form,
      category: "PROVIDENT_FUND",
      type: "PROVIDENT_FUND",
    });

    await fetchExpenses();
    resetForm();
  } catch (err) {
    console.error("Create failed:", err);
  } finally {
    saving.value = false;
  }
};

/**
 * =========================
 * UPDATE EXPENSE
 * =========================
 */
const updateExpense = async () => {
  try {
    if (!selectedId.value) return;

    saving.value = true;

    await api.patch(`/budget/expenses/${selectedId.value}`, {
      ...form,
    });

    await fetchExpenses();
    resetForm();
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    saving.value = false;
  }
};

/**
 * =========================
 * DELETE EXPENSE
 * =========================
 */
const deleteExpense = async (id) => {
  try {
    await api.delete(`/budget/expenses/${id}`);
    await fetchExpenses();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

/**
 * =========================
 * EDIT HANDLER
 * =========================
 */
const editExpense = (item) => {
  selectedId.value = item.id;

  form.name = item.name;
  form.amount = item.amount;
  form.expenseDate = item.expenseDate;
  form.expenseAccountId = item.expenseAccountId;
  form.cashAccountId = item.cashAccountId;
  form.status = item.status;
};

/**
 * =========================
 * RESET FORM
 * =========================
 */
const resetForm = () => {
  selectedId.value = null;

  form.name = "";
  form.amount = "";
  form.expenseDate = "";
  form.expenseAccountId = "";
  form.cashAccountId = "";
  form.status = "PENDING";
};

/**
 * =========================
 * FILTER ACTIONS
 * =========================
 */
const applyFilters = () => fetchExpenses();
const clearFilters = () => {
  filters.startDate = "";
  filters.endDate = "";
  filters.status = "";
  filters.search = "";
  fetchExpenses();
};

/**
 * =========================
 * LIFECYCLE
 * =========================
 */
onMounted(() => {
  fetchExpenses();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">

          <button
            class="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add_provident-fund"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Provident Fund
          </button>

          <div class="head-icons ms-2">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              @click="toggleHeader"
              class="btn btn-light"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Card -->
      <div class="card">

        <!-- Filters -->
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5 class="mb-0">Provident Fund List</h5>

          <div class="d-flex flex-wrap gap-2">

            <input
              v-model="filters.search"
              class="form-control"
              placeholder="Search..."
              @input="applyFilters"
            />

            <select v-model="filters.status" class="form-control" @change="applyFilters">
              <option value="">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
            </select>

            <button class="btn btn-light" @click="clearFilters">
              Reset
            </button>

          </div>
        </div>

        <!-- Table -->
        <div class="card-body">

          <div v-if="loading" class="text-center py-4">
            Loading...
          </div>

          <div v-else class="table-responsive">

            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in expenses" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ item.expenseDate }}</td>
                  <td>
                    <span class="badge bg-soft-primary">
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="text-end">
                    <button class="btn btn-sm btn-light me-2" @click="editExpense(item)">
                      Edit
                    </button>

                    <button class="btn btn-sm btn-danger" @click="deleteExpense(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>
        Designed & Developed By
        <a class="text-primary">Dreams</a>
      </p>
    </div>

  </div>

  <!-- Modal -->
  <provident-modal />
</template>
