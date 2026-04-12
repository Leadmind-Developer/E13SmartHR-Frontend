<script>
import api from "@/services/api";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import "daterangepicker/daterangepicker.css";

export default {
  name: "PromotionList",

  data() {
    return {
      title: "Promotion",
      text: "HRM",
      text1: "Promotion",

      loading: false,

      promotions: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 1,
      },

      filters: {
        search: "",
        startDate: "",
        endDate: "",
        status: "",
      },

      dateRangeInstance: null,
    };
  },

  mounted() {
    this.initDateRangePicker();
    this.fetchPromotions();
  },

  methods: {
    // =========================
    // UI HELPERS
    // =========================
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    formatDate(date) {
      return date ? moment(date).format("DD MMM YYYY") : "-";
    },

    // =========================
    // DATE RANGE PICKER
    // =========================
    initDateRangePicker() {
      const input = this.$refs.dateRangeInput;

      if (!input) return;

      const start = moment().subtract(6, "days");
      const end = moment();

      const cb = (start, end) => {
        this.filters.startDate = start.format("YYYY-MM-DD");
        this.filters.endDate = end.format("YYYY-MM-DD");
        this.fetchPromotions();
      };

      this.dateRangeInstance = new DateRangePicker(
        input,
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
        cb
      );

      cb(start, end);
    },

    // =========================
    // API CALL - LIST PROMOTIONS
    // =========================
    async fetchPromotions(page = 1) {
      this.loading = true;

      try {
        const res = await api.get("/promotions", {
          params: {
            page,
            limit: this.pagination.limit,
            search: this.filters.search || undefined,
            startDate: this.filters.startDate || undefined,
            endDate: this.filters.endDate || undefined,
            status: this.filters.status || undefined,
          },
        });

        this.promotions = res.data.data || [];
        this.pagination.total = res.data.total;
        this.pagination.page = res.data.page;
        this.pagination.pages = res.data.pages;
      } catch (error) {
        console.error("Failed to fetch promotions:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // =========================
    // PAGINATION
    // =========================
    changePage(page) {
      if (page < 1 || page > this.pagination.pages) return;
      this.fetchPromotions(page);
    },

    // =========================
    // SEARCH
    // =========================
    onSearch() {
      this.fetchPromotions(1);
    },

    // =========================
    // WORKFLOW ACTIONS (READY FOR ADMIN UI)
    // =========================
    async approvePromotion(id) {
      try {
        await api.post(`/promotions/${id}/approve`);
        this.fetchPromotions(this.pagination.page);
      } catch (err) {
        console.error("Approval failed", err.message);
      }
    },

    async rejectPromotion(id, reason = "No reason provided") {
      try {
        await api.post(`/promotions/${id}/reject`, { reason });
        this.fetchPromotions(this.pagination.page);
      } catch (err) {
        console.error("Rejection failed", err.message);
      }
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

        <div class="d-flex align-items-center flex-wrap">

          <div class="mb-2 me-2">
            <a class="btn btn-primary d-flex align-items-center"
               data-bs-toggle="modal"
               data-bs-target="#new_promotion">
              <i class="ti ti-circle-plus me-2"></i>
              Add Promotion
            </a>
          </div>

          <div class="head-icons ms-2">
            <a href="javascript:void(0);"
               id="collapse-header"
               @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Card -->
      <div class="card">

        <!-- Header -->
        <div class="card-header d-flex justify-content-between flex-wrap">

          <h5>Promotion List</h5>

          <div class="d-flex align-items-center flex-wrap gap-2">

            <!-- Date Range -->
            <div class="input-icon position-relative">
              <span class="input-icon-addon">
                <i class="ti ti-calendar"></i>
              </span>

              <input
                ref="dateRangeInput"
                type="text"
                class="form-control"
                placeholder="Filter by date"
              />
            </div>

            <!-- Search -->
            <input
              v-model="filters.search"
              @input="onSearch"
              type="text"
              class="form-control"
              placeholder="Search employee..."
            />

            <!-- Status -->
            <select v-model="filters.status" @change="fetchPromotions(1)" class="form-select">
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

          </div>
        </div>

        <!-- Table -->
        <div class="card-body p-0">

          <div v-if="loading" class="p-4 text-center">
            Loading promotions...
          </div>

          <div v-else class="table-responsive">

            <table class="table">

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in promotions" :key="item.id">

                  <td>
                    <div class="fw-semibold">
                      {{ item.employee?.firstName }} {{ item.employee?.lastName }}
                    </div>
                  </td>

                  <td>
                    {{ item.department?.name || "-" }}
                  </td>

                  <td>{{ item.designationFrom }}</td>

                  <td>{{ item.designationTo }}</td>

                  <td>{{ formatDate(item.promotionDate) }}</td>

                  <td>
                    <span class="badge"
                          :class="{
                            'bg-warning': item.status === 'PENDING',
                            'bg-success': item.status === 'APPROVED',
                            'bg-danger': item.status === 'REJECTED'
                          }">
                      {{ item.status }}
                    </span>
                  </td>

                  <td>

                    <button
                      class="btn btn-sm btn-success me-1"
                      @click="approvePromotion(item.id)"
                      v-if="item.status === 'PENDING'">
                      Approve
                    </button>

                    <button
                      class="btn btn-sm btn-danger"
                      @click="rejectPromotion(item.id)"
                      v-if="item.status === 'PENDING'">
                      Reject
                    </button>

                  </td>

                </tr>
              </tbody>

            </table>

          </div>

        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-between">

          <div>
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }}
            -
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }}
            of {{ pagination.total }}
          </div>

          <div class="btn-group">

            <button class="btn btn-light"
                    @click="changePage(pagination.page - 1)"
                    :disabled="pagination.page === 1">
              Prev
            </button>

            <button class="btn btn-light"
                    v-for="p in pagination.pages"
                    :key="p"
                    @click="changePage(p)"
                    :class="{ active: p === pagination.page }">
              {{ p }}
            </button>

            <button class="btn btn-light"
                    @click="changePage(pagination.page + 1)"
                    :disabled="pagination.page === pagination.pages">
              Next
            </button>

          </div>

        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between bg-white border-top p-3">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} © SmartHR
      </p>
    </div>

  </div>

  <promotion-modal />
</template>
