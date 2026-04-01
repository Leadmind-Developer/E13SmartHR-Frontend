<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
          <h2 class="mb-1">Dashboard</h2>
        </div>

        <div class="d-flex align-items-center flex-wrap">
          <div class="input-icon mb-2 position-relative">
            <span class="input-icon-addon">
              <i class="ti ti-calendar text-gray-9"></i>
            </span>
            <input
              type="text"
              class="form-control date-range"
              ref="dateRangeInput"
              placeholder="dd/mm/yyyy - dd/mm/yyyy"
            />
          </div>

          <div class="ms-2">
            <a href="javascript:void(0);" id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Welcome -->
      <div class="welcome-wrap mb-4">
        <div class="d-flex justify-content-between flex-wrap">
          <div>
            <h2 class="text-white">Welcome Back</h2>
            <p class="text-light">
              {{ dashboard?.companies?.today || 0 }} New Companies Today
            </p>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="row">

        <!-- Total Companies -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h2>{{ dashboard?.companies?.total || 0 }}</h2>
              <p>Total Companies</p>

              <apexchart
                type="bar"
                width="50"
                :options="totalChart.total"
                :series="totalChart.series"
              />
            </div>
          </div>
        </div>

        <!-- Active Companies -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h2>{{ dashboard?.companies?.active || 0 }}</h2>
              <p>Active Companies</p>

              <apexchart
                type="bar"
                width="50"
                :options="activeChart.active"
                :series="activeChart.series"
              />
            </div>
          </div>
        </div>

        <!-- Subscribers -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h2>{{ dashboard?.users?.total || 0 }}</h2>
              <p>Total Subscribers</p>

              <apexchart
                type="bar"
                width="50"
                :options="inactiveChart.inactive"
                :series="inactiveChart.series"
              />
            </div>
          </div>
        </div>

        <!-- Revenue -->
        <div class="col-xl-3 col-sm-6 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <h2>
                {{ formatCurrency(dashboard?.revenue?.total) }}
              </h2>
              <p>Total Revenue</p>

              <apexchart
                type="bar"
                width="50"
                :options="locationChart.location"
                :series="locationChart.series"
              />
            </div>
          </div>
        </div>

      </div>

      <!-- CHARTS -->
      <div class="row">

        <!-- Companies Chart -->
        <div class="col-lg-4 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5>Companies</h5>
            </div>
            <div class="card-body">
              <apexchart
                type="bar"
                height="290"
                :options="companyChart.company"
                :series="companyChart.series"
              />
            </div>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="col-lg-8 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5>Revenue</h5>
            </div>
            <div class="card-body">

              <h5>{{ formatCurrency(dashboard?.revenue?.total) }}</h5>

              <apexchart
                type="bar"
                height="280"
                :options="revenueCharts.income"
                :series="revenueCharts.series"
              />

            </div>
          </div>
        </div>

      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-5">
        <span class="spinner-border"></span>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer p-3 bg-white border-top">
      <p class="mb-0">
        {{ new Date().getFullYear() }} © E13solution
      </p>
    </div>
  </div>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";

import { ref, reactive, onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";

import { getSuperDashboard } from "@/services/superDashboard.service";

import {
  companyChart,
  revenueCharts,
  donutChart,
  totalChart,
  activeChart,
  inactiveChart,
  locationChart,
} from "./data";

export default {
  name: "SuperDashboard",

  setup() {
    // =========================
    // STATE
    // =========================
    const loading = ref(false);
    const dashboard = ref(null);

    const totalCompanies = ref(0);
    const activeCompanies = ref(0);
    const totalSubscribers = ref(0);
    const totalRevenue = ref(0);

    const dateRangeInput = ref(null);

    // Charts (reactive so UI updates)
    const charts = reactive({
      totalChart,
      activeChart,
      inactiveChart,
      locationChart,
      companyChart,
      revenueCharts,
      donutChart,
    });

    const formatCurrency = (value) => {
     if (!value) return "$0";
     return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

    // =========================
    // METHODS
    // =========================
    const toggleHeader = () => {
      document.getElementById("collapse-header")?.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    };

    const loadDashboard = async (filters = {}) => {
      try {
        loading.value = true;

        const data = await getSuperDashboard(filters);
        dashboard.value = data;

        // =========================
        // BIND DATA → UI
        // =========================
        totalCompanies.value = data?.companies?.total || 0;
        activeCompanies.value = data?.companies?.active || 0;
        totalSubscribers.value = data?.users?.total || 0;
        totalRevenue.value = data?.revenue?.total || 0;

        // =========================
        // UPDATE CHARTS
        // =========================
        if (data?.revenue?.chart) {
          charts.revenueCharts.series = data.revenue.chart.series;
          charts.revenueCharts.income.xaxis.categories =
            data.revenue.chart.categories;
        }

        if (data?.companies?.chart) {
          charts.companyChart.series = data.companies.chart.series;
          charts.companyChart.company.xaxis.categories =
            data.companies.chart.categories;
        }
      } catch (err) {
        console.error("❌ Dashboard error:", err);
      } finally {
        loading.value = false;
      }
    };

    // =========================
    // DATE RANGE
    // =========================
    const bookingRange = (start, end) => {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    };

    const initDatePicker = () => {
      if (!dateRangeInput.value) return;

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
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
          },
        },
        (start, end) => {
          bookingRange(start, end);

          // 🔥 Reload dashboard with filters
          loadDashboard({
            from: start.format("YYYY-MM-DD"),
            to: end.format("YYYY-MM-DD"),
          });
        }
      );

      bookingRange(start, end);
    };

    // =========================
    // LIFECYCLE
    // =========================
    onMounted(() => {
      initDatePicker();
      loadDashboard(); // initial load
    });

    // =========================
    // RETURN
    // =========================
    return {
      // state
      loading,
      dashboard,
      totalCompanies,
      activeCompanies,
      totalSubscribers,
      totalRevenue,

      // charts
      ...charts,

      // refs
      dateRangeInput,

      // methods
      toggleHeader,
      loadDashboard,
    };
  },
};
</script>
