<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb
          :title="title"
          :text="text"
          :text1="text1"
        />

        <div class="d-flex align-items-center">

          <button
            class="btn btn-primary"
            @click="openTaskModal"
          >
            <i class="ti ti-circle-plus me-1"></i>
            Add Task
          </button>

          <div class="head-icons ms-3">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="card p-5 text-center"
      >
        <div class="spinner-border"></div>
      </div>

      <div v-else class="card">

        <!-- Project Header -->
        <div
          class="card-header d-flex justify-content-between align-items-center flex-wrap gap-3"
        >
          <div>
            <h4 class="mb-1">
              {{ project.name || "Project Board" }}
            </h4>

            <small class="text-muted">
              {{ project.description || "" }}
            </small>
          </div>

          <div class="d-flex gap-4">

            <div>
              <strong>{{ stats.total }}</strong><br />
              <small>Total</small>
            </div>

            <div>
              <strong>{{ stats.pending }}</strong><br />
              <small>Pending</small>
            </div>

            <div>
              <strong>{{ stats.completed }}</strong><br />
              <small>Completed</small>
            </div>

          </div>
        </div>

        <!-- Filters -->
        <div class="card-body border-bottom">
          <div class="row g-3">

            <div class="col-md-4">
              <input
                v-model="search"
                class="form-control"
                placeholder="Search tasks..."
              />
            </div>

            <div class="col-md-3">
              <select
                v-model="priorityFilter"
                class="form-control"
              >
                <option value="">All Priority</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div class="col-md-3">
              <button
                class="btn btn-outline-secondary"
                @click="refreshBoard"
              >
                Refresh
              </button>
            </div>

          </div>
        </div>

        <!-- Kanban -->
        <div class="card-body">

          <div class="kanban-board">

            <div
              v-for="status in statuses"
              :key="status"
              class="kanban-column"
              @dragover.prevent
              @drop="handleDrop(status)"
            >
              <div class="kanban-header">
                {{ status }}
                ({{ filteredTasks(status).length }})
              </div>

              <div
                v-for="task in filteredTasks(status)"
                :key="task.id"
                class="kanban-card"
                draggable="true"
                @dragstart="dragTask(task)"
              >
                <h6>
                  {{ task.title || task.name }}
                </h6>

                <p v-if="task.description">
                  {{ task.description }}
                </p>

                <span
                  class="badge"
                  :class="priorityClass(task.priority)"
                >
                  {{ task.priority || 'NORMAL' }}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">
        {{ new Date().getFullYear() }} © E13
      </p>
    </div>

  </div>

  <tasks-modal />
</template>

<script>
import api from "@/services/api";

export default {
  name: "TaskBoard",

  data() {
    return {
      title: "Task Board",
      text: "Projects",
      text1: "Task Board",

      loading: false,

      projectId: this.$route.params.id,

      project: {},

      board: {},

      stats: {
        total: 0,
        pending: 0,
        completed: 0
      },

      search: "",
      priorityFilter: "",

      draggedTask: null,

      statuses: [
        "Todo",
        "In Progress",
        "Completed"
      ]
    };
  },

  async mounted() {
    await this.loadAll();
  },

  methods: {

    async loadAll() {
      this.loading = true;

      try {
        await Promise.all([
          this.fetchProject(),
          this.fetchBoard(),
          this.fetchStats()
        ]);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },

    async fetchProject() {
      const { data } = await api.get(
        `/projects/${this.projectId}`
      );

      this.project = data.data || {};
    },

    async fetchBoard() {
      const { data } = await api.get(
        `/projects/${this.projectId}/board`
      );

      this.board = data.data || {};
    },

    async fetchStats() {
      const { data } = await api.get(
        `/projects/${this.projectId}/stats`
      );

      this.stats = data.data || {};
    },

    refreshBoard() {
      this.fetchBoard();
      this.fetchStats();
    },

    filteredTasks(status) {

      let tasks = this.board[status] || [];

      if (this.search) {
        const s = this.search.toLowerCase();

        tasks = tasks.filter(t =>
          (t.title || t.name || "")
          .toLowerCase()
          .includes(s)
        );
      }

      if (this.priorityFilter) {
        tasks = tasks.filter(
          t => t.priority === this.priorityFilter
        );
      }

      return tasks;
    },

    dragTask(task) {
      this.draggedTask = task;
    },

    async handleDrop(newStatus) {
      if (!this.draggedTask) return;

      if (this.draggedTask.status === newStatus) {
        return;
      }

      try {

        await api.patch(
          `/projects/tasks/${this.draggedTask.id}/status`,
          {
            status: newStatus
          }
        );

        this.draggedTask = null;

        await this.refreshBoard();

      }
      catch (e) {
        console.error("Status update failed", e);
      }
    },

    priorityClass(priority) {

      if (priority === "HIGH")
        return "bg-danger";

      if (priority === "MEDIUM")
        return "bg-warning";

      if (priority === "LOW")
        return "bg-success";

      return "bg-secondary";
    },

    openTaskModal() {
      const modal = document.getElementById(
        "add_task_modal"
      );

      if (modal && window.bootstrap) {
        new window.bootstrap.Modal(modal).show();
      }
    },

    toggleHeader() {
      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");

      document.body.classList.toggle(
        "header-collapse"
      );
    }

  }
};
</script>

<style scoped>
.kanban-board{
display:flex;
gap:20px;
overflow-x:auto;
}

.kanban-column{
min-width:320px;
background:#f8f9fa;
border-radius:12px;
padding:16px;
}

.kanban-header{
font-weight:700;
margin-bottom:15px;
}

.kanban-card{
background:#fff;
border-radius:10px;
padding:14px;
margin-bottom:14px;
cursor:grab;
box-shadow:0 2px 8px rgba(0,0,0,.06);
}

.kanban-card p{
font-size:13px;
margin-bottom:10px;
}

.badge{
padding:6px 10px;
}
</style>
