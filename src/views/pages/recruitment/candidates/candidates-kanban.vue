<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import moment from "moment";
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import DateRangePicker from "daterangepicker";

const title = "Candidates";
const text = "Administration";
const text1 = "Candidates Kanban";

const loading = ref(false);
const board = ref({});
const error = ref(null);
const dateRangeInput = ref(null);

const stages = [
  "NEW",
  "SCHEDULED",
  "INTERVIEWED",
  "OFFERED",
  "HIRED",
  "REJECTED",
];

/**
 * ===============================
 * 📡 FETCH BOARD (API)
 * ===============================
 */
const fetchBoard = async () => {
  loading.value = true;
  try {
    const { data } = await api.get("/candidates/board");
    board.value = data.data || {};
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

/**
 * ===============================
 * 🔁 MOVE STAGE (DRAG DROP)
 * ===============================
 */
const moveCandidate = async (candidateId, stage) => {
  try {
    await api.patch(`/candidates/${candidateId}/stage`, { stage });
    await fetchBoard();
  } catch (err) {
    console.error(err);
  }
};

/**
 * ===============================
 * 🖱 DRAG EVENTS
 * ===============================
 */
const onDragStart = (event, candidate) => {
  event.dataTransfer.setData("candidate", JSON.stringify(candidate));
};

const onDrop = async (event, stage) => {
  const data = JSON.parse(event.dataTransfer.getData("candidate"));
  if (data.stage !== stage) {
    await moveCandidate(data.id, stage);
  }
};

/**
 * ===============================
 * 📅 DATE RANGE
 * ===============================
 */
const initDateRange = () => {
  if (!dateRangeInput.value) return;

  const start = moment().subtract(6, "days");
  const end = moment();

  const cb = (start, end) => {
    dateRangeInput.value.value = `${start.format("YYYY-MM-DD")} - ${end.format("YYYY-MM-DD")}`;
  };

  new DateRangePicker(
    dateRangeInput.value,
    {
      startDate: start,
      endDate: end,
    },
    cb
  );

  cb(start, end);
};

onMounted(() => {
  fetchBoard();
  initDateRange();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center gap-2">
          <input
            type="text"
            class="form-control"
            ref="dateRangeInput"
            placeholder="Select date range"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">Loading candidates...</div>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <!-- Board -->
      <div class="row" v-if="!loading">
        <div
          v-for="stage in stages"
          :key="stage"
          class="col-md-2"
          @dragover.prevent
          @drop="onDrop($event, stage)"
        >
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">
                {{ stage }}
                <span class="badge bg-primary ms-2">
                  {{ board[stage]?.count || 0 }}
                </span>
              </h6>
            </div>

            <div class="card-body" style="min-height: 300px">
              <div
                v-for="c in board[stage]?.cards || []"
                :key="c.id"
                class="card mb-2 p-2 shadow-sm"
                draggable="true"
                @dragstart="onDragStart($event, c)"
              >
                <h6 class="mb-1">{{ c.name }}</h6>
                <small class="text-muted">{{ c.appliedRole }}</small>

                <div class="mt-2 d-flex justify-content-between">
                  <span class="badge bg-light text-dark">
                    {{ c.stage }}
                  </span>
                  <small>
                    {{ new Date(c.createdAt).toLocaleDateString() }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="footer text-center py-3">
      {{ new Date().getFullYear() }} © SmartHR
    </div>
  </div>
</template>
