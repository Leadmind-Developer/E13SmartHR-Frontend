<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">

          <!-- Search -->
          <div class="input-icon-start position-relative me-2">
            <span class="input-icon-addon">
              <i class="ti ti-search"></i>
            </span>
            <input
              v-model="search"
              @input="debouncedSearch"
              type="text"
              class="form-control"
              placeholder="Search Todo..."
            />
          </div>

          <!-- Collapse -->
          <a class="btn btn-light btn-icon" @click="toggleHeader">
            <i class="ti ti-chevrons-up"></i>
          </a>

        </div>
      </div>

      <!-- Stats -->
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between">
          <div><strong>Total:</strong> {{ stats.total }}</div>
          <div><strong>Pending:</strong> {{ stats.pending }}</div>
          <div><strong>Completed:</strong> {{ stats.completed }}</div>
        </div>
      </div>

      <!-- Create -->
      <button
        class="btn bg-primary-transparent border-dashed border-primary w-100 text-start mb-3"
        data-bs-toggle="modal"
        data-bs-target="#add_todo"
      >
        <i class="ti ti-plus me-2"></i>New task
      </button>

      <!-- Filters -->
      <div class="d-flex mb-3 gap-2">
        <select v-model="filters.priority" @change="fetchTodos" class="form-select w-auto">
          <option value="">All Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select v-model="filters.status" @change="fetchTodos" class="form-select w-auto">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <!-- Todo Groups -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border"></div>
      </div>

      <div v-else>
        <div
          v-for="group in groupedTodos"
          :key="group.priority"
          class="card mb-3"
        >
          <div class="card-header d-flex justify-content-between">
            <h5>{{ group.priority }} ({{ group.items.length }})</h5>
          </div>

          <div class="card-body">

            <div v-if="!group.items.length" class="text-muted">
              No tasks
            </div>

            <div
              v-for="todo in group.items"
              :key="todo.id"
              class="list-group-item mb-2 p-3 border rounded"
            >
              <div class="d-flex justify-content-between align-items-center">

                <!-- LEFT -->
                <div class="d-flex align-items-center">

                  <input
                    type="checkbox"
                    :checked="todo.status === 'COMPLETED'"
                    @change="toggleStatus(todo)"
                    class="me-2"
                  />

                  <div :class="{ 'text-decoration-line-through': todo.status === 'COMPLETED' }">
                    <strong>{{ todo.title }}</strong>
                    <div class="small text-muted">
                      {{ todo.description }}
                    </div>
                  </div>

                </div>

                <!-- RIGHT -->
                <div class="d-flex align-items-center gap-2">

                  <span class="badge bg-light text-dark">
                    {{ todo.status }}
                  </span>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteTodo(todo.id)"
                  >
                    <i class="ti ti-trash"></i>
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Load More (future pagination ready) -->
      <div class="text-center mt-3">
        <button class="btn btn-primary" @click="fetchTodos">
          Refresh
        </button>
      </div>

    </div>

    <div class="footer text-center p-3">
      {{ new Date().getFullYear() }} © E13HRIS
    </div>
  </div>

  <todo-modal @created="fetchTodos" />

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const title = "Todo";
const text = "Applications";
const text1 = "Todo";

const todos = ref([]);
const loading = ref(false);
const search = ref("");

const filters = ref({
  priority: "",
  status: "",
});

/*
|--------------------------------------------------------------------------
| FETCH TODOS
|--------------------------------------------------------------------------
*/

const fetchTodos = async () => {
  loading.value = true;

  try {
    const { data } = await api.get("/todos", {
      params: filters.value,
    });

    todos.value = data.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH (Debounced)
|--------------------------------------------------------------------------
*/

let timeout = null;

const debouncedSearch = () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (!search.value) return fetchTodos();

    try {
      const { data } = await api.get("/todos/search", {
        params: { q: search.value },
      });

      todos.value = data.data;
    } catch (err) {
      console.error(err);
    }
  }, 400);
};

/*
|--------------------------------------------------------------------------
| UPDATE STATUS
|--------------------------------------------------------------------------
*/

const toggleStatus = async (todo) => {
  const newStatus =
    todo.status === "COMPLETED" ? "PENDING" : "COMPLETED";

  try {
    await api.put(`/todos/${todo.id}`, {
      status: newStatus,
    });

    todo.status = newStatus;
  } catch (err) {
    console.error(err);
  }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

const deleteTodo = async (id) => {
  if (!confirm("Delete this todo?")) return;

  try {
    await api.delete(`/todos/${id}`);
    todos.value = todos.value.filter(t => t.id !== id);
  } catch (err) {
    console.error(err);
  }
};

/*
|--------------------------------------------------------------------------
| GROUPING
|--------------------------------------------------------------------------
*/

const groupedTodos = computed(() => {
  const groups = {
    HIGH: [],
    MEDIUM: [],
    LOW: [],
  };

  todos.value.forEach(todo => {
    if (groups[todo.priority]) {
      groups[todo.priority].push(todo);
    }
  });

  return Object.keys(groups).map(priority => ({
    priority,
    items: groups[priority],
  }));
});

/*
|--------------------------------------------------------------------------
| STATS
|--------------------------------------------------------------------------
*/

const stats = computed(() => ({
  total: todos.value.length,
  completed: todos.value.filter(t => t.status === "COMPLETED").length,
  pending: todos.value.filter(t => t.status !== "COMPLETED").length,
}));

/*
|--------------------------------------------------------------------------
| UI
|--------------------------------------------------------------------------
*/

const toggleHeader = () => {
  document.body.classList.toggle("header-collapse");
};

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

onMounted(fetchTodos);
</script>
