<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <div class="mb-2">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_policy">
              <i class="ti ti-circle-plus me-2"></i>Add Policy
            </button>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between flex-wrap">
          <h5>Policies</h5>

          <div class="d-flex gap-2 flex-wrap">
            <!-- Search -->
            <input
              v-model="filters.search"
              @input="debouncedFetch"
              class="form-control"
              placeholder="Search policies..."
            />

            <!-- Department Filter -->
            <select v-model="filters.departmentId" @change="fetchPolicies" class="form-select">
              <option value="">All Departments</option>
              <option v-for="d in departments" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>

            <!-- Sort -->
            <select v-model="filters.sortOrder" @change="fetchPolicies" class="form-select">
              <option value="DESC">Newest</option>
              <option value="ASC">Oldest</option>
            </select>
          </div>
        </div>

        <div class="card-body p-0">
          <!-- Loading -->
          <div v-if="loading" class="p-4 text-center">
            Loading policies...
          </div>

          <!-- Error -->
          <div v-if="error" class="p-4 text-danger text-center">
            {{ error }}
          </div>

          <!-- Table -->
          <div v-if="!loading && !error" class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="policy in policies" :key="policy.id">
                  <td>{{ policy.name }}</td>
                  <td>{{ policy.Department?.name || "-" }}</td>
                  <td>{{ policy.description }}</td>
                  <td>{{ formatDate(policy.createdAt) }}</td>

                  <!-- Acknowledgement -->
                  <td>
                    <span
                      v-if="policy.acknowledged"
                      class="badge bg-success"
                    >
                      Acknowledged
                    </span>
                    <span v-else class="badge bg-warning">
                      Pending
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="text-end">
                    <button
                      v-if="!policy.acknowledged"
                      @click="acknowledge(policy.id)"
                      class="btn btn-sm btn-outline-success me-2"
                    >
                      Acknowledge
                    </button>

                    <button
                      class="btn btn-sm btn-outline-primary me-2"
                      @click="editPolicy(policy)"
                    >
                      Edit
                    </button>

                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deletePolicy(policy.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                <tr v-if="policies.length === 0">
                  <td colspan="6" class="text-center p-4">
                    No policies found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="d-flex justify-content-between p-3">
            <div>
              Showing {{ pagination.from }} - {{ pagination.to }} of {{ pagination.total }}
            </div>

            <div>
              <button
                class="btn btn-sm btn-light me-2"
                :disabled="pagination.page === 1"
                @click="changePage(pagination.page - 1)"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-light"
                :disabled="pagination.page >= pagination.totalPages"
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

  <policy-modal @refresh="fetchPolicies" />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/services/api"; 
import debounce from "lodash/debounce";

// --------------------
// State
// --------------------
const title = "Policies";
const text = "Employees";
const text1 = "Policies";

const policies = ref([]);
const departments = ref([]);
const loading = ref(false);
const error = ref(null);

// Filters
const filters = reactive({
  page: 1,
  limit: 10,
  search: "",
  departmentId: "",
  sortOrder: "DESC",
});

// Pagination
const pagination = reactive({
  page: 1,
  total: 0,
  totalPages: 1,
  from: 0,
  to: 0,
});

// --------------------
// API Calls
// --------------------
const fetchPolicies = async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data } = await api.get("/policies", {
      params: filters,
    });

    policies.value = data.items;

    pagination.total = data.total;
    pagination.page = filters.page;
    pagination.totalPages = Math.ceil(data.total / filters.limit);
    pagination.from = (filters.page - 1) * filters.limit + 1;
    pagination.to = Math.min(filters.page * filters.limit, data.total);
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load policies";
  } finally {
    loading.value = false;
  }
};

const fetchDepartments = async () => {
  try {
    const { data } = await api.get("/departments");
    departments.value = data.items || data;
  } catch (err) {
    console.error(err);
  }
};

// --------------------
// Actions
// --------------------
const acknowledge = async (id) => {
  try {
    await api.post(`/policies/${id}/acknowledge`);
    fetchPolicies();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to acknowledge");
  }
};

const deletePolicy = async (id) => {
  if (!confirm("Are you sure you want to delete this policy?")) return;

  try {
    await api.delete(`/policies/${id}`);
    fetchPolicies();
  } catch (err) {
    alert(err.response?.data?.message || "Delete failed");
  }
};

const editPolicy = (policy) => {
  // Emit or open modal with data
  console.log("Edit:", policy);
};

// --------------------
// Pagination
// --------------------
const changePage = (page) => {
  filters.page = page;
  fetchPolicies();
};

// --------------------
// Utils
// --------------------
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Debounce search
const debouncedFetch = debounce(() => {
  filters.page = 1;
  fetchPolicies();
}, 500);

// --------------------
// Lifecycle
// --------------------
onMounted(() => {
  fetchPolicies();
  fetchDepartments();
});
</script>
