<script>
import { VueDraggableNext } from "vue-draggable-next";
import api from "@/services/api";

export default {
  components: {
    draggable: VueDraggableNext,
  },

  data() {
    return {
      loading: false,
      board: {},
      stages: [
        "NEW",
        "SCHEDULED",
        "INTERVIEWED",
        "OFFERED",
        "HIRED",
        "REJECTED",
      ],
      stageMeta: {
        NEW: { label: "New", dot: "bg-purple" },
        SCHEDULED: { label: "Scheduled", dot: "bg-pink" },
        INTERVIEWED: { label: "Interviewed", dot: "bg-info" },
        OFFERED: { label: "Offered", dot: "bg-warning" },
        HIRED: { label: "Hired", dot: "bg-success" },
        REJECTED: { label: "Rejected", dot: "bg-danger" },
      },
    };
  },

  mounted() {
    this.fetchBoard();
  },

  methods: {
    /**
     * ===============================
     * 📊 FETCH BOARD
     * ===============================
     */
    async fetchBoard() {
      this.loading = true;
      try {
        const { data } = await api.get("/candidates/board");
        this.board = data.data || {};
      } catch (err) {
        console.error("Board fetch failed:", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * ===============================
     * 🔁 DRAG END (MOVE STAGE)
     * ===============================
     */
    async onDragEnd(event, newStage) {
      const movedItem = event.item.__draggable_context?.element;

      if (!movedItem?.id) return;

      try {
        await api.patch(`/candidates/${movedItem.id}/stage`, {
          stage: newStage,
        });

        // Optimistic UI already moved → just refetch to sync counts
        this.fetchBoard();
      } catch (err) {
        console.error("Stage update failed:", err);
        this.fetchBoard(); // rollback
      }
    },

    /**
     * ===============================
     * 🗑 DELETE
     * ===============================
     */
    async deleteCandidate(id) {
      if (!confirm("Delete this candidate?")) return;

      try {
        await api.delete(`/candidates/${id}`);
        this.fetchBoard();
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * ===============================
     * 🎯 FORMATTERS
     * ===============================
     */
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<template>
  <div class="d-flex align-items-start overflow-auto project-status pb-4">
    <div
      v-for="stage in stages"
      :key="stage"
      class="p-3 rounded bg-transparent-secondary w-100 me-3"
    >
      <!-- HEADER -->
      <div class="bg-white p-2 rounded mb-2">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <span class="p-1 d-flex rounded-circle me-2 bg-light">
              <span
                class="d-block p-1 rounded-circle"
                :class="stageMeta[stage].dot"
              ></span>
            </span>

            <h5 class="me-2">{{ stageMeta[stage].label }}</h5>

            <span class="badge bg-light rounded-pill">
              {{ board[stage]?.count || 0 }}
            </span>
          </div>
        </div>
      </div>

      <!-- CARDS -->
      <div class="kanban-drag-wrap">
        <draggable
          :list="board[stage]?.cards"
          :group="{ name: 'kanban' }"
          item-key="id"
          @end="(e) => onDragEnd(e, stage)"
        >
          <template #item="{ element }">
            <div class="card kanban-card mb-2">
              <div class="card-body">
                <!-- TOP -->
                <div
                  class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3"
                >
                  <span class="badge bg-primary-transparent">
                    {{ element.candidateCode }}
                  </span>

                  <div class="dropdown">
                    <a
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end p-2">
                      <li>
                        <a
                          class="dropdown-item text-danger"
                          @click="deleteCandidate(element.id)"
                        >
                          <i class="ti ti-trash me-2"></i>Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- PROFILE -->
                <div class="d-flex align-items-center mb-3">
                  <div class="avatar avatar-lg rounded-circle me-2 bg-light">
                    <span class="fw-bold text-dark">
                      {{ element.name?.charAt(0) || "C" }}
                    </span>
                  </div>

                  <div>
                    <h6 class="fw-semibold mb-0">
                      {{ element.name }}
                    </h6>

                    <p class="text-muted fs-13 mb-0">
                      {{ element.email || "Hidden" }}
                    </p>
                  </div>
                </div>

                <!-- DETAILS -->
                <div class="d-flex justify-content-between">
                  <div>
                    <small class="text-muted">Role</small>
                    <div class="fw-medium">
                      {{ element.appliedRole || "-" }}
                    </div>
                  </div>

                  <div>
                    <small class="text-muted">Applied</small>
                    <div class="fw-medium">
                      {{ formatDate(element.createdAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="!board[stage]?.cards?.length" class="text-center py-3 text-muted">
        No candidates
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-card {
  cursor: grab;
}
.kanban-card:active {
  cursor: grabbing;
}
</style>
