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
            data-bs-target="#goalTypeModal"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Goal Type
          </button>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center flex-wrap">
          <h5>Goal Type List</h5>

          <div class="d-flex align-items-center gap-2">
            <input
              v-model="search"
              @input="fetchGoalTypes"
              type="text"
              class="form-control"
              placeholder="Search goal types..."
            />
          </div>
        </div>

        <!-- Table -->
        <div class="card-body">
          <div v-if="loading" class="text-center py-4">
            Loading...
          </div>

          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <table v-else class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="type in goalTypes" :key="type.id">
                <td>{{ type.name }}</td>
                <td>{{ type.description || "-" }}</td>
                <td>{{ formatDate(type.createdAt) }}</td>

                <td class="text-end">
                  <button class="btn btn-sm btn-warning me-2" @click="editGoalType(type)">
                    Edit
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteGoalType(type.id)">
                    Delete
                  </button>
                </td>
              </tr>

              <tr v-if="goalTypes.length === 0">
                <td colspan="4" class="text-center">No goal types found</td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-outline-primary" :disabled="page === 1" @click="prevPage">
              Previous
            </button>

            <span>Page {{ page }}</span>

            <button class="btn btn-outline-primary" @click="nextPage">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ currentYear }} &copy; SmartHR.</p>
      <p>
        Designed & Developed By
        <a href="#" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal -->
  <goal-type-modal
    :editData="selectedGoalType"
    @saved="fetchGoalTypes"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";

// UI State
const title = "Goal Type";
const text = "Performance";
const text1 = "Add New Goal Type";

const goalTypes = ref([]);
const loading = ref(false);
const error = ref(null);

const search = ref("");
const page = ref(1);
const limit = 10;

const selectedGoalType = ref(null);

const currentYear = computed(() => new Date().getFullYear());

// -----------------------------
// Fetch Goal Types
// -----------------------------
const fetchGoalTypes = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await api.get("/performance/goal", {
      params: {
        page: page.value,
        limit,
        search: search.value,
      },
    });

    goalTypes.value = data.data || [];
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

// -----------------------------
// Pagination
// -----------------------------
const nextPage = () => {
  page.value++;
  fetchGoalTypes();
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchGoalTypes();
  }
};

// -----------------------------
// Edit
// -----------------------------
const editGoalType = (type) => {
  selectedGoalType.value = type;
  const modal = new bootstrap.Modal(document.getElementById("goalTypeModal"));
  modal.show();
};

// -----------------------------
// Delete
// -----------------------------
const deleteGoalType = async (id) => {
  if (!confirm("Are you sure you want to delete this goal type?")) return;

  try {
    await api.delete(`/performance/goal/${id}`);
    fetchGoalTypes();
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

// -----------------------------
// Utils
// -----------------------------
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(() => {
  fetchGoalTypes();
});
</script>
