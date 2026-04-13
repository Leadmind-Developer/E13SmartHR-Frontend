<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import api from "@/services/api";
import moment from "moment";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const jobs = ref([]);
const total = ref(0);
const loading = ref(false);
const error = ref(null);

const filters = reactive({
  page: 1,
  limit: 12,
  search: "",
  status: "",
  startDate: "",
  endDate: "",
  sortBy: "createdAt",
  order: "DESC",
});

/*
|--------------------------------------------------------------------------
| FETCH JOBS
|--------------------------------------------------------------------------
*/

const fetchJobs = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await api.get("/jobs", {
      params: filters,
    });

    jobs.value = data.data;
    total.value = data.total;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load jobs";
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {
  return date ? moment(date).format("DD MMM YYYY") : "-";
};

const applyDateRange = (range) => {
  if (!range) return;

  const [start, end] = range;
  filters.startDate = moment(start).format("YYYY-MM-DD");
  filters.endDate = moment(end).format("YYYY-MM-DD");
};

/*
|--------------------------------------------------------------------------
| WATCHERS
|--------------------------------------------------------------------------
*/

watch(
  () => ({ ...filters }),
  () => {
    fetchJobs();
  },
  { deep: true }
);

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold">Job Grid</h4>

        <div class="d-flex gap-2">

          <!-- SEARCH -->
          <input
            v-model="filters.search"
            type="text"
            class="form-control"
            placeholder="Search jobs..."
            style="width: 220px"
          />

          <!-- STATUS -->
          <select v-model="filters.status" class="form-select">
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="DRAFT">Draft</option>
          </select>

          <!-- SORT -->
          <select v-model="filters.order" class="form-select">
            <option value="DESC">Newest</option>
            <option value="ASC">Oldest</option>
          </select>

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

      <!-- EMPTY -->
      <div v-else-if="!jobs.length" class="text-center py-5">
        <p class="text-muted">No jobs found</p>
      </div>

      <!-- GRID -->
      <div v-else class="row">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="col-xl-3 col-lg-4 col-md-6"
        >
          <div class="card">
            <div class="card-body">

              <!-- TITLE -->
              <div class="mb-2">
                <h6 class="fw-semibold text-truncate">
                  {{ job.title }}
                </h6>
                <small class="text-muted">
                  {{ job.jobCode }}
                </small>
              </div>

              <!-- DETAILS -->
              <div class="mb-3">

                <p class="mb-1">
                  <i class="ti ti-map-pin me-1"></i>
                  {{ job.location || "N/A" }}
                </p>

                <p class="mb-1">
                  <i class="ti ti-briefcase me-1"></i>
                  {{ job.employmentType || "N/A" }}
                </p>

                <p class="mb-1">
                  <i class="ti ti-calendar me-1"></i>
                  {{ formatDate(job.createdAt) }}
                </p>

              </div>

              <!-- STATUS -->
              <div class="mb-2">
                <span
                  class="badge"
                  :class="{
                    'bg-success': job.status === 'OPEN',
                    'bg-secondary': job.status === 'CLOSED',
                    'bg-warning': job.status === 'DRAFT',
                  }"
                >
                  {{ job.status }}
                </span>
              </div>

              <!-- ACTIONS -->
              <div class="d-flex justify-content-between mt-3">
                <router-link
                  :to="`/recruitment/jobs/${job.id}`"
                  class="btn btn-sm btn-light"
                >
                  View
                </router-link>

                <button
                  class="btn btn-sm btn-danger"
                  @click="$emit('delete', job.id)"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- PAGINATION -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="mb-0">
          Showing {{ jobs.length }} of {{ total }} jobs
        </p>

        <div class="d-flex gap-2">
          <button
            class="btn btn-sm btn-light"
            :disabled="filters.page === 1"
            @click="filters.page--"
          >
            Prev
          </button>

          <button
            class="btn btn-sm btn-light"
            :disabled="jobs.length < filters.limit"
            @click="filters.page++"
          >
            Next
          </button>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer text-center py-3">
      <small>{{ new Date().getFullYear() }} © SmartHR</small>
    </div>
  </div>
</template>
