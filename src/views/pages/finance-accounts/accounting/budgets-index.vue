<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-md-flex justify-content-between align-items-center mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_budgets"
          >
            + Add Budget
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="filters.search"
            class="form-control"
            placeholder="Search budgets..."
            style="max-width: 250px"
          />

          <select v-model="filters.status" class="form-select" style="max-width: 180px">
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="APPROVED">Approved</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button class="btn btn-outline-primary" @click="fetchBudgets">
            Refresh
          </button>

        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Budgets</h5>
        </div>

        <div class="card-body p-0">

          <a-table
            :columns="columns"
            :data-source="budgets"
            :loading="loading"
            row-key="id"
            bordered
          >

            <!-- Title -->
            <template #bodyCell="{ column, record }">

              <template v-if="column.key === 'title'">
                <strong>{{ record.title }}</strong>
              </template>

              <template v-if="column.key === 'status'">
                <span :class="statusClass(record.status)">
                  {{ record.status }}
                </span>
              </template>

              <template v-if="column.key === 'amounts'">
                <div>
                  <div>Revenue: {{ format(record.totalRevenue) }}</div>
                  <div>Expense: {{ format(record.totalExpense) }}</div>
                  <div>Profit: {{ format(record.profit) }}</div>
                </div>
              </template>

              <template v-if="column.key === 'utilization'">
                {{ record.utilization?.toFixed(2) }}%
              </template>

              <!-- Actions -->
              <template v-if="column.key === 'action'">
                <div class="d-flex gap-2">

                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="editBudget(record)"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteBudget(record.id)"
                  >
                    Delete
                  </button>

                </div>
              </template>

            </template>

          </a-table>

        </div>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-3">

        <div>
          Showing {{ pagination.page }} of {{ totalPages }}
        </div>

        <div class="d-flex gap-2">

          <button
            class="btn btn-light"
            :disabled="pagination.page === 1"
            @click="changePage(pagination.page - 1)"
          >
            Prev
          </button>

          <button
            class="btn btn-light"
            :disabled="pagination.page >= totalPages"
            @click="changePage(pagination.page + 1)"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  </div>

  <budgets-modal @refresh="fetchBudgets" />
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const title = "Budgets";
const text = "Finance";
const text1 = "Accounting";

const budgets = ref([]);
const loading = ref(false);

const pagination = reactive({
  page: 1,
  limit: 10,
});

const filters = reactive({
  search: "",
  status: "",
});

/*
|--------------------------------------------------------------------------
| TABLE COLUMNS
|--------------------------------------------------------------------------
*/

const columns = [
  { title: "Title", key: "title" },
  { title: "Status", key: "status" },
  { title: "Amounts", key: "amounts" },
  { title: "Utilization", key: "utilization" },
  { title: "Actions", key: "action" },
];

/*
|--------------------------------------------------------------------------
| API CALL
|--------------------------------------------------------------------------
*/

const fetchBudgets = async () => {
  loading.value = true;

  try {
    const { data } = await api.get("/budgets", {
      params: {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        status: filters.status,
      },
    });

    budgets.value = data.data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

const changePage = (page) => {
  pagination.page = page;
  fetchBudgets();
};

const editBudget = (record) => {
  console.log("EDIT:", record);
  // open modal here
};

const deleteBudget = async (id) => {
  try {
    await api.delete(`/budgets/${id}`);
    await fetchBudgets();
  } catch (err) {
    console.error(err);
  }
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const format = (value) => {
  return new Intl.NumberFormat().format(value || 0);
};

const statusClass = (status) => {
  return {
    badge: true,
    "bg-warning": status === "DRAFT",
    "bg-success": status === "APPROVED",
    "bg-secondary": status === "CLOSED",
  };
};

/*
|--------------------------------------------------------------------------
| COMPUTED
|--------------------------------------------------------------------------
*/

const totalPages = computed(() => {
  return Math.ceil(budgets.value.length / pagination.limit) || 1;
});

/*
|--------------------------------------------------------------------------
| WATCHERS
|--------------------------------------------------------------------------
*/

watch(
  () => [filters.search, filters.status],
  () => {
    pagination.page = 1;
    fetchBudgets();
  }
);

/*
|--------------------------------------------------------------------------
| LIFECYCLE
|--------------------------------------------------------------------------
*/

onMounted(() => {
  fetchBudgets();
});
</script>
