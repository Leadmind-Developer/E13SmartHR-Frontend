<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-2">
      <div class="col-sm-12 col-md-6">
        <div class="dataTables_length">
          <label>
            Rows per page
            <select v-model="pageSize" class="form-select form-select-sm ms-2">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </label>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search goal types..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="paginatedData"
        :loading="loading"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span
              class="badge"
              :class="record.status === 'Active' ? 'bg-success' : 'bg-secondary'"
            >
              {{ record.status }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <a href="#" @click.prevent="editRow(record)">
                <i class="ti ti-edit"></i>
              </a>
              <a href="#" @click.prevent="deleteRow(record)">
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="row mt-3">
      <div class="col-md-6">
        <div>
          Showing {{ startItem }} - {{ endItem }} of {{ filteredData.length }}
        </div>
      </div>

      <div class="col-md-6 text-end">
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Prev</a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

export default {
  name: "GoalTypeTable",

  setup() {
    const goalTypes = ref([]);
    const loading = ref(false);
    const error = ref("");

    const searchQuery = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    // -----------------------------
    // Table Columns
    // -----------------------------
    const columns = [
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        sorter: (a, b) => a.type.localeCompare(b.type),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
      },
      {
        title: "Action",
        key: "action",
      },
    ];

    // -----------------------------
    // Fetch Goal Types (API)
    // -----------------------------
    const fetchGoalTypes = async () => {
      loading.value = true;
      error.value = "";

      try {
        // NOTE: If you later create a dedicated goal-type endpoint,
        // replace this with: /goal-types
        const res = await api.get("/goal");

        const rows = res.data?.data?.rows || res.data?.data || [];

        // Normalize structure for table
        goalTypes.value = rows.map((g) => ({
          id: g.id,
          type: g.subject || g.type || "N/A",
          description: g.description || "",
          status: g.status || "Active",
        }));
      } catch (err) {
        error.value = err.response?.data?.message || err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchGoalTypes);

    // -----------------------------
    // Filtering
    // -----------------------------
    const filteredData = computed(() => {
      const q = searchQuery.value.toLowerCase();

      return goalTypes.value.filter((item) => {
        return (
          item.type.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q)
        );
      });
    });

    // -----------------------------
    // Pagination
    // -----------------------------
    const totalPages = computed(() =>
      Math.ceil(filteredData.value.length / pageSize.value) || 1
    );

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredData.value.slice(start, start + pageSize.value);
    });

    const startItem = computed(() =>
      filteredData.value.length === 0
        ? 0
        : (currentPage.value - 1) * pageSize.value + 1
    );

    const endItem = computed(() =>
      Math.min(currentPage.value * pageSize.value, filteredData.value.length)
    );

    // -----------------------------
    // Pagination Actions
    // -----------------------------
    const goToPage = (page) => (currentPage.value = page);
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    // -----------------------------
    // Actions (UI hooks)
    // -----------------------------
    const editRow = (record) => {
      console.log("Edit:", record);
      // Hook into modal or router
    };

    const deleteRow = (record) => {
      console.log("Delete:", record);
      // Hook into delete modal + API call
    };

    return {
      goalTypes,
      columns,
      loading,
      error,

      searchQuery,
      currentPage,
      pageSize,

      filteredData,
      paginatedData,
      totalPages,

      startItem,
      endItem,

      goToPage,
      nextPage,
      prevPage,

      editRow,
      deleteRow,
    };
  },
};
</script>

<style scoped>
.pagination {
  margin-bottom: 0;
}
</style>
