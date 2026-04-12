<script setup>
import { ref, onMounted, watch } from "vue";
import api from "@/services/api";
import moment from "moment";
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import DateRangePicker from "daterangepicker";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const title = "Training";
const text = "Training";
const text1 = "Training List";

const trainings = ref([]);
const loading = ref(false);
const error = ref(null);

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});

const search = ref("");
const dateRangeInput = ref(null);

/*
|--------------------------------------------------------------------------
| FETCH TRAININGS
|--------------------------------------------------------------------------
*/

const fetchTrainings = async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data } = await api.get("/trainings", {
      params: {
        page: pagination.value.page,
        limit: pagination.value.limit,
        search: search.value,
      },
    });

    trainings.value = data?.data?.rows || [];
    pagination.value.total = data?.data?.count || 0;
  } catch (err) {
    error.value = err?.response?.data?.message || "Failed to fetch trainings";
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH (DEBOUNCED)
|--------------------------------------------------------------------------
*/

let debounceTimer;
watch(search, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    pagination.value.page = 1;
    fetchTrainings();
  }, 400);
});

/*
|--------------------------------------------------------------------------
| PAGINATION
|--------------------------------------------------------------------------
*/

const nextPage = () => {
  if (pagination.value.page * pagination.value.limit < pagination.value.total) {
    pagination.value.page++;
    fetchTrainings();
  }
};

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--;
    fetchTrainings();
  }
};

/*
|--------------------------------------------------------------------------
| DATE RANGE PICKER
|--------------------------------------------------------------------------
*/

onMounted(() => {
  fetchTrainings();

  if (dateRangeInput.value) {
    const start = moment().subtract(6, "days");
    const end = moment();

    new DateRangePicker(
      dateRangeInput.value,
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
        },
      },
      (start, end) => {
        dateRangeInput.value.value =
          start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");

        // 👉 hook for backend later if needed
        fetchTrainings();
      }
    );
  }
});

/*
|--------------------------------------------------------------------------
| UI ACTIONS
|--------------------------------------------------------------------------
*/

const toggleHeader = () => {
  document.getElementById("collapse-header")?.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};
</script>

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
            class="btn btn-primary d-flex align-items-center me-2"
            data-bs-toggle="modal"
            data-bs-target="#add_training"
          >
            <i class="ti ti-circle-plus me-2"></i>
            Add Training
          </button>

          <a
            href="javascript:void(0);"
            id="collapse-header"
            @click="toggleHeader"
          >
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <!-- Card -->
      <div class="card">

        <!-- Header -->
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5>Training List</h5>

          <div class="d-flex gap-2 flex-wrap">

            <!-- Search -->
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search training..."
              style="width: 220px"
            />

            <!-- Date -->
            <input
              ref="dateRangeInput"
              type="text"
              class="form-control"
              placeholder="Select date range"
              style="width: 220px"
            />

          </div>
        </div>

        <!-- Body -->
        <div class="card-body">

          <!-- Loading -->
          <div v-if="loading" class="text-center py-4">
            <span class="spinner-border"></span>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Empty -->
          <div v-else-if="trainings.length === 0" class="text-center py-4">
            No trainings found
          </div>

          <!-- Table -->
          <div v-else class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Trainer</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in trainings" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.Trainer?.name || "-" }}</td>
                  <td>{{ item.TrainingType?.name || "-" }}</td>
                  <td>{{ item.createdAt?.slice(0, 10) }}</td>
                  <td>
                    <button class="btn btn-sm btn-light">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <!-- Footer / Pagination -->
        <div class="card-footer d-flex justify-content-between align-items-center">

          <div>
            Page {{ pagination.page }} of
            {{ Math.ceil(pagination.total / pagination.limit) || 1 }}
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-light" @click="prevPage">Prev</button>
            <button class="btn btn-light" @click="nextPage">Next</button>
          </div>

        </div>

      </div>

    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
    </div>
  </div>

  <training-modal />
</template>
