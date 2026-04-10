<script>
import { ref, reactive, onMounted, computed } from "vue";
import api from "@/services/api";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

export default {
  data() {
    return {
      title: "Leaves",
      text: "Attendance",
      text1: "Leaves Employee",
    };
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },
  },

  setup() {
    const dateRangeInput = ref(null);

    const loading = ref(false);
    const leaves = ref([]);

    const meta = reactive({
      page: 1,
      pages: 1,
      total: 0,
    });

    const filters = reactive({
      type: "",
      status: "",
      from: "",
      to: "",
    });

    const stats = reactive({
      total: 0,
      remaining: 0,
      annual: 0,
      medical: 0,
      casual: 0,
      other: 0,
    });

    /**
     * LOAD LEAVES
     */
    const fetchLeaves = async () => {
      loading.value = true;

      try {
        const res = await api.get("/leaves", {
          params: {
            page: meta.page,
            limit: 10,
            ...filters,
          },
        });

        const payload = res.data;

        leaves.value = payload.data;
        meta.total = payload.meta?.total || 0;
        meta.pages = payload.meta?.pages || 1;
      } catch (err) {
        console.error("Failed to load leaves:", err.message);
      } finally {
        loading.value = false;
      }
    };

    /**
     * LOAD STATS (derived from backend list)
     */
    const computeStats = computed(() => {
      const result = {
        total: leaves.value.length,
        annual: 0,
        medical: 0,
        casual: 0,
        other: 0,
        remaining: 0,
      };

      leaves.value.forEach((l) => {
        const type = (l.type || "").toLowerCase();

        if (type.includes("annual")) result.annual++;
        else if (type.includes("medical")) result.medical++;
        else if (type.includes("casual")) result.casual++;
        else result.other++;
      });

      result.remaining = Math.max(0, 30 - result.total);

      return result;
    });

    /**
     * DATE RANGE PICKER
     */
    function onRangeChange(start, end) {
      filters.from = start.format("YYYY-MM-DD");
      filters.to = end.format("YYYY-MM-DD");
      fetchLeaves();
    }

    onMounted(() => {
      fetchLeaves();

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
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
            },
          },
          onRangeChange
        );
      }
    });

    return {
      dateRangeInput,
      leaves,
      loading,
      meta,
      filters,
      stats: computeStats,
      fetchLeaves,
    };
  },
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

        <div class="d-flex right-content align-items-center flex-wrap">

          <div class="me-2 mb-2">
            <div class="dropdown">
              <a class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
                Export
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-2">
                <li><a class="dropdown-item">Export PDF</a></li>
                <li><a class="dropdown-item">Export Excel</a></li>
              </ul>
            </div>
          </div>

          <div class="mb-2">
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_leaves">
              Add Leave
            </a>
          </div>

        </div>
      </div>

      <!-- STATS -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Total Leaves</p>
              <h4>{{ stats.total }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Annual</p>
              <h4>{{ stats.annual }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Medical</p>
              <h4>{{ stats.medical }}</h4>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <p>Remaining</p>
              <h4>{{ stats.remaining }}</h4>
            </div>
          </div>
        </div>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex gap-2 flex-wrap">

          <select v-model="filters.type" @change="fetchLeaves" class="form-control w-auto">
            <option value="">All Types</option>
            <option>ANNUAL</option>
            <option>MEDICAL</option>
            <option>CASUAL</option>
          </select>

          <select v-model="filters.status" @change="fetchLeaves" class="form-control w-auto">
            <option value="">All Status</option>
            <option>PENDING</option>
            <option>APPROVED</option>
            <option>REJECTED</option>
          </select>

          <input
            ref="dateRangeInput"
            class="form-control w-auto"
            placeholder="Select Date Range"
          />

        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-header">
          <h5>Leave List</h5>
        </div>

        <div class="card-body">
          <div v-if="loading">Loading...</div>

          <table v-else class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Anomaly</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="l in leaves" :key="l.id">
                <td>{{ l.type }}</td>
                <td>{{ l.status }}</td>
                <td>{{ moment(l.startDate).format("YYYY-MM-DD") }}</td>
                <td>{{ moment(l.endDate).format("YYYY-MM-DD") }}</td>
                <td>
                  <span v-if="l.isAnomaly" class="text-danger">⚠️ Yes</span>
                  <span v-else>No</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>

  <leaves-employee-modal />
</template>
