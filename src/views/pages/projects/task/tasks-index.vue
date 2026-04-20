<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <breadcrumb
          title="Tasks"
          text="Projects"
          text1="Tasks"
        />

        <button
          class="btn btn-primary"
          @click="showCreateTask = true"
          :disabled="!selectedProjectId"
        >
          <i class="ti ti-circle-plus me-2"></i>
          Add Task
        </button>
      </div>

      <div class="row">

        <!-- LEFT: PROJECTS -->
        <div class="col-xl-4">

          <div v-if="loadingProjects" class="text-center py-5">
            <div class="spinner-border"></div>
          </div>

          <div
            v-for="project in projects"
            :key="project.id"
            class="card cursor-pointer"
            :class="{ 'border-primary': selectedProjectId === project.id }"
            @click="selectProject(project.id)"
          >
            <div class="card-body">

              <h5 class="mb-2">
                {{ project.name }}
              </h5>

              <div class="mb-3">
                <small>
                  {{ project.tasksCount }} tasks
                </small>
              </div>

              <div class="progress progress-xs mb-2">
                <div
                  class="progress-bar"
                  :style="{ width: project.completion + '%' }"
                ></div>
              </div>

              <small>
                {{ project.completion }}% Completed
              </small>

            </div>
          </div>

        </div>

        <!-- RIGHT: TASK BOARD -->
        <div class="col-xl-8">

          <div v-if="selectedProjectId">

            <!-- Filters -->
            <div class="d-flex gap-2 mb-4">

              <button
                v-for="p in priorities"
                :key="p"
                class="btn btn-sm"
                :class="priorityFilter === p ? 'btn-primary' : 'btn-white'"
                @click="priorityFilter = p"
              >
                {{ p }}
              </button>

            </div>

            <!-- Loading -->
            <div v-if="loadingTasks" class="text-center py-5">
              <div class="spinner-border"></div>
            </div>

            <!-- Empty -->
            <div
              v-else-if="filteredTasks.length === 0"
              class="text-center py-5 text-muted"
            >
              No tasks found
            </div>

            <!-- Task List -->
            <div
              v-for="task in filteredTasks"
              :key="task.id"
              class="card mb-3"
            >
              <div class="card-body">

                <div class="d-flex justify-content-between">

                  <div>

                    <h6 class="mb-2">
                      {{ task.title || task.name }}
                    </h6>

                    <div class="mb-2">

                      <span class="badge bg-light text-dark me-2">
                        {{ task.priority || 'MEDIUM' }}
                      </span>

                      <span class="badge bg-soft-info">
                        {{ task.status }}
                      </span>

                    </div>

                    <small v-if="task.dueDate">
                      Due:
                      {{ formatDate(task.dueDate) }}
                    </small>

                  </div>

                  <div class="dropdown">

                    <button
                      class="btn btn-sm btn-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Change Status
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end">

                      <li
                        v-for="status in statuses"
                        :key="status"
                      >
                        <a
                          href="#"
                          class="dropdown-item"
                          @click.prevent="updateStatus(task, status)"
                        >
                          {{ status }}
                        </a>
                      </li>

                    </ul>

                  </div>

                </div>

              </div>
            </div>

          </div>

          <div
            v-else
            class="text-center py-5 text-muted"
          >
            Select a project to view tasks
          </div>

        </div>

      </div>

    </div>
  </div>

  <!-- CREATE TASK MODAL -->
  <div
    v-if="showCreateTask"
    class="modal fade show d-block"
    style="background:rgba(0,0,0,.4)"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>Create Task</h5>
          <button
            class="btn-close"
            @click="showCreateTask=false"
          ></button>
        </div>

        <div class="modal-body">

          <input
            v-model="newTask.title"
            class="form-control mb-3"
            placeholder="Task title"
          />

          <textarea
            v-model="newTask.description"
            class="form-control mb-3"
            placeholder="Description"
          ></textarea>

          <select
            v-model="newTask.priority"
            class="form-control"
          >
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>

        </div>

        <div class="modal-footer">
          <button
            class="btn btn-white"
            @click="showCreateTask=false"
          >
            Cancel
          </button>

          <button
            class="btn btn-primary"
            @click="createTask"
            :disabled="creatingTask"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import api from "@/services/api";

