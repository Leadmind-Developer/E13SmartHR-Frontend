<template>
  <div class="task-board-wrapper">

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <div
      v-else
      class="d-flex align-items-start overflow-auto project-status pb-4"
    >
      <div
        v-for="(column, statusKey) in modules"
        :key="statusKey"
        class="p-3 rounded bg-transparent-secondary w-100 me-3"
      >

        <!-- Column Header -->
        <div class="bg-white p-2 rounded mb-2">
          <div class="d-flex align-items-center justify-content-between">

            <div class="d-flex align-items-center">
              <span
                class="p-1 d-flex rounded-circle me-2"
                :class="column.DotBgClass"
              >
                <span
                  class="rounded-circle d-block p-1"
                  :class="column.DotClass"
                ></span>
              </span>

              <h5 class="me-2 mb-0">
                {{ column.Title }}
              </h5>

              <span class="badge bg-light rounded-pill">
                {{ column.Cards.length }}
              </span>
            </div>

          </div>
        </div>

        <!-- Cards -->
        <draggable
          :list="column.Cards"
          item-key="id"
          :group="{ name: 'kanban' }"
          @change="(evt) => onDragChange(evt, statusKey)"
        >

          <template #item="{ element }">
            <div class="card kanban-card mb-2">

              <div class="card-body">

                <!-- badges -->
                <div class="d-flex justify-content-between mb-3">

                  <div>
                    <span class="badge bg-outline-dark me-2">
                      Task
                    </span>

                    <span
                      class="badge"
                      :class="priorityClass(element.priority)"
                    >
                      {{ element.priority || "Medium" }}
                    </span>

                  </div>

                </div>

                <!-- title -->
                <h6 class="mb-3">
                  {{ element.title }}
                </h6>

                <!-- progress -->
                <div class="d-flex align-items-center mb-2">

                  <div class="progress progress-sm flex-fill">
                    <div
                      class="progress-bar"
                      :style="{
                        width: progressValue(element) + '%'
                      }"
                    ></div>
                  </div>

                  <span class="ms-2 fw-medium">
                    {{ progressValue(element) }}%
                  </span>

                </div>

                <!-- due -->
                <p class="fw-medium mb-0">
                  Due on:
                  <span class="text-gray-9">
                    {{ formatDate(element.dueDate) }}
                  </span>
                </p>

                <!-- footer -->
                <div
                  class="d-flex justify-content-between border-top pt-2 mt-2"
                >

                  <div class="avatar-list-stacked avatar-group-sm">

                    <span
                      v-for="member in (element.TaskAssignments || []).slice(0,4)"
                      :key="member.id"
                      class="avatar avatar-rounded bg-primary"
                    >
                      {{
                        initials(
                          member?.User?.name ||
                          "U"
                        )
                      }}
                    </span>

                    <span
                      v-if="(element.TaskAssignments || []).length > 4"
                      class="avatar avatar-rounded bg-primary fs-12"
                    >
                      +{{ element.TaskAssignments.length - 4 }}
                    </span>

                  </div>

                  <div class="d-flex align-items-center">

                    <span class="me-2">
                      <i class="ti ti-message-circle"></i>
                      {{ element.TaskComments?.length || 0 }}
                    </span>

                    <span>
                      <i class="ti ti-paperclip"></i>
                      {{ element.TaskFiles?.length || 0 }}
                    </span>

                  </div>

                </div>

              </div>

            </div>
          </template>

        </draggable>

        <!-- Add Task -->
        <div class="pt-2">
          <button
            class="btn btn-white border border-dashed w-100"
            @click="createQuickTask(statusKey)"
            :disabled="creatingTask"
          >
            <i class="ti ti-plus me-2"></i>
            New Task
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import api from "@/services/api";

export default {
  name: "TaskBoardKanban",

  components: {
    draggable: VueDraggableNext
  },

  props: {
    projectId: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      loading: false,
      creatingTask: false,

      modules: {
        Todo: {
          Title: "To Do",
          DotBgClass: "bg-transparent-purple",
          DotClass: "bg-purple",
          Cards: []
        },

        Pending: {
          Title: "Pending",
          DotBgClass: "bg-soft-pink",
          DotClass: "bg-pink",
          Cards: []
        },

        Inprogress: {
          Title: "In Progress",
          DotBgClass: "bg-soft-skyblue",
          DotClass: "bg-skyblue",
          Cards: []
        },

        Completed: {
          Title: "Completed",
          DotBgClass: "bg-soft-success",
          DotClass: "bg-success",
          Cards: []
        },

        OnHold: {
          Title: "On Hold",
          DotBgClass: "bg-soft-warning",
          DotClass: "bg-warning",
          Cards: []
        },

        Review: {
          Title: "Review",
          DotBgClass: "bg-soft-skyblue",
          DotClass: "bg-skyblue",
          Cards: []
        }
      }
    };
  },

  mounted() {
    this.fetchBoard();
  },

  methods: {

    async fetchBoard() {
      this.loading = true;

      try {
        const { data } = await api.get(
          `/projects/${this.projectId}/board`
        );

        const board = data?.data || {};

        Object.keys(this.modules).forEach(status => {
          this.modules[status].Cards =
            board[status] || [];
        });

      } catch (e) {
        console.error("Board load failed", e);
      } finally {
        this.loading = false;
      }
    },

    async onDragChange(evt, newStatus) {

      if (!evt.added) return;

      const task = evt.added.element;

      const oldStatus = task.status;

      task.status = newStatus;

      try {

        await api.patch(
          `/projects/tasks/${task.id}/status`,
          {
            status: newStatus
          }
        );

      } catch (e) {

        console.error("Move failed", e);

        task.status = oldStatus;

        await this.fetchBoard();
      }
    },

    async createQuickTask(status) {

      const title = prompt("Task title");

      if (!title) return;

      this.creatingTask = true;

      try {

        await api.post(
          `/projects/${this.projectId}/tasks`,
          {
            title,
            status,
            priority: "Medium"
          }
        );

        await this.fetchBoard();

      } catch (e) {

        console.error("Create task failed", e);

      } finally {

        this.creatingTask = false;

      }
    },

    progressValue(task) {
      return task.progress || 0;
    },

    priorityClass(priority) {

      if (priority === "Urgent")
        return "bg-danger";

      if (priority === "Low")
        return "bg-success";

      return "bg-warning";
    },

    formatDate(date) {

      if (!date) return "-";

      return new Date(date)
        .toLocaleDateString();
    },

    initials(name) {
      return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0,2)
        .toUpperCase();
    }

  }
};
</script>

<style scoped>
.task-board-wrapper{
min-height:500px;
}

.kanban-card{
cursor:grab;
}

.kanban-card:active{
cursor:grabbing;
}
</style>
