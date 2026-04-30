<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Todo List</h4>

        <div class="d-flex gap-2">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            class="form-control"
            placeholder="Search todos..."
          />

          <select v-model="filters.status" @change="fetchTodos" class="form-select">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select v-model="filters.priority" @change="fetchTodos" class="form-select">
            <option value="">All Priority</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <button class="btn btn-primary" @click="openCreate">
            + New
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-body p-0">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Assignees</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Due</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="todo in todos" :key="todo.id">
                <td>
                  <strong>{{ todo.title }}</strong>
                  <div class="text-muted small">
                    {{ todo.description }}
                  </div>
                </td>

                <!-- Tags -->
                <td>
                  <span
                    v-for="tag in todo.tags"
                    :key="tag.id"
                    class="badge bg-info me-1"
                  >
                    {{ tag.name }}
                  </span>
                </td>

                <!-- Assignees -->
                <td>
                  <span
                    v-for="user in todo.assignees"
                    :key="user.id"
                    class="badge bg-light text-dark me-1"
                  >
                    {{ user.email }}
                  </span>
                </td>

                <!-- Progress -->
                <td style="width: 180px;">
                  <small>{{ todo.progress || 0 }}%</small>
                  <div class="progress progress-xs">
                    <div
                      class="progress-bar"
                      :style="{ width: (todo.progress || 0) + '%' }"
                    />
                  </div>
                </td>

                <!-- Status -->
                <td>
                  <span class="badge" :class="statusClass(todo.status)">
                    {{ todo.status }}
                  </span>
                </td>

                <!-- Due -->
                <td>
                  {{ formatDate(todo.dueDate) }}
                </td>

                <!-- Actions -->
                <td>
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-sm btn-light"
                      @click="viewActivity(todo.id)"
                    >
                      🧾
                    </button>

                    <button
                      class="btn btn-sm btn-light"
                      @click="editTodo(todo)"
                    >
                      ✏️
                    </button>

                    <button
                      class="btn btn-sm btn-danger"
                      @click="deleteTodo(todo.id)"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!todos.length">
                <td colspan="7" class="text-center py-4">
                  No todos found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
// import { io } from "socket.io-client";

/**
 * STATE
 */
const todos = ref([]);
const searchQuery = ref("");

const filters = ref({
  status: "",
  priority: "",
});

/**
 * SOCKET (Realtime)
 */
/** const socket = io("https://api.e13solution.com", {
  transports: ["websocket"],
}); 
*/

/**
 * FETCH TODOS
 */
const fetchTodos = async () => {
  const { data } = await api.get("/todos", {
    params: filters.value,
  });

  todos.value = data.data;
};

/**
 * SEARCH (Elastic / Meili)
 */
const handleSearch = async () => {
  if (!searchQuery.value) return fetchTodos();

  const { data } = await api.get("/todos/search", {
    params: { q: searchQuery.value },
  });

  todos.value = data.data;
};

/**
 * DELETE
 */
const deleteTodo = async (id) => {
  if (!confirm("Delete this todo?")) return;

  await api.delete(`/todos/${id}`);

  todos.value = todos.value.filter((t) => t.id !== id);
};

/**
 * EDIT (placeholder)
 */
const editTodo = (todo) => {
  console.log("Edit:", todo);
};

/**
 * ACTIVITY TIMELINE
 */
const viewActivity = async (id) => {
  const { data } = await api.get(`/todos/${id}/activity`);
  console.log("Activity:", data.data);
};

/**
 * HELPERS
 */
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const statusClass = (status) => {
  return {
    "bg-success": status === "COMPLETED",
    "bg-warning": status === "IN_PROGRESS",
    "bg-secondary": status === "PENDING",
    "bg-danger": status === "ON_HOLD",
  };
};

/**
 * REALTIME EVENTS
 */
socket.on("todo.created", (todo) => {
  todos.value.unshift(todo);
});

socket.on("todo.updated", (updated) => {
  const index = todos.value.findIndex((t) => t.id === updated.id);
  if (index !== -1) todos.value[index] = updated;
});

socket.on("todo.deleted", ({ id }) => {
  todos.value = todos.value.filter((t) => t.id !== id);
});

/**
 * INIT
 */
onMounted(fetchTodos);
</script>

<style scoped>
.progress-xs {
  height: 6px;
}
</style>
