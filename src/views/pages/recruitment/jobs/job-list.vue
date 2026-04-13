<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";

import api from "@/services/api";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import { ref } from "vue";

export default {
  name: "JobList",

  data() {
    return {
      title: "Jobs",
      text: "Recruitment",
      text1: "Jobs",

      jobs: [],
      loading: false,

      search: "",
      status: "",
      role: "",

      page: 1,
      limit: 10,
      total: 0,

      sortBy: "createdAt",
      order: "DESC",
    };
  },

  setup() {
    const dateRangeInput = ref(null);
    const dateRange = ref({
      startDate: null,
      endDate: null,
    });

    return {
      dateRangeInput,
      dateRange,
    };
  },

  mounted() {
    this.initDatePicker();
    this.fetchJobs();
  },

  watch: {
    search() {
      this.page = 1;
      this.fetchJobs();
    },

    status() {
      this.page = 1;
      this.fetchJobs();
    },
  },

  methods: {
    /**
     * Toggle UI header
     */
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    /**
     * INIT DATE RANGE PICKER
     */
    initDatePicker() {
      if (!this.dateRangeInput) return;

      const start = moment().subtract(6, "days");
      const end = moment();

      const self = this;

      new DateRangePicker(
        this.dateRangeInput,
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days"),
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [
              moment().startOf("month"),
              moment().endOf("month"),
            ],
            "Last Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
          },
        },
        (start, end) => {
          self.dateRange.startDate = start;
          self.dateRange.endDate = end;
          self.page = 1;
          self.fetchJobs();
        }
      );

      this.dateRange.startDate = start;
      this.dateRange.endDate = end;
    },

    /**
     * FETCH JOBS (BACKEND INTEGRATION)
     */
    async fetchJobs() {
      this.loading = true;

      try {
        const { data } = await api.get("/jobs", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.search || undefined,
            status: this.status || undefined,
            startDate: this.dateRange.startDate
              ? this.dateRange.startDate.toISOString()
              : undefined,
            endDate: this.dateRange.endDate
              ? this.dateRange.endDate.toISOString()
              : undefined,
            sortBy: this.sortBy,
            order: this.order,
          },
        });

        const jobs = data?.data || [];

        this.jobs = jobs.map((job) => this.mapJob(job));
        this.total = data?.total || 0;
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        this.jobs = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * MAP BACKEND → UI FORMAT
     */
    mapJob(job) {
      return {
        id: job.id,
        jobCode: job.jobCode,
        title: job.title,
        category: job.category,
        location: job.location,
        salary: `${job.salaryMin || 0} - ${job.salaryMax || 0}`,
        postedDate: moment(job.createdAt).format("DD MMM YYYY"),
        status: job.status,
        applicants: job.filledPositions || 0,
        vacancies: job.vacancies || 0,
        experience: job.experienceLevel,
      };
    },

    /**
     * PAGINATION
     */
    changePage(page) {
      this.page = page;
      this.fetchJobs();
    },

    /**
     * STATUS FILTER
     */
    setStatus(status) {
      this.status = status;
      this.page = 1;
      this.fetchJobs();
    },

    /**
     * SEARCH
     */
    setSearch(e) {
      this.search = e.target.value;
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
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">

          <div class="me-2 mb-2">
            <div class="d-flex align-items-center border bg-white rounded p-1 me-2">
              <router-link to="/recuritment/job-list" class="btn btn-icon btn-sm active bg-primary text-white me-1">
                <i class="ti ti-list-tree"></i>
              </router-link>
              <router-link to="/recuritment/job-grid" class="btn btn-icon btn-sm">
                <i class="ti ti-layout-grid"></i>
              </router-link>
            </div>
          </div>

          <!-- EXPORT -->
          <div class="me-2 mb-2 dropdown">
            <a class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Export
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-2">
              <li><a class="dropdown-item">Export PDF</a></li>
              <li><a class="dropdown-item">Export Excel</a></li>
            </ul>
          </div>

          <!-- POST JOB -->
          <div class="mb-2">
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_post">
              <i class="ti ti-circle-plus me-2"></i>Post Job
            </a>
          </div>

        </div>
      </div>

      <!-- FILTER CARD -->
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between flex-wrap gap-2">

          <input
            type="text"
            class="form-control w-auto"
            placeholder="Search jobs..."
            @input="setSearch"
          />

          <input
            type="text"
            class="form-control date-range w-auto"
            ref="dateRangeInput"
            placeholder="Select date range"
          />

          <select class="form-select w-auto" @change="setStatus($event.target.value)">
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="CLOSED">Closed</option>
          </select>

        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-header">
          <h5>Job List</h5>
        </div>

        <div class="card-body p-0">

          <div v-if="loading" class="p-4 text-center">
            Loading jobs...
          </div>

          <table v-else class="table">
            <thead>
              <tr>
                <th>Job Code</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Posted</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="job in jobs" :key="job.id">
                <td>{{ job.jobCode }}</td>
                <td>{{ job.title }}</td>
                <td>{{ job.category }}</td>
                <td>{{ job.location }}</td>
                <td>{{ job.salary }}</td>
                <td>
                  <span class="badge" :class="{
                    'bg-success': job.status === 'ACTIVE',
                    'bg-warning': job.status === 'INACTIVE',
                    'bg-danger': job.status === 'CLOSED'
                  }">
                    {{ job.status }}
                  </span>
                </td>
                <td>{{ job.postedDate }}</td>
              </tr>
            </tbody>
          </table>

        </div>

        <!-- PAGINATION -->
        <div class="card-footer d-flex justify-content-between">
          <div>
            Showing {{ (page - 1) * limit + 1 }} -
            {{ Math.min(page * limit, total) }} of {{ total }}
          </div>

          <div class="btn-group">
            <button class="btn btn-light" @click="changePage(page - 1)" :disabled="page === 1">
              Prev
            </button>

            <button class="btn btn-light">
              {{ page }}
            </button>

            <button class="btn btn-light" @click="changePage(page + 1)" :disabled="page * limit >= total">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">© {{ new Date().getFullYear() }} SmartHR</p>
    </div>
  </div>

  <job-list-modal />
</template>
