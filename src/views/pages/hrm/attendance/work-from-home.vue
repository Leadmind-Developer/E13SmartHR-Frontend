<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Work From Home Management</h4>

        <button class="btn btn-primary" @click="openCreateModal">
          <i class="ti ti-circle-plus me-1"></i>
          New Request
        </button>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="filters.search"
            @input="debouncedFetch"
            type="text"
            class="form-control w-auto"
            placeholder="Search reason..."
          />

          <select v-model="filters.status" @change="fetchData" class="form-select w-auto">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select v-model="filters.shift" @change="fetchData" class="form-select w-auto">
            <option value="">All Shift</option>
            <option value="REGULAR">Regular</option>
            <option value="NIGHT">Night</option>
          </select>

          <input
            type="date"
            v-model="filters.startDate"
            @change="fetchData"
            class="form-control w-auto"
          />

          <input
            type="date"
            v-model="filters.endDate"
            @change="fetchData"
            class="form-control w-auto"
          />

        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body p-0">

          <a-table
            :columns="columns"
            :data-source="data"
            :loading="loading"
            :pagination="false"
            rowKey="id"
          >

            <!-- Name -->
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                {{ record.User?.firstName }} {{ record.User?.lastName }}
              </template>

              <!-- Status -->
              <template v-if="column.key === 'status'">
                <span :class="statusClass(record.status)">
                  {{ record.status }}
                </span>
              </template>

              <!-- Actions -->
              <template v-if="column.key === 'actions'">
                <div class="d-flex gap-2">

                  <!-- Approve -->
                  <button
                    v-if="canApprove"
                    class="btn btn-sm btn-success"
                    @click="updateStatus(record, 'APPROVED')"
                  >
                    Approve
                  </button>

                  <!-- Reject -->
                  <button
                    v-if="canApprove"
                    class="btn btn-sm btn-danger"
                    @click="updateStatus(record, 'REJECTED')"
                  >
                    Reject
                  </button>

                  <!-- Delete -->
                  <button
                    v-if="isAdmin"
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteRecord(record)"
                  >
                    Delete
                  </button>

                </div>
              </template>
            </template>

          </a-table>

          <!-- Pagination -->
          <div class="p-3 d-flex justify-content-between align-items-center">

            <div>
              Showing {{ pagination.page }} /
              {{ totalPages }} pages
            </div>

            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-light"
                :disabled="pagination.page === 1"
                @click="changePage(pagination.page - 1)"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-light"
                :disabled="pagination.page >= totalPages"
                @click="changePage(pagination.page + 1)"
              >
                Next
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- Modal -->
  <work-from-home-modal @created="fetchData" ref="modalRef" />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import debounce from "lodash/debounce";

/* --------------------------------
 * State
 * -------------------------------- */
const data = ref([]);
const loading = ref(false);

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});

const filters = ref({
  search: "",
  status: "",
  shift: "",
  startDate: "",
  endDate: "",
});

/* --------------------------------
 * Table Columns
 * -------------------------------- */
const columns = [
  { title: "Employee", key: "name" },
  { title: "Shift", dataIndex: "shift" },
  { title: "Reason", dataIndex: "reason" },
  { title: "Date", dataIndex: "date" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions" },
];

/* --------------------------------
 * Computed
 * -------------------------------- */
const totalPages = computed(() =>
  Math.ceil(pagination.value.total / pagination.value.limit)
);

/* --------------------------------
 * Role flags (from token or store)
 * -------------------------------- */
const userRole = ref(localStorage.getItem("role"));

const canApprove = computed(() =>
  ["MANAGER", "HR", "ADMIN"].includes(userRole.value)
);

const isAdmin = computed(() => userRole.value === "ADMIN");

/* --------------------------------
 * API Calls
 * -------------------------------- */
const fetchData = async () => {
  loading.value = true;

  try {
    const res = await api.get("/wfh", {
      params: {
        page: pagination.value.page,
        limit: pagination.value.limit,
        ...filters.value,
      },
    });

    data.value = res.data.data;
    pagination.value = res.data.pagination;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const debouncedFetch = debounce(fetchData, 400);

/* --------------------------------
 * Actions
 * -------------------------------- */
const updateStatus = async (record, status) => {
  try {
    await api.patch(`/wfh/${record.id}/status`, { status });
    fetchData();
  } catch (err) {
    alert(err.response?.data?.message || "Error updating status");
  }
};

const deleteRecord = async (record) => {
  if (!confirm("Delete this request?")) return;

  try {
    await api.delete(`/wfh/${record.id}`);
    fetchData();
  } catch (err) {
    alert("Delete failed");
  }
};

const changePage = (page) => {
  pagination.value.page = page;
  fetchData();
};

/* --------------------------------
 * UI Helpers
 * -------------------------------- */
const statusClass = (status) => {
  switch (status) {
    case "APPROVED":
      return "badge bg-success";
    case "PENDING":
      return "badge bg-info";
    case "REJECTED":
      return "badge bg-danger";
    case "COMPLETED":
      return "badge bg-secondary";
    default:
      return "badge bg-light";
  }
};

/* --------------------------------
 * Modal
 * -------------------------------- */
const modalRef = ref(null);

const openCreateModal = () => {
  modalRef.value?.open();
};

/* --------------------------------
 * Init
 * -------------------------------- */
onMounted(fetchData);
</script>
