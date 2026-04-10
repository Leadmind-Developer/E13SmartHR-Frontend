<script>
import { ref, reactive, onMounted, watch } from "vue";
import moment from "moment";
import api from "@/services/api";

export default {
  name: "LeavesAdmin",

  setup() {
    /**
     * =========================
     * STATE
     * =========================
     */
    const loading = ref(false);
    const leaves = ref([]);
    const pagination = reactive({
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    });

    const filters = reactive({
      search: "",
      type: "",
      status: "",
      from: "",
      to: "",
    });

    const stats = reactive({
      totalPresent: 0,
      planned: 0,
      unplanned: 0,
      pending: 0,
    });

    /**
     * =========================
     * FETCH LEAVES
     * =========================
     */
    const fetchLeaves = async () => {
      loading.value = true;

      try {
        const { data } = await api.get("/leaves", {
          params: {
            page: pagination.page,
            limit: pagination.limit,
            search: filters.search || undefined,
            type: filters.type || undefined,
            status: filters.status || undefined,
            from: filters.from || undefined,
            to: filters.to || undefined,
          },
        });

        leaves.value = data.data;
        pagination.total = data.meta.total;
        pagination.pages = data.meta.pages;

        computeStats(data.data);
      } catch (err) {
        console.error("Failed to fetch leaves:", err.message);
      } finally {
        loading.value = false;
      }
    };

    /**
     * =========================
     * STATS CALCULATION
     * =========================
     */
    const computeStats = (list) => {
      stats.pending = list.filter((l) => l.status === "PENDING").length;

      stats.planned = list.filter((l) =>
        ["APPROVED"].includes(l.status)
      ).length;

      stats.unplanned = list.filter((l) => l.isAnomaly === true).length;

      stats.totalPresent = Math.max(0, 200 - list.length);
    };

    /**
     * =========================
     * FILTER HELPERS
     * =========================
     */
    const applyFilter = () => {
      pagination.page = 1;
      fetchLeaves();
    };

    const resetFilters = () => {
      filters.search = "";
      filters.type = "";
      filters.status = "";
      filters.from = "";
      filters.to = "";
      fetchLeaves();
    };

    /**
     * =========================
     * PAGINATION
     * =========================
     */
    const changePage = (page) => {
      pagination.page = page;
      fetchLeaves();
    };

    /**
     * =========================
     * CALENDAR RANGE (OPTIONAL UI HOOK)
     * =========================
     */
    const setDateRange = (range) => {
      if (!range) return;

      const [start, end] = range.split(" - ");
      filters.from = moment(start, "DD/MM/YYYY").format("YYYY-MM-DD");
      filters.to = moment(end, "DD/MM/YYYY").format("YYYY-MM-DD");

      applyFilter();
    };

    /**
     * =========================
     * INIT
     * =========================
     */
    onMounted(() => {
      fetchLeaves();
    });

    /**
     * =========================
     * WATCHERS
     * =========================
     */
    watch(
      () => filters.search,
      () => {
        if (filters.search.length === 0) fetchLeaves();
      }
    );

    return {
      leaves,
      loading,
      filters,
      stats,
      pagination,

      fetchLeaves,
      applyFilter,
      resetFilters,
      changePage,
      setDateRange,
    };
  },

  data() {
    return {
      title: "Leaves",
      text: "Attendance",
      text1: "Leaves",
    };
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- =========================
           BREADCRUMB
      ========================== -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
      </div>

      <!-- =========================
           STATS
      ========================== -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card bg-green-img">
            <div class="card-body">
              <p>Total Present</p>
              <h4>{{ stats.totalPresent }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card bg-pink-img">
            <div class="card-body">
              <p>Planned Leaves</p>
              <h4>{{ stats.planned }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card bg-yellow-img">
            <div class="card-body">
              <p>Unplanned Leaves</p>
              <h4>{{ stats.unplanned }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card bg-blue-img">
            <div class="card-body">
              <p>Pending Requests</p>
              <h4>{{ stats.pending }}</h4>
            </div>
          </div>
        </div>
      </div>

      <!-- =========================
           FILTERS
      ========================== -->
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center flex-wrap">

          <h5>Leave List</h5>

          <div class="d-flex gap-2">

            <input
              v-model="filters.search"
              class="form-control"
              placeholder="Search leave type..."
            />

            <select v-model="filters.status" class="form-select">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button class="btn btn-primary" @click="applyFilter">
              Filter
            </button>

            <button class="btn btn-light" @click="resetFilters">
              Reset
            </button>
          </div>
        </div>

        <!-- =========================
             TABLE SLOT
        ========================== -->
        <div class="card-body">

          <div v-if="loading" class="text-center py-5">
            Loading leaves...
          </div>

          <table v-else class="table table-hover">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Date Range</th>
                <th>Status</th>
                <th>Anomaly</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="leave in leaves" :key="leave.id">
                <td>{{ leave.employee?.email || "N/A" }}</td>
                <td>{{ leave.type }}</td>
                <td>
                  {{ leave.startDate }} → {{ leave.endDate }}
                </td>
                <td>
                  <span :class="'badge bg-' + leave.status.toLowerCase()">
                    {{ leave.status }}
                  </span>
                </td>
                <td>
                  <span v-if="leave.isAnomaly" class="text-danger">
                    ⚠ Yes
                  </span>
                  <span v-else>No</span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <button
              class="btn btn-light"
              :disabled="pagination.page <= 1"
              @click="changePage(pagination.page - 1)"
            >
              Prev
            </button>

            <span>
              Page {{ pagination.page }} / {{ pagination.pages }}
            </span>

            <button
              class="btn btn-light"
              :disabled="pagination.page >= pagination.pages"
              @click="changePage(pagination.page + 1)"
            >
              Next
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
