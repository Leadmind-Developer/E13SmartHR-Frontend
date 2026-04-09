<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

/**
 * =========================
 * STATE
 * =========================
 */
const schedules = ref([]);
const loading = ref(false);

const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

const startDate = ref("");
const endDate = ref("");

/**
 * =========================
 * FETCH DATA
 * =========================
 */
const fetchSchedules = async () => {
  loading.value = true;

  try {
    const { data } = await axios.get("/api/schedules", {
      params: {
        page: currentPage.value,
        limit: pageSize.value,
        userId: null,
        startDate: startDate.value,
        endDate: endDate.value,
      },
    });

    if (data.success) {
      schedules.value = data.data;
      totalItems.value = data.pagination.total;
    }
  } catch (error) {
    console.error("Fetch schedules error:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * =========================
 * COMPUTED
 * =========================
 */
const filteredSchedules = computed(() => {
  if (!searchQuery.value) return schedules.value;

  const q = searchQuery.value.toLowerCase();

  return schedules.value.filter((item) => {
    return (
      item.user?.email?.toLowerCase().includes(q) ||
      item.user?.id?.toString().includes(q)
    );
  });
});

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value) || 1;
});

/**
 * =========================
 * PAGINATION HANDLERS
 * =========================
 */
const changePage = (page) => {
  currentPage.value = page;
  fetchSchedules();
};

watch([pageSize], () => {
  currentPage.value = 1;
  fetchSchedules();
});

/**
 * =========================
 * HELPERS
 * =========================
 */
const formatTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
};

const getUserImage = (user) => {
  // fallback avatar
  return new URL(`/src/assets/img/users/user-01.jpg`, import.meta.url).href;
};

/**
 * =========================
 * LIFECYCLE
 * =========================
 */
onMounted(() => {
  fetchSchedules();
});
</script>

<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-2">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search by user email..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>User</th>
            <th>Schedule Timings</th>
            <th>Created</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center">Loading...</td>
          </tr>

          <tr v-if="!loading && filteredSchedules.length === 0">
            <td colspan="4" class="text-center">No records found</td>
          </tr>

          <tr v-for="item in filteredSchedules" :key="item.id">
            <!-- USER -->
            <td>
              <div class="d-flex align-items-center">
                <img
                  :src="getUserImage(item.user)"
                  class="avatar avatar-md rounded me-2"
                  alt="user"
                />
                <div>
                  <div class="fw-semibold">
                    {{ item.user?.email || "N/A" }}
                  </div>
                  <small>ID: {{ item.user?.id }}</small>
                </div>
              </div>
            </td>

            <!-- TIMINGS -->
            <td>
              <div>
                <div><strong>Start:</strong> {{ formatTime(item.startTime) }}</div>
                <div><strong>End:</strong> {{ formatTime(item.endTime) }}</div>
              </div>
            </td>

            <!-- CREATED -->
            <td>
              {{ formatTime(item.createdAt) }}
            </td>

            <!-- ACTION -->
            <td class="text-end">
              <button
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#schedule_timing"
                @click="$emit('openSchedule', item)"
              >
                Schedule Timing
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="row mt-3">
      <div class="col-md-6">
        Showing
        {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, totalItems) }}
        of {{ totalItems }}
      </div>

      <div class="col-md-6 text-end">
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
              Prev
            </a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