export default {

  name: "TasksIndex",

  data() {
    return {
      loadingProjects: false,
      loadingTasks: false,
      creatingTask: false,

      projects: [],
      tasks: [],

      selectedProjectId: null,

      priorityFilter: "All",

      priorities: [
        "All",
        "HIGH",
        "MEDIUM",
        "LOW",
      ],

      statuses: [
        "Todo",
        "In Progress",
        "Completed",
      ],

      showCreateTask: false,

      newTask: {
        title: "",
        description: "",
        priority: "MEDIUM",
      },
    };
  },

  computed: {

    filteredTasks() {

      if (this.priorityFilter === "All") {
        return this.tasks;
      }

      return this.tasks.filter(
        t =>
          (t.priority || "").toUpperCase()
          === this.priorityFilter
      );
    },
  },

  async mounted() {
    await this.fetchProjects();
  },

  methods: {

    /*
    ----------------------------
    PROJECTS
    ----------------------------
    */

    async fetchProjects() {

      this.loadingProjects = true;

      try {

        const res = await api.get("/projects");

        const rows = res.data?.data?.data || [];

        this.projects = rows.map(p => {

          const tasks = p.Tasks || [];

          const completed =
            tasks.filter(
              t => t.status === "Completed"
            ).length;

          return {
            ...p,

            tasksCount: tasks.length,

            completion:
              tasks.length
                ? Math.round(
                    (completed / tasks.length) * 100
                  )
                : 0
          };

        });

        if (this.projects.length) {
          this.selectProject(this.projects[0].id);
        }

      } catch (e) {
        console.error(e);
      }
      finally {
        this.loadingProjects = false;
      }
    },

    async selectProject(projectId) {

      this.selectedProjectId = projectId;

      await this.fetchBoard();
    },

    /*
    ----------------------------
    TASK BOARD
    ----------------------------
    */

    async fetchBoard() {

      this.loadingTasks = true;

      try {

        const res = await api.get(
          `/projects/${this.selectedProjectId}/board`
        );

        const grouped = res.data?.data || {};

        this.tasks = [
          ...(grouped.Todo || []),
          ...(grouped["In Progress"] || []),
          ...(grouped.Completed || []),
        ];

      } catch (e) {
        console.error(e);
      }
      finally {
        this.loadingTasks = false;
      }
    },

    /*
    ----------------------------
    CREATE TASK
    ----------------------------
    */

    async createTask() {

      if (!this.newTask.title) return;

      this.creatingTask = true;

      try {

        await api.post(
          `/projects/${this.selectedProjectId}/tasks`,
          this.newTask
        );

        this.showCreateTask = false;

        this.newTask = {
          title: "",
          description: "",
          priority: "MEDIUM",
        };

        await this.fetchBoard();

      } catch (e) {
        console.error(e);
      }
      finally {
        this.creatingTask = false;
      }
    },

    /*
    ----------------------------
    UPDATE STATUS
    ----------------------------
    */

    async updateStatus(task, status) {

      if (task.status === status) {
        return;
      }

      try {

        await api.patch(
          `/projects/tasks/${task.id}/status`,
          { status }
        );

        task.status = status;

      } catch (e) {
        console.error(e);
      }
    },

    formatDate(date) {

      if (!date) return "";

      return new Date(date)
        .toLocaleDateString();
    },

  },
};
</script>

<style scoped>
.cursor-pointer{
  cursor:pointer;
}

.border-primary{
  border:2px solid var(--bs-primary);
}
</style>
