<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Employee Attendance",
      text: "Attendance",
      text1: "Employee Attendance",

      loading: false,
      records: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },

      todayRecord: null,
      now: new Date(),
      interval: null,
    };
  },

  computed: {
    isPunchedIn() {
      return this.todayRecord && !this.todayRecord.checkOut;
    },

    workingMinutes() {
      if (!this.todayRecord || !this.todayRecord.checkIn) return 0;

      const start = new Date(this.todayRecord.checkIn);
      const end = this.todayRecord.checkOut
        ? new Date(this.todayRecord.checkOut)
        : this.now;

      return Math.floor((end - start) / 60000);
    },

    workingHoursFormatted() {
      const hrs = Math.floor(this.workingMinutes / 60);
      const mins = this.workingMinutes % 60;
      return `${hrs}h ${mins}m`;
    },
  },

  mounted() {
    this.fetchAttendance();
    this.startClock();
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    startClock() {
      this.interval = setInterval(() => {
        this.now = new Date();
      }, 1000);
    },

    async fetchAttendance() {
      this.loading = true;
      try {
        const { data } = await api.get("/attendance/me", {
          params: {
            page: this.pagination.page,
            limit: this.pagination.limit,
          },
        });

        this.records = data.data;
        this.pagination = data.pagination;

        // find today's record
        const today = new Date().toISOString().split("T")[0];
        this.todayRecord = this.records.find(r => r.date === today) || null;

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async punchIn() {
      try {
        await api.post("/attendance/punch-in");
        await this.fetchAttendance();
      } catch (err) {
        alert(err.response?.data?.message || "Punch in failed");
      }
    },

    async punchOut() {
      try {
        await api.post("/attendance/punch-out");
        await this.fetchAttendance();
      } catch (err) {
        alert(err.response?.data?.message || "Punch out failed");
      }
    },

    formatTime(date) {
      if (!date) return "-";
      return new Date(date).toLocaleTimeString();
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex justify-content-between mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="ms-2 head-icons">
          <a href="javascript:void(0);" id="collapse-header" @click="toggleHeader">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>

      <!-- TOP CARD -->
      <div class="row">
        <div class="col-xl-4 d-flex">
          <div class="card flex-fill text-center">
            <div class="card-body">

              <h5 class="mb-2">
                {{ now.toLocaleTimeString() }}
              </h5>
              <p class="text-muted">
                {{ now.toDateString() }}
              </p>

              <div class="my-3">
                <h6>Status:</h6>
                <span
                  class="badge"
                  :class="isPunchedIn ? 'bg-success' : 'bg-secondary'"
                >
                  {{ isPunchedIn ? "Active Session" : "Not Punched In" }}
                </span>
              </div>

              <div class="mb-3">
                <strong>Working Time:</strong>
                <div>{{ workingHoursFormatted }}</div>
              </div>

              <div v-if="todayRecord">
                <p>Check In: {{ formatTime(todayRecord.checkIn) }}</p>
                <p>Check Out: {{ formatTime(todayRecord.checkOut) }}</p>
              </div>

              <button
                v-if="!isPunchedIn"
                @click="punchIn"
                class="btn btn-primary w-100"
              >
                Punch In
              </button>

              <button
                v-else
                @click="punchOut"
                class="btn btn-danger w-100"
              >
                Punch Out
              </button>

            </div>
          </div>
        </div>

        <!-- SUMMARY -->
        <div class="col-xl-8">
          <div class="row">

            <div class="col-md-4">
              <div class="card p-3">
                <h6>Total Records</h6>
                <h3>{{ pagination.total }}</h3>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card p-3">
                <h6>Present Days</h6>
                <h3>
                  {{ records.filter(r => r.status === 'present').length }}
                </h3>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card p-3">
                <h6>Total Hours (Approx)</h6>
                <h3>
                  {{
                    Math.floor(
                      records.reduce((sum, r) => {
                        if (!r.checkIn || !r.checkOut) return sum;
                        return sum + ((new Date(r.checkOut) - new Date(r.checkIn)) / 3600000);
                      }, 0)
                    )
                  }} hrs
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
          <h5>My Attendance</h5>
        </div>

        <div class="card-body table-responsive">

          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Production</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in records" :key="row.id">
                <td>{{ formatDate(row.date) }}</td>
                <td>
                  <span class="badge bg-success">
                    {{ row.status }}
                  </span>
                </td>
                <td>{{ formatTime(row.checkIn) }}</td>
                <td>{{ formatTime(row.checkOut) }}</td>
                <td>{{ row.productionMinutes || 0 }} mins</td>
              </tr>

              <tr v-if="!records.length">
                <td colspan="5" class="text-center">No data</td>
              </tr>
            </tbody>

          </table>

        </div>

        <!-- PAGINATION -->
        <div class="card-footer d-flex justify-content-between">
          <button
            class="btn btn-sm btn-light"
            :disabled="pagination.page === 1"
            @click="pagination.page--; fetchAttendance();"
          >
            Prev
          </button>

          <span>Page {{ pagination.page }}</span>

          <button
            class="btn btn-sm btn-light"
            :disabled="records.length < pagination.limit"
            @click="pagination.page++; fetchAttendance();"
          >
            Next
          </button>
        </div>

      </div>

    </div>
  </div>
</template>
