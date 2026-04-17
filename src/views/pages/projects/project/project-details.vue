<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <router-link to="/projects/projects-list" class="fw-medium">
          <i class="ti ti-arrow-left me-2"></i>Back to List
        </router-link>

        <div class="d-flex gap-2">
          <button class="btn btn-primary" @click="editProject">
            <i class="ti ti-edit me-1"></i>Edit
          </button>

          <button class="btn btn-danger" @click="archiveProject">
            Archive
          </button>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-5">
        <span class="spinner-border"></span>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- CONTENT -->
      <div v-else class="row">

        <!-- SIDEBAR -->
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">

              <h5 class="mb-3">Project Details</h5>

              <ul class="list-group mb-4">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Client</span>
                  <strong>{{ project.clientName || "-" }}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Status</span>
                  <span :class="statusClass(project.status)">
                    {{ project.status }}
                  </span>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Priority</span>
                  <strong>{{ project.priority }}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Created</span>
                  <strong>{{ formatDate(project.createdAt) }}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Due Date</span>
                  <strong>{{ formatDate(project.dueDate) }}</strong>
                </li>
              </ul>

              <!-- STATS -->
              <div class="bg-light p-3 rounded">
                <h6>Tasks</h6>
                <h4>{{ stats.completed }} / {{ stats.total }}</h4>

                <div class="progress">
                  <div
                    class="progress-bar"
                    :style="{ width: progress + '%' }"
                  />
                </div>

                <small>{{ progress }}% Completed</small>
              </div>

            </div>
          </div>
        </div>

        <!-- MAIN -->
        <div class="col-xl-8">

          <!-- PROJECT INFO -->
          <div class="card mb-3">
            <div class="card-body">
              <h5>{{ project.name }}</h5>
              <p class="text-muted">{{ project.description }}</p>
            </div>
          </div>

          <!-- TASKS -->
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="mb-3">Tasks</h5>

              <div v-if="!project.Tasks?.length" class="text-muted">
                No tasks yet
              </div>

              <div
                v-for="task in project.Tasks"
                :key="task.id"
                class="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    :checked="task.status === 'Completed'"
                    @change="toggleTask(task)"
                  />

                  <span :class="{ 'text-decoration-line-through': task.status === 'Completed' }">
                    {{ task.title }}
                  </span>
                </div>

                <span :class="statusClass(task.status)">
                  {{ task.status }}
                </span>
              </div>

              <button class="btn btn-sm btn-outline-primary mt-2" @click="createTask">
                + Add Task
              </button>
            </div>
          </div>

          <!-- ACTIVITY -->
          <div class="card">
            <div class="card-body">
              <h5 class="mb-3">Activity</h5>

              <div v-if="!activity.length" class="text-muted">
                No activity yet
              </div>

              <div v-for="item in activity" :key="item.id" class="mb-3">
                <strong>{{ item.action }}</strong>
                <div class="text-muted small">
                  {{ formatDate(item.createdAt) }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const route = useRoute();
const router = useRouter();

const project = ref({});
const stats = ref({ total: 0, completed: 0 });
const activity = ref([]);

const loading = ref(true);
const error = ref(null);

/*
|--------------------------------------------------------------------------
| COMPUTED
|--------------------------------------------------------------------------
*/

const progress = computed(() => {
  if (!stats.value.total) return 0;
  return Math.round((stats.value.completed / stats.value.total) * 100);
});

/*
|--------------------------------------------------------------------------
| API CALLS
|--------------------------------------------------------------------------
*/

const fetchProject = async () => {
  const id = route.params.id;

  try {
    loading.value = true;

    const [projectRes, statsRes, activityRes] = await Promise.all([
      api.get(`/projects/${id}`),
      api.get(`/projects/${id}/stats`),
      api.get(`/projects/${id}/activity`),
    ]);

    project.value = projectRes.data.data;
    stats.value = statsRes.data.data;
    activity.value = activityRes.data.data;

  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load project";
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

const toggleTask = async (task) => {
  const newStatus =
    task.status === "Completed" ? "Pending" : "Completed";

  try {
    await api.patch(`/projects/tasks/${task.id}/status`, {
      status: newStatus,
    });

    task.status = newStatus;

  } catch (err) {
    console.error(err);
  }
};

const createTask = async () => {
  const title = prompt("Task title?");
  if (!title) return;

  try {
    const res = await api.post(`/projects/${project.value.id}/tasks`, {
      title,
      status: "Pending",
    });

    project.value.Tasks.push(res.data.data);

  } catch (err) {
    console.error(err);
  }
};

const editProject = () => {
  router.push(`/projects/${project.value.id}/edit`);
};

const archiveProject = async () => {
  if (!confirm("Archive this project?")) return;

  await api.delete(`/projects/${project.value.id}`);
  router.push("/projects/projects-list");
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const statusClass = (status) => {
  switch (status) {
    case "Completed":
      return "badge bg-success";
    case "InProgress":
      return "badge bg-warning";
    case "Pending":
      return "badge bg-secondary";
    default:
      return "badge bg-light";
  }
};

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

onMounted(fetchProject);
</script>
