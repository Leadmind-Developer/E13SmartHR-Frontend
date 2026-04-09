<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/services/api";
import moment from "moment";

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const goals = ref([]);
const loading = ref(false);
const error = ref("");

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
});

const filters = reactive({
  search: "",
});

/*
|--------------------------------------------------------------------------
| Fetch Goals
|--------------------------------------------------------------------------
*/

const fetchGoals = async () => {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get("/goal", {
      params: {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
      },
    });

    goals.value = data?.data || [];
    pagination.total = data?.count || 0;
  } catch (err) {
    error.value = err?.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const nextPage = () => {
  if (pagination.page * pagination.limit < pagination.total) {
    pagination.page++;
    fetchGoals();
  }
};

const prevPage = () => {
  if (pagination.page > 1) {
    pagination.page--;
    fetchGoals();
  }
};

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

const handleSearch = () => {
  pagination.page = 1;
  fetchGoals();
};

/*
|--------------------------------------------------------------------------
| Delete Goal
|--------------------------------------------------------------------------
*/

const deleteGoal = async (id) => {
  if (!confirm("Are you sure you want to delete this goal?")) return;

  try {
    await api.delete(`/goal/${id}`);
    fetchGoals();
  } catch (err) {
    alert(err?.response?.data?.message || err.message);
  }
};

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {
  fetchGoals();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      
      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div>
          <h4 class="mb-1">Goal Tracking</h4>
          <span class="text-muted">Performance / Goal Tracking</span>
        </div>

        <div class="d-flex align-items-center gap-2">
          <input
            v-model="filters.search"
            @keyup.enter="handleSearch"
            type="text"
            class="form-control"
            placeholder="Search goals..."
          />

          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_goal">
            + Add Goal
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body">

          <div v-if="loading" class="text-center py-4">
            <span class="spinner-border"></span>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Created</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="goal in goals.rows || goals" :key="goal.id">
                  <td>{{ goal.subject }}</td>

                  <td>
                    <span class="badge bg-info">
                      {{ goal.GoalType?.name || "N/A" }}
                    </span>
                  </td>

                  <td>
                    <span
                      class="badge"
                      :class="{
                        'bg-success': goal.status === 'COMPLETED',
                        'bg-warning': goal.status === 'IN_PROGRESS',
                        'bg-secondary': goal.status === 'DRAFT',
                      }"
                    >
                      {{ goal.status }}
                    </span>
                  </td>

                  <td>
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="{ width: goal.progress + '%' }"
                      >
                        {{ goal.progress || 0 }}%
                      </div>
                    </div>
                  </td>

                  <td>
                    {{ moment(goal.createdAt).format("MMM DD, YYYY") }}
                  </td>

                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>

                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteGoal(goal.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                <tr v-if="(goals.rows || goals).length === 0">
                  <td colspan="6" class="text-center text-muted">
                    No goals found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-outline-secondary" @click="prevPage">
              Previous
            </button>

            <span>
              Page {{ pagination.page }} of
              {{ Math.ceil(pagination.total / pagination.limit) || 1 }}
            </span>

            <button class="btn btn-outline-secondary" @click="nextPage">
              Next
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
      <p>
        Designed & Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal (existing component) -->
  <goal-tracking-modal @saved="fetchGoals" />
</template>
